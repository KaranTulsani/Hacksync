import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  AlertCircle,
  CheckCircle,
  ArrowRight,
  BarChart2,
  Palette,
  Users,
  Clock,
  ChevronDown,
  Lightbulb,
  Shield
} from 'lucide-react';
import { getCompetitors, analyzeCompetitor } from '../services/api';
import './CompetitorInsight.css';

const CompetitorInsight = ({ industry, userCampaign }) => {
  const [competitors, setCompetitors] = useState([]);
  const [selectedCompetitor, setSelectedCompetitor] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCompetitors();
  }, [industry]);

  const loadCompetitors = async () => {
    try {
      setLoading(true);
      const data = await getCompetitors(industry || 'General');
      setCompetitors(data.competitors || []);
      
      // Auto-select first competitor
      if (data.competitors && data.competitors.length > 0) {
        selectCompetitor(data.competitors[0].name);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectCompetitor = async (competitorName) => {
    try {
      setSelectedCompetitor(competitorName);
      setLoading(true);
      setError(null);
      
      // Pass industry as the third argument to fix 422 error
      const analysisData = await analyzeCompetitor(competitorName, userCampaign, industry);
      setAnalysis(analysisData);
    } catch (err) {
      console.error('Competitor analysis error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !analysis) {
    return (
      <div className="competitor-loading">
        <BarChart2 size={32} className="loading-icon" />
        <p>Analyzing competitive landscape...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="competitor-error">
        <AlertCircle size={24} />
        <p>{error}</p>
      </div>
    );
  }

  if (!analysis) return null;

  const competitor = analysis.competitor;
  const differentiation = analysis.differentiation_strategy;
  const comparison = analysis.comparison_metrics;

  return (
    <div className="competitor-insight-container">
      {/* Header */}
      <div className="competitor-header">
        <div className="header-icon">
          <Target size={28} />
        </div>
        <div>
          <h2 className="competitor-title">Competitive Intelligence</h2>
          <p className="competitor-subtitle">Strategic differentiation insights for your campaign</p>
        </div>
      </div>

      {/* Competitor Selector */}
      <div className="competitor-selector">
        <label className="selector-label">Analyzing Against:</label>
        <div className="selector-dropdown">
          <select 
            value={selectedCompetitor} 
            onChange={(e) => selectCompetitor(e.target.value)}
            className="competitor-select"
          >
            {competitors.map((comp) => (
              <option key={comp.name} value={comp.name}>
                {comp.name}
              </option>
            ))}
          </select>
          <ChevronDown size={20} className="dropdown-icon" />
        </div>
      </div>

      {/* Main Comparison Grid */}
      <div className="comparison-grid">
        
        {/* Competitor Profile Card */}
        <div className="profile-card competitor-profile">
          <div className="profile-badge">Competitor</div>
          <h3 className="profile-name">{competitor.name}</h3>
          
          <div className="profile-section">
            <div className="section-label">Campaign Theme</div>
            <div className="theme-text">"{competitor.campaign_theme}"</div>
          </div>

          <div className="profile-section">
            <div className="section-label">Target Emotion</div>
            <div className="emotion-text">{competitor.target_emotion}</div>
          </div>

          <div className="profile-section">
            <div className="section-label">Color Palette</div>
            <div className="color-row">
              {competitor.color_palette.map((color, i) => (
                <div 
                  key={i} 
                  className="color-dot" 
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="profile-section">
            <div className="section-label">Content Strategy</div>
            <div className="strategy-text">{competitor.content_strategy}</div>
          </div>
        </div>

        {/* Your Profile Card */}
        <div className="profile-card your-profile">
          <div className="profile-badge your-badge">Your Campaign</div>
          <h3 className="profile-name">{userCampaign.product || 'Your Brand'}</h3>
          
          <div className="profile-section">
            <div className="section-label">Campaign Theme</div>
            <div className="theme-text">"{userCampaign.strategy?.campaign_theme || 'Your Unique Theme'}"</div>
          </div>

          <div className="profile-section">
            <div className="section-label">Target Emotion</div>
            <div className="emotion-text">{userCampaign.strategy?.target_emotion || 'Your Emotion'}</div>
          </div>

          <div className="profile-section">
            <div className="section-label">Color Palette</div>
            <div className="color-row">
              {(userCampaign.visual_identity?.color_palette || ['#6366f1', '#10b981', '#f59e0b', '#ef4444']).map((color, i) => (
                <div 
                  key={i} 
                  className="color-dot" 
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="profile-section">
            <div className="section-label">Your Advantage</div>
            <div className="advantage-text">
              <Zap size={16} />
              {differentiation.positioning_statement}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Comparison */}
      <div className="metrics-comparison">
        <h3 className="metrics-title">
          <BarChart2 size={20} />
          Performance Benchmarks
        </h3>
        
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-label">Engagement Rate</div>
            <div className="metric-values">
              <div className="metric-value competitor-value">
                {comparison.engagement_rate.competitor}
                <span className="value-label">Competitor</span>
              </div>
              <ArrowRight size={20} className="metric-arrow" />
              <div className="metric-value your-value">
                {comparison.engagement_rate.yours}
                <span className="value-label">You</span>
              </div>
            </div>
            <div className="metric-insight">{comparison.engagement_rate.advantage}</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Posting Frequency</div>
            <div className="metric-values">
              <div className="metric-value competitor-value">
                {comparison.posting_frequency.competitor}
                <span className="value-label">Competitor</span>
              </div>
            </div>
            <div className="metric-insight">{comparison.posting_frequency.recommendation}</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Platform Strategy</div>
            <div className="metric-values">
              <div className="metric-value competitor-value">
                {comparison.platform_presence.competitor}
                <span className="value-label">Competitor</span>
              </div>
            </div>
            <div className="metric-insight">{comparison.platform_presence.recommendation}</div>
          </div>
        </div>
      </div>

      {/* Differentiation Strategies */}
      <div className="differentiation-section">
        <div className="diff-header">
          <Lightbulb size={24} />
          <div>
            <h3 className="diff-title">Your Differentiation Strategy</h3>
            <p className="diff-summary">{differentiation.summary}</p>
          </div>
        </div>

        <div className="strategies-grid">
          {differentiation.strategies.map((strategy, i) => (
            <div key={i} className="strategy-card">
              <div className="strategy-type">
                <Shield size={16} />
                {strategy.type}
              </div>
              
              <div className="strategy-content">
                <div className="strategy-insight">
                  <strong>Insight:</strong> {strategy.insight || strategy.competitor_weakness}
                </div>
                <div className="strategy-advantage">
                  <CheckCircle size={16} />
                  <strong>Your Advantage:</strong> {strategy.your_advantage || strategy.your_opportunity}
                </div>
                <div className="strategy-action">
                  <Zap size={16} />
                  <strong>Action:</strong> {strategy.action}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitor Weaknesses */}
      <div className="weaknesses-section">
        <h4 className="weaknesses-title">
          <AlertCircle size={18} />
          Competitor Vulnerabilities to Exploit
        </h4>
        <div className="weaknesses-grid">
          {competitor.weaknesses.map((weakness, i) => (
            <div key={i} className="weakness-item">
              <div className="weakness-icon">!</div>
              <span>{weakness}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Positioning Statement */}
      <div className="positioning-statement">
        <div className="positioning-icon">
          <Target size={24} />
        </div>
        <div>
          <div className="positioning-label">Your Positioning Statement</div>
          <div className="positioning-text">"{differentiation.positioning_statement}"</div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorInsight;
