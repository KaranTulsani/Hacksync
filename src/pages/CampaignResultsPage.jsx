import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Target, 
  Palette, 
  MessageSquare, 
  Zap, 
  Download, 
  Share2, 
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  Clock,
  Layout
} from 'lucide-react';
import Button from '../components/Button';
import './CampaignResults.css';

const CampaignResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use data from location state or fallback to the provided JSON for demo purposes
  const data = location.state?.campaignData || {
    "strategy": {
      "campaign_theme": "Hydrate Your Hustle",
      "emotional_hook": "The feeling of peak performance and effortless energy.",
      "target_emotion": "Excitement and empowered focus.",
      "content_angle": "Positioning the smart water bottle as the essential 'smart' gear for academic and social success, ensuring optimal hydration fuels non-stop student life.",
      "strategy_summary": "This campaign focuses on the high-energy, fast-paced reality of student life. By associating the product with sustained focus and vitality, we appeal directly to their desire to maximize every hour. The visual style will be vibrant and dynamic, mirroring the energy they seek.",
      "why_it_works": [
        "Directly addresses the need for sustained energy during long study sessions and extracurriculars.",
        "Uses 'Hustle' language, resonating with the ambition of the student demographic.",
        "The 'smart' aspect is framed as a competitive edge, not just a feature."
      ]
    },
    "visual_identity": {
      "color_palette": ["#00FFFF", "#FF4500", "#1E90FF", "#32CD32"],
      "mood": "Vibrant, electric, fast-paced, dynamic studio shots mixed with real-life campus action.",
      "image_prompt": "A diverse group of energetic college students studying late in a brightly lit library, one student confidently takes a sip from a glowing smart water bottle. High contrast, neon accents, sense of motion."
    },
    "copywriting": {
      "captions": [
        "Ditch the 3 PM crash. Power your all-nighters the smart way. ⚡️ #HydrateYourHustle",
        "Your brain runs on water. Level up your hydration game and ace that exam. See the glow up. ✨",
        "More lectures, zero lag. This is the only study partner that keeps up. Tap to secure your focus fuel.",
        "From campus sprints to late-night coding—stay charged. Get the bottle that matches your ambition."
      ],
      "ad_headline": "Stop Sipping. Start Flowing. Fuel Your Student Prime."
    },
    "media_plan": {
      "platforms": ["TikTok", "Instagram Reels", "Snapchat"],
      "posting_schedule": "High frequency during peak study/stress times (mid-day, late evenings, exam weeks). Utilize short-form video focused on quick, impactful energy demonstrations.",
      "cta": "Unlock Your Flow: Shop Now & Get 15% Off Your First Semester Upgrade."
    }
  };

  return (
    <div className="results-page">
      {/* Header */}
      <header className="results-header">
        <div className="container text-center">
          <div className="results-badge">
            <Sparkles size={14} className="mr-2" />
            AI Orchestration Complete
          </div>
          <h1 className="results-title">Your Campaign Blueprint</h1>
          <p className="results-subtitle">
            We've synthesized your brief into a high-impact, multi-channel brand strategy.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container results-container">
        <div className="results-grid">
          
          {/* Strategy Section */}
          <section className="results-card strategy-main">
            <div className="card-header-premium">
              <Target size={20} className="text-accent" />
              <span>Core Strategy</span>
            </div>
            <div className="card-body-premium">
              <div className="theme-box">
                <div className="theme-label">Campaign Theme</div>
                <div className="theme-value">"{data.strategy.campaign_theme}"</div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">The Emotional Hook</h3>
                <p className="hook-text">{data.strategy.emotional_hook}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Strategic Summary</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {data.strategy.strategy_summary}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Why It Works</h3>
                <div className="space-y-3">
                  {data.strategy.why_it_works.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <CheckCircle size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Strategy Sidebar */}
          <aside className="strategy-sidebar space-y-6">
            <div className="results-card">
              <div className="card-header-premium">
                <Zap size={20} className="text-accent" />
                <span>Target Emotion</span>
              </div>
              <div className="card-body-premium">
                <div className="text-2xl font-black text-indigo-600 mb-2">{data.strategy.target_emotion}</div>
                <p className="text-sm text-slate-500">The primary psychological state we want to trigger in your audience.</p>
              </div>
            </div>

            <div className="results-card">
              <div className="card-header-premium">
                <Layout size={20} className="text-accent" />
                <span>Content Angle</span>
              </div>
              <div className="card-body-premium">
                <p className="text-slate-700 font-medium leading-relaxed">
                  {data.strategy.content_angle}
                </p>
              </div>
            </div>
          </aside>

          {/* Visual Identity */}
          <section className="results-card visual-section">
            <div className="card-header-premium">
              <Palette size={20} className="text-accent" />
              <span>Visual Identity & Mood</span>
            </div>
            <div className="card-body-premium grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Color Palette</h3>
                <div className="color-swatch-container">
                  {data.visual_identity.color_palette.map((color, i) => (
                    <div key={i} className="color-swatch">
                      <div className="swatch-circle" style={{ backgroundColor: color }} />
                      <span className="swatch-hex">{color}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Mood & Aesthetic</h3>
                  <p className="text-slate-700 font-medium">{data.visual_identity.mood}</p>
                </div>
              </div>

              <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <Sparkles size={24} className="text-indigo-400 opacity-50" />
                </div>
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">AI Image Prompt</h3>
                <p className="text-lg font-medium leading-relaxed italic opacity-90">
                  "{data.visual_identity.image_prompt}"
                </p>
                <div className="mt-8 flex justify-end">
                  <Button variant="secondary" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Generate Preview
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Copywriting */}
          <section className="results-card copy-section">
            <div className="card-header-premium">
              <MessageSquare size={20} className="text-accent" />
              <span>Copywriting Assets</span>
            </div>
            <div className="card-body-premium">
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Primary Ad Headline</h3>
                <div className="text-2xl font-black text-slate-900 bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200">
                  "{data.copywriting.ad_headline}"
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Social Captions</h3>
                <div className="space-y-4">
                  {data.copywriting.captions.map((caption, i) => (
                    <div key={i} className="caption-item">
                      {caption}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Media Plan */}
          <section className="results-card media-section">
            <div className="card-header-premium">
              <TrendingUp size={20} className="text-accent" />
              <span>Media & Distribution</span>
            </div>
            <div className="card-body-premium">
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Primary Platforms</h3>
                <div className="flex gap-3 flex-wrap">
                  {data.media_plan.platforms.map((platform, i) => (
                    <span key={i} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-bold text-sm border border-indigo-100">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Clock size={16} /> Posting Schedule
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {data.media_plan.posting_schedule}
                </p>
              </div>

              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-2">Primary CTA</h3>
                <p className="text-emerald-900 font-black text-lg">
                  "{data.media_plan.cta}"
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Action Bar */}
      <div className="results-actions">
        <div className="action-btn" onClick={() => navigate('/create-campaign')}>
          <ArrowLeft size={18} />
          <span>Edit Brief</span>
        </div>
        <div className="action-divider" />
        <div className="action-btn">
          <Download size={18} />
          <span>Export PDF</span>
        </div>
        <div className="action-divider" />
        <div className="action-btn">
          <Share2 size={18} />
          <span>Share Link</span>
        </div>
        <div className="action-divider" />
        <Button variant="accent" size="sm" className="rounded-full px-6">
          Launch Campaign
        </Button>
      </div>
    </div>
  );
};

export default CampaignResultsPage;
