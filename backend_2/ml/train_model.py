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

# Features & target
X = data.drop(["reach", "engagement"], axis=1)
y = data["engagement"]

# Feature types
categorical_features = ["platform", "content_type", "industry"]
numeric_features = ["posting_hour", "caption_length", "cta", "influencer"]

# Preprocessing
preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features),
        ("num", "passthrough", numeric_features),
    ]
)

# Model
model = RandomForestRegressor(
    n_estimators=150,
    max_depth=12,
    random_state=42
)

# Pipeline
pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("model", model),
    ]
)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train
pipeline.fit(X_train, y_train)

# Evaluate
preds = pipeline.predict(X_test)
mae = mean_absolute_error(y_test, preds)

print(f"Model trained successfully")
print(f"Mean Absolute Error: {round(mae, 2)}")

# Save model
joblib.dump(pipeline, "models/campaign_predictor.pkl")
print("Model saved to models/campaign_predictor.pkl")
