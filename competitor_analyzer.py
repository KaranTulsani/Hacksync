"""
BrandPulse Competitor Insight Dashboard
Analyzes competitor campaigns and provides strategic differentiation insights
"""

import random
from typing import Dict, List, Optional

# Competitor Database - Industry-specific brands
COMPETITOR_DATABASE = {
    "Fitness": [
        {
            "name": "Nike Training Club",
            "industry": "Fitness",
            "campaign_theme": "Just Do It - Your Way",
            "target_emotion": "Empowerment and Achievement",
            "color_palette": ["#000000", "#FFFFFF", "#FF6B35", "#E8E8E8"],
            "content_types": {"Reels": 45, "Stories": 30, "Posts": 15, "Carousels": 10},
            "posting_frequency": "2-3 posts/day",
            "avg_engagement_rate": 4.8,
            "primary_platforms": ["Instagram", "TikTok", "YouTube"],
            "content_strategy": "Athlete testimonials, workout challenges, motivational content",
            "unique_selling_points": ["Celebrity endorsements", "Community challenges", "Premium brand heritage"],
            "weaknesses": ["High price point", "Less personalized", "Corporate feel"]
        },
        {
            "name": "Peloton",
            "industry": "Fitness",
            "campaign_theme": "Together We Go Far",
            "target_emotion": "Community and Belonging",
            "color_palette": ["#000000", "#FF0000", "#FFFFFF", "#1A1A1A"],
            "content_types": {"Video": 50, "Stories": 25, "Posts": 15, "Carousels": 10},
            "posting_frequency": "1-2 posts/day",
            "avg_engagement_rate": 3.9,
            "primary_platforms": ["Instagram", "Facebook", "YouTube"],
            "content_strategy": "Instructor spotlights, member transformations, live class previews",
            "unique_selling_points": ["Live classes", "Celebrity instructors", "Premium equipment"],
            "weaknesses": ["Expensive subscription", "Equipment required", "Limited to home workouts"]
        },
        {
            "name": "MyFitnessPal",
            "industry": "Fitness",
            "campaign_theme": "Track Your Way to Better",
            "target_emotion": "Control and Progress",
            "color_palette": ["#0072CE", "#00C9A7", "#1A1A2E", "#F5F5F5"],
            "content_types": {"Posts": 40, "Carousels": 30, "Stories": 20, "Reels": 10},
            "posting_frequency": "1 post/day",
            "avg_engagement_rate": 2.8,
            "primary_platforms": ["Instagram", "Facebook", "Twitter"],
            "content_strategy": "Nutrition tips, success stories, feature updates",
            "unique_selling_points": ["Free tier available", "Comprehensive tracking", "Large food database"],
            "weaknesses": ["App-focused", "Less motivational", "Ad-heavy free version"]
        }
    ],
    "Fashion": [
        {
            "name": "Myntra",
            "industry": "Fashion",
            "campaign_theme": "Be You, Be Fashion",
            "target_emotion": "Self-Expression and Trendy",
            "color_palette": ["#FF3F6C", "#FFFFFF", "#000000", "#F5F5F5"],
            "content_types": {"Reels": 45, "Stories": 30, "Posts": 15, "Carousels": 10},
            "posting_frequency": "5-6 posts/day",
            "avg_engagement_rate": 3.8,
            "primary_platforms": ["Instagram", "YouTube", "Facebook"],
            "content_strategy": "Influencer collabs, End of Reason Sale hype, celebrity partnerships",
            "unique_selling_points": ["Largest fashion marketplace", "Easy returns", "Deep discounts"],
            "weaknesses": ["Discount-dependent sales", "Quality varies by seller", "Customer service issues"]
        },
        {
            "name": "Nykaa Fashion",
            "industry": "Fashion",
            "campaign_theme": "Fashion That Fits You",
            "target_emotion": "Confidence and Beauty",
            "color_palette": ["#FC2779", "#FFFFFF", "#000000", "#FFE4EC"],
            "content_types": {"Reels": 40, "Stories": 35, "Posts": 15, "Carousels": 10},
            "posting_frequency": "4-5 posts/day",
            "avg_engagement_rate": 4.2,
            "primary_platforms": ["Instagram", "YouTube", "Pinterest"],
            "content_strategy": "Beauty-to-fashion crossover, celeb styles, curated collections",
            "unique_selling_points": ["Beauty brand trust", "Premium curation", "Celebrity lines"],
            "weaknesses": ["Higher prices than Myntra", "Limited range", "Newer player in fashion"]
        },
        {
            "name": "FabIndia",
            "industry": "Fashion",
            "campaign_theme": "Celebrating India",
            "target_emotion": "Heritage and Authenticity",
            "color_palette": ["#8B4513", "#FFFFFF", "#DAA520", "#F5DEB3"],
            "content_types": {"Posts": 40, "Carousels": 35, "Stories": 15, "Reels": 10},
            "posting_frequency": "2-3 posts/day",
            "avg_engagement_rate": 2.5,
            "primary_platforms": ["Instagram", "Facebook", "Pinterest"],
            "content_strategy": "Artisan stories, sustainable fashion, ethnic wear showcases",
            "unique_selling_points": ["Artisan support", "Sustainable practices", "Authentic Indian"],
            "weaknesses": ["Premium pricing", "Limited trendy designs", "Older demographic appeal"]
        },
        {
            "name": "Westside (Tata)",
            "industry": "Fashion",
            "campaign_theme": "Style Within Reach",
            "target_emotion": "Accessibility and Style",
            "color_palette": ["#E91E63", "#FFFFFF", "#212121", "#FFC107"],
            "content_types": {"Posts": 45, "Stories": 30, "Reels": 15, "Carousels": 10},
            "posting_frequency": "2-3 posts/day",
            "avg_engagement_rate": 2.2,
            "primary_platforms": ["Instagram", "Facebook", "Twitter"],
            "content_strategy": "Value fashion, seasonal collections, family shopping",
            "unique_selling_points": ["Tata brand trust", "Pan-India retail", "Family-friendly"],
            "weaknesses": ["Not premium perception", "Limited online presence", "Dated store experience"]
        },
        {
            "name": "Zara India",
            "industry": "Fashion",
            "campaign_theme": "Fast Fashion, Premium Experience",
            "target_emotion": "Aspiration and Global Style",
            "color_palette": ["#000000", "#FFFFFF", "#8B7355", "#E8D5B7"],
            "content_types": {"Posts": 50, "Reels": 25, "Stories": 15, "Carousels": 10},
            "posting_frequency": "2-3 posts/day",
            "avg_engagement_rate": 2.8,
            "primary_platforms": ["Instagram", "Facebook", "Pinterest"],
            "content_strategy": "International runway trends, editorial content, premium positioning",
            "unique_selling_points": ["Global design", "Quick trend adoption", "Premium store experience"],
            "weaknesses": ["Very expensive for India", "Limited metro presence", "Size issues for Indian body types"]
        }
    ],
    "Technology": [
        {
            "name": "Apple",
            "industry": "Technology",
            "campaign_theme": "Think Different",
            "target_emotion": "Innovation and Aspiration",
            "color_palette": ["#000000", "#FFFFFF", "#A3AAAE", "#F5F5F7"],
            "content_types": {"Video": 50, "Posts": 30, "Stories": 15, "Carousels": 5},
            "posting_frequency": "1 post/day",
            "avg_engagement_rate": 1.8,
            "primary_platforms": ["Instagram", "YouTube", "Twitter"],
            "content_strategy": "Product launches, shot on iPhone, minimalist aesthetics",
            "unique_selling_points": ["Premium brand", "Ecosystem integration", "Design excellence"],
            "weaknesses": ["High prices", "Closed ecosystem", "Limited customization"]
        },
        {
            "name": "Samsung",
            "industry": "Technology",
            "campaign_theme": "Do What You Can't",
            "target_emotion": "Possibility and Innovation",
            "color_palette": ["#1428A0", "#000000", "#FFFFFF", "#00D4FF"],
            "content_types": {"Video": 45, "Reels": 25, "Posts": 20, "Stories": 10},
            "posting_frequency": "2-3 posts/day",
            "avg_engagement_rate": 2.1,
            "primary_platforms": ["Instagram", "YouTube", "Facebook"],
            "content_strategy": "Feature showcases, tech comparisons, innovation stories",
            "unique_selling_points": ["Feature-rich", "Multiple price points", "Android flexibility"],
            "weaknesses": ["Brand perception vs Apple", "Software updates", "Bloatware concerns"]
        },
        {
            "name": "Notion",
            "industry": "Technology",
            "campaign_theme": "Your Wiki, Docs & Projects. Together.",
            "target_emotion": "Productivity and Organization",
            "color_palette": ["#000000", "#FFFFFF", "#EB5757", "#F7F6F3"],
            "content_types": {"Carousels": 40, "Posts": 30, "Reels": 20, "Stories": 10},
            "posting_frequency": "1-2 posts/day",
            "avg_engagement_rate": 4.5,
            "primary_platforms": ["Twitter", "Instagram", "LinkedIn"],
            "content_strategy": "Template showcases, productivity tips, user stories",
            "unique_selling_points": ["Flexible workspace", "Community templates", "Free tier"],
            "weaknesses": ["Learning curve", "Performance issues", "Mobile limitations"]
        }
    ],
    "Food & Beverage": [
        {
            "name": "Starbucks India",
            "industry": "Food & Beverage",
            "campaign_theme": "Third Place Experience",
            "target_emotion": "Aspiration and Premium Lifestyle",
            "color_palette": ["#00704A", "#FFFFFF", "#000000", "#D4AF37"],
            "content_types": {"Stories": 40, "Reels": 30, "Posts": 20, "Carousels": 10},
            "posting_frequency": "2-3 posts/day",
            "avg_engagement_rate": 3.5,
            "primary_platforms": ["Instagram", "Facebook", "Twitter"],
            "content_strategy": "Premium lifestyle content, seasonal specials, Tata partnership pride",
            "unique_selling_points": ["Global brand prestige", "Premium positioning", "Tata partnership trust"],
            "weaknesses": ["Very expensive (₹400+ per drink)", "Limited locations", "Not value-for-money for Indians"]
        },
        {
            "name": "Cafe Coffee Day",
            "industry": "Food & Beverage",
            "campaign_theme": "A Lot Can Happen Over Coffee",
            "target_emotion": "Friendship and Nostalgia",
            "color_palette": ["#8B0000", "#FFFFFF", "#FFD700", "#2F2F2F"],
            "content_types": {"Posts": 40, "Stories": 30, "Reels": 20, "Carousels": 10},
            "posting_frequency": "2-3 posts/day",
            "avg_engagement_rate": 2.8,
            "primary_platforms": ["Instagram", "Facebook", "Twitter"],
            "content_strategy": "College memories, friendship moments, affordable indulgence",
            "unique_selling_points": ["Pan-India presence", "Affordable pricing", "Indian brand legacy"],
            "weaknesses": ["Declining quality perception", "Outdated interiors", "Financial troubles legacy"]
        },
        {
            "name": "Blue Tokai Coffee",
            "industry": "Food & Beverage",
            "campaign_theme": "Specialty Coffee, Made in India",
            "target_emotion": "Discovery and Connoisseur Pride",
            "color_palette": ["#1E3A5F", "#FFFFFF", "#C8A97E", "#F5F5F5"],
            "content_types": {"Carousels": 35, "Reels": 30, "Posts": 25, "Stories": 10},
            "posting_frequency": "1-2 posts/day",
            "avg_engagement_rate": 4.2,
            "primary_platforms": ["Instagram", "LinkedIn", "YouTube"],
            "content_strategy": "Coffee education, farm-to-cup stories, brewing tutorials",
            "unique_selling_points": ["Premium Indian specialty coffee", "Direct trade with farmers", "Quality consistency"],
            "weaknesses": ["Premium pricing", "Limited retail presence", "Niche urban appeal only"]
        },
        {
            "name": "Third Wave Coffee",
            "industry": "Food & Beverage",
            "campaign_theme": "Real Coffee, No Shortcuts",
            "target_emotion": "Authenticity and Quality",
            "color_palette": ["#2C3E50", "#FFFFFF", "#E67E22", "#ECF0F1"],
            "content_types": {"Reels": 40, "Stories": 30, "Posts": 20, "Carousels": 10},
            "posting_frequency": "2-3 posts/day",
            "avg_engagement_rate": 3.8,
            "primary_platforms": ["Instagram", "Zomato", "Swiggy"],
            "content_strategy": "Quality-first messaging, cafe ambiance, specialty drinks",
            "unique_selling_points": ["Rapid expansion", "Quality at scale", "Strong delivery game"],
            "weaknesses": ["Inconsistent across outlets", "Competing with Starbucks positioning", "High competition"]
        },
        {
            "name": "Chaayos",
            "industry": "Food & Beverage",
            "campaign_theme": "Meri Wali Chai",
            "target_emotion": "Comfort and Personalization",
            "color_palette": ["#FF6B35", "#FFFFFF", "#2D2D2D", "#FFF5E6"],
            "content_types": {"Reels": 45, "Stories": 30, "Posts": 15, "Carousels": 10},
            "posting_frequency": "3-4 posts/day",
            "avg_engagement_rate": 4.5,
            "primary_platforms": ["Instagram", "Twitter", "Zomato"],
            "content_strategy": "Customization stories, desi comfort food, monsoon/winter campaigns",
            "unique_selling_points": ["Personalized chai experience", "Strong brand personality", "Desi comfort positioning"],
            "weaknesses": ["Limited to North India primarily", "Higher than roadside chai", "Quality variation"]
        }
    ],
    "Education": [
        {
            "name": "BYJU'S",
            "industry": "Education",
            "campaign_theme": "Fall in Love with Learning",
            "target_emotion": "Curiosity and Success",
            "color_palette": ["#8B2FC9", "#FFFFFF", "#FF6B00", "#1A1A1A"],
            "content_types": {"Video": 45, "Reels": 30, "Posts": 15, "Carousels": 10},
            "posting_frequency": "3-4 posts/day",
            "avg_engagement_rate": 3.2,
            "primary_platforms": ["YouTube", "Instagram", "Facebook"],
            "content_strategy": "Interactive learning videos, success stories, exam tips, celebrity teachers",
            "unique_selling_points": ["Disney partnership", "Personalized learning", "Pan-India reach"],
            "weaknesses": ["Expensive subscriptions (₹40K+)", "Aggressive sales tactics", "Recent negative PR"]
        },
        {
            "name": "Unacademy",
            "industry": "Education",
            "campaign_theme": "Let's Crack It",
            "target_emotion": "Determination and Achievement",
            "color_palette": ["#08BD80", "#FFFFFF", "#1A1A1A", "#F5F5F5"],
            "content_types": {"Reels": 40, "Video": 35, "Posts": 15, "Stories": 10},
            "posting_frequency": "4-5 posts/day",
            "avg_engagement_rate": 4.5,
            "primary_platforms": ["YouTube", "Instagram", "Telegram"],
            "content_strategy": "Educator-led content, live sessions, motivational stories, exam strategies",
            "unique_selling_points": ["Star educators", "Live classes", "Freemium model"],
            "weaknesses": ["Inconsistent quality", "Too many educators", "Subscription fatigue"]
        },
        {
            "name": "Physics Wallah",
            "industry": "Education",
            "campaign_theme": "Padhai Asaan Hai",
            "target_emotion": "Accessibility and Hope",
            "color_palette": ["#FF6B35", "#FFFFFF", "#2D3436", "#F8F9FA"],
            "content_types": {"Video": 50, "Reels": 25, "Posts": 15, "Stories": 10},
            "posting_frequency": "3-4 posts/day",
            "avg_engagement_rate": 6.8,
            "primary_platforms": ["YouTube", "Instagram", "Telegram"],
            "content_strategy": "Affordable education, Alakh Pandey personality-driven, student success stories",
            "unique_selling_points": ["Affordable pricing (₹3K)", "Strong community", "Relatable founder"],
            "weaknesses": ["Limited courses beyond science", "Scaling challenges", "Over-reliance on founder"]
        },
        {
            "name": "upGrad",
            "industry": "Education",
            "campaign_theme": "Working Professional's University",
            "target_emotion": "Ambition and Career Growth",
            "color_palette": ["#000000", "#FFFFFF", "#E50914", "#F5F5F5"],
            "content_types": {"Carousels": 35, "Posts": 30, "Video": 25, "Reels": 10},
            "posting_frequency": "2-3 posts/day",
            "avg_engagement_rate": 2.1,
            "primary_platforms": ["LinkedIn", "Instagram", "YouTube"],
            "content_strategy": "Career transformation stories, industry partnerships (IIT, IIIT), placement stats",
            "unique_selling_points": ["University degrees", "Working professional focus", "Career services"],
            "weaknesses": ["Very expensive (₹2-5 Lakh)", "Long duration", "Limited flexibility"]
        },
        {
            "name": "Allen Career Institute",
            "industry": "Education",
            "campaign_theme": "Nurturing Excellence",
            "target_emotion": "Trust and Rigor",
            "color_palette": ["#1E3A8A", "#FFFFFF", "#DC2626", "#F5F5F5"],
            "content_types": {"Posts": 45, "Carousels": 30, "Video": 15, "Stories": 10},
            "posting_frequency": "2-3 posts/day",
            "avg_engagement_rate": 2.8,
            "primary_platforms": ["Instagram", "YouTube", "Facebook"],
            "content_strategy": "Topper interviews, Kota life content, exam preparation tips",
            "unique_selling_points": ["JEE/NEET track record", "Kota legacy", "Offline+Online model"],
            "weaknesses": ["Kota relocation required", "High pressure environment", "Traditional approach"]
        }
    ],
    "Footwear": [
        {
            "name": "Nike India",
            "industry": "Footwear",
            "campaign_theme": "Just Do It - Indian Edition",
            "target_emotion": "Aspiration and Achievement",
            "color_palette": ["#000000", "#FFFFFF", "#FF6B35", "#E8E8E8"],
            "content_types": {"Reels": 45, "Stories": 30, "Posts": 15, "Carousels": 10},
            "posting_frequency": "2-3 posts/day",
            "avg_engagement_rate": 4.2,
            "primary_platforms": ["Instagram", "YouTube", "Facebook"],
            "content_strategy": "Cricket and sports stars endorsements, fitness challenges, premium lifestyle content",
            "unique_selling_points": ["Global brand", "Celebrity endorsements (Virat Kohli)", "Premium positioning"],
            "weaknesses": ["Premium pricing (₹8000+)", "Less accessible to mass market", "Limited tier-2/3 city reach"]
        },
        {
            "name": "Bata India",
            "industry": "Footwear",
            "campaign_theme": "Surprisingly Bata",
            "target_emotion": "Trust and Reliability",
            "color_palette": ["#D32F2F", "#FFFFFF", "#000000", "#F5F5F5"],
            "content_types": {"Posts": 40, "Carousels": 30, "Stories": 20, "Reels": 10},
            "posting_frequency": "1-2 posts/day",
            "avg_engagement_rate": 2.1,
            "primary_platforms": ["Instagram", "Facebook", "Twitter"],
            "content_strategy": "Family-oriented content, durability messaging, pan-India store network",
            "unique_selling_points": ["Pan-India presence", "Affordable pricing", "Trusted legacy brand"],
            "weaknesses": ["Outdated brand perception", "Less trendy image", "Weak youth connect"]
        },
        {
            "name": "Campus Shoes",
            "industry": "Footwear",
            "campaign_theme": "Keep Moving",
            "target_emotion": "Youth Energy and Freedom",
            "color_palette": ["#1E88E5", "#FF5722", "#FFFFFF", "#212121"],
            "content_types": {"Reels": 50, "Stories": 25, "Posts": 15, "Carousels": 10},
            "posting_frequency": "2-3 posts/day",
            "avg_engagement_rate": 3.8,
            "primary_platforms": ["Instagram", "TikTok", "YouTube"],
            "content_strategy": "Youth influencer collabs, college campus activations, trend-driven content",
            "unique_selling_points": ["Affordable trendy designs", "Strong youth connect", "Value for money"],
            "weaknesses": ["Perceived as budget brand", "Quality perception issues", "Limited premium range"]
        },
        {
            "name": "Puma India",
            "industry": "Footwear",
            "campaign_theme": "Forever Faster",
            "target_emotion": "Speed and Style",
            "color_palette": ["#000000", "#FFFFFF", "#E4002B", "#FFD700"],
            "content_types": {"Reels": 40, "Stories": 30, "Posts": 20, "Video": 10},
            "posting_frequency": "2-3 posts/day",
            "avg_engagement_rate": 3.9,
            "primary_platforms": ["Instagram", "YouTube", "Facebook"],
            "content_strategy": "Sports and lifestyle blend, Anushka Sharma campaigns, streetwear focus",
            "unique_selling_points": ["Balance of sport and fashion", "Celebrity endorsements", "Strong retail presence"],
            "weaknesses": ["Caught between sport and fashion", "Less authentic than Nike", "Price-quality debate"]
        },
        {
            "name": "Skechers India",
            "industry": "Footwear",
            "campaign_theme": "Comfort That Performs",
            "target_emotion": "Comfort and Confidence",
            "color_palette": ["#005DAA", "#FFFFFF", "#00A3E0", "#1C1C1C"],
            "content_types": {"Posts": 45, "Carousels": 25, "Stories": 20, "Reels": 10},
            "posting_frequency": "1-2 posts/day",
            "avg_engagement_rate": 2.8,
            "primary_platforms": ["Instagram", "Facebook", "YouTube"],
            "content_strategy": "Comfort technology focus, family-friendly content, walking/lifestyle positioning",
            "unique_selling_points": ["Memory foam comfort", "Wide range for all ages", "Growing retail network"],
            "weaknesses": ["Not seen as sporty", "Less trendy for Gen-Z", "Limited athletic credibility"]
        }
    ],
    "General": [
        {
            "name": "Airbnb",
            "industry": "General",
            "campaign_theme": "Belong Anywhere",
            "target_emotion": "Adventure and Belonging",
            "color_palette": ["#FF5A5F", "#FFFFFF", "#00A699", "#484848"],
            "content_types": {"Posts": 40, "Stories": 30, "Reels": 20, "Carousels": 10},
            "posting_frequency": "2-3 posts/day",
            "avg_engagement_rate": 3.5,
            "primary_platforms": ["Instagram", "Facebook", "Twitter"],
            "content_strategy": "Unique stays, travel inspiration, host stories",
            "unique_selling_points": ["Unique properties", "Local experiences", "Global reach"],
            "weaknesses": ["Regulatory issues", "Quality inconsistency", "Hidden fees"]
        },
        {
            "name": "Tesla",
            "industry": "General",
            "campaign_theme": "Accelerating the World's Transition to Sustainable Energy",
            "target_emotion": "Innovation and Environmental Pride",
            "color_palette": ["#E82127", "#000000", "#FFFFFF", "#393C41"],
            "content_types": {"Video": 45, "Posts": 35, "Reels": 15, "Stories": 5},
            "posting_frequency": "1-2 posts/day",
            "avg_engagement_rate": 2.7,
            "primary_platforms": ["Twitter", "Instagram", "YouTube"],
            "content_strategy": "Product updates, technology showcases, sustainability messaging",
            "unique_selling_points": ["Electric innovation", "Autopilot tech", "Brand loyalty"],
            "weaknesses": ["High prices", "Service issues", "Polarizing CEO"]
        }
    ]
}


