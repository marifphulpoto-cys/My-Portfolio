import React from 'react';
import { siteContent } from '../data/content';
import { CheckCircle2, Shield, Network, Terminal, Code2 } from 'lucide-react';
import { RevealHeading, RevealCard } from './Reveal';

export const Skills: React.FC = () => {
  const { skills } = siteContent;

  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes('vulnerability') || category.toLowerCase().includes('pen')) {
      return <Shield className="w-4 h-4 text-blue-600" />;
    }
    if (category.toLowerCase().includes('blue') || category.toLowerCase().includes('soc')) {
      return <Terminal className="w-4 h-4 text-blue-600" />;
    }
    if (category.toLowerCase().includes('network')) {
      return <Network className="w-4 h-4 text-blue-600" />;
    }
    return <Code2 className="w-4 h-4 text-blue-600" />;
  };

  return (
    <section id="skills" className="py-8 lg:py-10 border-t border-slate-200/80 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-5">
          <RevealHeading>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading tracking-tight">
              Skills & Tools
            </h2>
          </RevealHeading>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
            Practical tools and technologies I use across lab testing, networking, and programming.
          </p>
        </div>

        {/* 4 Clean Categories in a Single Responsive Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-stretch">
          {skills.map((item, idx) => (
            <RevealCard key={item.category} index={idx} className="h-full flex flex-col">
              <div className="p-4 rounded-xl flex flex-col justify-between h-full bg-slate-50/70 border border-slate-200 hover:border-slate-300 transition-all flex-1">
                <div>
                  {/* Card Header */}
                  <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200/80">
                    {getCategoryIcon(item.category)}
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-heading truncate">
                      {item.category}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <ul className="space-y-1.5 mt-3">
                    {item.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2 text-xs text-slate-700 leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] font-mono text-slate-500">
                  <span>{item.skills.length} tools & skills</span>
                </div>
              </div>
            </RevealCard>
          ))}
        </div>

      </div>
    </section>
  );
};
