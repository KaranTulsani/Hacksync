import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cloud } from 'lucide-react';
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
            <Cloud size={28} color="var(--color-text-primary)" fill="var(--color-text-primary)" style={{ opacity: 0.9 }} />
            <span style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.03em', color: 'var(--color-text-primary)' }}>StratOS</span>
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
          <Link to="/create-campaign">
            <Button variant="primary">Create Campaign</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
