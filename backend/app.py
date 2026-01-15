from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from gradio_client import Client
import base64
import os

HF_SPACE = "dhananjayyadav001/brandpulse-visual-engine"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize client
try:
    client = Client(HF_SPACE)
except Exception as e:
    print(f"Error initializing Gradio client: {e}")
    client = None

@app.post("/generate")
async def generate(payload: dict):
    if not client:
        raise HTTPException(status_code=503, detail="Gradio client not initialized")
    
    prompt = payload.get("prompt")
    mode_input = payload.get("mode", "All Purpose")

    # Mapping frontend modes to Gradio Space modes
    MODE_MAPPING = {
        "All Purpose": "All Purpose (BrandPulse)",
        "Logos": "Logon",  # Based on error snippet showing 'Logon'
        "Logo": "Logon"
    }
    
    mode = MODE_MAPPING.get(mode_input, mode_input)

    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is required")

    try:
        print(f"Generating for prompt: {prompt} with mode: {mode}")
        # Use positional arguments as keyword arguments might not be supported 
        # by this specific Gradio Space endpoint
        result = client.predict(
            mode,
            prompt
        )
        
        # Gradio prediction usually returns a path to an image file
        image_path = result
        if isinstance(result, (list, tuple)):
            image_path = result[0]
            
        print(f"Generation successful. Image path: {image_path}")
        
        if not os.path.exists(image_path):
             raise HTTPException(status_code=500, detail="Generated image file not found on server")

        with open(image_path, "rb") as image_file:
            img_b64 = base64.b64encode(image_file.read()).decode("utf-8")
        
        return {"image": img_b64}
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"Error during generation: {e}")
        raise HTTPException(status_code=500, detail=str(e))
