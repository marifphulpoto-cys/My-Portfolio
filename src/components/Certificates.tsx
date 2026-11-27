import React, { useState } from 'react';
import { siteContent } from '../data/content';
import { ExternalLink, ZoomIn, X, Calendar, ShieldCheck } from 'lucide-react';
import { RevealHeading, RevealCard } from './Reveal';

export const Certificates: React.FC = () => {
  const { certificatesAndLearning } = siteContent;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="certificates" className="py-8 lg:py-10 border-t border-slate-200/80 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-5">
          <RevealHeading>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading tracking-tight">
              Certificates
            </h2>
          </RevealHeading>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
            Verified credentials earned through coursework and practical lab exams.
          </p>
        </div>

        {/* 3 Certificate Cards in 1 Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {certificatesAndLearning.map((item, idx) => (
            <RevealCard key={item.id} index={idx} className="h-full flex flex-col">
              <div className="p-4 rounded-xl flex flex-col justify-between h-full bg-slate-50/70 border border-slate-200 hover:border-slate-300 transition-all flex-1">
                <div>
                  
                  {/* Top Bar with Issuer & Date */}
                  <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                    {item.issuer && (
                      <span className="font-medium text-blue-700 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate">{item.issuer}</span>
                      </span>
                    )}
                    {item.date && (
                      <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 shrink-0">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {item.date}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-slate-900 font-heading mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Certificate Image Preview */}
                  {item.image && (
                    <div 
                      onClick={() => setSelectedImage(item.image || null)}
                      className="relative my-2 rounded-lg overflow-hidden border border-slate-200 group/img cursor-pointer shadow-xs bg-white"
                    >
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-32 object-cover object-center group-hover/img:scale-102 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white text-xs font-medium backdrop-blur-xs">
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>Enlarge Certificate</span>
                      </div>
                    </div>
                  )}

                  {/* Note / ID */}
                  {item.note && (
                    <div className="text-[11px] text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200 mb-2 truncate">
                      {item.note}
                    </div>
                  )}
                </div>

                {/* Actions: Verify Link & View */}
                <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between gap-2">
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium flex items-center gap-1 transition-all"
                    >
                      <span>Verify Certificate</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <div className="text-xs text-slate-500 font-medium">Verified Credential</div>
                  )}

                  {item.image && (
                    <button
                      type="button"
                      onClick={() => setSelectedImage(item.image || null)}
                      className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <ZoomIn className="w-3 h-3 text-slate-500" />
                      <span>View</span>
                    </button>
                  )}
                </div>

              </div>
            </RevealCard>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[100001] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-2 border border-slate-200" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-950 transition-colors z-10 cursor-pointer"
              aria-label="Close certificate preview"
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={selectedImage} 
              alt="Official Certificate Fullscreen" 
              className="w-full max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
