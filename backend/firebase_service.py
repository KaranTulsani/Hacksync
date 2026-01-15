import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
import os

db = None

try:
    # Get the path to firebase_key.json relative to project root
    script_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    key_path = os.path.join(script_dir, "firebase_key.json")

    if os.path.exists(key_path):
        cred = credentials.Certificate(key_path)
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        print("✓ Firebase initialized successfully")
    else:
        print("⚠️  firebase_key.json not found. Database features will be disabled.")
except Exception as e:
    print(f"⚠️  Firebase initialization failed: {e}")



def save_campaign(campaign_data: dict):
    if db is None:
        return
    
    try:
        db.collection("campaigns").add({
            **campaign_data,
            "created_at": datetime.utcnow()
        })
    except Exception as e:
        print(f"⚠️  Failed to save campaign to Firebase: {e}")

