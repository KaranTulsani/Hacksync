import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="container flex items-center justify-between">
        <div className="logo">
          <Link to="/" className="flex items-center gap-sm">
            <div style={{ width: '24px', height: '24px', background: 'var(--color-text-primary)', borderRadius: '6px' }}></div>
            <span style={{ fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>BrandPulse</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-lg">
          <Link 
            to="/how-it-works" 
            className={`nav-link ${isActive('/how-it-works') ? 'text-primary' : ''}`}
            style={isActive('/how-it-works') ? { color: 'var(--color-text-primary)' } : {}}
          >
            How it Works
          </Link>
          <Link 
            to="/features" 
            className={`nav-link ${isActive('/features') ? 'text-primary' : ''}`}
            style={isActive('/features') ? { color: 'var(--color-text-primary)' } : {}}
          >
            Features
          </Link>
          <Link 
            to="/demo" 
            className={`nav-link ${isActive('/demo') ? 'text-primary' : ''}`}
            style={isActive('/demo') ? { color: 'var(--color-text-primary)' } : {}}
          >
            Demo
          </Link>
        </div>

        <div className="flex items-center gap-sm">
          <Button variant="ghost" className="hidden sm:inline-flex">Log In</Button>
          <Link to="/create-campaign">
            <Button variant="primary">Create Campaign</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
