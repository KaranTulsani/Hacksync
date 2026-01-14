import joblib
import pandas as pd

# Load trained model
model = joblib.load("models/campaign_predictor.pkl")

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

    df = pd.DataFrame([input_data])
    engagement = model.predict(df)[0]

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
