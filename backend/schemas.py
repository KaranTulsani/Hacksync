from pydantic import BaseModel
from typing import List


# -------- INPUT SCHEMA --------
class CampaignRequest(BaseModel):
    product: str
    audience: str
    goal: str
    tone: str
    budget: str
    campaign_duration: str


# -------- OUTPUT SCHEMAS --------

class BrandDescription(BaseModel):
    overview: str
    personality: List[str]
    promise: str


class Strategy(BaseModel):
    campaign_theme: str
    emotional_hook: str
    target_emotion: str
    content_angle: str
    strategy_summary: str
    why_it_works: List[str]


class VisualIdentity(BaseModel):
    color_palette: List[str]
    mood: str
    image_prompt: str


class Copywriting(BaseModel):
    captions: List[str]
    ad_headline: str


class MediaPlan(BaseModel):
    platforms: List[str]
    posting_schedule: str
    cta: str


class TimelinePhase(BaseModel):
    phase_name: str
    duration: str
    objective: str
    key_activities: List[str]


class CampaignTimeline(BaseModel):
    phases: List[TimelinePhase]


class InfluencerPhaseRecommendation(BaseModel):
    phase_name: str
    platform: str
    suggested_creator_handles: List[str]
    creator_type: str
    rationale: str


class InfluencerRecommendations(BaseModel):
    note: str
    phase_wise: List[InfluencerPhaseRecommendation]


class CampaignOutput(BaseModel):
    brand_description: BrandDescription
    strategy: Strategy
    visual_identity: VisualIdentity
    copywriting: Copywriting
    media_plan: MediaPlan
    campaign_timeline: CampaignTimeline
    influencer_recommendations: InfluencerRecommendations
