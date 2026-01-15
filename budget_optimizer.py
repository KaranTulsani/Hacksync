"""
BrandPulse Budget Optimizer
Intelligent budget allocation and ROI projection for Indian market
"""

from typing import Dict, List, Optional
import math

# Industry-specific budget allocation templates (Indian market optimized)
BUDGET_ALLOCATION_TEMPLATES = {
    "Footwear": {
        "content_creation": {"percentage": 25, "label": "Content Creation", "description": "Product shoots, lifestyle videos, UGC"},
        "influencer_partnerships": {"percentage": 35, "label": "Influencer Partnerships", "description": "Sportspersons, fitness influencers, lifestyle creators"},
        "paid_ads": {"percentage": 30, "label": "Paid Advertisements", "description": "Instagram ads, YouTube pre-rolls, Facebook campaigns"},
        "contingency": {"percentage": 5, "label": "Contingency Fund", "description": "Emergency spending, trend-jacking opportunities"},
        "analytics_tools": {"percentage": 5, "label": "Analytics & Tools", "description": "Social listening, performance tracking"}
    },
    "Fashion": {
        "content_creation": {"percentage": 30, "label": "Content Creation", "description": "Lookbook shoots, fashion videos, styling content"},
        "influencer_partnerships": {"percentage": 35, "label": "Influencer Partnerships", "description": "Fashion bloggers, celebrity stylists, micro-influencers"},
        "paid_ads": {"percentage": 25, "label": "Paid Advertisements", "description": "Instagram Shopping, Pinterest ads, display campaigns"},
        "contingency": {"percentage": 5, "label": "Contingency Fund", "description": "Flash sale promotions, trending moments"},
        "analytics_tools": {"percentage": 5, "label": "Analytics & Tools", "description": "E-commerce tracking, attribution tools"}
    },
    "Technology": {
        "content_creation": {"percentage": 20, "label": "Content Creation", "description": "Product demos, explainer videos, feature highlights"},
        "influencer_partnerships": {"percentage": 25, "label": "Influencer Partnerships", "description": "Tech reviewers, YouTube creators, LinkedIn thought leaders"},
        "paid_ads": {"percentage": 40, "label": "Paid Advertisements", "description": "Google Ads, YouTube TrueView, LinkedIn sponsored"},
        "contingency": {"percentage": 5, "label": "Contingency Fund", "description": "Product launch spikes, competitor response"},
        "analytics_tools": {"percentage": 10, "label": "Analytics & Tools", "description": "Attribution, A/B testing, CRM integration"}
    },
    "Food & Beverage": {
        "content_creation": {"percentage": 30, "label": "Content Creation", "description": "Food photography, recipe videos, ambiance shots"},
        "influencer_partnerships": {"percentage": 30, "label": "Influencer Partnerships", "description": "Food bloggers, lifestyle influencers, local celebrities"},
        "paid_ads": {"percentage": 25, "label": "Paid Advertisements", "description": "Zomato/Swiggy ads, Instagram stories, location targeting"},
        "contingency": {"percentage": 10, "label": "Contingency Fund", "description": "Seasonal campaigns, festival offers"},
        "analytics_tools": {"percentage": 5, "label": "Analytics & Tools", "description": "Order tracking, loyalty analytics"}
    },
    "Education": {
        "content_creation": {"percentage": 25, "label": "Content Creation", "description": "Demo classes, success stories, educational content"},
        "influencer_partnerships": {"percentage": 20, "label": "Influencer Partnerships", "description": "Educators, student ambassadors, parent influencers"},
        "paid_ads": {"percentage": 40, "label": "Paid Advertisements", "description": "YouTube ads, Google search, Facebook lead gen"},
        "contingency": {"percentage": 5, "label": "Contingency Fund", "description": "Exam season spikes, result campaigns"},
        "analytics_tools": {"percentage": 10, "label": "Analytics & Tools", "description": "Lead scoring, conversion tracking"}
    },
    "Fitness": {
        "content_creation": {"percentage": 30, "label": "Content Creation", "description": "Workout videos, transformation stories, tips content"},
        "influencer_partnerships": {"percentage": 35, "label": "Influencer Partnerships", "description": "Fitness trainers, athletes, wellness influencers"},
        "paid_ads": {"percentage": 25, "label": "Paid Advertisements", "description": "Instagram Reels ads, YouTube fitness channels"},
        "contingency": {"percentage": 5, "label": "Contingency Fund", "description": "New Year campaigns, summer fitness pushes"},
        "analytics_tools": {"percentage": 5, "label": "Analytics & Tools", "description": "Engagement tracking, community analytics"}
    },
    "General": {
        "content_creation": {"percentage": 25, "label": "Content Creation", "description": "Brand videos, social media content, graphics"},
        "influencer_partnerships": {"percentage": 30, "label": "Influencer Partnerships", "description": "Relevant niche influencers, micro-creators"},
        "paid_ads": {"percentage": 30, "label": "Paid Advertisements", "description": "Multi-platform campaigns, retargeting"},
        "contingency": {"percentage": 10, "label": "Contingency Fund", "description": "Opportunity spending, crisis management"},
        "analytics_tools": {"percentage": 5, "label": "Analytics & Tools", "description": "Performance dashboards, reporting"}
    }
}

