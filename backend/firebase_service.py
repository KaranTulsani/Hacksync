import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
import os

# Get the path to firebase_key.json relative to project root
script_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
key_path = os.path.join(script_dir, "firebase_key.json")

cred = credentials.Certificate(key_path)
firebase_admin.initialize_app(cred)

db = firestore.client()


def save_campaign(campaign_data: dict):
    db.collection("campaigns").add({
        **campaign_data,
        "created_at": datetime.utcnow()
    })
