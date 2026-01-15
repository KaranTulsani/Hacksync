import React from 'react';
import Button from '../components/Button';

export const Trust = () => {
  return (
    <section className="py-12 border-b border-border" style={{ padding: '3rem 0', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container text-center">
        <p className="text-sm text-secondary mb-8 uppercase tracking-widest">Trusted by innovative startups</p>
        <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem', opacity: 0.6, filter: 'grayscale(100%)' }}>
          {/* Text Placeholders for Logos */}
          <span className="text-xl font-bold">ACME Corp</span>
          <span className="text-xl font-bold">GlobalTech</span>
          <span className="text-xl font-bold">Nebula</span>
          <span className="text-xl font-bold">FoxRun</span>
          <span className="text-xl font-bold">Circle</span>
        </div>
      </div>
    </section>
  );
};

export const CTA = () => {
  return (
    <section className="section-padding text-center">
      <div className="container max-w-3xl">
        <h2 className="text-4xl mb-6">Ready to launch your next campaign?</h2>
        <p className="text-lg text-secondary mb-10">
          Stop spending weeks on strategy and creative. Let StratOS do the heavy lifting in minutes.
        </p>
        <Button variant="primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Start Free Trial</Button>
        <p className="mt-4 text-sm text-secondary">No credit card required.</p>
      </div>
    </section>
  );
};
