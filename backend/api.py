from fastapi import FastAPI, HTTPException
from backend.main import run_brandpulse
from backend.schemas import CampaignRequest

app = FastAPI(
    title="BrandPulse API",
    description="Strategy-first brand campaign generation backend",
    version="1.0.0"
)


@app.get("/")
def health():
    return {"status": "BrandPulse backend running"}


@app.post("/generate-campaign")
def generate_campaign(request: CampaignRequest):
    try:
        return run_brandpulse(request.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
