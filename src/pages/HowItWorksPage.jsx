import React, { useEffect } from 'react';
import { FileText, BrainCircuit, Wand2, Layout, ArrowRight, CheckCircle, Sparkles, Zap, Target, Rocket } from 'lucide-react';
import Button from '../components/Button';
import './HowItWorks.css';

const HowItWorksPage = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      title: 'Strategic Briefing',
      description: 'Our AI ingests your high-level goals and product essence to build a foundational understanding.',
      icon: <FileText size={32} />,
      color: 'blue',
      details: [
        'Deep product analysis',
        'Market positioning',
        'Goal alignment',
        'Constraint mapping'
      ],
      mockUI: (
        <div className="mock-ui-brief">
          <div className="mock-line short"></div>
          <div className="mock-line long"></div>
          <div className="mock-line medium"></div>
          <div className="mock-input">EcoBottle Launch</div>
          <div className="mock-tags">
            <span>Sustainability</span>
            <span>Premium</span>
          </div>
        </div>
      )
    },
    {
      title: 'Autonomous Reasoning',
      description: 'The BrandPulse brain orchestrates a complex strategy, analyzing competitors and defining your unique voice.',
      icon: <BrainCircuit size={32} />,
      color: 'purple',
      details: [
        'Competitor benchmarking',
        'Persona development',
        'Strategic narrative',
        'Tone of voice definition'
      ],
      mockUI: (
        <div className="mock-ui-brain">
          <div className="brain-node center"></div>
          <div className="brain-node n1"></div>
          <div className="brain-node n2"></div>
          <div className="brain-node n3"></div>
          <div className="brain-connection c1"></div>
          <div className="brain-connection c2"></div>
          <div className="brain-connection c3"></div>
        </div>
      )
    },
    {
      title: 'Creative Orchestration',
      description: 'Specialized generative models work in harmony to produce stunning visuals and compelling copy.',
      icon: <Wand2 size={32} />,
      color: 'indigo',
      details: [
        'Visual identity systems',
        'Multi-channel ad copy',
        'Influencer matching',
        'Content scheduling'
      ],
      mockUI: (
        <div className="mock-ui-creative">
          <div className="creative-box img"></div>
          <div className="creative-box text">
            <div className="mock-line xs"></div>
            <div className="mock-line sm"></div>
          </div>
          <div className="creative-box palette">
            <span className="p1"></span>
            <span className="p2"></span>
            <span className="p3"></span>
          </div>
        </div>
      )
    },
    {
      title: 'Deployment Ready',
      description: 'Your entire campaign is packaged and ready for launch across all your chosen platforms.',
      icon: <Rocket size={32} />,
      color: 'emerald',
      details: [
        'Final asset review',
        'One-click export',
        'Platform integration',
        'Performance tracking'
      ],
      mockUI: (
        <div className="mock-ui-deploy">
          <div className="deploy-header">
            <CheckCircle size={16} className="text-emerald-500" />
            <span>Ready to Launch</span>
          </div>
          <div className="deploy-progress">
            <div className="progress-bar"></div>
          </div>
          <div className="deploy-stats">
            <div className="stat-dot"></div>
            <div className="stat-dot"></div>
            <div className="stat-dot"></div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="how-it-works-page">
      {/* Hero Section */}
      <section className="hiw-hero">
        <div className="hero-bg-glow"></div>
        <div className="container">
          <div className="hero-content reveal">
            <div className="badge-premium">
              <Zap size={14} />
              <span>The Future of Marketing</span>
            </div>
            <h1 className="hiw-title">
              From Concept to <span className="text-gradient">Campaign</span>
            </h1>
            <p className="hiw-subtitle">
              Experience the world's first fully autonomous brand strategist. 
              We've automated the entire creative process so you can focus on the big picture.
            </p>
            <div className="hero-scroll-indicator">
              <div className="mouse">
                <div className="wheel"></div>
              </div>
              <span>Scroll to explore</span>
            </div>
          </div>
        </div>
      </section>

      {/* Zig-Zag Steps */}
      <section className="hiw-steps">
        <div className="container">
          {steps.map((step, index) => (
            <div key={index} className={`hiw-step-row ${index % 2 === 1 ? 'reverse' : ''} reveal`}>
              <div className="step-content">
                <div className={`step-number color-${step.color}`}>0{index + 1}</div>
                <h2 className="step-title">{step.title}</h2>
                <p className="step-description">{step.description}</p>
                <div className="step-features">
                  {step.details.map((detail, i) => (
                    <div key={i} className="feature-pill">
                      <CheckCircle size={14} />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="step-visual">
                <div className={`visual-card-container color-${step.color}`}>
                  <div className="visual-card-glass">
                    <div className="card-icon">
                      {step.icon}
                    </div>
                    <div className="card-mock-ui">
                      {step.mockUI}
                    </div>
                  </div>
                  <div className="visual-decoration-1"></div>
                  <div className="visual-decoration-2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section className="hiw-impact reveal">
        <div className="container">
          <div className="impact-card">
            <div className="impact-grid">
              <div className="impact-item">
                <div className="impact-value">10x</div>
                <div className="impact-label">Faster Execution</div>
              </div>
              <div className="impact-item">
                <div className="impact-value">60%</div>
                <div className="impact-label">Cost Reduction</div>
              </div>
              <div className="impact-item">
                <div className="impact-value">100%</div>
                <div className="impact-label">Autonomous</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="hiw-cta reveal">
        <div className="container">
          <div className="cta-box">
            <div className="cta-glow"></div>
            <h2>Start your autonomous journey</h2>
            <p>Join the next generation of brand builders using BrandPulse.</p>
            <div className="cta-actions">
              <Button variant="accent" onClick={() => window.location.href='/create-campaign'}>
                Create Campaign <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button variant="secondary" onClick={() => window.location.href='/demo'}>
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
