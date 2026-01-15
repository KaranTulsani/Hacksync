from llm.generate import generate
from utils.store import save_post
from posting.twitter_selenium import post_tweet
from posting.instagram_selenium import post_instagram

print("--- Social Automation Pipeline ---")
topic = "brand strategy"
print(f"Generating content for topic: {topic}...")
data = generate(topic)
print(f"Image Prompt: {data['image_prompt']}")
fname = save_post(data)
print(f"Content & Mock Image saved. Data file: {fname}")

print("\nStarting Twitter post...")
post_tweet(data["twitter"])

print("\nStarting Instagram post...")
post_instagram(data["instagram"], data["image_path"])

print("\n--- Pipeline Completed ---")
