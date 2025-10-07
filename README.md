
# Smart Tourism Safety App

## Overview  
The Smart Tourism Safety App is an AI-driven, blockchain-enabled solution designed to ensure tourist safety in Northeast India’s complex geographic zones. Developed for the Smart India Hackathon, it combines real-time geofencing, multi-model machine learning, and secure blockchain technology to empower tourists and authorities with timely risk alerts and streamlined emergency responses—even in offline or low-connectivity scenarios.

## Key Features

- **Real-Time Geofencing & Location Awareness:** Utilizes detailed Assam GIS  to dynamically alert tourists approaching restricted or hazardous zones.
- **Ensemble AI Safety System:** Incorporates four specialized AI models for comprehensive safety management:
  - **Proximity Detection Model:** Detects tourists entering sensitive areas.
  - **Risk Assessment Model:** Classifies zones by safety risk using Random Forest.
  - **Incident Detection & Reporting Model:** Automatically identifies emergencies and files digital FIRs for swift law enforcement action.
  - **Predictive Analytics Model:** Uses XGBoost to forecast potential risks from patterns such as weather, crowd density, and incident history.
- **Multi-Channel Distress Alerts:** Sends distress signals via multiple communication channels with offline capability.
- **Blockchain Integration:** Ensures privacy, transparency, and immutability of incident reports and safety data using Hyperledger or Ethereum smart contracts.
- **Safe Route Planning & Live Advisories:** Guides tourists through safer routes and provides real-time safety updates.
- **Multilingual Support:** Integrates translation APIs for accessibility across diverse tourist demographics.
- **Emergency Contact & Medical Assistance:** Quick access to emergency responders and healthcare contacts.

## Technology Stack

| Layer              | Technologies & Tools                                   |
|--------------------|-------------------------------------------------------|
| Frontend           | React Native  |
| Backend            | Node.js, Express.js                                   |
| Database           | PostgreSQL with PostGIS (spatial data), MongoDB       |
| Machine Learning   | Python, XGBoost, Random Forest, Scikit-learn          |
| Geospatial Tools   | QGIS, Assam GIS/OpenStreetMap data, PostGIS           |
| Blockchain         | Hyperledger Fabric, Ethereum, IPFS                     |
| APIs & Integrations| Weather APIs, Language Translation (e.g., Reverie), Location services |
| DevOps & Deployment| Docker, Ansible                                        |

## Installation & Usage

1. **Clone the repository:**
   ```
   git clone https://github.com/yourusername/safe-tourism-app.git
   cd safe-tourism-app
   ```
2. **Install backend dependencies:**
   ```
   npm install
   ```
3. **Configure environment variables for APIs, databases, and blockchain nodes in `.env`.**
4. **Run backend:**
   ```
   npm start
   ```
5. **Set up PostGIS database and import Assam GIS data:**
   Follow `/db/README.md` for spatial data import and indexing.
6. **Launch mobile frontend:**
   ```
   cd mobile
   npm install
   npm run android  
   ```

## AI Model Workflow

1. **Geofence Monitoring:** Constantly track tourist location data to trigger proximity alerts.
2. **Risk Scoring:** Dynamically assess zone safety using past and real-time environmental data.
3. **Emergency Detection:** Analyze alerts and sensor inputs to identify incidents.
4. **Predictive Alerts:** Forecast unsafe conditions ahead using trend analysis.


***