def get_competitors_by_industry(industry: str, limit: int = 3) -> List[Dict]:
    """Get competitor profiles for a specific industry"""
    industry_key = industry if industry in COMPETITOR_DATABASE else "General"
    competitors = COMPETITOR_DATABASE.get(industry_key, COMPETITOR_DATABASE["General"])
    return competitors[:limit]


def analyze_competitor(competitor_name: str, user_campaign: Dict) -> Dict:
    """Analyze a specific competitor and generate differentiation insights"""
    
    # Debug logging
    print(f"🔍 Analyzing competitor: {competitor_name}")
    print(f"📊 User campaign keys: {list(user_campaign.keys()) if user_campaign else 'None'}")
    
    # Find competitor in database
    competitor = None
    for industry_comps in COMPETITOR_DATABASE.values():
        for comp in industry_comps:
            if comp["name"].lower() == competitor_name.lower():
                competitor = comp
                break
        if competitor:
            break
    
    if not competitor:
        print(f"❌ Competitor '{competitor_name}' not found")
        return {"error": "Competitor not found"}
    
    print(f"✓ Found competitor: {competitor['name']}")
    
    # Generate differentiation strategy
    differentiation = generate_differentiation_strategy(competitor, user_campaign)
    
    return {
        "competitor": competitor,
        "differentiation_strategy": differentiation,
        "comparison_metrics": generate_comparison_metrics(competitor, user_campaign)
    }


