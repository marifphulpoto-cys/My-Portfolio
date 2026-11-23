import React from 'react';
import { siteContent } from '../data/content';
import { User, Globe, Briefcase, GraduationCap, Code2 } from 'lucide-react';
import { RevealHeading, FlyInLeft, FlyInRight } from './Reveal';

interface AboutProps {
  track?: 'cyber' | 'web';
}

export const About: React.FC<AboutProps> = ({ track = 'cyber' }) => {
  const { about } = siteContent;
  const isCyber = track === 'cyber';

  return (
    <section id="about" className="py-12 lg:py-16 border-t border-slate-200/80 bg-white/70">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Compact) */}
        <div className="mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {isCyber ? "Cyber Profile Overview" : "Developer Profile Overview"}
          </span>
          <RevealHeading>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1.5">
              {isCyber ? "About & Academic Focus" : "About & Engineering Philosophy"}
            </h2>
          </RevealHeading>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (Flies in from Left): Description & Goals */}
          <div className="lg:col-span-8 space-y-4">
            
            <FlyInLeft delay={0.05}>
              <div className="glass-panel p-5 sm:p-6 rounded-2xl space-y-3 border-l-4 border-l-blue-600 bg-white">
                <div className="flex items-center gap-2.5 text-blue-700">
                  {isCyber ? <User className="w-4 h-4 text-blue-600" /> : <Code2 className="w-4 h-4 text-blue-600" />}
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    {isCyber ? "Blue Team & Vulnerability Assessment" : "Full-Stack Web Development & SaaS Engineering"}
                  </h3>
                </div>
                <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-normal">
                  {isCyber 
                    ? about.text 
                    : "I specialize in building production-ready web applications, high-performance retail SaaS platforms (NexusStore with React 19 & Supabase PostgreSQL), and secure systems software (SentryPAM in C++ and web frontend). My development philosophy emphasizes high-speed performance, clean state management, and elegant user experiences."}
                </p>
              </div>
            </FlyInLeft>

            <FlyInLeft delay={0.15}>
              <div className="glass-panel p-4 sm:p-5 rounded-2xl flex items-start gap-3.5 bg-white">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex-shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-950 mb-0.5 font-heading">
                    Open To Opportunities
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {isCyber
                      ? "Internships, Junior SOC Analyst roles, Security Audits, and Vulnerability Assessments."
                      : "Full-Stack Web Development roles, Retail SaaS engineering, Frontend contracts, and Custom Web Builds."}
                  </p>
                </div>
              </div>
            </FlyInLeft>

            <FlyInLeft delay={0.25}>
              <div className="glass-panel p-4 rounded-xl text-xs sm:text-sm font-mono text-slate-800 space-y-1.5 border border-slate-300 bg-white shadow-xs">
                <div className="text-slate-950 font-black flex items-center gap-2 text-xs sm:text-sm">
                  {isCyber ? <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" /> : <Code2 className="w-4 h-4 text-blue-600 shrink-0" />}
                  <span>{isCyber ? "AIR UNIVERSITY ISLAMABAD • DEPARTMENT OF CYBER SECURITY" : "FULL-STACK ENGINEERING STACK"}</span>
                </div>
                <div className="font-semibold text-slate-800">
                  {isCyber 
                    ? "Degree: Bachelor of Science in Cyber Security (BS Cybersecurity, 2025+)"
                    : "Core Stack: React 19, TypeScript, TanStack Router, Supabase, PostgreSQL, Tailwind CSS, C++"}
                </div>
                <div className="text-slate-700">
                  {isCyber 
                    ? "Core Focus: Vulnerability Assessment (VAPT), Blue Team Operations, Network Defense & SOC Labs"
                    : "Capabilities: Real-Time State, Row-Level Security (RLS), POS Registers, Offline/Online Sync"}
                </div>
              </div>
            </FlyInLeft>

          </div>

          {/* Right Column (Flies in from Right): Languages & Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            
            <FlyInRight delay={0.1}>
              <div className="glass-panel p-5 rounded-2xl space-y-3 bg-white">
                <div className="flex items-center gap-2 text-blue-700 border-b border-slate-100 pb-2.5">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                    Spoken Languages
                  </h4>
                </div>
                <div className="space-y-2">
                  {about.languages.map((lang) => (
                    <div key={lang.language} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-b-0 font-mono">
                      <span className="text-slate-800 font-bold">{lang.language}</span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200 text-[11px]">
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FlyInRight>

            <FlyInRight delay={0.2}>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md space-y-1.5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-blue-200 font-bold">Lab Philosophy</div>
                <div className="text-xs sm:text-sm font-medium leading-relaxed">
                  "All testing was conducted on personally configured virtual machine targets with zero third-party exposure."
                </div>
              </div>
            </FlyInRight>

          </div>

        </div>

      </div>
    </section>
  );
};
