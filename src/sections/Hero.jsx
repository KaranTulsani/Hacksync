import React from 'react';
import Button from '../components/Button';
import { Sparkles, Play, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero section-padding pt-32 pb-20 overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 mix-blend-multiply filter" style={{ backgroundColor: '#dbeafe' }}></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50 mix-blend-multiply filter" style={{ backgroundColor: '#f3e8ff' }}></div>
      </div>

      <div className="container text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium text-accent bg-white border border-accent/20 rounded-full shadow-sm animate-fade-in-up" 
             style={{ color: 'var(--color-accent)', borderColor: 'rgba(99, 102, 241, 0.2)' }}>
          <Sparkles size={16} />
          <span>AI-Powered Brand Strategist</span>
        </div>
        
        <h1 className="mb-6 font-bold tracking-tight" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: '1.1' }}>
          From Brief to Brand Campaign <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-600" 
                style={{ backgroundImage: 'linear-gradient(to right, var(--color-accent), #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Fully Autonomous.
          </span>
        </h1>
        
        <p className="mb-10 text-xl text-secondary max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          BrandPulse ingests your high-level brief and autonomously reasons through strategy, research, and creative generation to produce a deployment-ready campaign package.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-md mb-20">
          <Button variant="primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
            Create Campaign <ArrowRight size={20} className="ml-2" style={{ marginLeft: '0.5rem' }} />
          </Button>
          <Button variant="secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
            <Play size={20} className="mr-2" style={{ marginRight: '0.5rem' }} /> View Demo
          </Button>
        </div>
        
        {/* Abstract Visual */}
        <div className="relative mx-auto max-w-5xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-accent to-purple-600 rounded-2xl blur opacity-20" 
               style={{ background: 'linear-gradient(to right, var(--color-accent), #9333ea)' }}></div>
          
          <div className="relative bg-white rounded-2xl shadow-2xl border border-border overflow-hidden" 
               style={{ minHeight: '500px', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(20px)' }}>
            
            {/* Mock UI Header */}
            <div className="border-b border-border p-4 flex items-center gap-4 bg-gray-50/50" style={{ backgroundColor: '#f9fafb80' }}>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" style={{ backgroundColor: '#f87171' }}></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400" style={{ backgroundColor: '#facc15' }}></div>
                <div className="w-3 h-3 rounded-full bg-green-400" style={{ backgroundColor: '#4ade80' }}></div>
              </div>
              <div className="flex-1 text-center text-xs font-medium text-gray-400">BrandPulse Studio</div>
            </div>

            {/* Mock UI Content */}
            <div className="p-8 grid grid-cols-12 gap-6 h-full">
              {/* Sidebar Mock */}
              <div className="col-span-3 hidden md:block space-y-4">
                <div className="h-8 w-3/4 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-4 w-1/2 bg-gray-50 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-50 rounded animate-pulse"></div>
                <div className="h-4 w-1/2 bg-gray-50 rounded animate-pulse"></div>
              </div>
              
              {/* Main Content Mock */}
              <div className="col-span-12 md:col-span-9 grid grid-cols-2 gap-4">
                <div className="col-span-2 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center text-accent">
                      <Sparkles size={24} />
                    </div>
                    <div className="text-sm font-medium text-accent">Generating Strategy...</div>
                  </div>
                </div>
                <div className="h-40 bg-gray-50 rounded-xl border border-gray-100"></div>
                <div className="h-40 bg-gray-50 rounded-xl border border-gray-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
