import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  BrainCircuit, 
  Image as ImageIcon, 
  Type, 
  Users, 
  Calendar, 
  Download,
  RefreshCw,
  Sparkles,
  CheckCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Zap,
  Target,
  Palette,
  MessageSquare,
  Clock,
  TrendingUp,
  Layout
} from 'lucide-react';
import Button from '../components/Button';
import './CreateCampaign.css';

const CreateCampaignPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [campaignData, setCampaignData] = useState({
    productName: '',
    description: '',
    targetAudience: '',
    goals: '',
    budget: '',
    timeline: '',
    industry: '',
    platform: '',
    contentType: ''
  });

  // The Backend JSON Output (Merged from both backend teams)
  const aiOutput = {
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
    },
    "performance_prediction": {
      "predicted_reach": "9,851",
      "engagement_rate": "3.16%",
      "effectiveness": "Medium-High",
      "recommendations": [
        "Use Reels on Instagram for 2x higher engagement.",
        "Post between 7-9 PM for maximum student reach.",
        "Add a clear Call-To-Action to boost conversion.",
        "Consider micro-influencer collaboration to increase trust.",
        "Use slightly longer captions to provide more context."
      ]
    }
  };

  const steps = [
    { id: 1, title: 'Brief', icon: <FileText size={20} /> },
    { id: 2, title: 'Strategy', icon: <BrainCircuit size={20} /> },
    { id: 3, title: 'Creative', icon: <Sparkles size={20} /> },
    { id: 4, title: 'Review', icon: <CheckCircle size={20} /> }
  ];

  const handleInputChange = (e) => {
    setCampaignData({
      ...campaignData,
      [e.target.name]: e.target.value
    });
  };

  const startGeneration = () => {
    setCompletedSteps([1]);
    setCurrentStep(2);
    setIsGenerating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Simulate AI Strategy Generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 2500);
  };

  const generateCreative = () => {
    setCompletedSteps([1, 2]);
    setCurrentStep(3);
    setIsGenerating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Simulate AI Creative Generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 2500);
  };

  const finalReview = () => {
    setCompletedSteps([1, 2, 3]);
    setCurrentStep(4);
    setIsGenerating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Simulate Final Review Generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 1500);
  };

  const getProgressWidth = () => {
    return ((currentStep - 1) / (steps.length - 1)) * 100 + '%';
  };

  return (
    <div className="create-campaign-page">
      {/* Sticky Stepper Header */}
      <header className="stepper-header">
        <div className="container">
          <div className="stepper-container">
            <div className="step-progress-line">
              <div 
                className="step-progress-fill" 
                style={{ width: getProgressWidth() }}
              />
            </div>
            
            {steps.map((step) => (
              <div 
                key={step.id} 
                className={`step-item ${currentStep === step.id ? 'active' : ''} ${completedSteps.includes(step.id) ? 'completed' : ''}`}
              >
                <div className="step-icon-wrapper">
                  {completedSteps.includes(step.id) ? <CheckCircle size={20} /> : step.icon}
                </div>
                <span className="step-title">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container py-16">
        <div className="max-w-5xl mx-auto">
          
          {isGenerating ? (
            <div className="ai-loading-overlay">
              <div className="loading-pulse">
                {currentStep === 2 && <BrainCircuit size={40} className="text-accent" />}
                {currentStep === 3 && <Sparkles size={40} className="text-accent" />}
                {currentStep === 4 && <CheckCircle size={40} className="text-accent" />}
              </div>
              <h2 className="text-2xl font-bold mb-3">
                {currentStep === 2 && "Orchestrating Strategic Narrative..."}
                {currentStep === 3 && "Synthesizing Creative Identity..."}
                {currentStep === 4 && "Finalizing Campaign Package..."}
              </h2>
              <p className="text-secondary">
                {currentStep === 2 && "Analyzing market trends and audience psychographics..."}
                {currentStep === 3 && "Generating color palettes, copy, and visual prompts..."}
                {currentStep === 4 && "Optimizing media plan and distribution schedule..."}
              </p>
            </div>
          ) : (
            <>
              {/* Step 1: Campaign Brief */}
              {currentStep === 1 && (
                <div className="campaign-form-card">
                  <div className="text-center mb-12">
                    <h1 className="form-section-title">Tell Us About Your Vision</h1>
                    <p className="form-section-desc">Provide the core details, and our AI will build a complete strategic narrative.</p>
                  </div>

                  <div className="space-y-8">
                    <div className="input-group">
                      <label className="input-label">Product or Brand Name</label>
                      <input
                        type="text"
                        name="productName"
                        value={campaignData.productName}
                        onChange={handleInputChange}
                        placeholder="e.g., EcoBottle - Sustainable Hydration"
                        className="premium-input"
                      />
                    </div>

                    <div className="input-group">
                      <label className="input-label">What are you building? (Description)</label>
                      <textarea
                        name="description"
                        value={campaignData.description}
                        onChange={handleInputChange}
                        placeholder="Describe your product, its unique features, and why it matters..."
                        className="premium-input premium-textarea"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="input-group">
                        <label className="input-label">Industry</label>
                        <input
                          type="text"
                          name="industry"
                          value={campaignData.industry}
                          onChange={handleInputChange}
                          placeholder="e.g., Fitness, Tech, Fashion"
                          className="premium-input"
                        />
                      </div>
                      <div className="input-group">
                        <label className="input-label">Primary Platform</label>
                        <select
                          name="platform"
                          value={campaignData.platform}
                          onChange={handleInputChange}
                          className="premium-input"
                        >
                          <option value="">Select Platform</option>
                          <option value="Instagram">Instagram</option>
                          <option value="TikTok">TikTok</option>
                          <option value="LinkedIn">LinkedIn</option>
                          <option value="X">X (Twitter)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="input-group">
                        <label className="input-label">Content Type</label>
                        <select
                          name="contentType"
                          value={campaignData.contentType}
                          onChange={handleInputChange}
                          className="premium-input"
                        >
                          <option value="">Select Type</option>
                          <option value="Image">Image</option>
                          <option value="Video">Video</option>
                          <option value="Carousel">Carousel</option>
                        </select>
                      </div>
                      <div className="input-group">
                        <label className="input-label">Timeline</label>
                        <input
                          type="text"
                          name="timeline"
                          value={campaignData.timeline}
                          onChange={handleInputChange}
                          placeholder="e.g., 3 Months"
                          className="premium-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 flex justify-center">
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={startGeneration}
                      disabled={!campaignData.productName || !campaignData.description}
                    >
                      Generate Strategy <Zap size={20} className="ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: AI Strategy Output */}
              {currentStep === 2 && (
                <div className="space-y-8 animate-fade-in-up">
                  <div className="text-center mb-12">
                    <h1 className="form-section-title">Strategic Blueprint</h1>
                    <p className="form-section-desc">Our AI has analyzed your brief and crafted a high-impact market entry strategy.</p>
                  </div>

                  <div className="grid md:grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-8">
                      <div className="strategy-card h-full">
                        <div className="strategy-card-header">
                          <Target size={20} className="text-accent" />
                          <span>Core Narrative</span>
                        </div>
                        <div className="strategy-card-body">
                          <div className="insight-pill">Campaign Theme: {aiOutput.strategy.campaign_theme}</div>
                          <div className="mb-8">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">The Emotional Hook</h3>
                            <p className="text-xl font-bold text-indigo-900 border-l-4 border-indigo-500 pl-4 italic">
                              "{aiOutput.strategy.emotional_hook}"
                            </p>
                          </div>
                          <p className="text-slate-600 leading-relaxed mb-8">
                            {aiOutput.strategy.strategy_summary}
                          </p>
                          <div className="space-y-3">
                            {aiOutput.strategy.why_it_works.map((point, i) => (
                              <div key={i} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <CheckCircle size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-slate-700 font-medium">{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-4 space-y-6">
                      <div className="strategy-card">
                        <div className="strategy-card-header">
                          <Zap size={20} className="text-accent" />
                          <span>Target Emotion</span>
                        </div>
                        <div className="strategy-card-body">
                          <div className="text-2xl font-black text-indigo-600">{aiOutput.strategy.target_emotion}</div>
                        </div>
                      </div>
                      <div className="strategy-card">
                        <div className="strategy-card-header">
                          <Layout size={20} className="text-accent" />
                          <span>Content Angle</span>
                        </div>
                        <div className="strategy-card-body">
                          <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            {aiOutput.strategy.content_angle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-12">
                    <Button variant="secondary" onClick={() => setCurrentStep(1)}>
                      <ArrowLeft size={20} className="mr-2" /> Back to Brief
                    </Button>
                    <Button variant="primary" onClick={generateCreative}>
                      Generate Creative Assets <Sparkles size={20} className="ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Creative Output */}
              {currentStep === 3 && (
                <div className="space-y-8 animate-fade-in-up">
                  <div className="text-center mb-12">
                    <h1 className="form-section-title">Creative Execution</h1>
                    <p className="form-section-desc">Visuals, copy, and channel strategies optimized for your core narrative.</p>
                  </div>

                  <div className="grid md:grid-cols-12 gap-8">
                    {/* Visual Identity */}
                    <div className="col-span-12 md:col-span-7">
                      <div className="strategy-card h-full">
                        <div className="strategy-card-header">
                          <Palette size={20} className="text-accent" />
                          <span>Visual Identity</span>
                        </div>
                        <div className="strategy-card-body">
                          <div className="mb-8">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Color Palette</h3>
                            <div className="flex gap-4 flex-wrap">
                              {aiOutput.visual_identity.color_palette.map((color, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                  <div className="w-12 h-12 rounded-xl shadow-sm border border-slate-100" style={{ background: color }} />
                                  <span className="text-[10px] font-mono font-bold text-slate-400">{color}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                            <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3">AI Image Prompt</h3>
                            <p className="text-sm font-medium leading-relaxed italic opacity-90">
                              "{aiOutput.visual_identity.image_prompt}"
                            </p>
                          </div>
                          
                          <div className="mt-6">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Mood & Aesthetic</h3>
                            <p className="text-sm text-slate-700 font-medium">{aiOutput.visual_identity.mood}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Copywriting */}
                    <div className="col-span-12 md:col-span-5">
                      <div className="strategy-card h-full">
                        <div className="strategy-card-header">
                          <MessageSquare size={20} className="text-accent" />
                          <span>Ad Copy Samples</span>
                        </div>
                        <div className="strategy-card-body space-y-4">
                          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                            <div className="text-[10px] font-bold text-indigo-600 mb-1 uppercase">Headline</div>
                            <p className="text-sm font-black text-slate-900">"{aiOutput.copywriting.ad_headline}"</p>
                          </div>
                          {aiOutput.copywriting.captions.slice(0, 3).map((caption, i) => (
                            <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                              <div className="text-[10px] font-bold text-slate-400 mb-1 uppercase">Social Caption {i+1}</div>
                              <p className="text-xs text-slate-600 italic">"{caption}"</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-12">
                    <Button variant="secondary" onClick={() => setCurrentStep(2)}>
                      <ArrowLeft size={20} className="mr-2" /> Back to Strategy
                    </Button>
                    <Button variant="primary" onClick={finalReview}>
                      Review & Export <CheckCircle size={20} className="ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Performance Prediction */}
              {currentStep === 4 && (
                <div className="space-y-8 animate-fade-in-up">
                  <div className="campaign-form-card">
                    <div className="text-center mb-12">
                      <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-emerald-600" />
                      </div>
                      <h1 className="form-section-title">Campaign Fully Orchestrated</h1>
                      <p className="form-section-desc">Your complete brand package is ready. We've also run a performance simulation.</p>
                    </div>

                    {/* Performance Predictor Dashboard (ML Backend Integration) */}
                    <div className="bg-slate-900 rounded-3xl p-8 mb-12 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-6 opacity-10">
                        <TrendingUp size={120} />
                      </div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest mb-8">
                          <BrainCircuit size={16} /> Performance Prediction Engine
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="text-slate-400 text-xs font-bold uppercase mb-2">Predicted Reach</div>
                            <div className="text-3xl font-black text-white">{aiOutput.performance_prediction.predicted_reach}</div>
                            <div className="text-[10px] text-emerald-400 font-bold mt-1">+12% vs Industry Avg</div>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="text-slate-400 text-xs font-bold uppercase mb-2">Engagement Rate</div>
                            <div className="text-3xl font-black text-white">{aiOutput.performance_prediction.engagement_rate}</div>
                            <div className="text-[10px] text-indigo-400 font-bold mt-1">High Potential</div>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="text-slate-400 text-xs font-bold uppercase mb-2">Effectiveness</div>
                            <div className="text-3xl font-black text-indigo-400">{aiOutput.performance_prediction.effectiveness}</div>
                            <div className="text-[10px] text-slate-500 font-bold mt-1">Based on ML Model v1.8</div>
                          </div>
                        </div>

                        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6">
                          <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-4">ML Optimization Recommendations</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {aiOutput.performance_prediction.recommendations.map((rec, i) => (
                              <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                <Zap size={14} className="text-indigo-400 mt-1 flex-shrink-0" />
                                <span>{rec}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-12 gap-8 mb-12">
                      <div className="col-span-12 md:col-span-7">
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 h-full">
                          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Layout size={18} className="text-accent" /> Media Plan Summary
                          </h3>
                          <div className="mb-6">
                            <div className="text-xs font-bold text-slate-500 mb-2 uppercase">Primary Platforms</div>
                            <div className="flex gap-2">
                              {aiOutput.media_plan.platforms.map((p, i) => (
                                <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700">{p}</span>
                              ))}
                            </div>
                          </div>
                          <div className="mb-6">
                            <div className="text-xs font-bold text-slate-500 mb-2 uppercase flex items-center gap-1"><Clock size={12} /> Posting Schedule</div>
                            <p className="text-sm text-slate-600 leading-relaxed">{aiOutput.media_plan.posting_schedule}</p>
                          </div>
                          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                            <div className="text-[10px] font-bold text-emerald-600 mb-1 uppercase">Primary CTA</div>
                            <p className="text-sm font-black text-emerald-900">"{aiOutput.media_plan.cta}"</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-12 md:col-span-5">
                        <div className="grid grid-cols-2 gap-4 h-full">
                          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
                            <div className="text-3xl font-black text-indigo-600 mb-1">12</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Visuals</div>
                          </div>
                          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
                            <div className="text-3xl font-black text-indigo-600 mb-1">24</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Copy Sets</div>
                          </div>
                          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
                            <div className="text-3xl font-black text-indigo-600 mb-1">8</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Influencers</div>
                          </div>
                          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
                            <div className="text-3xl font-black text-indigo-600 mb-1">1</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Media Plan</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button variant="primary" size="lg">
                        <Download size={20} className="mr-2" /> Export Campaign Package
                      </Button>
                      <Button variant="secondary" size="lg" onClick={() => {
                        setCompletedSteps([]);
                        setCurrentStep(1);
                      }}>
                        Start New Campaign
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateCampaignPage;
