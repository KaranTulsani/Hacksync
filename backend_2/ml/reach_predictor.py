import joblib
import pandas as pd
import os

# Get script directory for relative paths
script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, "models", "reach_predictor.pkl")

# Load trained model (lazy loading)
model = None

def get_model():
    global model
    if model is None:
        if os.path.exists(model_path):
            model = joblib.load(model_path)
        else:
            raise RuntimeError(f"Model not found at {model_path}. Run train_reach_model.py first.")
    return model


def predict_reach(input_data: dict):
    m = get_model()
    df = pd.DataFrame([input_data])
    reach = m.predict(df)[0]
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