def generate_differentiation_strategy(competitor: Dict, user_campaign: Dict) -> Dict:
    """Generate strategic differentiation recommendations"""
    
    strategies = []
    
    # Analyze weaknesses to exploit
    for weakness in competitor["weaknesses"]:
        strategies.append({
            "type": "Exploit Weakness",
            "competitor_weakness": weakness,
            "your_opportunity": generate_opportunity_from_weakness(weakness, user_campaign),
            "action": generate_action_item(weakness)
        })
    
    # Content strategy differentiation
    user_content_type = user_campaign.get("content_type", "Reel")
    comp_top_content = max(competitor["content_types"], key=competitor["content_types"].get)
    
    if user_content_type != comp_top_content:
        strategies.append({
            "type": "Content Format Edge",
            "insight": f"{competitor['name']} focuses on {comp_top_content}s ({competitor['content_types'][comp_top_content]}% of content)",
            "your_advantage": f"Your {user_content_type} strategy fills a gap in the market",
            "action": f"Double down on {user_content_type} content to own this format in your niche"
        })
    
    # Emotional positioning differentiation
    user_emotion = user_campaign.get("strategy", {}).get("target_emotion", "")
    if user_emotion and user_emotion != competitor["target_emotion"]:
        strategies.append({
            "type": "Emotional Differentiation",
            "insight": f"{competitor['name']} targets '{competitor['target_emotion']}'",
            "your_advantage": f"Your '{user_emotion}' positioning creates a distinct emotional space",
            "action": "Emphasize this emotional difference in all messaging to avoid direct comparison"
        })
    
    # Platform strategy
    user_platform = user_campaign.get("platform", "Instagram")
    if user_platform not in competitor["primary_platforms"][:1]:
        strategies.append({
            "type": "Platform Opportunity",
            "insight": f"{competitor['name']} is strongest on {competitor['primary_platforms'][0]}",
            "your_advantage": f"Your {user_platform} focus lets you dominate where they're weaker",
            "action": f"Invest heavily in {user_platform}-native content formats and community building"
        })
    
    return {
        "summary": f"You have {len(strategies)} clear differentiation opportunities vs {competitor['name']}",
        "strategies": strategies[:4],  # Top 4 strategies
        "positioning_statement": generate_positioning_statement(competitor, user_campaign)
    }


