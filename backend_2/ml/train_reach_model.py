import pandas as pd
import joblib
import os

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

# Get script directory for relative paths
script_dir = os.path.dirname(os.path.abspath(__file__))

# Load dataset
data = pd.read_csv(os.path.join(script_dir, "..", "data", "campaign_performance_data.csv"))

X = data.drop(["reach", "engagement"], axis=1)
y = data["reach"]

categorical_features = ["platform", "content_type", "industry"]
numeric_features = ["posting_hour", "caption_length", "cta", "influencer"]

preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features),
        ("num", "passthrough", numeric_features),
    ]
)

model = RandomForestRegressor(
    n_estimators=200,
    max_depth=14,
    random_state=42
)

pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("model", model)
])

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

pipeline.fit(X_train, y_train)

preds = pipeline.predict(X_test)
mae = mean_absolute_error(y_test, preds)

print(f"Reach MAE: {int(mae)} impressions")

model_path = os.path.join(script_dir, "models", "reach_predictor.pkl")
joblib.dump(pipeline, model_path)
print(f"Reach model saved to {model_path}")
