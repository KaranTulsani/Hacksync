import React, { useState } from 'react';
import { 
  Play, 
  ArrowRight, 
  LayoutDashboard, 
  Image as ImageIcon, 
  Type, 
  Users, 
  Calendar, 
  Download, 
  RefreshCw, 
  Sparkles,
  Zap,
  Target,
  MessageSquare,
  CheckCircle,
  Palette
} from 'lucide-react';
import Button from '../components/Button';
import './Demo.css';

const DemoPage = () => {
  const [activeTab, setActiveTab] = useState('visuals');

  const assets = [
    { id: 1, name: 'Hero Banner - Summer', type: 'Image', size: '1920x1080', format: 'PNG' },
    { id: 2, name: 'Instagram Story #1', type: 'Image', size: '1080x1920', format: 'JPG' },
    { id: 3, name: 'Facebook Ad Creative', type: 'Image', size: '1200x628', format: 'PNG' },
    { id: 4, name: 'Product Showcase', type: 'Image', size: '1080x1080', format: 'JPG' },
    { id: 5, name: 'Email Header', type: 'Image', size: '600x200', format: 'PNG' },
    { id: 6, name: 'Twitter Post', type: 'Image', size: '1200x675', format: 'JPG' },
  ];

  const insights = [
    {
      title: 'Strategic Alignment',
      text: 'Visuals use high-contrast palettes to appeal to Gen-Z "Eco-Conscious" segment identified in step 2.',
      icon: <Target size={16} />
    },
    {
      title: 'Copy Optimization',
      text: 'Ad copy focuses on "Sustainability without Sacrifice" - a key emotional trigger for your audience.',
      icon: <MessageSquare size={16} />
    },
    {
      title: 'Channel Strategy',
      text: 'Instagram is prioritized for visual storytelling, while LinkedIn focuses on the B2B sustainability impact.',
      icon: <Zap size={16} />
    }
  ];

  return (
    <div className="demo-page">
      {/* Hero Section */}
      <section className="demo-hero">
        <div className="container">
          <div className="demo-badge">
            <Zap size={16} />
            <span>Interactive Live Preview</span>
          </div>
          <h1>Experience the<br />Autonomous Workspace</h1>
          <p>
            Step into the StratOS canvas and see how our AI orchestrates 
            every detail of your brand's next big move.
          </p>
          <div className="flex justify-center">
            <Button variant="accent" onClick={() => window.location.href='/create-campaign'}>
              Start Creating <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Live Workspace */}
      <section className="workspace-container container">
        <div className="workspace-window">
          {/* Sidebar */}
          <aside className="workspace-sidebar">
            <div className="sidebar-header">
              <div className="project-label">Active Campaign</div>
              <div className="project-name">Summer Eco-Bottle</div>
            </div>
            <nav className="sidebar-nav">
              <div 
                className={`nav-item ${activeTab === 'strategy' ? 'active' : ''}`}
                onClick={() => setActiveTab('strategy')}
              >
                <LayoutDashboard size={18} /> Strategy Brief
              </div>
              <div 
                className={`nav-item ${activeTab === 'visuals' ? 'active' : ''}`}
                onClick={() => setActiveTab('visuals')}
              >
                <ImageIcon size={18} /> Visual Assets
              </div>
              <div 
                className={`nav-item ${activeTab === 'copy' ? 'active' : ''}`}
                onClick={() => setActiveTab('copy')}
              >
                <Type size={18} /> Copywriting
              </div>
              <div 
                className={`nav-item ${activeTab === 'influencers' ? 'active' : ''}`}
                onClick={() => setActiveTab('influencers')}
              >
                <Users size={18} /> Influencers
              </div>
              <div 
                className={`nav-item ${activeTab === 'media' ? 'active' : ''}`}
                onClick={() => setActiveTab('media')}
              >
                <Calendar size={18} /> Media Plan
              </div>
            </nav>
            <div className="sidebar-footer">
              <div className="status-card">
                <div className="project-label" style={{ fontSize: '0.65rem', marginBottom: '0.25rem' }}>AI Status</div>
                <div className="flex items-center gap-2 text-emerald-500 text-sm font-bold">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  All Assets Ready
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="workspace-main">
            <header className="canvas-header">
              <div className="canvas-title">
                <ImageIcon size={20} className="text-secondary" />
                <span>Visual Assets</span>
              </div>
              <div className="canvas-actions">
                <Button variant="secondary" size="sm" style={{ padding: '0.5rem 1rem' }}>
                  <RefreshCw size={14} className="mr-2" /> Regenerate
                </Button>
                <Button variant="primary" size="sm" style={{ padding: '0.5rem 1rem' }}>
                  <Download size={14} className="mr-2" /> Export All
                </Button>
              </div>
            </header>
            
            <div className="canvas-content">
              <div className="asset-grid">
                {assets.map(asset => (
                  <div key={asset.id} className="asset-card">
                    <div className="asset-preview">
                      <ImageIcon size={48} />
                      <div className="ai-tooltip">
                        AI Optimized
                      </div>
                    </div>
                    <div className="asset-info">
                      <div className="asset-name">{asset.name}</div>
                      <div className="asset-meta">{asset.size} • {asset.format}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Color Palette Section */}
              <div className="mt-12">
                <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Palette size={16} /> Strategic Color Palette
                </h3>
                <div className="flex gap-4 flex-wrap">
                  {[
                    { hex: '#6366f1', name: 'Primary Indigo' },
                    { hex: '#10b981', name: 'Eco Emerald' },
                    { hex: '#111827', name: 'Deep Night' },
                    { hex: '#f3f4f6', name: 'Soft Gray' }
                  ].map((color, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-border">
                      <div className="w-12 h-12 rounded-lg shadow-inner" style={{ background: color.hex }}></div>
                      <div>
                        <div className="font-bold text-sm">{color.hex}</div>
                        <div className="text-xs text-secondary">{color.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>

          {/* Right Sidebar: AI Insights */}
          <aside className="workspace-right">
            <div className="insights-header">
              <Sparkles size={20} className="text-accent" />
              <span>AI Reasoning</span>
            </div>
            
            {insights.map((insight, i) => (
              <div key={i} className="insight-card">
                <div className="insight-title-wrapper">
                  <span className="text-accent">{insight.icon}</span>
                  <div className="insight-title">{insight.title}</div>
                </div>
                <p className="insight-text">{insight.text}</p>
              </div>
            ))}

            <div className="mt-auto p-5 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <div className="project-label" style={{ fontSize: '0.65rem', marginBottom: '0.5rem' }}>Pro Tip</div>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Click "Regenerate" on any asset to see how the AI adapts to different creative directions.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why our workspace wins</h2>
            <p className="text-lg text-secondary">A unified platform for the modern brand builder.</p>
          </div>
          <div className="demo-features-grid">
            <div className="demo-feature-item">
              <div className="feature-icon-wrapper">
                <CheckCircle size={28} />
              </div>
              <h3>Unified Control</h3>
              <p>Manage strategy, visuals, and copy in one single source of truth.</p>
            </div>
            <div className="demo-feature-item">
              <div className="feature-icon-wrapper">
                <RefreshCw size={28} />
              </div>
              <h3>Instant Iteration</h3>
              <p>Regenerate any component instantly without losing strategic alignment.</p>
            </div>
            <div className="demo-feature-item">
              <div className="feature-icon-wrapper">
                <Download size={28} />
              </div>
              <h3>One-Click Launch</h3>
              <p>Export your entire campaign package ready for all social platforms.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DemoPage;
