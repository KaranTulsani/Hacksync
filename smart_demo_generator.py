"""
BrandPulse Smart Demo Generator
Creates intelligent, dynamic campaign data based on user inputs
"""

import random
from typing import Dict, List

# Industry-specific data
INDUSTRY_THEMES = {
    "Fitness": {
        "themes": ["Transform Your Limits", "Fuel Your Fire", "Move. Grow. Conquer.", "The Athlete Within", "Peak Performance Unlocked"],
        "emotions": ["Empowerment", "Determination", "Pride", "Energy", "Achievement"],
        "hooks": ["The rush of breaking your personal best", "That moment when your body and mind align", "The confidence that comes from dedication"],
        "colors": [["#FF6B35", "#004E89", "#1A1A2E", "#F5F5F5"], ["#00C9A7", "#1B1B2F", "#E94560", "#FFFFFE"], ["#F72585", "#7209B7", "#3A0CA3", "#4361EE"]],
        "moods": ["High-energy, sweat-drenched action shots", "Cinematic slow-motion workout sequences", "Gritty, raw athletic moments with dramatic lighting"],
        "captions_style": ["motivational", "challenge-based", "transformation-focused"]
    },
    "Fashion": {
        "themes": ["Define Your Edge", "Wear Your Story", "Beyond the Trend", "Style Reimagined", "The New Classic"],
        "emotions": ["Confidence", "Self-expression", "Belonging", "Individuality", "Aspiration"],
        "hooks": ["The confidence of wearing something that's truly you", "When your outfit speaks before you do", "Fashion that tells your story"],
        "colors": [["#E8D5B7", "#1E1E1E", "#C9A959", "#FAFAFA"], ["#FF6B6B", "#4ECDC4", "#2C3E50", "#FFFFFF"], ["#6C5CE7", "#00CEC9", "#2D3436", "#DFE6E9"]],
        "moods": ["Editorial-style street photography", "Minimalist studio shots with bold shadows", "Candid urban lifestyle moments"],
        "captions_style": ["statement-making", "lifestyle-driven", "community-focused"]
    },
    "Technology": {
        "themes": ["Future Forward", "Simplify. Amplify.", "Intelligence Unleashed", "The Smart Choice", "Innovation at Your Fingertips"],
        "emotions": ["Trust", "Curiosity", "Relief", "Excitement", "Security"],
        "hooks": ["The moment complexity becomes clarity", "Technology that just works—exactly when you need it", "When innovation meets intuition"],
        "colors": [["#0F0F0F", "#00D4FF", "#6366F1", "#FFFFFF"], ["#1A1A2E", "#16213E", "#0F3460", "#E94560"], ["#2D3748", "#4FD1C5", "#9F7AEA", "#F7FAFC"]],
        "moods": ["Sleek product photography with ambient lighting", "Clean, futuristic interfaces in action", "Human-tech interaction moments"],
        "captions_style": ["benefit-focused", "problem-solving", "forward-looking"]
    },
    "Food & Beverage": {
        "themes": ["Taste the Moment", "Crafted with Care", "Flavor Elevated", "Pure Indulgence", "From Source to Soul"],
        "emotions": ["Comfort", "Joy", "Nostalgia", "Discovery", "Satisfaction"],
        "hooks": ["That first sip that makes everything better", "When quality ingredients meet passionate craft", "Moments made better, one taste at a time"],
        "colors": [["#4A2C2A", "#F5E6D3", "#8B4513", "#FFFEF0"], ["#2D5016", "#F4A460", "#8FBC8F", "#FFFAF0"], ["#722F37", "#FFD700", "#2F4F4F", "#FFFFF0"]],
        "moods": ["Warm, inviting food photography with natural light", "Behind-the-scenes artisan craftsmanship", "Social moments centered around the product"],
        "captions_style": ["sensory-rich", "story-driven", "community-building"]
    },
    "Education": {
        "themes": ["Learn Without Limits", "Unlock Your Potential", "Knowledge That Sticks", "The Future of Learning", "Skill Up. Level Up."],
        "emotions": ["Curiosity", "Confidence", "Achievement", "Growth", "Belonging"],
        "hooks": ["The 'aha!' moment when something finally clicks", "When learning stops feeling like work", "The pride of mastering something new"],
        "colors": [["#4A90D9", "#2ECC71", "#34495E", "#FFFFFF"], ["#6C5CE7", "#00D2D3", "#2D3436", "#FFEAA7"], ["#0984E3", "#00B894", "#2D3436", "#DFE6E9"]],
        "moods": ["Bright, aspirational student success stories", "Clean, modern learning environment visuals", "Dynamic knowledge-sharing moments"],
        "captions_style": ["achievement-focused", "community-driven", "value-packed"]
    },
    "General": {
        "themes": ["Elevate Your Experience", "The Smart Choice", "Quality That Speaks", "Made for You", "Excellence Redefined"],
        "emotions": ["Trust", "Excitement", "Satisfaction", "Confidence", "Joy"],
        "hooks": ["When quality meets convenience", "The moment you realize you've found something special", "Excellence that speaks for itself"],
        "colors": [["#6366F1", "#10B981", "#F59E0B", "#1F2937"], ["#3B82F6", "#EC4899", "#14B8A6", "#1E293B"], ["#8B5CF6", "#06B6D4", "#F97316", "#0F172A"]],
        "moods": ["Premium, aspirational lifestyle photography", "Clean, modern product showcases", "Authentic customer success moments"],
        "captions_style": ["value-focused", "benefit-driven", "trust-building"]
    }
}

