import React from 'react';
import { siteContent } from '../data/content';
import { Milestone, Calendar, Sparkles } from 'lucide-react';
import { RevealHeading, RevealCard } from './Reveal';
import { CountUp } from './CountUp';

export const Journey: React.FC = () => {
  const { journey } = siteContent;

  return (
    <section id="journey" className="py-10 lg:py-14 border-t border-slate-200/80 bg-slate-50/50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-800">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>TIMELINE & PROGRESSION</span>
            </div>
            <RevealHeading>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-2">
                Journey Milestones
              </h2>
            </RevealHeading>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Chronological progression across labs, courses, and security achievements.
            </p>
          </div>
        </div>

        {/* Milestone Cards Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 items-stretch">
          {journey.map((item, idx) => (
            <RevealCard key={item.step} index={idx} className="h-full flex flex-col">
              <div className="glass-panel p-3.5 sm:p-4 rounded-xl flex flex-col justify-between border-l-3 border-l-blue-600 h-full group bg-white hover:border-blue-300 hover:shadow-md transition-all border border-slate-200/90 flex-1">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1">
                      <Milestone className="w-3 h-3 text-blue-600" />
                      <span>Step <CountUp end={item.step} /></span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-600 font-semibold flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-slate-950 font-heading mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                    {item.detail}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] font-mono text-emerald-700 font-bold flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Completed</span>
                  </span>
                  <span className="text-slate-400 text-[9px]">Verified Lab</span>
                </div>
              </div>
            </RevealCard>
          ))}
        </div>

      </div>
    </section>
  );
};
