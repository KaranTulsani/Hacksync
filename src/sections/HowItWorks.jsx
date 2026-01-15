import React from 'react';
import Card from '../components/Card';
import { FileText, BrainCircuit, Wand2, Layout } from 'lucide-react';

const steps = [
  {
    title: 'Input Brief',
    description: 'Provide a high-level description of your product, target audience, and campaign goals.',
    icon: <FileText size={32} className="text-accent" />
  },
  {
    title: 'AI Strategy & Reasoning',
    description: 'StratOS analyzes market data and formulates a core campaign strategy and theme.',
    icon: <BrainCircuit size={32} className="text-accent" />
  },
  {
    title: 'Creative Generation',
    description: 'The system orchestrates specialized AI tools to generate visuals, copy, and media plans.',
    icon: <Wand2 size={32} className="text-accent" />
  },
  {
    title: 'Interactive Canvas',
    description: 'Review, edit, and refine your campaign assets in a collaborative workspace.',
    icon: <Layout size={32} className="text-accent" />
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding bg-alt" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-3xl font-bold">How StratOS Works</h2>
          <p className="text-secondary max-w-2xl mx-auto text-lg">
            From a simple prompt to a comprehensive campaign in four autonomous steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)' }}>
          {steps.map((step, index) => (
            <Card key={index} className="h-full flex flex-col items-start text-left hover:border-accent/50 transition-all duration-300">
              <div className="mb-6 p-3 bg-accent/10 rounded-xl inline-block" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