PLATFORM_STRATEGIES = {
    "Instagram": {
        "content_focus": "Visual storytelling through Reels, carousels, and Stories",
        "best_times": "12PM-2PM and 6PM-9PM (peak scroll times)",
        "key_tactics": ["Reels for discovery", "Carousels for education", "Stories for engagement", "Collab posts for reach"],
        "cta_styles": ["Link in bio", "DM us", "Tap to shop", "Save for later"]
    },
    "TikTok": {
        "content_focus": "Trend-driven, authentic short-form video content",
        "best_times": "7PM-11PM (entertainment hours)",
        "key_tactics": ["Trending sounds", "Duets and Stitches", "Behind-the-scenes", "POV content"],
        "cta_styles": ["Link in bio", "Follow for more", "Comment below", "Check our page"]
    },
    "LinkedIn": {
        "content_focus": "Thought leadership and professional value content",
        "best_times": "7AM-9AM and 5PM-6PM (commute times)",
        "key_tactics": ["Document carousels", "Long-form posts", "Video insights", "Employee advocacy"],
        "cta_styles": ["Comment your thoughts", "DM me", "Visit our page", "Book a call"]
    },
    "YouTube": {
        "content_focus": "In-depth tutorials, reviews, and brand storytelling",
        "best_times": "2PM-4PM (max discovery) and 9PM-11PM (primetime viewing)",
        "key_tactics": ["Shorts for discovery", "Long-form for depth", "Community posts", "Collaborations"],
        "cta_styles": ["Subscribe now", "Click the link below", "Watch next", "Join our community"]
    },
    "Facebook": {
        "content_focus": "Community building and targeted advertising",
        "best_times": "1PM-4PM (afternoon engagement peak)",
        "key_tactics": ["Video content", "Group engagement", "Live sessions", "Retargeting ads"],
        "cta_styles": ["Shop now", "Learn more", "Join our group", "Send message"]
    },
    "Twitter": {
        "content_focus": "Real-time engagement and conversation threads",
        "best_times": "12PM-3PM and 5PM-6PM",
        "key_tactics": ["Thread storytelling", "Quote tweets", "Polls", "Trend participation"],
        "cta_styles": ["Reply below", "RT to share", "Check the link", "Follow us"]
    }
}


def get_industry_data(industry: str) -> Dict:
    """Get industry-specific data, with fallback to General"""
    industry_key = industry if industry in INDUSTRY_THEMES else "General"
    return INDUSTRY_THEMES[industry_key]


def get_platform_data(platform: str) -> Dict:
    """Get platform-specific data, with fallback"""
    platform_key = platform if platform in PLATFORM_STRATEGIES else "Instagram"
    return PLATFORM_STRATEGIES[platform_key]


