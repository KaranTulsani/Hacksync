import React from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  Type, 
  Users, 
  Calendar, 
  Download, 
  Zap, 
  Shield, 
  ArrowRight,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Button from '../components/Button';
import './Features.css';

const FeaturesPage = () => {
  return (
    <div className="features-page">
      {/* Hero Section */}
      <section className="features-hero">
        <div className="container">
          <div className="features-badge">
            <Sparkles size={16} />
            <span>The Power of AI</span>
          </div>
          <h1>Everything you need to<br />build a world-class brand</h1>
          <p>
            StratOS combines strategic reasoning with creative orchestration 
            to deliver professional-grade campaigns in record time.
          </p>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="container">
        <div className="bento-grid">
          {/* Large Card: AI Strategy */}
          <div className="bento-card card-large">
            <div className="card-icon">
              <BrainCircuit size={28} />
            </div>
            <h3 className="card-title">AI Strategy & Reasoning</h3>
            <p className="card-description">
              Our core engine analyzes market trends, competitor data, and your brand essence 
              to formulate a winning campaign strategy. It doesn't just generate; it reasons.
            </p>
            <div className="card-visual strategy-visual">
              <div className="node-network">
                <div className="node" style={{ top: '20%', left: '30%' }}></div>
                <div className="node" style={{ top: '50%', left: '10%' }}></div>
                <div className="node" style={{ top: '80%', left: '40%' }}></div>
                <div className="node" style={{ top: '30%', left: '70%' }}></div>
                <div className="node" style={{ top: '60%', left: '90%' }}></div>
                <div className="node" style={{ top: '10%', left: '80%' }}></div>
              </div>
            </div>
          </div>

          {/* Medium Card: Visual Identity */}
          <div className="bento-card card-medium">
            <div className="card-icon">
              <Sparkles size={28} />
            </div>
            <h3 className="card-title">Visual Identity Systems</h3>
            <p className="card-description">
              Generate cohesive mood boards, color palettes, and visual assets that 
              perfectly align with your campaign's strategic theme.
            </p>
            <div className="card-visual creative-visual">
              <div className="color-swatch" style={{ background: '#6366f1' }}></div>
              <div className="color-swatch" style={{ background: '#a855f7' }}></div>
              <div className="color-swatch" style={{ background: '#ec4899' }}></div>
              <div className="color-swatch" style={{ background: '#f97316' }}></div>
            </div>
          </div>

          {/* Small Card: Copywriting */}
          <div className="bento-card card-small">
            <div className="card-icon">
              <Type size={28} />
            </div>
            <h3 className="card-title">AI Copywriting</h3>
            <p className="card-description">
              Multi-channel copy that speaks your brand's voice.
            </p>
          </div>

          {/* Small Card: Market Research */}
          <div className="bento-card card-small">
            <div className="card-icon">
              <Users size={28} />
            </div>
            <h3 className="card-title">Market Research</h3>
            <p className="card-description">
              Identify target personas and influencer matches.
            </p>
          </div>

          {/* Medium Card: Media Planning */}
          <div className="bento-card card-medium">
            <div className="card-icon">
              <Calendar size={28} />
            </div>
            <h3 className="card-title">Media Planning & Scheduling</h3>
            <p className="card-description">
              Optimized posting schedules and channel strategies across Instagram, 
              Facebook, LinkedIn, and more.
            </p>
          </div>

          {/* Small Card: Export */}
          <div className="bento-card card-small">
            <div className="card-icon">
              <Download size={28} />
            </div>
            <h3 className="card-title">One-Click Export</h3>
            <p className="card-description">
              Package everything for deployment instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="comparison-section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The StratOS Advantage</h2>
            <p className="text-lg text-secondary">How we compare to the traditional agency model.</p>
          </div>

          <div className="comparison-grid">
            {/* Traditional */}
            <div className="comp-card">
              <h3 className="comp-title text-gray-500">Traditional Agency</h3>
              <div className="comp-list">
                <div className="comp-item negative">
                  <XCircle size={20} className="cross-icon" />
                  <span>4-6 weeks for strategy development</span>
                </div>
                <div className="comp-item negative">
                  <XCircle size={20} className="cross-icon" />
                  <span>High overhead and agency fees</span>
                </div>
                <div className="comp-item negative">
                  <XCircle size={20} className="cross-icon" />
                  <span>Manual coordination between teams</span>
                </div>
                <div className="comp-item negative">
                  <XCircle size={20} className="cross-icon" />
                  <span>Limited revisions and slow feedback</span>
                </div>
              </div>
            </div>

            {/* StratOS */}
            <div className="comp-card premium">
              <h3 className="comp-title">StratOS AI</h3>
              <div className="comp-list">
                <div className="comp-item positive">
                  <CheckCircle size={20} className="check-icon" />
                  <span>Minutes from brief to full campaign</span>
                </div>
                <div className="comp-item positive">
                  <CheckCircle size={20} className="check-icon" />
                  <span>Fraction of the cost of an agency</span>
                </div>
                <div className="comp-item positive">
                  <CheckCircle size={20} className="check-icon" />
                  <span>Seamless autonomous orchestration</span>
                </div>
                <div className="comp-item positive">
                  <CheckCircle size={20} className="check-icon" />
                  <span>Infinite revisions and instant updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding text-center">
        <div className="container">
          <h2 className="text-4xl font-bold mb-6">Ready to experience the future?</h2>
          <p className="text-xl text-secondary mb-10 max-w-2xl mx-auto cta-text">
            Join the forward-thinking brands using StratOS to dominate their market.
          </p>
          <div className="cta-button-group">
            <Button variant="primary" onClick={() => window.location.href='/create-campaign'}>
              Start Creating <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button variant="secondary" onClick={() => window.location.href='/demo'}>
              View Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