# Platform-specific adjustments
PLATFORM_ADJUSTMENTS = {
    "Instagram": {"influencer_boost": 1.1, "paid_ads_boost": 1.0, "content_boost": 1.1},
    "YouTube": {"influencer_boost": 1.2, "paid_ads_boost": 1.1, "content_boost": 1.2},
    "Facebook": {"influencer_boost": 0.9, "paid_ads_boost": 1.2, "content_boost": 0.9},
    "LinkedIn": {"influencer_boost": 0.8, "paid_ads_boost": 1.3, "content_boost": 0.9},
    "TikTok": {"influencer_boost": 1.3, "paid_ads_boost": 0.9, "content_boost": 1.2}
}

# ROI benchmarks by industry (Indian market)
ROI_BENCHMARKS = {
    "Footwear": {"low": 2.5, "average": 3.5, "high": 5.0},
    "Fashion": {"low": 2.0, "average": 3.0, "high": 4.5},
    "Technology": {"low": 3.0, "average": 4.0, "high": 6.0},
    "Food & Beverage": {"low": 2.8, "average": 3.8, "high": 5.5},
    "Education": {"low": 4.0, "average": 5.5, "high": 8.0},
    "Fitness": {"low": 2.5, "average": 3.5, "high": 5.0},
    "General": {"low": 2.0, "average": 3.0, "high": 4.0}
}


def parse_budget(budget_str: str) -> float:
    """Parse budget string to float, handling various formats"""
    if not budget_str:
        return 0
    
    # Remove currency symbols and whitespace
    cleaned = budget_str.replace('₹', '').replace('$', '').replace(',', '').replace(' ', '').strip()
    
    # Handle K/L/Cr suffixes (Indian notation)
    multiplier = 1
    if cleaned.lower().endswith('k'):
        multiplier = 1000
        cleaned = cleaned[:-1]
    elif cleaned.lower().endswith('l') or cleaned.lower().endswith('lakh'):
        multiplier = 100000
        cleaned = cleaned.rstrip('lakhL')
    elif cleaned.lower().endswith('cr') or cleaned.lower().endswith('crore'):
        multiplier = 10000000
        cleaned = cleaned.rstrip('croreCR')
    
    try:
        return float(cleaned) * multiplier
    except ValueError:
        return 0


def format_indian_currency(amount: float) -> str:
    """Format amount in Indian Rupee notation with lakhs/crores"""
    if amount >= 10000000:  # 1 Crore
        return f"₹{amount/10000000:.2f} Cr"
    elif amount >= 100000:  # 1 Lakh
        return f"₹{amount/100000:.2f} L"
    elif amount >= 1000:
        return f"₹{amount/1000:.1f}K"
    else:
        return f"₹{amount:,.0f}"


