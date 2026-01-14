import random
import pandas as pd
import numpy as np

random.seed(42)
np.random.seed(42)

PLATFORMS = ["Instagram", "Facebook", "LinkedIn", "Twitter", "YouTube"]

CONTENT_MAP = {
    "Instagram": ["Reel", "Carousel", "Image", "Post"],
    "Facebook": ["Image", "Post", "Video"],
    "LinkedIn": ["Post", "Article"],
    "Twitter": ["Tweet", "Thread"],
    "YouTube": ["Video", "Shorts", "Live"]
}

INDUSTRIES = [
    "Fitness", "Fashion", "EdTech", "FinTech", "Food",
    "Travel", "Gaming", "Tech", "Beauty", "Healthcare",
    "RealEstate", "Entertainment", "Sports"
]

def base_engagement(platform, content_type):
    score = 2.0

    if platform == "Instagram":
        score += 1.5
        if content_type == "Reel":
            score += 1.3

    elif platform == "Facebook":
        score += 1.2
        if content_type == "Video":
            score += 0.8

    elif platform == "LinkedIn":
        score += 1.0
        if content_type == "Article":
            score += 0.6

    elif platform == "Twitter":
        score += 0.8
        if content_type == "Thread":
            score += 0.5

    elif platform == "YouTube":
        score += 2.0
        if content_type in ["Video", "Shorts", "Live"]:
            score += 1.5

    return score

def generate_row():
    platform = random.choice(PLATFORMS)
    content_type = random.choice(CONTENT_MAP[platform])
    industry = random.choice(INDUSTRIES)

    posting_hour = random.randint(6, 23)
    caption_length = random.randint(50, 250)
    cta = random.choice([0, 1])
    influencer = random.choice([0, 1])

    engagement = base_engagement(platform, content_type)

    # Time-based ideal windows
    if 18 <= posting_hour <= 21:
        engagement += 1.2
    elif 12 <= posting_hour <= 14:
        engagement += 0.6

    if cta:
        engagement += 0.5
    if influencer:
        engagement += 1.0

    # Noise
    engagement += np.random.normal(0, 0.4)
    engagement = max(0.5, round(engagement, 2))

    reach = int(
        engagement * random.randint(3000, 7000) +
        random.randint(3000, 10000)
    )

    return {
        "platform": platform,
        "content_type": content_type,
        "industry": industry,
        "posting_hour": posting_hour,
        "caption_length": caption_length,
        "cta": cta,
        "influencer": influencer,
        "reach": reach,
        "engagement": engagement
    }

def generate_dataset(rows=25000):
    data = [generate_row() for _ in range(rows)]
    df = pd.DataFrame(data)
    df.to_csv("data/campaign_performance_data.csv", index=False)
    print(f"Dataset generated with {rows} rows → campaign_performance_data.csv")

if __name__ == "__main__":
    generate_dataset(25000)
