import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Play, 
  FolderGit2, 
  ExternalLink, 
  Layers, 
  CheckCircle2, 
  Code2, 
  Sparkles,
  ZoomIn,
  FileText,
  ShieldAlert
} from 'lucide-react';
import { Project } from '../data/content';
import { stopLenis, startLenis } from '../hooks/useLenis';

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
  onLaunchDemo?: (title: string, url: string, badge?: string) => void;
  onZoomImage?: (imgUrl: string) => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  onClose,
  onLaunchDemo,
  onZoomImage
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
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
  }, [project, onClose]);

  if (typeof document === 'undefined' || !project) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <div 
          data-lenis-prevent="true"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', duration: 0.35, bounce: 0.05 }}
            className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border-2 border-slate-300 overflow-hidden flex flex-col z-[100000]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pinned Top Header */}
            <div className="bg-slate-950 text-white px-5 sm:px-6 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0 pr-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 id="project-modal-title" className="text-sm sm:text-base font-bold font-heading text-white truncate">
                      {project.title}
                    </h3>
                    {project.tag && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 shrink-0">
                        {project.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-mono text-slate-400 truncate">
                    Detailed Project Architecture & Capabilities
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                aria-label="Close project details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body (Smooth 2-finger scroll) */}
            <div 
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7 space-y-6"
              style={{
                touchAction: 'pan-y',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain'
              }}
            >
              
              {/* Project Preview Image */}
              {project.image && (
                <div 
                  onClick={() => onZoomImage ? onZoomImage(project.image!) : null}
                  className="relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-100 group/shot cursor-pointer shadow-sm hover:shadow-md transition-all"
                  title="Click to inspect image in full resolution"
                >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full max-h-72 sm:max-h-80 object-cover object-top group-hover/shot:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover/shot:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono font-bold gap-1.5 backdrop-blur-xs">
                    <ZoomIn className="w-4 h-4" />
                    <span>Click to Enlarge Screenshot</span>
                  </div>
                </div>
              )}

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3">
                {project.demoUrl && onLaunchDemo && (
                  <button
                    onClick={() => {
                      onClose();
                      onLaunchDemo(project.title, project.demoUrl!, project.tag || 'Interactive Live App');
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Launch Working Live Demo</span>
                  </button>
                )}

                {project.links && project.links.map((link, lIdx) => {
                  const isPdf = link.label.toLowerCase().includes('pdf') || link.url.endsWith('.pdf');
                  return (
                    <a
                      key={lIdx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3.5 py-2 rounded-xl font-mono font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 ${
                        isPdf
                          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20"
                          : "bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-300"
                      }`}
                    >
                      {isPdf ? <FileText className="w-4 h-4 text-white" /> : <FolderGit2 className="w-4 h-4 text-blue-600" />}
                      <span>{link.label}</span>
                      <ExternalLink className={`w-3.5 h-3.5 ${isPdf ? 'text-blue-200' : 'text-slate-400'}`} />
                    </a>
                  );
                })}
              </div>

              {/* Verified Findings Severity Breakdown (if available, e.g. VAPT Report) */}
              {project.result && (
                <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    <span>DOCUMENTED FINDINGS BREAKDOWN:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px] font-bold">
                    <span className="px-2.5 py-1 rounded-lg bg-red-100 text-red-800 border border-red-300">
                      2 Critical
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-orange-100 text-orange-800 border border-orange-300">
                      3 High
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 border border-blue-300">
                      2 Medium
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-100 text-cyan-900 border border-cyan-300">
                      2 Low
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-800 border border-slate-300">
                      2 Informational
                    </span>
                  </div>
                </div>
              )}

              {/* Detailed Overview */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded bg-blue-600"></span>
                  <span>Project Overview</span>
                </h4>
                <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-normal bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {project.description}
                </p>
              </div>

              {/* Key Features Breakdown Grid */}
              {project.features && project.features.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Key Features & Functional Capabilities</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.features.map((feat, fIdx) => (
                      <div 
                        key={fIdx}
                        className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-950 font-heading">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{feat.title}</span>
                        </div>
                        <p className="text-xs text-slate-700 font-normal leading-relaxed pl-5.5">
                          {feat.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Details / Team Role (if available) */}
              {project.details && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    <span>Architecture & Role Notes</span>
                  </h4>
                  <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs font-mono text-blue-950 font-bold leading-relaxed">
                    {project.details}
                  </div>
                </div>
              )}

              {/* Full Tech Stack */}
              {project.tools && project.tools.length > 0 && (
                <div className="space-y-2 pt-1 border-t border-slate-100">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                    Full Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((t, tIdx) => (
                      <span 
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-bold border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
