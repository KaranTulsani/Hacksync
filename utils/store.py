import os
import json
from datetime import datetime

def save_post(data):
    os.makedirs("content/captions", exist_ok=True)
    os.makedirs("content/media", exist_ok=True)
    
    timestamp = datetime.now().isoformat().replace(':', '-')
    
    # Mock image generation/save
    image_path = f"content/media/{timestamp}.jpg"
    with open(image_path, "wb") as f:
        f.write(b"MOCK_IMAGE_DATA") # Placeholder bytes
    
    data["image_path"] = os.path.abspath(image_path)
    
    fname = f"content/captions/{timestamp}.json"
    with open(fname, "w") as f:
        json.dump(data, f, indent=4)
    return fname
