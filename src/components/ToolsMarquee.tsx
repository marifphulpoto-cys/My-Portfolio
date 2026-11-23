import React from 'react';
import { siteContent } from '../data/content';
import { Wrench } from 'lucide-react';
import { RevealHeading, RevealCard } from './Reveal';

export const ToolsMarquee: React.FC = () => {
  const { toolsMarquee } = siteContent;

  return (
    <section id="tools" className="py-12 lg:py-16 border-t border-slate-200/80 bg-slate-50/50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 text-center">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            Laboratory Tooling
          </span>
          <RevealHeading>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1.5">
              Tools & Software Ecosystem
            </h2>
          </RevealHeading>
          <p className="text-sm text-slate-600 mt-1">
            Software utilities, scanners, platforms, and security tools deployed across lab VMs.
          </p>
        </div>

        {/* Tools Display Grid */}
        <RevealCard>
          <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-white shadow-sm border border-slate-200">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {toolsMarquee.map((tool, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-xs font-mono text-slate-800 hover:border-blue-400 hover:bg-blue-50/80 hover:text-blue-700 transition-all group cursor-default font-bold shadow-sm"
                >
                  <Wrench className="w-4 h-4 text-blue-600 flex-shrink-0 group-hover:rotate-12 transition-transform" />
                  <span className="truncate">{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealCard>

      </div>
    </section>
  );
};
