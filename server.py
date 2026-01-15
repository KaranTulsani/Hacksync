"""
BrandPulse Unified API
Combines the Strategy Generation (Gemini) with ML Performance Prediction
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import sys

# Add backend directories to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend_2', 'ml'))

# Import smart demo generator
from smart_demo_generator import generate_smart_campaign

# Import with graceful error handling
GEMINI_AVAILABLE = False

try:
    from backend.main import run_brandpulse
    from backend.gemini_client import GEMINI_AVAILABLE as _GEMINI_AVAILABLE
    GEMINI_AVAILABLE = _GEMINI_AVAILABLE
    print(f"✓ Gemini Backend: {'Available' if GEMINI_AVAILABLE else 'Demo Mode (Smart Generator)'}")
except Exception as e:
    print(f"⚠️  Gemini Backend not available: {e}")

# Lazy load ML modules
ML_MODULES = {}

def get_ml_modules():
    """Lazy load ML modules on first use"""
    global ML_MODULES
    if not ML_MODULES:
        try:
            from predictor import predict_campaign_performance
            from reach_predictor import predict_reach
            from recommendation_engine import generate_recommendations
            ML_MODULES = {
                'predict_campaign_performance': predict_campaign_performance,
                'predict_reach': predict_reach,
                'generate_recommendations': generate_recommendations,
                'available': True
            }
            print("✓ ML Prediction Backend: Available")
        except Exception as e:
            print(f"⚠️  ML Backend not available: {e}")
            ML_MODULES = {'available': False}
    return ML_MODULES


app = FastAPI(
    title="BrandPulse Unified API",
    description="AI-Powered Brand Campaign Strategist with Performance Prediction",
    version="2.0.0"
)

# CORS Configuration for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============ REQUEST SCHEMAS ============

class UnifiedCampaignRequest(BaseModel):
    # Core Campaign Brief (Backend 1)
    product: str
    audience: str
    goal: str
    tone: str = "Professional yet approachable"
    budget: str = "$5,000 - $10,000"
    campaign_duration: str = "3 Months"
    
    # ML Prediction Inputs (Backend 2)
    platform: Optional[str] = "Instagram"
    content_type: Optional[str] = "Image"
    industry: Optional[str] = "General"
    posting_hour: Optional[int] = 18
    caption_length: Optional[int] = 120
    cta: Optional[int] = 1
    influencer: Optional[int] = 0


class PerformancePredictionRequest(BaseModel):
    platform: str
    content_type: str
    industry: str
    posting_hour: int = 18
    caption_length: int = 120
    cta: int = 1
    influencer: int = 0


# ============ SMART DEMO PREDICTION ============

def get_smart_prediction(platform: str, content_type: str, industry: str, has_influencer: bool = False) -> dict:
    """Generate intelligent predictions based on platform and content type"""
    
    # Base engagement rates by platform
    platform_rates = {
        "Instagram": {"base_reach": 12000, "base_engagement": 3.8},
        "TikTok": {"base_reach": 25000, "base_engagement": 5.2},
        "YouTube": {"base_reach": 8000, "base_engagement": 2.5},
        "LinkedIn": {"base_reach": 5000, "base_engagement": 2.1},
        "Facebook": {"base_reach": 6000, "base_engagement": 1.8},
        "Twitter": {"base_reach": 7500, "base_engagement": 1.5}
    }
    
    # Content type multipliers
    content_multipliers = {
        "Reel": 2.5,
        "Video": 1.8,
        "Carousel": 1.4,
        "Image": 1.0,
        "Article": 0.8,
        "Story": 1.2
    }
    
    # Industry engagement factors
    industry_factors = {
        "Fitness": 1.3,
        "Fashion": 1.2,
        "Technology": 0.9,
        "Food & Beverage": 1.4,
        "Education": 0.85,
        "General": 1.0
    }
    
    base = platform_rates.get(platform, platform_rates["Instagram"])
    content_mult = content_multipliers.get(content_type, 1.0)
    industry_mult = industry_factors.get(industry, 1.0)
    influencer_boost = 1.4 if has_influencer else 1.0
    
    reach = int(base["base_reach"] * content_mult * industry_mult * influencer_boost)
    engagement = round(base["base_engagement"] * content_mult * industry_mult, 2)
    
    # Determine effectiveness
    if engagement >= 4.5:
        effectiveness = "High"
    elif engagement >= 3.0:
        effectiveness = "Medium-High"
    elif engagement >= 2.0:
        effectiveness = "Medium"
    else:
        effectiveness = "Low"
    
    # Smart recommendations based on inputs
    recommendations = generate_smart_recommendations(platform, content_type, industry, engagement, reach)
    
    # Calculate Industry Average for comparison
    industry_avg = round(base["base_engagement"] * industry_mult, 2)
    
    return {
        "predicted_reach": reach,
        "engagement_rate": f"{engagement}%",
        "industry_average": f"{industry_avg}%",
        "effectiveness": effectiveness,
        "best_posting_time": get_best_posting_time(platform),
        "recommendations": recommendations
    }


def get_best_posting_time(platform: str) -> str:
    """Get platform-specific best posting times"""
    times = {
        "Instagram": "12PM-2PM and 7PM-9PM EST",
        "TikTok": "7PM-11PM (peak entertainment hours)",
        "YouTube": "2PM-4PM for discovery, 9PM-11PM for views",
        "LinkedIn": "7AM-9AM and 5PM-6PM (commute times)",
        "Facebook": "1PM-4PM EST",
        "Twitter": "12PM-3PM EST"
    }
    return times.get(platform, "12PM-2PM and 6PM-9PM")


def generate_smart_recommendations(platform: str, content_type: str, industry: str, engagement: float, reach: int) -> List[str]:
    """Generate intelligent, context-aware recommendations"""
    
    recommendations = []
    
    # Platform-specific recommendations
    if platform == "Instagram":
        if content_type != "Reel":
            recommendations.append(f"🎬 Switch to Reels for up to 2.5x higher reach. Your current {content_type} content limits discoverability.")
        recommendations.append("📱 Use 3-5 hashtags strategically (mix of niche and broad) to appear in Explore.")
        if engagement < 4.0:
            recommendations.append("💬 Add direct questions in captions to boost comment rates by 40%.")
    
    elif platform == "TikTok":
        if content_type not in ["Video", "Reel"]:
            recommendations.append("🎵 TikTok is video-first. Convert your content strategy to short-form video immediately.")
        recommendations.append("🔊 Use trending sounds in the first 24 hours of their peak for algorithm boost.")
        recommendations.append("⚡ Hook viewers in the first 1.5 seconds—pattern interrupt is key.")
    
    elif platform == "LinkedIn":
        if content_type != "Article":
            recommendations.append("📝 Document carousels get 3x more engagement than images on LinkedIn.")
        recommendations.append("🕐 Post Tuesday-Thursday for maximum professional audience reach.")
        recommendations.append("📊 Include actionable insights and data points to boost credibility saves.")
    
    elif platform == "YouTube":
        recommendations.append("🎯 Optimize thumbnails with faces and emotion for 30% higher CTR.")
        recommendations.append("📈 First 30 seconds determine retention—front-load value immediately.")
        if reach < 10000:
            recommendations.append("🔍 Use YouTube Shorts to build subscriber base, then convert to long-form.")
    
    # Industry-specific recommendations
    if industry == "Fitness":
        recommendations.append("💪 Before/after transformations consistently outperform other fitness content types.")
    elif industry == "Fashion":
        recommendations.append("👗 'Get Ready With Me' format drives 2x engagement in fashion verticals.")
    elif industry == "Technology":
        recommendations.append("🤖 Tutorial and 'how-to' content builds trust and drives 50% more saves.")
    elif industry == "Food & Beverage":
        recommendations.append("🍽️ ASMR and close-up food shots are trending—incorporate sensory elements.")
    
    # Performance-based recommendations
    if engagement < 3.0:
        recommendations.append("⚠️ Below-average engagement detected. Test different content formats and posting times.")
    
    if reach < 10000:
        recommendations.append("📢 Consider micro-influencer partnerships to expand reach by 40-60%.")
    
    # Always include a CTA recommendation
    recommendations.append("🎯 Every post should have ONE clear CTA. Multiple CTAs reduce action rates by 45%.")
    
    return recommendations[:6]  # Return top 6 recommendations


# ============ ENDPOINTS ============

@app.get("/")
def health_check():
    ml = get_ml_modules()
    return {
        "status": "BrandPulse Unified API Running",
        "version": "2.0.0",
        "gemini_available": GEMINI_AVAILABLE,
        "ml_available": ml.get('available', False),
        "smart_demo": True,
        "mode": "live" if GEMINI_AVAILABLE else "smart-demo"
    }


@app.post("/api/generate-campaign")
def generate_full_campaign(request: UnifiedCampaignRequest):
    """
    Main endpoint: Generates complete campaign strategy using Gemini AI
    and predicts performance using ML models.
    """
    try:
        # Step 1: Generate Campaign Strategy
        if GEMINI_AVAILABLE:
            # Use real Gemini API
            campaign_input = {
                "product": request.product,
                "audience": request.audience,
                "goal": request.goal,
                "tone": request.tone,
                "budget": request.budget,
                "campaign_duration": request.campaign_duration
            }
            campaign_result = run_brandpulse(campaign_input)
        else:
            # Use SMART demo generator
            campaign_result = generate_smart_campaign(
                product=request.product,
                audience=request.audience,
                goal=request.goal,
                tone=request.tone,
                budget=request.budget,
                duration=request.campaign_duration,
                platform=request.platform,
                content_type=request.content_type,
                industry=request.industry
            )
        
        # Step 2: Add Performance Prediction
        ml = get_ml_modules()
        if ml.get('available', False):
            try:
                ml_input = {
                    "platform": request.platform,
                    "content_type": request.content_type,
                    "industry": request.industry,
                    "posting_hour": request.posting_hour,
                    "caption_length": request.caption_length,
                    "cta": request.cta,
                    "influencer": request.influencer
                }
                
                engagement_result = ml['predict_campaign_performance'](ml_input)
                reach = ml['predict_reach'](ml_input)
                recommendations = ml['generate_recommendations'](
                    ml_input,
                    engagement_result["predicted_engagement_rate"],
                    reach
                )
                
                campaign_result["performance_prediction"] = {
                    "predicted_reach": int(reach),
                    "engagement_rate": f"{engagement_result['predicted_engagement_rate']:.2f}%",
                    "effectiveness": engagement_result["effectiveness"],
                    "best_posting_time": get_best_posting_time(request.platform),
                    "recommendations": recommendations
                }
            except Exception as ml_error:
                print(f"ML Prediction error: {ml_error}")
                campaign_result["performance_prediction"] = get_smart_prediction(
                    request.platform, 
                    request.content_type, 
                    request.industry,
                    request.influencer == 1
                )
        else:
            # Use smart prediction
            campaign_result["performance_prediction"] = get_smart_prediction(
                request.platform, 
                request.content_type, 
                request.industry,
                request.influencer == 1
            )
        
        # Add metadata
        campaign_result["_meta"] = {
            "gemini_mode": "live" if GEMINI_AVAILABLE else "smart-demo",
            "ml_mode": "live" if ml.get('available', False) else "smart-demo"
        }
        
        return campaign_result
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/predict-performance")
def predict_performance_only(request: PerformancePredictionRequest):
    """
    Standalone endpoint: Returns only the ML performance prediction.
    """
    ml = get_ml_modules()
    if not ml.get('available', False):
        # Return smart prediction
        return get_smart_prediction(
            request.platform, 
            request.content_type, 
            request.industry,
            request.influencer == 1
        )
    
    try:
        ml_input = request.dict()
        
        engagement_result = ml['predict_campaign_performance'](ml_input)
        reach = ml['predict_reach'](ml_input)
        recommendations = ml['generate_recommendations'](
            ml_input,
            engagement_result["predicted_engagement_rate"],
            reach
        )
        
        return {
            "predicted_reach": int(reach),
            "engagement_rate": f"{engagement_result['predicted_engagement_rate']:.2f}%",
            "effectiveness": engagement_result["effectiveness"],
            "best_posting_time": get_best_posting_time(request.platform),
            "recommendations": recommendations
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============ RUN SERVER ============

if __name__ == "__main__":
    import uvicorn
    ml = get_ml_modules()
    print("\n" + "="*60)
    print("🚀 BrandPulse API Server Starting...")
    print("="*60)
    print(f"   Gemini:  {'✓ Live Mode' if GEMINI_AVAILABLE else '🧠 Smart Demo Mode'}")
    print(f"   ML:      {'✓ Live Mode' if ml.get('available', False) else '🧠 Smart Demo Mode'}")
    print("="*60)
    print("   API Docs: http://localhost:8000/docs")
    print("   Frontend: http://localhost:5173")
    print("="*60 + "\n")
    
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
