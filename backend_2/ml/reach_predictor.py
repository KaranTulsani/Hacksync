import joblib
import pandas as pd

model = joblib.load("models/reach_predictor.pkl")

def predict_reach(input_data: dict):
    df = pd.DataFrame([input_data])
    reach = model.predict(df)[0]
    return int(reach)


if __name__ == "__main__":
    sample = {
        "platform": "Instagram",
        "content_type": "Reel",
        "industry": "Fitness",
        "posting_hour": 20,
        "caption_length": 120,
        "cta": 1,
        "influencer": 1
    }

    print("Predicted Reach:", predict_reach(sample))