def generate_opportunity_from_weakness(weakness: str, user_campaign: Dict) -> str:
    """Convert competitor weakness into user opportunity"""
    
    opportunity_map = {
        "high price": "Position as the affordable alternative without compromising quality",
        "expensive": "Emphasize value-for-money and accessible pricing",
        "premium pricing": "Capture price-sensitive customers with competitive pricing",
        "limited": "Highlight your broader range and flexibility",
        "less personalized": "Showcase personalization and customization features",
        "corporate feel": "Emphasize authentic, human-centered brand personality",
        "online-only": "If you have physical presence, leverage it; if not, make online experience superior",
        "learning curve": "Simplify onboarding and emphasize ease of use",
        "quality inconsistency": "Guarantee consistent quality and customer satisfaction",
        "sustainability": "Lead with eco-friendly practices and transparency"
    }
    
    for key, opportunity in opportunity_map.items():
        if key in weakness.lower():
            return opportunity
    
    return f"Address the gap left by: {weakness}"


def generate_action_item(weakness: str) -> str:
    """Generate specific action item based on competitor weakness"""
    
    action_map = {
        "price": "Create comparison content showing value vs. competitors",
        "expensive": "Launch introductory pricing or bundle offers",
        "limited": "Showcase your full range in carousel posts",
        "personalized": "Feature customer customization stories and testimonials",
        "corporate": "Use UGC and behind-the-scenes content to humanize brand",
        "online": "Highlight convenience, fast shipping, or virtual try-on features",
        "learning": "Create quick-start guides and tutorial content",
        "quality": "Emphasize quality control and satisfaction guarantees",
        "sustainability": "Share supply chain transparency and eco-initiatives"
    }
    
    for key, action in action_map.items():
        if key in weakness.lower():
            return action
    
    return "Create content that directly addresses this competitor gap"