def generate_smart_captions(product: str, audience: str, industry: str, platform: str) -> List[str]:
    """Generate unique, platform-optimized captions"""
    ind_data = get_industry_data(industry)
    plat_data = get_platform_data(platform)
    
    caption_templates = [
        f"Stop scrolling. This is your sign. {product} is here to change everything. 🔥 {plat_data['cta_styles'][0]}",
        f"POV: You finally found something that actually works. Welcome to the {product} era. ✨",
        f"They said it couldn't be done. We did it anyway. {product} – built different. 💪",
        f"{audience}—this one's for you. We see you. We built this for you. {plat_data['cta_styles'][1]} 🎯",
        f"Before {product}: 😩 After {product}: 🚀 The transformation is real.",
        f"Hot take: {product} isn't just a product. It's a movement. Are you in? 👇",
        f"The secret's out. {product} is officially the thing everyone's talking about. Don't be the last to know.",
        f"3 reasons why {audience} are obsessing over {product}... (swipe to see why) →",
    ]
    
    return random.sample(caption_templates, 4)


def generate_smart_campaign(
    product: str,
    audience: str,
    goal: str,
    tone: str,
    budget: str,
    duration: str,
    platform: str,
    content_type: str,
    industry: str
) -> Dict:
    """Generate a highly customized, intelligent campaign"""
    
    ind_data = get_industry_data(industry)
    plat_data = get_platform_data(platform)
    
    # Select random but consistent theme elements
    theme = random.choice(ind_data["themes"])
    emotion = random.choice(ind_data["emotions"])
    hook = random.choice(ind_data["hooks"])
    colors = random.choice(ind_data["colors"])
    mood = random.choice(ind_data["moods"])
    
    # Generate dynamic timeline based on duration
    timeline_phases = generate_timeline(duration, goal, platform)
    
    # Generate influencer recommendations
    influencer_recs = generate_influencer_strategy(platform, audience, budget, timeline_phases)
    
    return {
        "brand_description": {
            "overview": f"{product} is positioned as a premium solution for {audience}, designed to deliver on the promise of {goal.lower()}. The brand embodies innovation, trust, and transformational value.",
            "personality": [
                tone.split()[0] if tone else "Bold",
                "Innovative",
                "Authentic",
                "Results-Driven"
            ],
            "promise": f"Empowering {audience} to achieve {goal.lower()} through a product experience that's as exceptional as they are."
        },
        "strategy": {
            "campaign_theme": theme,
            "emotional_hook": hook,
            "target_emotion": f"{emotion} — the feeling of knowing you made the right choice.",
            "content_angle": f"Position {product} as the essential tool for {audience} who refuse to settle. Every piece of content should reinforce that choosing {product} is choosing a better version of themselves.",
            "strategy_summary": f"This campaign leverages the core desire for {emotion.lower()} among {audience}. With a budget of {budget} over {duration}, we'll execute a phased approach: building awareness through {platform} {content_type.lower()}s, driving engagement through authentic storytelling, and converting through social proof and targeted retargeting. The {theme} theme creates a cohesive narrative that resonates deeply with the target psychographics.",
            "why_it_works": [
                f"Directly addresses {audience}'s core desire for {emotion.lower()}.",
                f"Leverages {platform}'s algorithm strengths with {content_type.lower()} content.",
                f"Creates an emotional moat that competitors can't easily replicate.",
                f"Builds community-driven momentum through user-generated content.",
                f"Strategic budget allocation maximizes ROI across the {duration} timeline."
            ]
        },
        "visual_identity": {
            "color_palette": colors,
            "mood": f"{mood}. Every visual should feel premium, intentional, and instantly recognizable. Think: if someone saw this in their feed, they'd immediately know it's {product}.",
            "image_prompt": f"A stunning, high-production visual featuring {audience} in their element, interacting with {product}. {mood}. The lighting should evoke {emotion.lower()}, with the brand colors ({', '.join(colors)}) subtly integrated. Composition should feel editorial yet authentic—aspirational but achievable. Shot on professional equipment, 4K quality, trending on Behance."
        },
        "copywriting": {
            "captions": generate_smart_captions(product, audience, industry, platform),
            "ad_headline": f"{theme}: {product} for {audience.split()[0]} Who Demand More",
            "hook_variations": [
                f"What if {goal.lower()} wasn't just possible—but inevitable?",
                f"The {audience.split()[0]} secret that's breaking the internet...",
                f"We asked 1,000 {audience.split()[0]}s what they wanted. Then we built {product}."
            ]
        },
        "media_plan": {
            "platforms": [platform] + [p for p in ["Instagram", "TikTok", "YouTube"] if p != platform][:2],
            "posting_schedule": f"Primary platform ({platform}): {plat_data['best_times']}. {plat_data['content_focus']}. Recommended frequency: 5-7 posts per week during launch, scaling to 3-4 during growth phase.",
            "cta": f"Ready to experience the difference? {plat_data['cta_styles'][0]} and discover why {audience} are making the switch to {product}.",
            "channel_strategy": {
                "primary": f"{platform} — {plat_data['content_focus']}",
                "secondary": "Cross-post key content with platform-native optimizations",
                "paid": f"Retargeting warm audiences + lookalike expansion in growth phase"
            }
        },
        "campaign_timeline": {
            "phases": timeline_phases
        },
        "influencer_recommendations": {
            "note": "Curated creator archetypes optimized for this campaign's goals and audience.",
            "phase_wise": influencer_recs
        }
    }


