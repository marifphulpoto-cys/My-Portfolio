import React from 'react';
import { siteContent } from '../data/content';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { footer } = siteContent;

  return (
    <footer className="py-12 border-t border-slate-200 bg-slate-100">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shadow-xs">
            <img src="/logo.png" alt="Arifsec Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-sm font-bold text-slate-800 font-heading">
            Arifsec.com • Muhammad Arif Phulpoto
          </span>
        </div>

        <div className="text-xs font-mono text-slate-600 text-center sm:text-right font-medium">
          {footer}
        </div>

        <div>
          <a
            href="#hero"
            className="p-2.5 rounded-xl bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-mono font-bold shadow-sm"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </footer>
  );
};
