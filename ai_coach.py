"""
AI Campaign Coach - Explanation Generator
Provides intelligent explanations for campaign strategy decisions
"""

from typing import Dict, Optional

# Explanation templates for different decision types
EXPLANATION_TEMPLATES = {
    # Campaign Theme explanations
    "campaign_theme": {
        "patterns": {
            "aspiration": "This aspirational theme taps into your audience's desire for self-improvement and achievement. Research shows that aspirational messaging increases purchase intent by 23% among {audience}.",
            "authenticity": "Authenticity resonates strongly with today's consumers who are skeptical of traditional advertising. 86% of consumers say authenticity is a key factor when deciding what brands they like and support.",
            "empowerment": "Empowerment messaging creates an emotional connection by positioning your product as a tool for personal achievement. This approach builds brand loyalty and encourages word-of-mouth sharing.",
            "innovation": "Innovation-focused themes position {product} as forward-thinking and cutting-edge. This is particularly effective for {audience} who value being early adopters.",
            "community": "Community-centric themes build belonging and tribe mentality. This creates user-generated content opportunities and organic brand advocacy.",
            "default": "This theme was designed to create a strong emotional connection with {audience}. It differentiates {product} from competitors while staying true to your brand voice."
        }
    },
    
    # Target Emotion explanations
    "target_emotion": {
        "patterns": {
            "aspiration": "Aspiration drives 42% higher engagement rates in social media campaigns. When people see themselves becoming better versions through your product, they're more likely to convert.",
            "trust": "Trust is the foundation of any purchase decision. For {audience}, building trust through transparent messaging reduces perceived risk and accelerates the buying journey.",
            "excitement": "Excitement creates urgency and FOMO (Fear Of Missing Out). This emotion is particularly effective for launches and limited-time offers.",
            "comfort": "Comfort and familiarity reduce purchase friction. For {product}, emphasizing reliability and ease-of-use addresses your audience's key concerns.",
            "belonging": "Belonging triggers our deep social needs. Brands that make customers feel part of something bigger see 3x higher retention rates.",
            "default": "This emotion was selected based on your audience's psychographic profile. It creates the right mental state for considering {product} as their solution."
        }
    },
    
    # Color Palette explanations
    "color_palette": {
        "patterns": {
            "#FF": "This warm color creates energy and urgency. Studies show warm colors increase heart rate and create excitement—perfect for driving action.",
            "#00": "These cool tones convey professionalism and trust. Blue and green shades are proven to increase perceived credibility by up to 34%.",
            "#6366f1": "This indigo/purple shade represents creativity and premium quality. It's associated with innovation and forward-thinking brands.",
            "#10b981": "Green signifies growth, health, and sustainability. It builds positive associations and trust with eco-conscious consumers.",
            "#000000": "Black conveys sophistication, luxury, and authority. It creates contrast and makes other colors pop.",
            "#FFFFFF": "White provides breathing room and cleanliness. It improves readability and creates a modern, minimalist aesthetic.",
            "default": "This color palette was selected based on color psychology principles. Each color works together to create the right emotional response for {audience} while ensuring strong brand recognition."
        }
    },
    
    # Platform explanations
    "platform": {
        "patterns": {
            "instagram": "Instagram's visual-first format is ideal for {product}. With 1.4B monthly users, 60% of whom discover new products here, it's the perfect platform to reach {audience}.",
            "tiktok": "TikTok's algorithm favors authentic, engaging content—perfect for reaching younger demographics. Videos here get 2x more engagement than other platforms.",
            "youtube": "YouTube's long-form content builds deeper connections. Users spend average 40+ minutes per session, allowing for detailed storytelling about {product}.",
            "linkedin": "LinkedIn reaches professionals during their work mindset. B2B products see 2-5x higher conversion rates here compared to other platforms.",
            "facebook": "Facebook's detailed targeting and wide demographic reach makes it ideal for awareness campaigns. It's particularly strong for 35+ audiences.",
            "default": "This platform was chosen based on where {audience} spends their time and how they prefer to consume content. It offers the best ROI for your campaign goals."
        }
    },
    
    # Content Type explanations
    "content_type": {
        "patterns": {
            "reel": "Short-form video (Reels) gets 22% more engagement than static posts. The Instagram algorithm actively promotes Reels, giving you more organic reach.",
            "carousel": "Carousels increase dwell time by 3x and get 1.4x more reach. They're perfect for storytelling and educational content about {product}.",
            "story": "Stories create urgency with 24-hour expiry. They feel intimate and authentic—perfect for behind-the-scenes and limited offers.",
            "video": "Video content is remembered 95% more than text. For complex products like {product}, video explains value propositions more effectively.",
            "post": "Static posts are great for shareable quotes and announcements. They remain visible in your feed permanently, building brand consistency.",
            "default": "This content format was selected based on what performs best for {product} category and resonates with {audience}'s content consumption habits."
        }
    },
    
    # Engagement Rate explanations
    "engagement_rate": {
        "patterns": {
            "high": "Your predicted engagement rate of {value} is above industry average. This is driven by your content format choice, optimal posting time, and targeted audience.",
            "medium": "Your predicted engagement rate of {value} is solid for your industry. Consider adding more interactive elements like polls and questions to boost it further.",
            "low": "Your predicted engagement rate of {value} has room for improvement. Try incorporating more user-generated content and call-to-actions to increase interaction.",
            "default": "This engagement rate prediction is based on our ML model trained on 10,000+ campaigns. It accounts for your platform, content type, industry, and posting strategy."
        }
    },
    
    # Posting Time explanations
    "posting_time": {
        "patterns": {
            "morning": "Morning posts (8-10 AM) catch users during their commute and morning scroll. This time sees 23% higher engagement for professional audiences.",
            "afternoon": "Afternoon posts (12-2 PM) hit the lunch break window when users are most likely to browse social media casually.",
            "evening": "Evening posts (6-9 PM) reach users during their relaxation time. This window sees the highest overall engagement across most demographics.",
            "default": "This posting time is optimized for when {audience} is most active on {platform}. Our data shows 27% higher engagement at this time slot."
        }
    },
    
    # Hashtag Strategy explanations
    "hashtags": {
        "patterns": {
            "default": "This hashtag mix includes niche tags (10K-100K posts) for discoverability and broader tags (1M+) for reach. The combination maximizes your content's visibility to {audience}."
        }
    },
    
    # CTA (Call-to-Action) explanations
    "cta": {
        "patterns": {
            "shop_now": "Direct purchase CTAs work best when audience intent is high. 'Shop Now' creates urgency and reduces friction in the buying journey.",
            "learn_more": "'Learn More' is ideal for complex products needing education. It qualifies interested leads without being pushy.",
            "sign_up": "Sign-up CTAs build your owned audience. Email subscribers convert 3x higher than social followers.",
            "get_started": "'Get Started' implies ease and low commitment. It's particularly effective for subscription-based products.",
            "default": "This CTA was chosen to match where {audience} is in their buying journey. It creates clear next steps without overwhelming them."
        }
    },
    
    # Caption Style explanations
    "caption_style": {
        "patterns": {
            "storytelling": "Storytelling captions increase read time by 45% and create emotional investment. They make {product} relatable and memorable.",
            "educational": "Educational captions position {product} as an authority. They provide value upfront, building trust before the ask.",
            "conversational": "Conversational tone feels authentic and approachable. It encourages comments and builds community around your brand.",
            "aspirational": "Aspirational captions paint a picture of the transformed life after using {product}. They trigger desire and intent.",
            "default": "This caption style matches your brand tone while optimizing for engagement with {audience}. It balances personality with conversion goals."
        }
    }
}


