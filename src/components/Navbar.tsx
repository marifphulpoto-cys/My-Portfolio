import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Shield, Code2 } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface NavbarProps {
  track: 'cyber' | 'web';
  onTrackChange: (track: 'cyber' | 'web') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ track, onTrackChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const triggerLogoGlitch = () => {
    if (reducedMotion) return;
    setGlitching(true);
    setTimeout(() => setGlitching(false), 280);
  };

  const navLinks = track === 'cyber'
    ? [
        { label: "About", href: "#about" },
        { label: "VAPT Labs", href: "#cybersecurity" },
        { label: "Skills", href: "#skills" },
        { label: "Journey", href: "#journey" },
        { label: "Certificates", href: "#certificates" },
        { label: "Contact", href: "#contact" },
      ]
    : [
        { label: "About", href: "#about" },
        { label: "Web Projects & Demos", href: "#web-development" },
        { label: "Skills", href: "#skills" },
        { label: "Contact", href: "#contact" },
      ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 bg-white/92 backdrop-blur-md border-b border-slate-200/90 transition-transform duration-300 ease-out shadow-sm ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <a 
          href="#hero" 
          onMouseEnter={triggerLogoGlitch}
          className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-lg p-1 group"
          aria-label="Arifsec.com Home"
        >
          <div className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center transition-all group-hover:scale-110 shadow-sm ${
            glitching ? 'scale-125 rotate-6' : ''
          }`}>
            <img src="/logo.png" alt="Arifsec.com Official Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className={`text-lg font-bold tracking-tight text-slate-900 font-heading ${
              glitching ? 'text-blue-600' : ''
            }`}>
              Arifsec<span className="text-blue-600">.com</span>
            </span>
            <span className="block text-[11px] font-mono text-slate-700 font-semibold -mt-1">
              Muhammad Arif Phulpoto
            </span>
          </div>
        </a>

        {/* Desktop Navigation with Left-to-Right Wipe Underlines */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-800" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative py-1 text-slate-800 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 rounded group font-semibold"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-200 ease-out group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Button & Track Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-300">
            <button
              type="button"
              onClick={() => onTrackChange('cyber')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                track === 'cyber' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Cyber</span>
            </button>
            <button
              type="button"
              onClick={() => onTrackChange('web')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                track === 'web' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Web Dev</span>
            </button>
          </div>

          <a
            href="#contact"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] group"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-lg">
          {/* Mobile Track Selector */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-300 mb-2">
            <button
              type="button"
              onClick={() => {
                onTrackChange('cyber');
                setMobileMenuOpen(false);
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                track === 'cyber' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Cybersecurity</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onTrackChange('web');
                setMobileMenuOpen(false);
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                track === 'web' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Web Dev</span>
            </button>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-800 hover:text-blue-600 font-semibold text-sm py-1.5"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-200">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 rounded-xl bg-blue-600 text-white text-xs font-mono font-bold uppercase"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
