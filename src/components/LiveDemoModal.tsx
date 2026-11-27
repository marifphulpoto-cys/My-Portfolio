import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Monitor, Sparkles } from 'lucide-react';
import { stopLenis, startLenis } from '../hooks/useLenis';

interface LiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  demoUrl: string;
  badge?: string;
}

export const LiveDemoModal: React.FC<LiveDemoModalProps> = ({
  isOpen,
  onClose,
  title,
  demoUrl,
  badge = 'Interactive Live Demo'
}) => {
  // Lock body scroll and pause Lenis while demo modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      stopLenis();
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      startLenis();
      document.body.style.overflow = 'unset';
    }

    return () => {
      startLenis();
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div 
          data-lenis-prevent="true"
          className="fixed inset-0 z-[100000] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.35, bounce: 0.05 }}
            className="relative w-full max-w-6xl h-[94vh] bg-slate-900 rounded-2xl shadow-2xl border-2 border-slate-700 overflow-hidden flex flex-col z-[100001]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-title"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="bg-slate-950 text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="demo-title" className="text-sm font-bold font-heading text-white flex items-center gap-2">
                    {title}
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>{badge}</span>
                    </span>
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 truncate max-w-[280px] sm:max-w-md">
                    Live Demo Preview
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all border border-slate-700 cursor-pointer"
                  title="Open Fullscreen in New Window"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  <span className="hidden sm:inline">Open Fullscreen</span>
                </a>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
                  aria-label="Close live demo"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded Live Iframe View */}
            <div 
              data-lenis-prevent="true"
              className="flex-1 w-full h-full bg-slate-950 relative overflow-hidden"
            >
              <iframe
                src={demoUrl}
                title={title}
                className="w-full h-full border-none"
                allow="clipboard-write; fullscreen"
                sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