def generate_timeline(duration: str, goal: str, platform: str) -> List[Dict]:
    """Generate a smart, goal-optimized timeline"""
    
    # Parse duration
    duration_lower = duration.lower()
    if "1 month" in duration_lower or "4 week" in duration_lower:
        total_weeks = 4
    elif "2 month" in duration_lower or "8 week" in duration_lower:
        total_weeks = 8
    elif "3 month" in duration_lower or "12 week" in duration_lower:
        total_weeks = 12
    elif "6 month" in duration_lower:
        total_weeks = 24
    else:
        total_weeks = 12  # Default
    
    goal_lower = goal.lower()
    
    if total_weeks <= 4:
        # Short campaign - 2 phases
        return [
            {
                "phase_name": "Blitz Launch",
                "duration": "Week 1-2",
                "objective": "Maximum awareness and initial traction",
                "key_activities": [
                    f"Launch hero {platform} content with paid amplification",
                    "Influencer seeding and unboxing content",
                    "Community engagement blitz (respond in <1hr)",
                    "Launch-day exclusive offer"
                ]
            },
            {
                "phase_name": "Conversion Sprint",
                "duration": "Week 3-4",
                "objective": f"Drive {goal.lower()} with urgency",
                "key_activities": [
                    "Retargeting warm audiences with testimonials",
                    "Limited-time offer / scarcity messaging",
                    "UGC amplification",
                    "Final push CTA content"
                ]
            }
        ]
    elif total_weeks <= 8:
        # Medium campaign - 3 phases
        return [
            {
                "phase_name": "Launch & Discovery",
                "duration": f"Week 1-{total_weeks//4}",
                "objective": "Build awareness and initial audience",
                "key_activities": [
                    f"Launch hero {platform} campaign",
                    "Influencer partnership activation",
                    "Paid awareness ads (cold audience)",
                    "Community building and engagement"
                ]
            },
            {
                "phase_name": "Engagement & Trust",
                "duration": f"Week {total_weeks//4 + 1}-{total_weeks//2}",
                "objective": "Deepen relationships and build social proof",
                "key_activities": [
                    "UGC campaign launch",
                    "Testimonial content series",
                    "Behind-the-scenes content",
                    "Community Q&A and polls"
                ]
            },
            {
                "phase_name": "Conversion & Scale",
                "duration": f"Week {total_weeks//2 + 1}-{total_weeks}",
                "objective": f"Maximize {goal.lower()} and scale what works",
                "key_activities": [
                    "Retargeting campaigns at full budget",
                    "Promotional offers and bundles",
                    "Lookalike audience expansion",
                    "Performance optimization and A/B testing"
                ]
            }
        ]
    else:
        # Long campaign - 4 phases
        phase_length = total_weeks // 4
        return [
            {
                "phase_name": "Foundation & Awareness",
                "duration": f"Week 1-{phase_length}",
                "objective": "Establish presence and build initial audience",
                "key_activities": [
                    "Brand launch campaign with hero content",
                    "Seed influencer partnerships",
                    "Community building initiatives",
                    "Content pillar establishment"
                ]
            },
            {
                "phase_name": "Momentum Building",
                "duration": f"Week {phase_length + 1}-{phase_length * 2}",
                "objective": "Accelerate growth and engagement",
                "key_activities": [
                    "UGC campaign with branded hashtag",
                    "Influencer content amplification",
                    "Interactive content (polls, challenges)",
                    "Email list building"
                ]
            },
            {
                "phase_name": "Deep Engagement",
                "duration": f"Week {phase_length * 2 + 1}-{phase_length * 3}",
                "objective": "Build loyalty and prepare for conversion",
                "key_activities": [
                    "Customer success stories",
                    "Product education series",
                    "Community events/livestreams",
                    "Referral program launch"
                ]
            },
            {
                "phase_name": "Conversion & Optimization",
                "duration": f"Week {phase_length * 3 + 1}-{total_weeks}",
                "objective": f"Maximize {goal.lower()} with proven strategies",
                "key_activities": [
                    "Full-funnel retargeting",
                    "Promotional campaign",
                    "Lookalike scaling",
                    "Performance analysis and iteration"
                ]
            }
        ]


