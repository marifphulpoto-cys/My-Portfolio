import React, { useState } from 'react';
import { siteContent } from '../data/content';
import { Award, ExternalLink, BookOpen, ShieldCheck, ZoomIn, X, Sparkles } from 'lucide-react';
import { RevealHeading, RevealCard } from './Reveal';

export const Certificates: React.FC = () => {
  const { certificatesAndLearning } = siteContent;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="certificates" className="py-10 lg:py-14 border-t border-slate-200/80 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-800">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>CREDENTIALS & ACHIEVEMENTS</span>
            </div>
            <RevealHeading>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-2">
                Certificates & Learning Milestones
              </h2>
            </RevealHeading>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Verified certifications, blue team fundamentals, and verified laboratory milestones.
            </p>
          </div>
        </div>

        {/* Compact Certificates Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
          {certificatesAndLearning.map((item, idx) => (
            <RevealCard key={item.id} index={idx} className="h-full flex flex-col">
              <div className="glass-panel p-3.5 sm:p-4 rounded-xl flex flex-col justify-between h-full bg-white hover:border-blue-400 hover:shadow-md transition-all border border-slate-200/90 group flex-1">
                <div>
                  
                  {/* Top Bar with Icon & Date */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 group-hover:scale-105 transition-transform">
                      {item.link ? <Award className="w-4 h-4 text-blue-600" /> : <BookOpen className="w-4 h-4 text-slate-600" />}
                    </div>
                    {item.date && (
                      <span className="text-[10px] font-mono text-slate-700 font-bold bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                        {item.date}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xs sm:text-sm font-bold text-slate-950 font-heading mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Issuer */}
                  {item.issuer && (
                    <div className="text-[11px] font-mono font-bold text-blue-700 mb-2 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-blue-600 shrink-0" />
                      <span className="truncate">{item.issuer}</span>
                    </div>
                  )}

                  {/* Certificate Image Preview if Available */}
                  {item.image && (
                    <div 
                      onClick={() => setSelectedImage(item.image || null)}
                      className="relative my-2 rounded-lg overflow-hidden border border-slate-200 group/img cursor-pointer shadow-xs hover:shadow-sm transition-all"
                    >
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-28 object-cover object-center group-hover/img:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white text-[11px] font-mono font-bold backdrop-blur-xs">
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>Enlarge</span>
                      </div>
                    </div>
                  )}

                  {/* Status / Note */}
                  {item.note && (
                    <div className="text-[11px] font-mono text-slate-700 bg-slate-50 px-2 py-1 rounded-md border border-slate-200 mb-2 leading-relaxed">
                      {item.note}
                    </div>
                  )}
                </div>

                {/* Verification Link */}
                {item.link ? (
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 group/link py-0.5"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3 h-3 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                    </a>
                    <span className="text-[9px] font-mono text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      Verified
                    </span>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Self-Directed</span>
                    <span className="text-slate-600 font-bold">Lab Target</span>
                  </div>
                )}
              </div>
            </RevealCard>
          ))}
        </div>

      </div>

      {/* Lightbox Modal for Certificate Fullscreen Inspection */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[100001] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-2 border border-slate-200" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-950 transition-colors z-10 cursor-pointer"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={selectedImage} 
              alt="Certificate Fullscreen" 
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
