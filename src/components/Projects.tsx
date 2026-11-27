import React, { useState } from 'react';
import { siteContent, Project } from '../data/content';
import { 
  FolderGit2, 
  FileText, 
  X, 
  Eye, 
  Play
} from 'lucide-react';
import { RevealHeading, RevealCard } from './Reveal';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import { LiveDemoModal } from './LiveDemoModal';

export const Projects: React.FC = () => {
  const { cyberProjects } = siteContent;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeDemo, setActiveDemo] = useState<{ title: string; url: string; badge?: string } | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);

  return (
    <section id="projects" className="py-8 lg:py-10 border-t border-slate-200/80 bg-slate-50/50 relative">
      <span id="cybersecurity" className="absolute -top-16"></span>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-5">
          <RevealHeading>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading tracking-tight">
              Projects & Lab Reports
            </h2>
          </RevealHeading>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
            Hands-on vulnerability assessments, technical reports, and tools I've built.
          </p>
        </div>

        {/* 3 Projects in 1 Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-stretch">
          {cyberProjects.map((proj, idx) => {
            const pdfLink = proj.links?.find(l => l.label.toLowerCase().includes('pdf') || l.url.endsWith('.pdf'));
            const gitLink = proj.links?.find(l => l.label.toLowerCase().includes('github') || l.url.includes('github.com'));

            return (
              <RevealCard key={proj.id} index={idx} className="h-full flex flex-col">
                <div 
                  onClick={() => setSelectedProject(proj)}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between h-full flex-1"
                  title={`View details for ${proj.title}`}
                >
                  <div>
                    {/* Thumbnail Preview */}
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-900 mb-2.5 shrink-0">
                      {proj.image ? (
                        <img 
                          src={proj.image} 
                          alt={proj.title}
                          className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white font-mono text-xs">
                          {proj.title}
                        </div>
                      )}

                      {proj.tag && (
                        <span className="absolute top-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/95 text-slate-800 border border-slate-200 shadow-xs">
                          {proj.tag}
                        </span>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium gap-1 backdrop-blur-xs">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </div>
                    </div>

                    {/* Project Title */}
                    <h3 className="h-6 text-sm font-bold text-slate-950 font-heading group-hover:text-blue-600 transition-colors truncate mb-1">
                      {proj.title}
                    </h3>

                    {/* Summary */}
                    <p className="h-9 text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2.5 font-normal overflow-hidden">
                      {proj.shortSummary || proj.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="h-6 flex items-center gap-1 mb-2 overflow-hidden flex-nowrap">
                      {proj.tools?.slice(0, 3).map((tool, tIdx) => (
                        <span 
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium whitespace-nowrap shrink-0"
                        >
                          {tool}
                        </span>
                      ))}
                      {(proj.tools?.length || 0) > 3 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold whitespace-nowrap shrink-0">
                          +{(proj.tools?.length || 0) - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Compact Action Bar */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between h-9">
                    <div className="flex items-center gap-1.5">
                      {proj.demoUrl ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDemo({ title: proj.title, url: proj.demoUrl!, badge: proj.tag });
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium flex items-center gap-1 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                          title="Open Live Demo"
                        >
                          <Play className="w-3 h-3 fill-white" />
                          <span>Live Demo</span>
                        </button>
                      ) : pdfLink ? (
                        <a
                          href={pdfLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium flex items-center gap-1 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                          title="Read 30-Page Technical Report (PDF)"
                        >
                          <FileText className="w-3 h-3 text-white" />
                          <span>PDF Report</span>
                        </a>
                      ) : null}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(proj);
                        }}
                        className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1 transition-all cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-3 h-3 text-slate-500" />
                        <span>Details</span>
                      </button>
                    </div>

                    {/* GitHub Link */}
                    {gitLink ? (
                      <a
                        href={gitLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all shrink-0"
                        title="GitHub Repository"
                      >
                        <FolderGit2 className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <div className="w-7 h-7 shrink-0" aria-hidden="true" />
                    )}
                  </div>

                </div>
              </RevealCard>
            );
          })}
        </div>

      </div>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onLaunchDemo={(title, url, badge) => setActiveDemo({ title, url, badge })}
        onZoomImage={(img) => setModalImage(img)}
      />

      {/* Interactive Live Demo Modal */}
      {activeDemo && (
        <LiveDemoModal
          isOpen={!!activeDemo}
          onClose={() => setActiveDemo(null)}
          title={activeDemo.title}
          demoUrl={activeDemo.url}
          badge={activeDemo.badge}
        />
      )}

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
              alt="Report Cover Preview" 
              className="w-full max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
