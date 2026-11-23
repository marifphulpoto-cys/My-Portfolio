import React, { useState, useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import { ScrollProgress } from './components/ScrollProgress';
import { CyberCanvas } from './components/CyberCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Journey } from './components/Journey';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { WebDevelopment } from './components/WebDevelopment';
import { Certificates } from './components/Certificates';
import { ToolsMarquee } from './components/ToolsMarquee';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export type PortfolioTrack = 'cyber' | 'web';

export const App: React.FC = () => {
  // Lenis smooth scroll on desktop
  useLenis();

  // Active Portfolio Track: 'cyber' (Default) or 'web' (Full-Stack Web Development)
  const [track, setTrack] = useState<PortfolioTrack>('cyber');

  // Listen to hash changes (e.g., #web-development -> auto-switch to web track)
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash === '#web-development') {
        setTrack('web');
      } else if (hash === '#cybersecurity' || hash === '#certificates' || hash === '#journey') {
        setTrack('cyber');
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#2563EB] selection:text-white relative white-cyber-grid">
      {/* Live Interactive Cyber Particle Constellation Background Canvas */}
      <CyberCanvas />

      {/* Scroll Progress Line at top */}
      <ScrollProgress />

      {/* Navigation with Dual-Track Switcher */}
      <Navbar track={track} onTrackChange={setTrack} />

      {/* Main Content Sections */}
      <main id="main-content" className="relative z-10">
        <Hero track={track} onTrackChange={setTrack} />
        
        {track === 'cyber' ? (
          <>
            <About track="cyber" />
            <Projects />
            <Skills track="cyber" />
            <Journey />
            <Certificates />
            <ToolsMarquee />
            <Contact track="cyber" />
          </>
        ) : (
          <>
            <About track="web" />
            <WebDevelopment />
            <Skills track="web" />
            <Contact track="web" />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
