import random

TONE = ["fun", "professional", "motivational"]

HASH = [
    "#campaign", "#branding", "#marketing", "#startup",
    "#entrepreneur", "#design", "#growth"
]

def generate(topic):
    tone = random.choice(TONE)
    hashtags = " ".join(random.sample(HASH, 3))

    caption = f"{topic.capitalize()} in a {tone} tone.\n{hashtags}"
    tweet = f"{topic.capitalize()} — {tone} insight.\n{hashtags}"
    image_prompt = f"A high-quality 4k realistic image about {topic}, {tone} style, professional lighting."

    return {
        "topic": topic,
        "instagram": caption,
        "twitter": tweet,
        "image_prompt": image_prompt
    }