def optimize_budget(
    budget: str,
    industry: str = "General",
    platform: str = "Instagram",
    goal: str = "awareness",
    campaign_duration: str = "3 months",
    has_influencer: bool = True
) -> Dict:
    """
    Generate optimized budget allocation with ROI projection
    
    Args:
        budget: Budget amount (string, e.g., "₹50000", "5L", "2 Lakh")
        industry: Industry category
        platform: Primary platform
        goal: Campaign goal (awareness, engagement, conversions)
        campaign_duration: Duration of campaign
        has_influencer: Whether to include influencer budget
    
    Returns:
        Dictionary with budget breakdown and ROI projections
    """
    
    # Parse budget
    total_budget = parse_budget(budget)
    if total_budget <= 0:
        total_budget = 50000  # Default to ₹50,000
    
    # Get industry template
    template = BUDGET_ALLOCATION_TEMPLATES.get(industry, BUDGET_ALLOCATION_TEMPLATES["General"])
    
    # Get platform adjustments
    platform_adj = PLATFORM_ADJUSTMENTS.get(platform, {"influencer_boost": 1.0, "paid_ads_boost": 1.0, "content_boost": 1.0})
    
    # Goal-based adjustments
    goal_adjustments = {
        "awareness": {"content_creation": 1.1, "influencer_partnerships": 1.1, "paid_ads": 0.9},
        "engagement": {"content_creation": 1.2, "influencer_partnerships": 1.0, "paid_ads": 0.8},
        "conversions": {"content_creation": 0.9, "influencer_partnerships": 0.8, "paid_ads": 1.3},
        "leads": {"content_creation": 0.9, "influencer_partnerships": 0.9, "paid_ads": 1.2}
    }
    goal_adj = goal_adjustments.get(goal.lower(), goal_adjustments["awareness"])
    
    # Calculate adjusted allocations
    allocations = []
    total_adjusted = 0
    
    for key, config in template.items():
        base_pct = config["percentage"]
        
        # Apply adjustments
        if key == "influencer_partnerships":
            adjusted_pct = base_pct * platform_adj["influencer_boost"] * goal_adj.get("influencer_partnerships", 1.0)
            if not has_influencer:
                adjusted_pct = 0
        elif key == "paid_ads":
            adjusted_pct = base_pct * platform_adj["paid_ads_boost"] * goal_adj.get("paid_ads", 1.0)
        elif key == "content_creation":
            adjusted_pct = base_pct * platform_adj["content_boost"] * goal_adj.get("content_creation", 1.0)
        else:
            adjusted_pct = base_pct
        
        total_adjusted += adjusted_pct
        allocations.append({
            "key": key,
            "label": config["label"],
            "description": config["description"],
            "raw_percentage": adjusted_pct
        })
    
    # Normalize to 100%
    for item in allocations:
        item["percentage"] = round((item["raw_percentage"] / total_adjusted) * 100)
        item["amount"] = round((item["percentage"] / 100) * total_budget)
        item["formatted_amount"] = format_indian_currency(item["amount"])
        del item["raw_percentage"]
    
    # Ensure percentages sum to 100
    total_pct = sum(item["percentage"] for item in allocations)
    if total_pct != 100:
        diff = 100 - total_pct
        allocations[0]["percentage"] += diff  # Adjust first item
        allocations[0]["amount"] = round((allocations[0]["percentage"] / 100) * total_budget)
        allocations[0]["formatted_amount"] = format_indian_currency(allocations[0]["amount"])
    
    # Calculate ROI projection
    roi_data = calculate_roi_projection(industry, platform, goal, total_budget, campaign_duration)
    
    # Generate recommendations
    recommendations = generate_budget_recommendations(industry, platform, total_budget, allocations)
    
    return {
        "total_budget": total_budget,
        "formatted_total": format_indian_currency(total_budget),
        "allocations": allocations,
        "roi_projection": roi_data,
        "recommendations": recommendations,
        "industry": industry,
        "platform": platform
    }