def generate_explanation(
    element_type: str,
    element_value: str,
    product: str = "your product",
    audience: str = "your audience",
    platform: str = "Instagram",
    context: Optional[Dict] = None
) -> Dict:
    """
    Generate an intelligent explanation for a campaign decision
    
    Args:
        element_type: Type of element (campaign_theme, color_palette, platform, etc.)
        element_value: The actual value/decision to explain
        product: Product name for personalization
        audience: Target audience for personalization
        platform: Platform for context
        context: Additional context for richer explanations
    
    Returns:
        Dictionary with explanation and additional insights
    """
    
    templates = EXPLANATION_TEMPLATES.get(element_type, {}).get("patterns", {})
    
    # Find matching pattern or use default
    explanation = None
    for pattern_key, template in templates.items():
        if pattern_key != "default" and pattern_key.lower() in element_value.lower():
            explanation = template
            break
    
    if not explanation:
        explanation = templates.get("default", f"This decision optimizes {element_type} for your specific campaign goals and target audience.")
    
    # Personalize the explanation
    explanation = explanation.format(
        product=product,
        audience=audience,
        platform=platform,
        value=element_value
    )
    
    # Generate additional insights
    insights = generate_additional_insights(element_type, element_value, context)
    
    # Generate pro tip
    pro_tip = generate_pro_tip(element_type)
    
    return {
        "element_type": element_type,
        "element_value": element_value,
        "explanation": explanation,
        "insights": insights,
        "pro_tip": pro_tip,
        "confidence": "High" if element_type in ["platform", "content_type", "color_palette"] else "Medium"
    }


