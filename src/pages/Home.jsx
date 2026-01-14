import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle, TrendingUp, Users, Zap } from 'lucide-react';
import Button from '../components/Button';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section - Dark Background */}
      <section className="hero-dark">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} />
              <span>AI-Powered Brand Strategist</span>
            </div>
            
            <h1 className="hero-title">
              Powerful tools for autonomous<br />
              brand campaign creation
            </h1>
            
            <p className="hero-subtitle">
              From brief to deployment-ready campaign in minutes. Let AI handle strategy,<br />
              creative generation, and media planning while you focus on growth.
            </p>

            <div className="hero-cta">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="hero-email-input"
              />
              <Button variant="accent" className="hero-cta-btn">
                Try free for 30 days
              </Button>
            </div>

            {/* Floating Product Preview Cards */}
            <div className="product-preview">
              {/* Main Dashboard Preview */}
              <div className="preview-main">
                <div className="preview-window">
                  <div className="window-header">
                    <div className="window-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className="window-title">BrandPulse Studio</div>
                  </div>
                  <div className="window-content">
                    <div className="dashboard-mock">
                      <div className="sidebar-mock">
                        <div className="sidebar-item active">Campaign Overview</div>
                        <div className="sidebar-item">Visual Assets</div>
                        <div className="sidebar-item">Copywriting</div>
                        <div className="sidebar-item">Media Plan</div>
                      </div>
                      <div className="content-mock">
                        <div className="content-grid">
                          <div className="grid-item"></div>
                          <div className="grid-item"></div>
                          <div className="grid-item"></div>
                          <div className="grid-item"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="floating-card card-1">
                <div className="card-header">
                  <TrendingUp size={20} className="text-accent" />
                  <span>Campaign Performance</span>
                </div>
                <div className="metric-value">$476,697.04</div>
                <div className="metric-label">Estimated Reach Value</div>
              </div>

              {/* Floating Card 2 */}
              <div className="floating-card card-2">
                <div className="card-header">
                  <Users size={20} className="text-accent" />
                  <span>Audience Insights</span>
                </div>
                <div className="insight-stats">
                  <div className="stat">
                    <div className="stat-value">237</div>
                    <div className="stat-label">Impressions</div>
                  </div>
                  <div className="stat">
                    <div className="stat-value">82</div>
                    <div className="stat-label">Engagement</div>
                  </div>
                </div>
              </div>

              {/* Floating Card 3 */}
              <div className="floating-card card-3">
                <div className="ai-suggestion">
                  <Sparkles size={16} className="text-accent" />
                  <span>Suggestions by AI Assist</span>
                </div>
                <div className="suggestion-text">
                  Create 3 posts optimizing from best performing content
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Marquee Section */}
      <section className="logo-marquee-section">
        <div className="marquee-container">
          <div className="marquee-label">Trusted by innovative teams worldwide</div>
          <div className="marquee-wrapper">
            <div className="marquee-content">
              {[
                'Atlassian', 'HP', 'Unicef', 'Campbells', 'Rackspace', 'Equifax', 'Glassdoor', 'Evernote',
                'Atlassian', 'HP', 'Unicef', 'Campbells', 'Rackspace', 'Equifax', 'Glassdoor', 'Evernote'
              ].map((brand, i) => (
                <div key={i} className="logo-item">
                  <Zap size={24} className="text-accent" />
                  <span>{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview Section */}
      <section className="features-overview">
        <div className="container">
          <div className="feature-showcase">
            <div className="showcase-visual">
              <div className="visual-card">
                <div className="visual-header">
                  <div className="visual-tabs">
                    <span className="tab active">Strategy Brief</span>
                    <span className="tab">Visual Assets</span>
                    <span className="tab">Copywriting</span>
                  </div>
                </div>
                <div className="visual-content">
                  <div className="content-section">
                    <div className="section-title">Campaign Theme</div>
                    <div className="section-text">"Hydrate Responsibly" - A sustainability-focused campaign</div>
                  </div>
                  <div className="content-section">
                    <div className="section-title">Target Audience</div>
                    <div className="audience-tags">
                      <span className="tag">Ages 25-40</span>
                      <span className="tag">Urban professionals</span>
                      <span className="tag">Eco-conscious</span>
                    </div>
                  </div>
                  <div className="ai-badge">
                    <Sparkles size={14} />
                    <span>AI Generated Strategy</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="showcase-content">
              <h2>Own every brand campaign touchpoint</h2>
              <p>
                Simplify workflows and collaboration to make sure your brand is always 
                active where (and when) it matters most.
              </p>
              <Link to="/create-campaign" className="showcase-link">
                Create your first campaign <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="feature-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <Sparkles size={24} />
              </div>
              <h3>AI Strategy & Reasoning</h3>
              <p>Leverage AI to analyze market data and formulate core campaign strategies with speed and empathy.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <Zap size={24} />
              </div>
              <h3>Creative Generation</h3>
              <p>Access AI-powered tools that generate visuals, copy, and media plans tailored to your campaign theme.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <TrendingUp size={24} />
              </div>
              <h3>Performance Analytics</h3>
              <p>Track campaign performance with real-time analytics that reveal insights and showcase your impact.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <Users size={24} />
              </div>
              <h3>Team Collaboration</h3>
              <p>Work together seamlessly with your team to review, edit, and refine campaign assets in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="integrations-section">
        <div className="container">
          <div className="integrations-header">
            <h2>Trusted partnerships and integrations<br />across leading platforms</h2>
            <p>
              BrandPulse builds and maintains strong network partnerships and integrations 
              to help you unify your customer touch points and keep pace with changes in 
              the digital landscape.
            </p>
            <a href="#" className="integrations-link">See all integrations</a>
          </div>

          <div className="integrations-grid">
            <div className="integration-logo">
              <div className="logo-placeholder" style={{ background: 'linear-gradient(45deg, #833AB4, #FD1D1D, #F77737)' }}>
                <span style={{ color: 'white', fontWeight: 'bold' }}>IG</span>
              </div>
            </div>
            <div className="integration-logo">
              <div className="logo-placeholder" style={{ background: '#1877F2' }}>
                <span style={{ color: 'white', fontWeight: 'bold' }}>FB</span>
              </div>
            </div>
            <div className="integration-logo">
              <div className="logo-placeholder" style={{ background: '#0A66C2' }}>
                <span style={{ color: 'white', fontWeight: 'bold' }}>in</span>
              </div>
            </div>
            <div className="integration-logo">
              <div className="logo-placeholder" style={{ background: '#1DA1F2' }}>
                <span style={{ color: 'white', fontWeight: 'bold' }}>X</span>
              </div>
            </div>
            <div className="integration-logo">
              <div className="logo-placeholder" style={{ background: '#FF0000' }}>
                <span style={{ color: 'white', fontWeight: 'bold' }}>YT</span>
              </div>
            </div>
            <div className="integration-logo">
              <div className="logo-placeholder" style={{ background: '#25D366' }}>
                <span style={{ color: 'white', fontWeight: 'bold' }}>WA</span>
              </div>
            </div>
            <div className="integration-logo">
              <div className="logo-placeholder" style={{ background: '#FF4500' }}>
                <span style={{ color: 'white', fontWeight: 'bold' }}>RD</span>
              </div>
            </div>
            <div className="integration-logo">
              <div className="logo-placeholder" style={{ background: '#00AFF0' }}>
                <span style={{ color: 'white', fontWeight: 'bold' }}>SK</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Try free for 30 days - no credit card required</h2>
            <p>Join thousands of marketing teams using BrandPulse to create better campaigns, faster.</p>
            <div className="cta-buttons">
              <Link to="/create-campaign">
                <Button variant="accent" className="cta-btn-large">
                  Start free trial
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="secondary" className="cta-btn-large">
                  Schedule a demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