def generate_influencer_strategy(platform: str, audience: str, budget: str, phases: List[Dict]) -> List[Dict]:
    """Generate phase-specific influencer recommendations"""
    
    # Parse budget for tier recommendations
    budget_lower = budget.lower()
    if "1k" in budget_lower or "2k" in budget_lower or "3k" in budget_lower:
        tiers = ["Nano (1K-10K)", "Micro (10K-50K)"]
    elif "5k" in budget_lower or "10k" in budget_lower:
        tiers = ["Micro (10K-50K)", "Mid-tier (50K-200K)"]
    else:
        tiers = ["Mid-tier (50K-200K)", "Macro (200K-1M)"]
    
    recommendations = []
    
    for i, phase in enumerate(phases):
        tier = tiers[min(i, len(tiers)-1)]
        
        rec = {
            "phase_name": phase["phase_name"],
            "platform": platform,
            "suggested_creator_handles": [
                f"@{audience.split()[0].lower()}_authentic",
                f"@{platform.lower()}_trendsetter_{i+1}",
                f"@lifestyle_{audience.split()[-1].lower() if len(audience.split()) > 1 else 'creator'}"
            ],
            "creator_type": tier,
            "rationale": get_influencer_rationale(phase["phase_name"], tier, platform),
            "content_deliverables": get_influencer_deliverables(phase["phase_name"], platform)
        }
        recommendations.append(rec)
    
    return recommendations


def get_influencer_rationale(phase: str, tier: str, platform: str) -> str:
    """Get smart rationale for influencer selection"""
    rationales = {
        "Launch": f"{tier} creators provide authentic launch buzz and high engagement rates, crucial for algorithm momentum on {platform}.",
        "Awareness": f"{tier} influencers offer strong reach-to-cost ratio, ideal for awareness goals on {platform}.",
        "Engagement": f"{tier} creators excel at community building, driving meaningful interactions that boost {platform}'s ranking signals.",
        "Conversion": f"{tier} influencers with proven conversion track records can drive direct response with authentic testimonials.",
        "Scale": f"{tier} creators provide broad reach for scaling while maintaining credibility.",
    }
    
    for key, rationale in rationales.items():
        if key.lower() in phase.lower():
            return rationale
    
    return f"{tier} creators are strategically selected for this phase to maximize campaign impact on {platform}."


def get_influencer_deliverables(phase: str, platform: str) -> List[str]:
    """Get recommended influencer deliverables"""
    
    platform_deliverables = {
        "Instagram": ["1 Reel (30-60s)", "3 Story frames", "1 Feed post"],
        "TikTok": ["1 TikTok (15-60s)", "1 Duet/Stitch participation"],
        "YouTube": ["1 Dedicated video or integration (2-5 min)", "Community post"],
        "LinkedIn": ["1 Long-form post", "1 Document carousel"],
    }
    
    return platform_deliverables.get(platform, ["1 Primary content piece", "1 Story/supporting content"])