def calculate_roi_projection(
    industry: str,
    platform: str,
    goal: str,
    budget: float,
    duration: str
) -> Dict:
    """Calculate ROI projection based on industry benchmarks"""
    
    benchmarks = ROI_BENCHMARKS.get(industry, ROI_BENCHMARKS["General"])
    
    # Platform multipliers
    platform_roi = {
        "Instagram": 1.0,
        "YouTube": 1.1,
        "Facebook": 0.95,
        "LinkedIn": 1.15,
        "TikTok": 1.05
    }
    
    # Goal multipliers
    goal_roi = {
        "awareness": 0.9,
        "engagement": 1.0,
        "conversions": 1.2,
        "leads": 1.15
    }
    
    platform_mult = platform_roi.get(platform, 1.0)
    goal_mult = goal_roi.get(goal.lower(), 1.0)
    
    # Calculate expected ROI
    base_roi = benchmarks["average"]
    projected_roi = round(base_roi * platform_mult * goal_mult, 1)
    
    # Calculate projected return
    projected_return = budget * projected_roi
    
    # Confidence based on budget size
    if budget >= 500000:
        confidence = "High"
        confidence_percentage = 85
    elif budget >= 100000:
        confidence = "Medium"
        confidence_percentage = 70
    else:
        confidence = "Moderate"
        confidence_percentage = 55
    
    return {
        "expected_roi": f"{projected_roi}x",
        "roi_value": projected_roi,
        "projected_return": format_indian_currency(projected_return),
        "projected_return_raw": projected_return,
        "industry_low": f"{benchmarks['low']}x",
        "industry_average": f"{benchmarks['average']}x",
        "industry_high": f"{benchmarks['high']}x",
        "confidence": confidence,
        "confidence_percentage": confidence_percentage,
        "explanation": f"Based on {industry} industry benchmarks for {platform}, with a {goal} campaign goal."
    }


def generate_budget_recommendations(
    industry: str,
    platform: str,
    budget: float,
    allocations: List[Dict]
) -> List[str]:
    """Generate smart budget recommendations"""
    
    recommendations = []
    
    # Budget size recommendations
    if budget < 25000:
        recommendations.append("💡 Consider focusing on organic content and micro-influencers for maximum impact with limited budget")
    elif budget < 100000:
        recommendations.append("💡 Split test between 2-3 influencer partnerships to identify best performers")
    else:
        recommendations.append("💡 Your budget allows for a multi-channel approach - consider diversifying across platforms")
    
    # Platform-specific recommendations
    platform_tips = {
        "Instagram": "📸 Prioritize Reels content for 2x organic reach boost",
        "YouTube": "🎬 Invest in quality thumbnail design - it increases CTR by 30%",
        "Facebook": "👥 Use Lookalike Audiences to maximize ad spend efficiency",
        "LinkedIn": "💼 Thought leadership content performs 3x better than promotional",
        "TikTok": "🎵 Partner with trending creators for viral potential"
    }
    if platform in platform_tips:
        recommendations.append(platform_tips[platform])
    
    # Industry-specific tips
    industry_tips = {
        "Footwear": "👟 User-generated try-on content drives 40% higher conversions",
        "Fashion": "👗 Consider seasonal collection drops for engagement spikes",
        "Technology": "💻 Demo videos and comparisons generate highest lead quality",
        "Food & Beverage": "🍕 Partner with food delivery apps for integrated campaigns",
        "Education": "📚 Parent testimonials convert 60% better than student content",
        "Fitness": "💪 Before/after transformation content has highest share rate"
    }
    if industry in industry_tips:
        recommendations.append(industry_tips[industry])
    
    # Always add ROI tip
    recommendations.append("📊 Track UTM parameters on all links to measure true ROI")
    
    return recommendations[:4]  # Return top 4 recommendations