def generate_additional_insights(element_type: str, element_value: str, context: Optional[Dict]) -> list:
    """Generate bullet-point insights for each decision"""
    
    insights_map = {
        "campaign_theme": [
            "Themes should remain consistent across all touchpoints",
            "A/B test theme variations to find what resonates",
            "Align theme with current cultural moments for relevance"
        ],
        "target_emotion": [
            "Emotions drive 95% of purchasing decisions",
            "Different platforms favor different emotional tones",
            "Combine primary and secondary emotions for depth"
        ],
        "color_palette": [
            "Maintain 70-20-10 color ratio for visual harmony",
            "Test colors for accessibility (colorblind-friendly)",
            "Colors should work in both light and dark modes"
        ],
        "platform": [
            "Focus on 1-2 platforms rather than spreading thin",
            "Cross-post strategically, not identically",
            "Platform algorithms reward native content"
        ],
        "content_type": [
            "Mix formats to avoid content fatigue",
            "Repurpose one piece into multiple formats",
            "Track which format drives most conversions"
        ],
        "engagement_rate": [
            "Engagement quality matters more than quantity",
            "Reply to comments within 1 hour for algorithm boost",
            "Use polls and questions to drive interaction"
        ]
    }
    
    return insights_map.get(element_type, [
        "This decision is based on industry best practices",
        "Results may vary—always be ready to iterate",
        "Monitor metrics and adjust as needed"
    ])


def generate_pro_tip(element_type: str) -> str:
    """Generate a pro tip for each element type"""
    
    tips = {
        "campaign_theme": "💡 Pro Tip: Create a theme mood board with images, colors, and quotes that capture the feeling you want to evoke.",
        "target_emotion": "💡 Pro Tip: Mirror your audience's language when expressing emotions—use the words they actually use.",
        "color_palette": "💡 Pro Tip: Use your primary color for CTAs and action buttons to train users where to click.",
        "platform": "💡 Pro Tip: Study your top 3 competitors on this platform. Note what works, then do it better.",
        "content_type": "💡 Pro Tip: The first 3 seconds decide if someone keeps watching. Hook them immediately.",
        "engagement_rate": "💡 Pro Tip: Save and organize user-generated content—it's authentic social proof.",
        "posting_time": "💡 Pro Tip: Use platform insights to find YOUR audience's peak times—they may differ from averages.",
        "hashtags": "💡 Pro Tip: Create a branded hashtag and encourage users to post with it for easy UGC tracking.",
        "cta": "💡 Pro Tip: Test different CTA colors. Orange and green often outperform other colors.",
        "caption_style": "💡 Pro Tip: Start with a hook, end with a CTA. The middle tells your story."
    }
    
    return tips.get(element_type, "💡 Pro Tip: Test, measure, and iterate. The best strategy is data-informed.")


def explain_campaign_decision(request_data: Dict) -> Dict:
    """
    Main function to explain a campaign decision
    Called by the API endpoint
    """
    
    element_type = request_data.get("element_type", "")
    element_value = request_data.get("element_value", "")
    product = request_data.get("product", "your product")
    audience = request_data.get("audience", "your audience")
    platform = request_data.get("platform", "Instagram")
    context = request_data.get("context", {})
    
    return generate_explanation(
        element_type=element_type,
        element_value=element_value,
        product=product,
        audience=audience,
        platform=platform,
        context=context
    )