def generate_positioning_statement(competitor: Dict, user_campaign: Dict) -> str:
    """Generate a clear positioning statement vs competitor"""
    
    product = user_campaign.get("product", "our product")
    audience = user_campaign.get("audience", "customers")
    
    statements = [
        f"While {competitor['name']} focuses on {competitor['target_emotion'].lower()}, {product} delivers {user_campaign.get('strategy', {}).get('target_emotion', 'exceptional value').lower()} for {audience}.",
        f"Unlike {competitor['name']}'s {competitor['content_strategy'].lower()}, {product} stands out through authentic, personalized engagement.",
        f"{product} is the smart alternative to {competitor['name']}—same quality, better value, more personal."
    ]
    
    return random.choice(statements)


def generate_comparison_metrics(competitor: Dict, user_campaign: Dict) -> Dict:
    """Generate side-by-side comparison metrics"""
    
    user_engagement = float(user_campaign.get("performance_prediction", {}).get("engagement_rate", "3.5%").replace("%", ""))
    
    return {
        "engagement_rate": {
            "competitor": f"{competitor['avg_engagement_rate']}%",
            "yours": f"{user_engagement}%",
            "advantage": "higher" if user_engagement > competitor['avg_engagement_rate'] else "room to grow"
        },
        "posting_frequency": {
            "competitor": competitor["posting_frequency"],
            "yours": "Optimized based on your strategy",
            "recommendation": "Match or exceed for visibility"
        },
        "content_diversity": {
            "competitor": f"{len(competitor['content_types'])} content types",
            "yours": "Multi-format strategy",
            "advantage": "More touchpoints with audience"
        },
        "platform_presence": {
            "competitor": f"{len(competitor['primary_platforms'])} primary platforms",
            "yours": f"Focused on {user_campaign.get('platform', 'Instagram')}",
            "recommendation": "Dominate one platform before expanding"
        }
    }


