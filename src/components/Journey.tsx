import React from 'react';
import { siteContent } from '../data/content';
import { Calendar } from 'lucide-react';
import { RevealHeading, RevealCard } from './Reveal';

export const Journey: React.FC = () => {
  const { journey } = siteContent;

  return (
    <section id="journey" className="py-8 lg:py-10 border-t border-slate-200/80 bg-slate-50/50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-5">
          <RevealHeading>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading tracking-tight">
              Milestones
            </h2>
          </RevealHeading>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
            Key steps in my cybersecurity journey so far.
          </p>
        </div>

        {/* Milestone Cards Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
          {journey.map((item, idx) => (
            <RevealCard key={item.step} index={idx} className="h-full flex flex-col">
              <div className="p-3.5 rounded-xl flex flex-col justify-between border-l-2 border-l-blue-600 h-full bg-white border border-slate-200 hover:border-blue-300 transition-all shadow-xs flex-1">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5 text-xs text-slate-500">
                    <span className="font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                      #{item.step}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-heading mb-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.detail}
                  </p>
                </div>
              </div>
            </RevealCard>
          ))}
        </div>

      </div>
    </section>
  );
};
