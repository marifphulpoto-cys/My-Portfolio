import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../data/content';
import { 
  FileText, 
  ArrowRight, 
  ShieldAlert, 
  Award, 
  Github, 
  Linkedin, 
  Mail, 
  Eye,
  GraduationCap
} from 'lucide-react';
import { ResumeModal } from './ResumeModal';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Hero: React.FC = () => {
  const { contact } = siteContent;
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <section id="hero" className="pt-20 pb-8 sm:pt-24 sm:pb-10 relative overflow-hidden">
      
      {/* Soft Ambient Radial Lights */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Natural, Direct, Human Bio */}
          <div className="lg:col-span-7 space-y-3.5">
            
            {/* Status Pill */}
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-medium text-blue-900 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Cybersecurity Student @ Air University Islamabad</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 font-heading leading-tight">
                Muhammad Arif{' '}
                <span className="text-blue-600">
                  Phulpoto
                </span>
              </h1>
            </motion.div>

            {/* Role Subtitle */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.15 }}
            >
              <p className="text-base sm:text-lg font-semibold text-slate-800">
                Vulnerability Assessment • Blue Team Defense • Lab Builder
              </p>
            </motion.div>

            {/* Natural Short Bio */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.2 }}
            >
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-xl font-normal">
                I study cybersecurity at Air University Islamabad. Rather than just reading theory, I set up my own virtual labs to practice vulnerability assessments, analyze security logs, and write clean technical reports on what I find.
              </p>
            </motion.div>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.25 }}
            >
              <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
                <a
                  href="#projects"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 shadow-sm shadow-blue-600/20 transition-all hover:scale-105 active:scale-95"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="https://github.com/marifphulpoto-cys/win7-vapt-lab/blob/main/VAPT_Report_Win7.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>30-Page VAPT Report (PDF)</span>
                </a>

                <button
                  type="button"
                  onClick={() => setResumeOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-700 border border-slate-300 font-medium text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span>Resume / CV</span>
                </button>
              </div>
            </motion.div>

            {/* Direct Channels Row */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.3 }}
            >
              <div className="pt-1.5 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-600">
                <a
                  href="https://wa.me/923093383209"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-700 hover:text-emerald-600 transition-colors font-medium"
                  title="Direct WhatsApp Chat"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
                <span className="text-slate-300">•</span>
                <a
                  href={`mailto:${contact.email}?subject=${encodeURIComponent('Security & VAPT Inquiry')}`}
                  className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition-colors font-medium"
                  title="Send Direct Email"
                >
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>Email</span>
                </a>
                <span className="text-slate-300">•</span>
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition-colors font-medium"
                >
                  <Github className="w-4 h-4 text-slate-900" />
                  <span>GitHub</span>
                </a>
                <span className="text-slate-300">•</span>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition-colors font-medium"
                >
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  <span>LinkedIn</span>
                </a>
                <span className="text-slate-300">•</span>
                <a
                  href={contact.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition-colors font-medium"
                >
                  <span className="w-4 h-4 rounded bg-blue-600 text-white flex items-center justify-center text-[9px] font-bold">Up</span>
                  <span>Upwork</span>
                </a>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Clean Photo Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 85, damping: 14, delay: 0.15 }}
              className="relative w-full max-w-[270px] sm:max-w-[290px]"
            >
              
              {/* Subtle Dashed Outer Ring */}
              <div className="absolute -inset-3.5 rounded-3xl border border-dashed border-blue-400/40 pointer-events-none -z-10"></div>
              
              {/* Soft Glow Behind Photo */}
              <div className="absolute -inset-2 rounded-3xl bg-blue-500/10 blur-xl -z-20"></div>

              {/* Main Photo Card */}
              <div className="relative rounded-2xl p-2.5 shadow-xl border border-slate-200 bg-white group hover:border-blue-400 transition-all">
                
                {/* Photo Container */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden border border-slate-100 shadow-xs">
                  <img
                    src="/profile.jpg"
                    alt="Muhammad Arif Phulpoto"
                    className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
                  />
                  
                  {/* Bottom Text Overlay inside photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-3 text-white">
                    <div className="text-base font-bold font-heading drop-shadow-md">
                      Muhammad Arif Phulpoto
                    </div>
                    <div className="text-xs text-sky-300 font-medium drop-shadow">
                      BS Cybersecurity • Air University
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                    <span>Air University Islamabad</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[11px]">
                    Arifsec.tech
                  </span>
                </div>

              </div>

              {/* Floating Badge 1 (Top-Left) */}
              <motion.div
                initial={{ scale: 0, opacity: 0, y: -15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 10, delay: 0.3 }}
                className="absolute -top-3 -left-4 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-md flex items-center gap-2 hover:scale-105 transition-transform cursor-default z-20"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 font-medium">CyberWarfare Labs</div>
                  <div className="text-xs font-bold text-slate-800">Certified BTF</div>
                </div>
              </motion.div>

              {/* Floating Badge 2 (Bottom-Right) */}
              <motion.div
                initial={{ scale: 0, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 10, delay: 0.4 }}
                className="absolute -bottom-3 -right-3 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-md flex items-center gap-2 hover:scale-105 transition-transform cursor-default z-20"
              >
                <div className="w-6 h-6 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold">
                  <ShieldAlert className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 font-medium">Windows 7 VAPT</div>
                  <div className="text-xs font-bold text-red-600">11 Findings Report</div>
                </div>
              </motion.div>

            </motion.div>

          </div>

        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
};
