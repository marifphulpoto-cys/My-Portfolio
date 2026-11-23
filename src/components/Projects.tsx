import React, { useState } from 'react';
import { siteContent, Project } from '../data/content';
import { 
  FolderGit2, 
  FileText, 
  X, 
  Shield, 
  Eye, 
  Sparkles,
  Terminal,
  Activity
} from 'lucide-react';
import { RevealHeading, RevealCard } from './Reveal';
import { ProjectDetailsModal } from './ProjectDetailsModal';

export const Projects: React.FC = () => {
  const { cyberProjects, projects } = siteContent as { cyberProjects: Project[]; projects: Project[] };
  const list = cyberProjects || projects;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);

  // Helper to render high-tech visual thumbnail if image is absent
  const renderVisual = (proj: Project) => {
    if (proj.image === '/vapt-cover.png') {
      return (
        <img 
          src={proj.image} 
          alt={proj.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
        />
      );
    }

    if (proj.id === 'home-soc-lab') {
      return (
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-3.5 flex flex-col justify-between text-white font-mono">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-cyan-400 font-bold flex items-center gap-1">
              <Shield className="w-3 h-3 text-cyan-400" />
              <span>WAZUH SIEM</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <div className="space-y-0.5">
            <div className="text-[11px] font-bold text-slate-200">Multi-VM Threat Lab</div>
            <div className="text-[9px] text-slate-400">Windows 10 • Kali • Sysmon</div>
          </div>
          <div className="text-[9px] text-cyan-300/80 bg-slate-800/80 px-2 py-0.5 rounded border border-cyan-800/40">
            Real-Time Alert Ingestion
          </div>
        </div>
      );
    }

    if (proj.id === 'thm-blue-lab') {
      return (
        <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-3.5 flex flex-col justify-between text-white font-mono">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-blue-400 font-bold flex items-center gap-1">
              <Terminal className="w-3 h-3 text-blue-400" />
              <span>TRYHACKME</span>
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-600/30 text-blue-300 border border-blue-500/40 font-bold">CVE-2017-0144</span>
          </div>
          <div className="space-y-0.5">
            <div className="text-[11px] font-bold text-slate-200">Room: Blue Exploitation</div>
            <div className="text-[9px] text-slate-400">EternalBlue • SYSTEM Hash Dump</div>
          </div>
          <div className="text-[9px] text-emerald-300/80 bg-slate-800/80 px-2 py-0.5 rounded border border-emerald-800/40">
            Defense Patch Verified
          </div>
        </div>
      );
    }

    // Default / Log Correlation Engine
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-3.5 flex flex-col justify-between text-white font-mono">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-indigo-400 font-bold flex items-center gap-1">
            <Activity className="w-3 h-3 text-indigo-400" />
            <span>GRAPH CORRELATION</span>
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-bold">ALGORITHM</span>
        </div>
        <div className="space-y-0.5">
          <div className="text-[11px] font-bold text-slate-200">Attack Sequence Graph</div>
          <div className="text-[9px] text-slate-400">Linux Auth & Web Access Logs</div>
        </div>
        <div className="text-[9px] text-indigo-300/80 bg-slate-800/80 px-2 py-0.5 rounded border border-indigo-800/40">
          Min-Cut Threat Severance
        </div>
      </div>
    );
  };

  return (
    <section id="cybersecurity" className="py-10 lg:py-14 border-t border-slate-200/80 bg-slate-50/50 relative">
      {/* Anchor for backward compatibility */}
      <span id="projects" className="absolute -top-16"></span>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-800">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>CYBERSECURITY & BLUE TEAM</span>
            </div>
            <RevealHeading>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading mt-2">
                Cybersecurity Labs & VAPT Reports
              </h2>
            </RevealHeading>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Click any project card to inspect findings breakdown, vulnerability details, and full PDF reports.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-end">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>4 Documented Security Labs</span>
          </div>
        </div>

        {/* 100% Perfectly Aligned 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
          {list.map((proj, idx) => {
            const pdfLink = proj.links?.find(l => l.label.toLowerCase().includes('pdf') || l.url.endsWith('.pdf'));
            const gitLink = proj.links?.find(l => l.label.toLowerCase().includes('github') || l.url.includes('github.com'));

            return (
              <RevealCard key={proj.id} index={idx} className="h-full flex flex-col">
                <div 
                  onClick={() => setSelectedProject(proj)}
                  className="glass-panel p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-500 hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between h-full flex-1"
                  title={`Click to view full security assessment for ${proj.title}`}
                >
                  <div>
                    {/* Thumbnail Preview - Fixed Aspect Ratio across all cards */}
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-900 mb-2.5 shrink-0 group-hover:shadow-xs transition-all">
                      {renderVisual(proj)}

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
                      {pdfLink ? (
                        <a
                          href={pdfLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-mono font-bold flex items-center gap-1 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                          title="Read 30-Page Technical VAPT Report (PDF)"
                        >
                          <FileText className="w-3 h-3 text-white" />
                          <span>PDF Report</span>
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(proj);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-[11px] font-mono font-bold flex items-center gap-1 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          <Shield className="w-3 h-3 text-blue-600" />
                          <span>Lab Details</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(proj);
                        }}
                        className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 text-[11px] font-mono font-bold flex items-center gap-1 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        title="View Full Findings & Technical Details"
                      >
                        <Eye className="w-3 h-3 text-blue-600" />
                        <span>Details</span>
                      </button>
                    </div>

                    {/* GitHub Repo Slot or Symmetrical Placeholder */}
                    {gitLink ? (
                      <a
                        href={gitLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all shrink-0"
                        title={gitLink.label}
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

      {/* Comprehensive Cyber Project Details Modal (Full info on click) */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
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
              alt="Report Cover Preview" 
              className="w-full max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
