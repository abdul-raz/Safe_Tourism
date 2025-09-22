import pandas as pd
import numpy as np
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score
from sklearn.ensemble import VotingClassifier
import shap
import joblib
import warnings
import os

warnings.filterwarnings('ignore')

class ExplainableTouristRiskPredictor:
    def __init__(self):
        self.xgb_model = None
        self.ensemble_model = None
        self.scaler = StandardScaler()
        self.label_encoder = LabelEncoder()
        self.shap_explainer = None
        self.feature_names = [
            'dist_nearest_hazard_m', 'nearest_hazard_weight', 
            'dist_nearest_hospital_m', 'nearest_hospital_weight',
            'high_danger_zones_1km', 'hospitals_within_2km',
            'industrial_hazards_1km', 'military_zones_1km', 'water_hazards_500m',
            'weighted_hazard_score_1km', 'weighted_safety_score_1km',
            'inside_assam_boundary', 'hazard_to_safety_ratio', 'hospital_accessibility', 
            'hazard_proximity', 'safety_density', 'boundary_penalty', 
            'critical_hazard_exposure', 'emergency_response_score'
        ]
    
    def load_training_data(self, csv_path):
        """Load and prepare training data from CSV"""
        if not os.path.exists(csv_path):
            raise FileNotFoundError(f"Training data file not found: {csv_path}")
            
        df = pd.read_csv(csv_path)
        print(f"✅ Loaded {len(df)} training samples")
        
        # Prepare features and target
        X = df[self.feature_names]
        y = df['risk_label']
        
        print(f"📊 Risk distribution:")
        print(y.value_counts())
        
        return X, y
    
    def train_explainable_model(self, csv_path):
        """Train XGBoost with SHAP explainability"""
        print("🚀 Starting model training...")
        X, y = self.load_training_data(csv_path)
        
        # Encode labels
        y_encoded = self.label_encoder.fit_transform(y)
        
        # Split data with stratification
        X_train, X_test, y_train, y_test = train_test_split(
            X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
        )
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # XGBoost parameters
        xgb_params = {
            'n_estimators': 200,
            'max_depth': 4,
            'learning_rate': 0.1,
            'subsample': 0.9,
            'colsample_bytree': 0.9,
            'reg_alpha': 0.1,
            'reg_lambda': 1.0,
            'min_child_weight': 3,
            'objective': 'multi:softprob',
            'eval_metric': 'mlogloss',
            'random_state': 42,
            'n_jobs': -1,
            'tree_method': 'hist'
        }
        
        # Train main XGBoost model
        print("⏳ Training XGBoost model...")
        self.xgb_model = xgb.XGBClassifier(**xgb_params)
        self.xgb_model.fit(X_train_scaled, y_train, verbose=False)
        
        # Create ensemble for better accuracy
        print("⏳ Training ensemble models...")
        ensemble_models = []
        for i, random_state in enumerate([42, 123, 456]):
            model_params = {**xgb_params, 'random_state': random_state}
            model = xgb.XGBClassifier(**model_params)
            model.fit(X_train_scaled, y_train, verbose=False)
            ensemble_models.append((f'xgb_{i}', model))
        
        self.ensemble_model = VotingClassifier(estimators=ensemble_models, voting='soft')
        self.ensemble_model.fit(X_train_scaled, y_train)
        
        # Initialize SHAP explainer
        print("⏳ Setting up SHAP explainer...")
        self.shap_explainer = shap.TreeExplainer(self.xgb_model)
        
        # Evaluate model
        self.evaluate_model(X_test_scaled, y_test)
        
        print("✅ Model training completed!")
        return self
    
    def evaluate_model(self, X_test, y_test):
        """Comprehensive model evaluation"""
        print("\n" + "="*50)
        print("📈 MODEL EVALUATION")
        print("="*50)
        
        # Predictions
        xgb_pred = self.xgb_model.predict(X_test)
        ensemble_pred = self.ensemble_model.predict(X_test)
        ensemble_proba = self.ensemble_model.predict_proba(X_test)
        
        print(f"🎯 XGBoost Accuracy: {accuracy_score(y_test, xgb_pred):.4f}")
        print(f"🎯 Ensemble Accuracy: {accuracy_score(y_test, ensemble_pred):.4f}")
        
        # AUC Score for multi-class
        if len(np.unique(y_test)) > 2:
            auc = roc_auc_score(y_test, ensemble_proba, multi_class='ovr')
            print(f"📊 AUC Score: {auc:.4f}")
        
        # Feature importance
        feature_importance = pd.DataFrame({
            'feature': self.feature_names,
            'importance': self.xgb_model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        print(f"\n🔝 Top 10 Important Features:")
        for i, row in feature_importance.head(10).iterrows():
            print(f"  {row['feature']}: {row['importance']:.4f}")
    
    def predict_with_explanation(self, lat, lon, hazard_features, poi_features):
        """Predict risk with detailed SHAP explanations"""
        
        # Create feature vector matching training data
        features = np.array([
            hazard_features['dist_nearest_hazard_m'],
            hazard_features['nearest_hazard_weight'],
            poi_features['dist_nearest_hospital_m'],
            poi_features['nearest_hospital_weight'],
            hazard_features['high_danger_zones_1km'],
            poi_features['hospitals_within_2km'],
            hazard_features['industrial_hazards_1km'],
            hazard_features['military_zones_1km'],
            hazard_features['water_hazards_500m'],
            hazard_features['weighted_hazard_score_1km'],
            poi_features['weighted_safety_score_1km'],
            int(hazard_features['inside_assam_boundary']),
            # Computed features
            hazard_features['weighted_hazard_score_1km'] / (poi_features['weighted_safety_score_1km'] + 0.001),
            1 / (poi_features['dist_nearest_hospital_m'] + 1),
            1 / (hazard_features['dist_nearest_hazard_m'] + 1),
            poi_features['hospitals_within_2km'] / (hazard_features['high_danger_zones_1km'] + 1),
            int(not hazard_features['inside_assam_boundary']),
            hazard_features['military_zones_1km'] * 0.8 + hazard_features['industrial_hazards_1km'] * 0.6,
            (poi_features['hospitals_within_2km'] * poi_features['nearest_hospital_weight']) / (poi_features['dist_nearest_hospital_m'] + 1)
        ]).reshape(1, -1)
        
        # Scale features
        features_scaled = self.scaler.transform(features)
        
        # Get predictions
        risk_proba = self.ensemble_model.predict_proba(features_scaled)[0]
        risk_label = self.label_encoder.inverse_transform(self.ensemble_model.predict(features_scaled))[0]
        confidence = np.max(risk_proba)
        
        # SHAP explanations
        shap_values = self.shap_explainer.shap_values(features_scaled[0])
        
        # Risk probabilities
        risk_scores = dict(zip(self.label_encoder.classes_, risk_proba))
        
        return {
            'prediction': {
                'risk_label': risk_label,
                'risk_score': risk_scores.get('HIGH', 0),
                'confidence': confidence,
                'probabilities': risk_scores,
                'alert_needed': risk_scores.get('HIGH', 0) > 0.7
            },
            'explanations': self._generate_explanations(features[0], shap_values),
            'location': {'lat': lat, 'lon': lon}
        }
    
    def _generate_explanations(self, features, shap_values):
        """Generate human-readable explanations"""
        if len(shap_values.shape) > 1:
            feature_contributions = np.mean(np.abs(shap_values), axis=0)
        else:
            feature_contributions = np.abs(shap_values)
        
        # Get top contributing features
        top_indices = np.argsort(feature_contributions)[::-1][:5]
        explanations = []
        
        for idx in top_indices:
            feature_name = self.feature_names[idx]
            feature_value = features[idx]
            contribution = feature_contributions[idx]
            
            if feature_name == 'military_zones_1km' and feature_value > 0:
                explanations.append(f"Military zones within 1km: {int(feature_value)} (Security risk)")
            elif feature_name == 'hospitals_within_2km':
                explanations.append(f"Hospitals within 2km: {int(feature_value)} (Medical access)")
            elif feature_name == 'inside_assam_boundary':
                status = "Inside Assam" if feature_value == 1 else "Outside Assam"
                explanations.append(f"Location: {status}")
            elif feature_name == 'dist_nearest_hazard_m':
                explanations.append(f"Nearest hazard: {int(feature_value)}m away")
            elif feature_name == 'weighted_hazard_score_1km':
                explanations.append(f"Hazard density: {feature_value:.2f}")
        
        return explanations
    
    def save_model(self, filepath):
        """Save trained model"""
        model_data = {
            'ensemble_model': self.ensemble_model,
            'xgb_model': self.xgb_model,
            'scaler': self.scaler,
            'label_encoder': self.label_encoder,
            'shap_explainer': self.shap_explainer,
            'feature_names': self.feature_names
        }
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        joblib.dump(model_data, filepath)
        print(f"💾 Model saved to: {filepath}")
    
    def load_model(self, filepath):
        """Load trained model"""
        model_data = joblib.load(filepath)
        self.ensemble_model = model_data['ensemble_model']
        self.xgb_model = model_data['xgb_model']
        self.scaler = model_data['scaler']
        self.label_encoder = model_data['label_encoder']
        self.shap_explainer = model_data['shap_explainer']
        self.feature_names = model_data['feature_names']
        print(f"📥 Model loaded from: {filepath}")

if __name__ == "__main__":
    # Train the model
    csv_path = "data/ML_training_data.csv"
    model_path = "models/tourist_risk_model.joblib"
    
    print("🚀 Starting Tourist Risk Model Training...")
    predictor = ExplainableTouristRiskPredictor()
    predictor.train_explainable_model(csv_path)
    predictor.save_model(model_path)
    print("🎉 Training completed successfully!")


