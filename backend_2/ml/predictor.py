import joblib
import pandas as pd
import os

# Get script directory for relative paths
script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, "models", "campaign_predictor.pkl")

# Load trained model (lazy loading)
model = None

def get_model():
    global model
    if model is None:
        if os.path.exists(model_path):
            model = joblib.load(model_path)
        else:
            raise RuntimeError(f"Model not found at {model_path}. Run train_model.py first.")
    return model


def predict_campaign_performance(input_data: dict):
    """
    input_data example:
    {
        "platform": "Instagram",
        "content_type": "Reel",
        "industry": "Fitness",
        "posting_hour": 20,
        "caption_length": 120,
        "cta": 1,
        "influencer": 1
    }
    """
    m = get_model()
    df = pd.DataFrame([input_data])
    engagement = m.predict(df)[0]

    if engagement >= 5:
        label = "High"
    elif engagement >= 3:
        label = "Medium"
    else:
        label = "Low"

    return {
        "predicted_engagement_rate": round(float(engagement), 2),
        "effectiveness": label
    }



# Test run
if __name__ == "__main__":
    sample_input = {
        "platform": "Instagram",
        "content_type": "Image",
        "industry": "Fitness",
        "posting_hour": 1,
        "caption_length": 10,
        "cta": 0,
        "influencer": 1
    }

    result = predict_campaign_performance(sample_input)
    print(result)
