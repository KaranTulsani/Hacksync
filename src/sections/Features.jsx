import React from 'react';
import Card from '../components/Card';
import { Brain, Image as ImageIcon, PenTool, BarChart3, Calendar, MonitorPlay } from 'lucide-react';

const features = [
  {
    title: 'Abstract Reasoning',
    description: 'Interprets high-level requests to analyze audience and context, formulating a cohesive strategy.',
    icon: <Brain size={28} className="text-accent" />
  },
  {
    title: 'Visual Identity',
    description: 'Generates mood boards and key visual assets tailored to the campaign theme.',
    icon: <ImageIcon size={28} className="text-accent" />
  },
  {
    title: 'Copywriting',
    description: 'Creates engaging social media captions, ad copy, and blog content.',
    icon: <PenTool size={28} className="text-accent" />
  },
  {
    title: 'Market Research',
    description: 'Identifies influencers and publications, drafting personalized outreach messages.',
    icon: <BarChart3 size={28} className="text-accent" />
  },
  {
    title: 'Media Planning',
    description: 'Recommends optimal posting schedules and channel strategies for maximum reach.',
    icon: <Calendar size={28} className="text-accent" />
  },
  {
    title: 'Interactive Canvas',
    description: 'A web-based workspace to review, regenerate, and export your campaign package.',
    icon: <MonitorPlay size={28} className="text-accent" />
  }
];

const Features = () => {
  return (
    <section id="features" className="section-padding">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-3xl font-bold">Core Features</h2>
          <p className="text-secondary max-w-2xl mx-auto text-lg">
            Everything you need to launch a successful brand campaign, powered by autonomous AI.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--spacing-lg)' }}>
          {features.map((feature, index) => (
            <Card key={index} className="h-full hover:border-accent transition-all duration-300 group">
              <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-bg-alt group-hover:bg-accent/10 transition-colors" 
                   style={{ backgroundColor: 'var(--color-bg-alt)' }}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
