import json
import os
from predictor import predict_campaign_performance
from reach_predictor import predict_reach
from recommendation_engine import generate_recommendations


def analyze_campaign(input_data):
    engagement_result = predict_campaign_performance(input_data)
    reach = predict_reach(input_data)

    recommendations = generate_recommendations(
        input_data,
        engagement_result["predicted_engagement_rate"],
        reach
    )

    return {
        "predicted_engagement_rate": engagement_result["predicted_engagement_rate"],
        "effectiveness": engagement_result["effectiveness"],
        "predicted_reach": int(reach),
        "best_posting_time": "12:00 PM - 2:00 PM or 6:00 PM - 9:00 PM",
        "recommendations": recommendations
    }


if __name__ == "__main__":
    print("--- Campaign Analyzer ---")
    
    # User Input
    platform = input("Enter Platform (Instagram, Facebook, LinkedIn, Twitter, YouTube): ").strip()
    content_type = input("Enter Content Type: ").strip()
    industry = input("Enter Industry: ").strip()
    
    # Sample / Default values for other features
    sample = {
        "platform": platform or "Instagram",
        "content_type": content_type or "Image",
        "industry": industry or "Fitness",
        "posting_hour": 18,
        "caption_length": 120,
        "cta": 1,
        "influencer": 0
    }

    result = analyze_campaign(sample)
    
    print("\n--- Analysis Result ---")
    print(json.dumps(result, indent=4))
    
    # Save to JSON
    output_path = "analysis_output.json"
    with open(output_path, "w") as f:
        json.dump(result, f, indent=4)
        
    print(f"\nResult saved to {os.path.abspath(output_path)}")
