import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

cred = credentials.Certificate("firebase_key.json")
firebase_admin.initialize_app(cred)

db = firestore.client()


def save_campaign(campaign_data: dict):
    db.collection("campaigns").add({
        **campaign_data,
        "created_at": datetime.utcnow()
    })
