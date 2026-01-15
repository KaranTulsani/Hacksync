# 🚀 BrandPulse - AI-Powered Brand Campaign Strategist

An autonomous AI platform that transforms high-level user briefs into complete, deployment-ready brand campaigns. BrandPulse orchestrates multiple AI tools to handle strategy, creative design, copywriting, and media planning.

![BrandPulse](https://img.shields.io/badge/BrandPulse-AI%20Platform-6366F1?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi)
![Gemini](https://img.shields.io/badge/Google-Gemini-4285F4?style=flat-square&logo=google)

## ✨ Features

### Core Features
- **Abstract Reasoning & Strategy Formation**: Interprets user briefs to analyze target audience, context, and product, then formulates a core campaign strategy
- **Visual Identity Generation**: Creates mood boards, color palettes, and AI image prompts
- **Copywriting Engine**: Generates social media captions, ad copy, and headlines
- **Market Research**: Identifies relevant influencer profiles and outreach strategies
- **Media Planning**: Recommends posting schedules and channel strategies

### Bonus Features
- **Campaign Performance Predictor**: ML-powered prediction of reach, engagement, and effectiveness
- **Interactive Campaign Canvas**: Web-based workspace for reviewing and editing assets
- **Export Functionality**: Download complete campaign packages as JSON

## 🏗️ Project Structure

```
brandpulse/
├── src/                    # React Frontend
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   └── services/          # API service layer
├── backend/               # Backend 1: Gemini Strategy Generation
│   ├── api.py            # FastAPI endpoints
│   ├── orchestrator.py   # Campaign generation logic
│   ├── gemini_client.py  # Google Gemini integration
│   └── prompts.py        # AI prompt templates
├── backend_2/            # Backend 2: ML Performance Prediction
│   └── ml/
│       ├── predictor.py           # Engagement prediction
│       ├── reach_predictor.py     # Reach prediction
│       └── recommendation_engine.py # Smart recommendations
└── server.py             # Unified API server
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- Google Gemini API Key

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/KaranTulsani/Hacksync.git
cd Hacksync

# Install frontend dependencies
npm install

# Install backend dependencies
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
# Copy the environment template
cp .env.example .env

# Edit .env and add your Google Gemini API key
GOOGLE_API_KEY=your_api_key_here
```

### 3. Train ML Models (First Time Only)

```bash
cd backend_2/ml
python train_model.py
python train_reach_model.py
cd ../..
```

### 4. Start the Application

```bash
# Terminal 1: Start the backend
python server.py

# Terminal 2: Start the frontend
npm run dev
```

The app will be available at `http://localhost:5173`

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/api/generate-campaign` | POST | Generate full campaign with strategy + ML prediction |
| `/api/predict-performance` | POST | Get ML performance prediction only |

### Request Example

```json
{
  "product": "EcoBottle - Sustainable Water Bottle",
  "audience": "Eco-conscious Gen Z",
  "goal": "Brand Awareness",
  "tone": "Youthful and inspiring",
  "budget": "$5,000 - $10,000",
  "campaign_duration": "3 Months",
  "platform": "Instagram",
  "content_type": "Reel",
  "industry": "Sustainability"
}
```

### Response Structure

```json
{
  "brand_description": { ... },
  "strategy": {
    "campaign_theme": "...",
    "emotional_hook": "...",
    "strategy_summary": "...",
    "why_it_works": [...]
  },
  "visual_identity": {
    "color_palette": [...],
    "mood": "...",
    "image_prompt": "..."
  },
  "copywriting": {
    "captions": [...],
    "ad_headline": "..."
  },
  "media_plan": { ... },
  "campaign_timeline": { ... },
  "influencer_recommendations": { ... },
  "performance_prediction": {
    "predicted_reach": 15000,
    "engagement_rate": "4.2%",
    "effectiveness": "High",
    "recommendations": [...]
  }
}
```

## 🎨 Tech Stack

### Frontend
- **React 18** - UI Framework
- **Vite** - Build Tool
- **Lucide React** - Icons
- **CSS3** - Custom styling with glassmorphism effects

### Backend
- **FastAPI** - API Framework
- **Google Gemini** - AI Strategy Generation
- **scikit-learn** - ML Performance Prediction
- **Pydantic** - Data Validation

## 👥 Team

- Frontend & Integration: Karan Tulsani
- Backend 1 (Strategy AI): Team Member
- Backend 2 (ML Prediction): Team Member

## 📄 License

MIT License - See LICENSE file for details.

---

Built with ❤️ for HackSync 2026
