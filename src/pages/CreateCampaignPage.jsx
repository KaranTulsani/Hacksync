import React, { useState } from 'react';
import { 
  FileText, 
  BrainCircuit, 
  Download,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Zap,
  Target,
  Palette,
  MessageSquare,
  Clock,
  TrendingUp,
  Layout,
  Users,
  Calendar,
  AlertCircle,
  Lightbulb,
  Eye,
  RefreshCw,
  Search,
  DollarSign,
  Globe,
  Video,
  Hash,
  Briefcase,
  Settings,
  Layers,
  BarChart2
} from 'lucide-react';
import Button from '../components/Button';
import { generateCampaign } from '../services/api';
import './CreateCampaign.css';

const CreateCampaignPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [error, setError] = useState(null);
  
  const [campaignData, setCampaignData] = useState({
    productName: '',
    description: '',
    targetAudience: '',
    goals: '',
    tone: 'Professional yet approachable',
    budget: '',
    timeline: '',
    industry: '',
    platform: 'Instagram',
    contentType: 'Reel'
  });

  const [aiOutput, setAiOutput] = useState(null);

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

  const startGeneration = async () => {
    setCompletedSteps([1]);
    setCurrentStep(2);
    setIsGenerating(true);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    try {
      const result = await generateCampaign({
        productName: campaignData.productName,
        targetAudience: campaignData.targetAudience,
        goal: campaignData.goals,
        tone: campaignData.tone,
        budget: campaignData.budget || '$5,000 - $10,000',
        campaign_duration: campaignData.timeline || '3 Months',
        platform: campaignData.platform,
        content_type: campaignData.contentType,
        industry: campaignData.industry
      });
      
      setAiOutput(result);
      setIsGenerating(false);
      
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message);
      setIsGenerating(false);
    }
  };

  const generateCreative = () => {
    setCompletedSteps([1, 2]);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const finalReview = () => {
    setCompletedSteps([1, 2, 3]);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getProgressWidth = () => {
    return ((currentStep - 1) / (steps.length - 1)) * 100 + '%';
  };

  const formatNumber = (num) => {
    if (typeof num === 'string') return num;
    return num?.toLocaleString() || '0';
  };

  return (
    <div className="create-campaign-page">
      {/* Sticky Stepper */}
      <header className="stepper-header">
        <div className="stepper-container">
          {steps.map((step) => (
            <div key={step.id} className={`step-item ${currentStep === step.id ? 'active' : ''} ${completedSteps.includes(step.id) ? 'completed' : ''}`}>
              <div className="step-icon-wrapper">
                {completedSteps.includes(step.id) ? <CheckCircle size={18} /> : <span>{step.id}</span>}
              </div>
              <span className="step-title">{step.title}</span>
            </div>
          ))}
        </div>
      </header>

      <main className="campaign-container">
        
          {isGenerating ? (
            <div className="ai-loading-overlay">
              <div className="loading-pulse">
                <BrainCircuit size={48} style={{ color: '#6366f1' }} />
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem' }}>
                Crafting Your Campaign...
              </h2>
              <p style={{ color: '#64748b', fontSize: '1.125rem' }}>
                Analyzing market trends, generating creative assets, and predicting performance.
              </p>
            </div>
          ) : (
            <>
              {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '1rem', padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', maxWidth: '1000px', margin: '0 auto 2rem' }}>
                  <AlertCircle size={20} style={{ color: '#dc2626' }} />
                  <div>
                    <p style={{ color: '#dc2626', fontWeight: 600, margin: 0 }}>Connection Issue</p>
                    <p style={{ color: '#b91c1c', fontSize: '0.875rem', margin: 0 }}>Using demo mode. Start backend: <code style={{ background: '#fee2e2', padding: '0.125rem 0.5rem', borderRadius: '0.25rem' }}>python server.py</code></p>
                  </div>
                </div>
              )}

              {/* Step 1: Brief */}
              {currentStep === 1 && (
                <div className="animate-fade-in-up">
                  <div className="result-section-header">
                    <h1>Let's Build Your Campaign</h1>
                    <p>Tell us about your brand. Our AI strategist will handle the rest.</p>
                  </div>

                  {/* Section 1: Brand Identity */}
                  <div className="form-section">
                    <div className="form-section-header">
                      <div className="section-icon">
                        <Zap size={24} />
                      </div>
                      <h3 className="form-section-title">Brand Identity</h3>
                    </div>
                    
                    <div className="input-group">
                      <label className="input-label">Product or Brand Name <span style={{color: '#ef4444'}}>*</span></label>
                      <div className="input-wrapper">
                        <Layers size={20} className="input-icon" />
                        <input 
                          type="text" 
                          name="productName" 
                          value={campaignData.productName} 
                          onChange={handleInputChange} 
                          placeholder="e.g., FitPulse Smart Tracker" 
                          className="premium-input" 
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <label className="input-label">Description & USP</label>
                      <div className="input-wrapper">
                        <FileText size={20} className="input-icon" />
                        <textarea 
                          name="description" 
                          value={campaignData.description} 
                          onChange={handleInputChange} 
                          placeholder="Describe your product, key features, and what makes it unique..." 
                          className="premium-input premium-textarea" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Audience & Goals */}
                  <div className="form-section">
                    <div className="form-section-header">
                      <div className="section-icon target">
                        <Target size={24} />
                      </div>
                      <h3 className="form-section-title">Audience & Goals</h3>
                    </div>

                    <div className="settings-grid">
                      <div className="input-group full-width">
                        <label className="input-label">Target Audience <span style={{color: '#ef4444'}}>*</span></label>
                        <div className="input-wrapper">
                          <Users size={20} className="input-icon" />
                          <input 
                            type="text" 
                            name="targetAudience" 
                            value={campaignData.targetAudience} 
                            onChange={handleInputChange} 
                            placeholder="e.g., Health-conscious millennials, Tech professionals" 
                            className="premium-input" 
                          />
                        </div>
                      </div>

                      <div className="input-group">
                        <label className="input-label">Primary Goal</label>
                        <div className="input-wrapper">
                          <TrendingUp size={20} className="input-icon" />
                          <input 
                            type="text" 
                            name="goals" 
                            value={campaignData.goals} 
                            onChange={handleInputChange} 
                            placeholder="e.g., Brand Awareness" 
                            className="premium-input" 
                          />
                        </div>
                      </div>

                      <div className="input-group">
                        <label className="input-label">Industry</label>
                        <div className="input-wrapper">
                          <Briefcase size={20} className="input-icon" />
                          <select name="industry" value={campaignData.industry} onChange={handleInputChange} className="premium-input">
                            <option value="">Select Industry</option>
                            <option value="Fitness">Fitness</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Technology">Technology</option>
                            <option value="Food & Beverage">Food & Beverage</option>
                            <option value="Education">Education</option>
                            <option value="General">General</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Campaign Settings */}
                  <div className="form-section">
                    <div className="form-section-header">
                      <div className="section-icon settings">
                        <Settings size={24} />
                      </div>
                      <h3 className="form-section-title">Campaign Settings</h3>
                    </div>

                    <div className="settings-grid">
                      <div className="input-group">
                        <label className="input-label">Platform</label>
                        <div className="input-wrapper">
                          <Globe size={20} className="input-icon" />
                          <select name="platform" value={campaignData.platform} onChange={handleInputChange} className="premium-input">
                            <option value="Instagram">Instagram</option>
                            <option value="TikTok">TikTok</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="YouTube">YouTube</option>
                            <option value="Facebook">Facebook</option>
                          </select>
                        </div>
                      </div>

                      <div className="input-group">
                        <label className="input-label">Content Type</label>
                        <div className="input-wrapper">
                          <Video size={20} className="input-icon" />
                          <select name="contentType" value={campaignData.contentType} onChange={handleInputChange} className="premium-input">
                            <option value="Reel">Reel / Short</option>
                            <option value="Video">Video</option>
                            <option value="Image">Image</option>
                            <option value="Carousel">Carousel</option>
                            <option value="Article">Article</option>
                          </select>
                        </div>
                      </div>

                      <div className="input-group">
                        <label className="input-label">Budget Range</label>
                        <div className="input-wrapper">
                          <DollarSign size={20} className="input-icon" />
                          <input 
                            type="text" 
                            name="budget" 
                            value={campaignData.budget} 
                            onChange={handleInputChange} 
                            placeholder="e.g., $5,000 - $10,000" 
                            className="premium-input" 
                          />
                        </div>
                      </div>

                      <div className="input-group">
                        <label className="input-label">Duration</label>
                        <div className="input-wrapper">
                          <Clock size={20} className="input-icon" />
                          <select name="timeline" value={campaignData.timeline} onChange={handleInputChange} className="premium-input">
                            <option value="">Select Duration</option>
                            <option value="1 Month">1 Month</option>
                            <option value="2 Months">2 Months</option>
                            <option value="3 Months">3 Months</option>
                            <option value="6 Months">6 Months</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="generate-area">
                    <Button variant="primary" size="lg" onClick={startGeneration} disabled={!campaignData.productName || !campaignData.targetAudience}>
                      Generate Campaign Strategy <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Strategy */}
              {currentStep === 2 && aiOutput && (
                <div className="animate-fade-in-up">
                  <div className="result-section-header">
                    <h1>Strategic Blueprint</h1>
                    <p>AI-crafted strategy tailored to your brand and audience</p>
                  </div>

                  {/* Main Strategy Card */}
                  <div className="form-section">
                    <div className="form-section-header">
                      <div className="section-icon">
                        <Target size={24} />
                      </div>
                      <h3 className="form-section-title">Core Strategy</h3>
                    </div>
                    
                    <div className="theme-badge">
                      <Lightbulb size={14} />
                      {aiOutput.strategy?.campaign_theme}
                    </div>
                    
                    <div className="emotional-hook">
                      "{aiOutput.strategy?.emotional_hook}"
                    </div>
                    
                    <p className="strategy-summary">
                      {aiOutput.strategy?.strategy_summary}
                    </p>

                    <div className="why-it-works">
                      {aiOutput.strategy?.why_it_works?.slice(0, 4).map((point, i) => (
                        <div key={i} className="why-item">
                          <CheckCircle size={18} />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Side Cards Grid */}
                  <div className="settings-grid">
                    <div className="side-card">
                      <div className="side-card-header">
                        <Zap size={18} /> Target Emotion
                      </div>
                      <div className="side-card-value large">
                        {aiOutput.strategy?.target_emotion}
                      </div>
                    </div>

                    <div className="side-card">
                      <div className="side-card-header">
                        <Eye size={18} /> Content Angle
                      </div>
                      <div className="side-card-value">
                        {aiOutput.strategy?.content_angle}
                      </div>
                    </div>
                  </div>

                  <div className="generate-area" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="secondary" onClick={() => setCurrentStep(1)}>
                      <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Edit Brief
                    </Button>
                    <Button variant="primary" onClick={generateCreative}>
                      View Creative Assets <Sparkles size={18} style={{ marginLeft: '0.5rem' }} />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Creative */}
              {currentStep === 3 && aiOutput && (
                <div className="animate-fade-in-up">
                  <div className="result-section-header">
                    <h1>Creative Assets</h1>
                    <p>Visual identity, copy, and content optimized for {campaignData.platform}</p>
                  </div>

                  {/* Visual Identity */}
                  <div className="form-section">
                    <div className="form-section-header">
                      <div className="section-icon creative">
                        <Palette size={24} />
                      </div>
                      <h3 className="form-section-title">Visual Identity</h3>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                      <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.5rem' }}>Color Palette</p>
                      <div className="color-palette">
                        {aiOutput.visual_identity?.color_palette?.map((color, i) => (
                          <div key={i} className="color-swatch">
                            <div className="swatch" style={{ background: color }} />
                            <span className="color-code">{color}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="image-prompt-box">
                      <p className="prompt-text">"{aiOutput.visual_identity?.image_prompt}"</p>
                    </div>
                  </div>

                  {/* Copywriting */}
                  <div className="form-section">
                    <div className="form-section-header">
                      <div className="section-icon target">
                        <MessageSquare size={24} />
                      </div>
                      <h3 className="form-section-title">Ad Copy</h3>
                    </div>

                    <div className="copy-grid">
                      <div className="caption-card headline">
                        <div className="caption-label">Headline</div>
                        <div className="caption-text">{aiOutput.copywriting?.ad_headline}</div>
                      </div>
                      
                      {aiOutput.copywriting?.captions?.slice(0, 3).map((caption, i) => (
                        <div key={i} className="caption-card">
                          <div className="caption-label">Caption {i + 1}</div>
                          <div className="caption-text">"{caption}"</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="generate-area" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="secondary" onClick={() => setCurrentStep(2)}>
                      <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Back to Strategy
                    </Button>
                    <Button variant="primary" onClick={finalReview}>
                      Review & Export <CheckCircle size={18} style={{ marginLeft: '0.5rem' }} />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && aiOutput && (
                <div className="animate-fade-in-up">
                  <div className="result-section-header">
                    <h1>Campaign Ready!</h1>
                    <p>Your AI-powered campaign package is complete</p>
                  </div>

                  {/* Performance Dashboard */}
                  <div className="performance-dashboard">
                    <div className="dashboard-header">
                      <BarChart2 size={28} style={{ color: '#6366f1' }} />
                      <h3>Performance Prediction Engine</h3>
                    </div>

                    <div className="metrics-row">
                      <div className="metric-box">
                        <div className="metric-label">Predicted Reach</div>
                        <div className="metric-value">{formatNumber(aiOutput.performance_prediction?.predicted_reach)}</div>
                        <div className="metric-sub">+12% vs Industry</div>
                      </div>
                      <div className="metric-box">
                        <div className="metric-label">Engagement Rate</div>
                        <div className="metric-value">{aiOutput.performance_prediction?.engagement_rate}</div>
                        <div className="metric-sub" style={{ color: '#818cf8' }}>
                          vs {aiOutput.performance_prediction?.industry_average || '3.5%'} Avg
                        </div>
                      </div>
                      <div className="metric-box">
                        <div className="metric-label">Effectiveness</div>
                        <div className="metric-value" style={{ color: '#10b981' }}>{aiOutput.performance_prediction?.effectiveness}</div>
                        <div className="metric-sub" style={{ color: '#94a3b8' }}>ML Analysis</div>
                      </div>
                    </div>

                    <div className="recommendations-box">
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Optimization Recommendations</h4>
                      <div className="rec-grid">
                        {aiOutput.performance_prediction?.recommendations?.slice(0, 4).map((rec, i) => (
                          <div key={i} className="rec-item">
                            <Zap size={16} style={{ color: '#818cf8', flexShrink: 0, marginTop: '2px' }} />
                            <span>{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  {aiOutput.campaign_timeline && (
                    <div className="form-section">
                      <div className="form-section-header">
                        <div className="section-icon timeline">
                          <Calendar size={24} />
                        </div>
                        <h3 className="form-section-title">Campaign Timeline</h3>
                      </div>
                      
                      <div className="timeline-container">
                        {aiOutput.campaign_timeline.phases?.map((phase, i) => (
                          <div key={i} className="timeline-phase">
                            <div className="phase-dot" />
                            <div className="phase-content">
                              <div className="phase-header">
                                <span className="phase-title">{phase.phase_name}</span>
                                <span className="phase-duration">{phase.duration}</span>
                              </div>
                              <p style={{ fontSize: '0.9375rem', color: '#334155', marginBottom: '1rem', fontWeight: 500 }}>{phase.objective}</p>
                              <div className="phase-activities">
                                {phase.key_activities?.slice(0, 4).map((activity, j) => (
                                  <div key={j} className="activity">{activity}</div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="generate-area" style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <Button variant="primary" size="lg" onClick={() => {
                      const dataStr = JSON.stringify(aiOutput, null, 2);
                      const blob = new Blob([dataStr], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `campaign-${campaignData.productName?.replace(/\s+/g, '-') || 'export'}.json`;
                      a.click();
                    }}>
                      <Download size={20} style={{ marginRight: '0.5rem' }} /> Export Campaign
                    </Button>
                    <Button variant="secondary" size="lg" onClick={() => {
                      setCompletedSteps([]);
                      setCurrentStep(1);
                      setAiOutput(null);
                      setCampaignData({
                        productName: '', description: '', targetAudience: '', goals: '',
                        tone: 'Professional yet approachable', budget: '', timeline: '',
                        industry: '', platform: 'Instagram', contentType: 'Reel'
                      });
                    }}>
                      <RefreshCw size={20} style={{ marginRight: '0.5rem' }} /> New Campaign
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
      </main>
    </div>
  );
};

export default CreateCampaignPage;
