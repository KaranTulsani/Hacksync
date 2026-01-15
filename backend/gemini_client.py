import os
from backend.config import GOOGLE_API_KEY

GEMINI_AVAILABLE = False

try:
    import google.generativeai as genai
    
    if GOOGLE_API_KEY:
        genai.configure(api_key=GOOGLE_API_KEY)
        model = genai.GenerativeModel("models/gemini-flash-lite-latest")
        GEMINI_AVAILABLE = True
    else:
        model = None
        print("⚠️  GOOGLE_API_KEY not found. Gemini features will use demo mode.")
except Exception as e:
    model = None
    print(f"⚠️  Gemini initialization error: {e}")


def gemini_generate(prompt: str) -> str:
    if not GEMINI_AVAILABLE or model is None:
        raise RuntimeError("Gemini API not configured. Set GOOGLE_API_KEY in .env file.")
    
    response = model.generate_content(prompt)
    return response.text
