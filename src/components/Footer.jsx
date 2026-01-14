import React from 'react';
import { Twitter, Linkedin, Github, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer bg-white border-t border-border mt-20" style={{ marginTop: '5rem' }}>
      <div className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-text-primary rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: 'var(--color-text-primary)' }}>B</div>
            <span className="font-bold text-xl tracking-tight">BrandPulse</span>
          </div>
          
          {/* Links */}
          <div className="flex gap-8 text-sm font-medium text-secondary">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          
          {/* Socials */}
          <div className="flex gap-4">
            <a href="#" className="text-secondary hover:text-primary transition-colors p-2 hover:bg-gray-100 rounded-full">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-secondary hover:text-primary transition-colors p-2 hover:bg-gray-100 rounded-full">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-secondary hover:text-primary transition-colors p-2 hover:bg-gray-100 rounded-full">
              <Github size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-secondary">
          © {new Date().getFullYear()} BrandPulse AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
