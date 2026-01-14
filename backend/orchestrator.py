# import json
# from openai import OpenAI
# from backend.prompts import MASTER_PROMPT
# from backend.schemas import CampaignOutput
# from backend.config import OPENAI_API_KEY

# client = OpenAI(api_key=OPENAI_API_KEY)


# def generate_campaign(user_brief: str) -> dict:
#     response = client.chat.completions.create(
#         model="gpt-4.1-mini",
#         messages=[
#             {"role": "system", "content": MASTER_PROMPT},
#             {"role": "user", "content": user_brief}
#         ],
#         temperature=0.7
#     )

#     raw_output = response.choices[0].message.content
#     parsed_json = json.loads(raw_output)

#     validated_output = CampaignOutput(**parsed_json)
#     return validated_output.dict()

import json
from backend.prompts import MASTER_PROMPT
from backend.schemas import CampaignOutput
from backend.gemini_client import gemini_generate


def generate_campaign(user_brief: str) -> dict:
    full_prompt = MASTER_PROMPT + "\n\nUSER BRIEF:\n" + user_brief
    raw_output = gemini_generate(full_prompt)

    parsed_json = json.loads(raw_output)
    validated = CampaignOutput(**parsed_json)

    return validated.dict()
