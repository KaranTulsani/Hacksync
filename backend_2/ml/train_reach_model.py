import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

# Load dataset
data = pd.read_csv("data/campaign_performance_data.csv")

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

joblib.dump(pipeline, "models/reach_predictor.pkl")
print("Reach model saved")
