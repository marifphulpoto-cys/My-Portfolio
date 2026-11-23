import React, { useState } from 'react';
import { siteContent, Project } from '../data/content';
import { 
  FolderGit2, 
  X, 
  Play, 
  Monitor,
  Eye,
  Sparkles
} from 'lucide-react';
import { RevealHeading, RevealCard } from './Reveal';
import { LiveDemoModal } from './LiveDemoModal';
import { ProjectDetailsModal } from './ProjectDetailsModal';

export const WebDevelopment: React.FC = () => {
  const { webProjects } = siteContent as { webProjects: Project[] };
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [activeDemo, setActiveDemo] = useState<{ title: string; url: string; badge?: string } | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="web-development" className="py-10 lg:py-14 border-t border-slate-200/80 bg-white relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-800">
              <Monitor className="w-3.5 h-3.5 text-blue-600" />
              <span>FULL-STACK WEB DEVELOPMENT</span>
            </div>
            <RevealHeading>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading mt-2">
                Web Applications & Live Demos
              </h2>
            </RevealHeading>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Click any project card to inspect full architecture, or launch interactive live demos directly.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-end">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>4 Working Live Projects</span>
          </div>
        </div>

        {/* 100% Perfectly Aligned 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
          {webProjects.map((proj, idx) => (
            <RevealCard key={proj.id} index={idx} className="h-full flex flex-col">
              <div 
                onClick={() => setSelectedProject(proj)}
                className="glass-panel p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-500 hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between h-full flex-1"
                title={`Click to view full details for ${proj.title}`}
              >
                <div>
                  {/* Thumbnail Preview - Fixed Aspect Ratio across all cards */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100 mb-2.5 shrink-0 group-hover:shadow-xs transition-all">
                    {proj.image ? (
                      <img 
                        src={proj.image} 
                        alt={proj.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-400 font-mono text-xs">
                        Preview
                      </div>
                    )}

                    {proj.tag && (
                      <span className="absolute top-2 left-2 text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/95 text-blue-700 border border-blue-200 shadow-xs backdrop-blur-xs">
                        {proj.tag}
                      </span>
                    )}

                    {/* Subtle Hover Cue */}
                    <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-mono font-bold gap-1 backdrop-blur-xs">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </div>
                  </div>

                  {/* Project Title - Fixed Height (h-6) for uniform baseline */}
                  <h3 className="h-6 text-sm font-bold text-slate-950 font-heading group-hover:text-blue-600 transition-colors truncate mb-1">
                    {proj.title}
                  </h3>

                  {/* 1-Line Punchline - Fixed Height (h-9) across all cards */}
                  <p className="h-9 text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2 font-normal overflow-hidden">
                    {proj.shortSummary || proj.description}
                  </p>

                  {/* Tech Badges - Strictly 1 Line (Fixed h-6, flex-nowrap) */}
                  <div className="h-6 flex items-center gap-1 mb-2.5 overflow-hidden flex-nowrap">
                    {proj.tools?.slice(0, 2).map((tool, tIdx) => (
                      <span 
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold whitespace-nowrap shrink-0"
                      >
                        {tool}
                      </span>
                    ))}
                    {(proj.tools?.length || 0) > 2 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold whitespace-nowrap shrink-0">
                        +{(proj.tools?.length || 0) - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Compact Action Bar - Fixed Height (h-9) with Exact Baseline Alignment */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between h-9">
                  <div className="flex items-center gap-1.5">
                    {proj.demoUrl && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDemo({ title: proj.title, url: proj.demoUrl!, badge: proj.tag || 'Live App' });
                        }}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-mono font-bold flex items-center gap-1 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        title="Launch Interactive Live Demo"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>Demo</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(proj);
                      }}
                      className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 text-[11px] font-mono font-bold flex items-center gap-1 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      title="View Full Project Details & Features"
                    >
                      <Eye className="w-3 h-3 text-blue-600" />
                      <span>Details</span>
                    </button>
                  </div>

                  {/* GitHub Repo Slot or Symmetrical Placeholder */}
                  {proj.links && proj.links.length > 0 ? (
                    <a
                      href={proj.links[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all shrink-0"
                      title={proj.links[0].label}
                    >
                      <FolderGit2 className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="w-7 h-7 shrink-0" aria-hidden="true" />
                  )}
                </div>

              </div>
            </RevealCard>
          ))}
        </div>

      </div>

      {/* Comprehensive Project Details Modal (Full info on click) */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onLaunchDemo={(title, url, badge) => setActiveDemo({ title, url, badge })}
        onZoomImage={(img) => setModalImage(img)}
      />

      {/* Picture Zoom Lightbox Modal */}
      {modalImage && (
        <div 
          onClick={() => setModalImage(null)}
          className="fixed inset-0 z-[100001] bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-2 border border-slate-200" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setModalImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-950 transition-colors z-10 cursor-pointer"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={modalImage} 
              alt="Project Screenshot Preview" 
              className="w-full max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}

      {/* Full-Screen Interactive Live Demo View Modal */}
      {activeDemo && (
        <LiveDemoModal
          isOpen={!!activeDemo}
          onClose={() => setActiveDemo(null)}
          title={activeDemo.title}
          demoUrl={activeDemo.url}
          badge={activeDemo.badge}
        />
      )}
    </section>
  );
};
