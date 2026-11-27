import React from 'react';
import { siteContent } from '../data/content';
import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { RevealHeading, RevealCard } from './Reveal';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Contact: React.FC = () => {
  const { contact } = siteContent;

  return (
    <section id="contact" className="py-8 lg:py-10 border-t border-slate-200/80 bg-slate-50/50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-6 text-center max-w-xl mx-auto">
          <RevealHeading>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading tracking-tight">
              Get in Touch
            </h2>
          </RevealHeading>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Open to cybersecurity internships, junior SOC analyst roles, and security testing projects. Feel free to reach out via WhatsApp or email.
          </p>
        </div>

        {/* Professional Contact Hub Card */}
        <div className="max-w-xl mx-auto">
          <RevealCard index={0}>
            <div className="glass-panel p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 text-center">
              
              {/* Primary Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Direct WhatsApp Action Button */}
                <a
                  href="https://wa.me/923093383209"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/20 transition-all hover:scale-102 active:scale-98 cursor-pointer group"
                  title="Open WhatsApp Chat"
                >
                  <WhatsAppIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Chat on WhatsApp</span>
                </a>

                {/* Direct Email Action Button */}
                <a
                  href={`mailto:${contact.email}?subject=${encodeURIComponent('Cybersecurity Inquiry - Muhammad Arif')}`}
                  className="px-5 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shadow-blue-600/20 transition-all hover:scale-102 active:scale-98 cursor-pointer group"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Send an Email</span>
                </a>
              </div>

              {/* Divider with subtle label */}
              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] font-medium text-slate-400 uppercase tracking-wider absolute">
                  Profiles
                </span>
              </div>

              {/* Public Profiles */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 hover:text-blue-700 border border-slate-200 text-xs font-medium flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Github className="w-3.5 h-3.5 text-slate-900" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 hover:text-blue-700 border border-slate-200 text-xs font-medium flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href={contact.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 hover:text-blue-700 border border-slate-200 text-xs font-medium flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <span className="w-3.5 h-3.5 rounded bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold">Up</span>
                  <span>Upwork</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>

            </div>
          </RevealCard>
        </div>

      </div>
    </section>
  );
};
