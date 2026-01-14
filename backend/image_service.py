# from openai import OpenAI
# from backend.config import OPENAI_API_KEY

# client = OpenAI(api_key=OPENAI_API_KEY)


# def generate_image(image_prompt: str) -> str:
#     response = client.images.generate(
#         model="gpt-image-1",
#         prompt=image_prompt,
#         size="1024x1024"
#     )

#     return response.data[0].url
