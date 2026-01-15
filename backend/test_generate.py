import requests
import base64
import os

def test_generate():
    url = "http://localhost:8000/generate"
    payload = {
        "prompt": "A futuristic city with flying cars, cyber punk style, high detail",
        "mode": "All Purpose"
    }
    
    print(f"Sending request to {url}...")
    try:
        response = requests.post(url, json=payload, timeout=300)
        response.raise_for_status()
        data = response.json()
        
        if "image" in data:
            print("Successfully received image data!")
            # Save the image to check
            img_data = base64.b64decode(data["image"])
            os.makedirs("test_output", exist_ok=True)
            with open("test_output/generated_image.jpg", "wb") as f:
                f.write(img_data)
            print("Image saved to test_output/generated_image.jpg")
        else:
            print("Error: No image in response", data)
            
    except Exception as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    test_generate()
