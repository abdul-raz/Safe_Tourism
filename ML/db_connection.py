import psycopg2
import pandas as pd
from contextlib import contextmanager
import numpy as np

DB_CONFIG = {
    'host': 'localhost',
    'port': 5432,
    'database': 'safe_tourism',
    'user': 'postgres',
    'password': 'qpalzm@19'
}

@contextmanager
def get_db_connection():
    conn = None
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        yield conn
    except Exception as e:
        print(f"Database connection error: {e}")
        if conn:
            conn.rollback()
        raise
    finally:
        if conn:
            conn.close()

def test_connection():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT version();")
            version = cursor.fetchone()
            print(f"✅ Database connected successfully!")
            return True
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        return False

def get_ml_features(lat, lon):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            print(f"🔍 Extracting features for location: {lat}, {lon}")
            
            # Get nearest hazard
            cursor.execute("""
                SELECT 
                    COALESCE(MIN(ST_Distance(geometry, ST_Transform(ST_SetSRID(ST_MakePoint(%s, %s), 4326), 3857))), 99999) as dist_nearest_hazard_m,
                    COALESCE((SELECT danger_weight FROM hazard_zone_ml 
                             ORDER BY ST_Distance(geometry, ST_Transform(ST_SetSRID(ST_MakePoint(%s, %s), 4326), 3857))
                             LIMIT 1), 0) as nearest_hazard_weight
                FROM hazard_zone_ml
            """, (lon, lat, lon, lat))
            hazard_basic = cursor.fetchone()
            
            # Get hazard counts
            cursor.execute("""
                SELECT 
                    COUNT(CASE WHEN danger_weight > 0.7 AND 
                          ST_DWithin(geometry, ST_Transform(ST_SetSRID(ST_MakePoint(%s, %s), 4326), 3857), 1000) THEN 1 END) as high_danger_zones_1km,
                    COUNT(CASE WHEN zone_type = 'industrial' AND 
                          ST_DWithin(geometry, ST_Transform(ST_SetSRID(ST_MakePoint(%s, %s), 4326), 3857), 1000) THEN 1 END) as industrial_hazards_1km,
                    COUNT(CASE WHEN military IS NOT NULL AND 
                          ST_DWithin(geometry, ST_Transform(ST_SetSRID(ST_MakePoint(%s, %s), 4326), 3857), 1000) THEN 1 END) as military_zones_1km,
                    COUNT(CASE WHEN ("natural" = 'water' OR landuse = 'reservoir') AND 
                          ST_DWithin(geometry, ST_Transform(ST_SetSRID(ST_MakePoint(%s, %s), 4326), 3857), 500) THEN 1 END) as water_hazards_500m,
                    COALESCE(SUM(CASE WHEN ST_DWithin(geometry, ST_Transform(ST_SetSRID(ST_MakePoint(%s, %s), 4326), 3857), 1000) 
                                 THEN danger_weight ELSE 0 END), 0) as weighted_hazard_score_1km
                FROM hazard_zone_ml
            """, (lon, lat, lon, lat, lon, lat, lon, lat, lon, lat))
            hazard_counts = cursor.fetchone()
            
            # Get nearest hospital
            cursor.execute("""
                SELECT 
                    COALESCE(MIN(ST_Distance(geometry, ST_Transform(ST_SetSRID(ST_MakePoint(%s, %s), 4326), 3857))), 99999) as dist_nearest_hospital_m,
                    COALESCE((SELECT safety_weight FROM pois 
                             WHERE amenity = 'hospital'
                             ORDER BY ST_Distance(geometry, ST_Transform(ST_SetSRID(ST_MakePoint(%s, %s), 4326), 3857))
                             LIMIT 1), 0) as nearest_hospital_weight
                FROM pois
                WHERE amenity = 'hospital'
            """, (lon, lat, lon, lat))
            hospital_basic = cursor.fetchone()
            
            # Get POI counts
            cursor.execute("""
                SELECT 
                    COUNT(CASE WHEN amenity = 'hospital' AND 
                          ST_DWithin(geometry, ST_Transform(ST_SetSRID(ST_MakePoint(%s, %s), 4326), 3857), 2000) THEN 1 END) as hospitals_within_2km,
                    COALESCE(SUM(CASE WHEN ST_DWithin(geometry, ST_Transform(ST_SetSRID(ST_MakePoint(%s, %s), 4326), 3857), 1000) 
                                 THEN safety_weight ELSE 0 END), 0) as weighted_safety_score_1km
                FROM pois
            """, (lon, lat, lon, lat))
            poi_counts = cursor.fetchone()
            
            # Parse results
            inside_assam = 1 if (24.0 <= lat <= 28.0 and 89.5 <= lon <= 96.0) else 0
            
            hazard_features = {
                'dist_nearest_hazard_m': float(hazard_basic[0]) if hazard_basic[0] else 99999,
                'nearest_hazard_weight': float(hazard_basic[1]) if hazard_basic[1] else 0,
                'high_danger_zones_1km': int(hazard_counts[0]) if hazard_counts[0] else 0,
                'industrial_hazards_1km': int(hazard_counts[1]) if hazard_counts[1] else 0,
                'military_zones_1km': int(hazard_counts[2]) if hazard_counts[2] else 0,
                'water_hazards_500m': int(hazard_counts[3]) if hazard_counts[3] else 0,
                'weighted_hazard_score_1km': float(hazard_counts[4]) if hazard_counts[4] else 0,
                'inside_assam_boundary': bool(inside_assam)
            }
            
            poi_features = {
                'dist_nearest_hospital_m': float(hospital_basic[0]) if hospital_basic[0] else 99999,
                'nearest_hospital_weight': float(hospital_basic[1]) if hospital_basic[1] else 0,
                'hospitals_within_2km': int(poi_counts[0]) if poi_counts[0] else 0,
                'weighted_safety_score_1km': float(poi_counts[1]) if poi_counts[1] else 0
            }
            
            print("✅ Feature extraction successful!")
            return hazard_features, poi_features
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return None, None

if __name__ == "__main__":
    if test_connection():
        lat, lon = 26.1445, 91.7362
        hazard_data, poi_data = get_ml_features(lat, lon)
        
        if hazard_data and poi_data:
            print(f"\n✅ SUCCESS!")
            print(f"Hazard features: {hazard_data}")
            print(f"POI features: {poi_data}")
        else:
            print("❌ Failed")




