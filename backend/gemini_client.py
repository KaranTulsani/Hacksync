import os
from backend.config import GOOGLE_API_KEY
import google.generativeai as genai

if not GOOGLE_API_KEY:
    raise RuntimeError("GOOGLE_API_KEY not found in environment")

genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel("models/gemini-flash-lite-latest")


def gemini_generate(prompt: str) -> str:
    response = model.generate_content(prompt)
    return response.text
