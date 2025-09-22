from train_model import ExplainableTouristRiskPredictor
from db_connection import get_ml_features, test_connection
import numpy as np
import sys

def predict_tourist_risk(lat, lon, model_path="models/tourist_risk_model.joblib"):
    print(f"🔍 Predicting risk for coordinates: ({lat}, {lon})")
    
    if not test_connection():
        print("❌ Cannot connect to database!")
        return None
    
    print("📊 Extracting features from database...")
    hazard_features, poi_features = get_ml_features(lat, lon)
    
    if hazard_features is None or poi_features is None:
        print("❌ Failed to extract features from database")
        return None
    
    print("✅ Features extracted successfully")
    
    try:
        predictor = ExplainableTouristRiskPredictor()
        predictor.load_model(model_path)
        
        # Create feature vector
        features = [
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
            hazard_features['weighted_hazard_score_1km'] / (poi_features['weighted_safety_score_1km'] + 0.001),
            1 / (poi_features['dist_nearest_hospital_m'] + 1),
            1 / (hazard_features['dist_nearest_hazard_m'] + 1),
            poi_features['hospitals_within_2km'] / (hazard_features['high_danger_zones_1km'] + 1),
            int(not hazard_features['inside_assam_boundary']),
            hazard_features['military_zones_1km'] * 0.8 + hazard_features['industrial_hazards_1km'] * 0.6,
            (poi_features['hospitals_within_2km'] * poi_features['nearest_hospital_weight']) / (poi_features['dist_nearest_hospital_m'] + 1)
        ]
        
        # Convert to 2D array properly
        features_2d = np.array(features).reshape(1, -1)
        features_scaled = predictor.scaler.transform(features_2d)
        
        # Get predictions
        risk_proba = predictor.ensemble_model.predict_proba(features_scaled)[0]
        risk_label = predictor.label_encoder.inverse_transform(predictor.ensemble_model.predict(features_scaled))[0]
        confidence = np.max(risk_proba)
        
        # FIXED: Use 2D array for SHAP
        shap_values = predictor.shap_explainer.shap_values(features_scaled)
        
        # Risk probabilities
        risk_scores = dict(zip(predictor.label_encoder.classes_, risk_proba))
        
        # Generate explanations
        if hasattr(shap_values, 'shape') and len(shap_values.shape) > 2:
            # Multi-class SHAP values - take first sample, average across classes
            feature_contributions = np.mean(np.abs(shap_values), axis=0)[0]
        elif hasattr(shap_values, 'shape') and len(shap_values.shape) == 2:
            # 2D SHAP values - take first sample
            feature_contributions = np.abs(shap_values[0])
        else:
            # 1D SHAP values
            feature_contributions = np.abs(shap_values)
        
        explanations = generate_explanations(features, feature_contributions, predictor.feature_names)
        
        result = {
            'prediction': {
                'risk_label': risk_label,
                'risk_score': risk_scores.get('HIGH', 0),
                'confidence': confidence,
                'probabilities': risk_scores,
                'alert_needed': risk_scores.get('HIGH', 0) > 0.7
            },
            'explanations': explanations,
            'location': {'lat': lat, 'lon': lon}
        }
        
        # Display results
        print("\n" + "="*60)
        print("🎯 TOURIST RISK PREDICTION RESULTS")
        print("="*60)
        print(f"📍 Location: {lat}, {lon}")
        print(f"🚨 Risk Label: {result['prediction']['risk_label']}")
        print(f"📊 Risk Score: {result['prediction']['risk_score']:.3f}")
        print(f"🎯 Confidence: {result['prediction']['confidence']:.3f}")
        print(f"⚠️  Alert Needed: {'YES' if result['prediction']['alert_needed'] else 'NO'}")
        
        print(f"\n📋 Risk Probabilities:")
        for label, prob in result['prediction']['probabilities'].items():
            print(f"  {label}: {prob:.3f}")
        
        print(f"\n🔍 Key Explanations:")
        for i, explanation in enumerate(result['explanations'][:5], 1):
            print(f"  {i}. {explanation}")
        
        return result
        
    except Exception as e:
        print(f"❌ Prediction error: {e}")
        return None

def generate_explanations(features, feature_contributions, feature_names):
    top_indices = np.argsort(feature_contributions)[::-1][:5]
    explanations = []
    
    for idx in top_indices:
        feature_name = feature_names[idx]
        feature_value = features[idx]
        
        if feature_name == 'military_zones_1km' and feature_value > 0:
            explanations.append(f"Military zones within 1km: {int(feature_value)} (Security risk)")
        elif feature_name == 'hospitals_within_2km':
            explanations.append(f"Hospitals within 2km: {int(feature_value)} (Medical access)")
        elif feature_name == 'inside_assam_boundary':
            status = "Inside Assam" if feature_value == 1 else "Outside Assam"
            explanations.append(f"Location: {status}")
        elif feature_name == 'dist_nearest_hazard_m':
            explanations.append(f"Nearest hazard: {int(feature_value)}m away")
        elif feature_name == 'dist_nearest_hospital_m':
            explanations.append(f"Nearest hospital: {int(feature_value)}m away")
        elif feature_name == 'weighted_hazard_score_1km':
            explanations.append(f"Hazard density: {feature_value:.2f}")
        elif feature_name == 'water_hazards_500m' and feature_value > 0:
            explanations.append(f"Water hazards nearby: {int(feature_value)} (Flood risk)")
        else:
            explanations.append(f"{feature_name}: {feature_value:.2f}")
    
    return explanations

if __name__ == "__main__":
    print("🧪 Testing Risk Prediction System...")
    lat, lon = 26.1445, 91.7362
    result = predict_tourist_risk(lat, lon)
    
    if result:
        print("✅ SUCCESS!")
    else:
        print("❌ FAILED!")