def get_industry_overview(industry: str) -> Dict:
    """Get competitive landscape overview for an industry"""
    
    competitors = get_competitors_by_industry(industry)
    
    avg_engagement = sum(c["avg_engagement_rate"] for c in competitors) / len(competitors)
    
    # Find most common content type
    all_content_types = {}
    for comp in competitors:
        for content_type, percentage in comp["content_types"].items():
            all_content_types[content_type] = all_content_types.get(content_type, 0) + percentage
    
    dominant_content = max(all_content_types, key=all_content_types.get)
    
    return {
        "industry": industry,
        "competitor_count": len(competitors),
        "avg_engagement_rate": round(avg_engagement, 2),
        "dominant_content_type": dominant_content,
        "key_players": [c["name"] for c in competitors],
        "market_insights": generate_market_insights(industry, competitors)
    }


def generate_market_insights(industry: str, competitors: List[Dict]) -> List[str]:
    """Generate market-level insights"""
    
    insights = []
    
    # Engagement insight
    avg_engagement = sum(c["avg_engagement_rate"] for c in competitors) / len(competitors)
    insights.append(f"Industry average engagement: {avg_engagement:.1f}% - aim for 20% above this to stand out")
    
    # Content type insight
    all_content_types = {}
    for comp in competitors:
        for content_type, percentage in comp["content_types"].items():
            all_content_types[content_type] = all_content_types.get(content_type, 0) + percentage
    
    dominant = max(all_content_types, key=all_content_types.get)
    insights.append(f"{dominant}s dominate {industry} marketing - consider this format or differentiate with alternatives")
    
    # Platform insight
    all_platforms = []
    for comp in competitors:
        all_platforms.extend(comp["primary_platforms"])
    
    most_common_platform = max(set(all_platforms), key=all_platforms.count)
    insights.append(f"{most_common_platform} is the primary battleground - ensure strong presence here")
    
    # Emotional positioning
    emotions = [c["target_emotion"] for c in competitors]
    insights.append(f"Competitors target: {', '.join(set(emotions))} - find your unique emotional angle")
    
    return insights
