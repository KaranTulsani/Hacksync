def generate_recommendations(input_data, engagement, reach):
    recommendations = []

    # 1. Platform-Specific Optimizations
    platform = input_data.get("platform")
    content_type = input_data.get("content_type")

    if platform == "Instagram":
        if content_type != "Reel":
            recommendations.append("Leverage Instagram Reels for significantly higher discoverability and engagement.")
        if input_data.get("influencer") == 0:
            recommendations.append("Partner with niche influencers to boost trust and reach on Instagram.")
            
    elif platform == "YouTube":
        if content_type not in ["Shorts", "Live"]:
            recommendations.append("Incorporate YouTube Shorts to capture mobile-first viewers.")
        if engagement < 5.0:
            recommendations.append("Improve video thumbnails and titles to increase Click-Through Rate (CTR).")

    elif platform == "LinkedIn":
        if content_type != "Article":
            recommendations.append("Publish long-form Articles to establish thought leadership in your industry.")
        recommendations.append("Include industry-relevant hashtags to increase visibility among professionals.")

    elif platform == "Facebook":
        if content_type != "Video":
            recommendations.append("Videos generally perform better on Facebook; consider converting images into short video clips.")

    elif platform == "Twitter":
        if content_type != "Thread":
            recommendations.append("Use Threads to break down complex topics; they typically see higher sharing rates than single tweets.")

    # 2. Strategic Time-Based Best Practices
    hour = input_data.get("posting_hour", 0)
    if not (12 <= hour <= 14 or 18 <= hour <= 21):
        recommendations.append("Schedule posts during peak user activity windows (12-2 PM or 6-9 PM) for maximum initial traction.")

    # 3. Engagement and CTA Optimization
    if input_data.get("cta") == 0:
        recommendations.append("Add a strong Call-To-Action (CTA) like 'Comment below' or 'Link in bio' to drive conversions.")
    
    if engagement < 4.0:
        recommendations.append("Analyze top-performing competitors in your industry to refine content aesthetics.")

    # 4. Reach and Distribution
    if reach < 20000:
        recommendations.append("Consider cross-promoting this content across other social channels to broaden your reach.")
    
    if input_data.get("caption_length", 0) < 100:
        recommendations.append("Experiment with longer, value-driven captions to increase 'Time on Post' metrics.")

    if not recommendations:
        recommendations.append("Your current campaign strategy is highly optimized and aligns with platform best practices.")

    return recommendations
