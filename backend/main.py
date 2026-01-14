# from backend.orchestrator import generate_campaign
# from backend.image_service import generate_image
# from backend.firebase_service import save_campaign


# def run_brandpulse(user_input: dict):
#     brief = f"""
#     Product: {user_input['product']}
#     Target Audience: {user_input['audience']}
#     Goal: {user_input['goal']}
#     Tone: {user_input['tone']}
#     """

#     campaign = generate_campaign(brief)

#     # Image generation from visual agent output
#     image_prompt = campaign["visual_identity"]["image_prompt"]
#     image_url = generate_image(image_prompt)

#     campaign["visual_identity"]["image_url"] = image_url

#     save_campaign(campaign)
#     return campaign
from backend.orchestrator import generate_campaign
from backend.firebase_service import save_campaign


def run_brandpulse(user_input: dict):
    brief = f"""
Product: {user_input['product']}
Target Audience: {user_input['audience']}
Goal: {user_input['goal']}
Tone: {user_input['tone']}
Budget: {user_input['budget']}
Campaign Duration: {user_input['campaign_duration']}
"""


    campaign = generate_campaign(brief)

    # No image generation (Gemini generates prompt only)
    save_campaign(campaign)
    return campaign
