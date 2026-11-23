import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../data/content';
import { 
  Shield, 
  FileText, 
  ArrowRight, 
  ShieldAlert, 
  Award, 
  Github, 
  Linkedin, 
  Mail, 
  Eye, 
  Code2, 
  Monitor, 
  Play
} from 'lucide-react';
import { ResumeModal } from './ResumeModal';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeroProps {
  track?: 'cyber' | 'web';
  onTrackChange?: (track: 'cyber' | 'web') => void;
}

export const Hero: React.FC<HeroProps> = ({ track = 'cyber', onTrackChange }) => {
  const { about, contact } = siteContent;
  const [resumeOpen, setResumeOpen] = useState(false);

  const isCyber = track === 'cyber';

  return (
    <section id="hero" className="pt-24 pb-12 lg:pt-28 lg:pb-16 relative overflow-hidden">
      
      {/* Soft Ambient Radial Lights */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-20 right-10 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Clean Typography & Dual Track Selector */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Dual Portfolio Track Selector (Cybersecurity vs Web Development) */}
            {onTrackChange && (
              <motion.div
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="inline-flex p-1 bg-white rounded-2xl border-2 border-blue-200/90 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => onTrackChange('cyber')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isCyber
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-700 hover:text-blue-700'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Cybersecurity Track</span>
                </button>

                <button
                  type="button"
                  onClick={() => onTrackChange('web')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    !isCyber
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-700 hover:text-blue-700'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Full-Stack Web Dev Track</span>
                </button>
              </motion.div>
            )}

            {/* Status Pill */}
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-800 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>
                  {isCyber 
                    ? "BS Cybersecurity • Air University Islamabad" 
                    : "Full-Stack Web Developer • React & Supabase"}
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 font-heading leading-tight">
                Muhammad Arif{' '}
                <span className="text-blue-600">
                  Phulpoto
                </span>
              </h1>
            </motion.div>

            {/* Clean Subtitle */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <p className="text-base sm:text-lg font-bold text-slate-800 font-heading">
                {isCyber
                  ? "Blue Team Operations • Vulnerability Assessment (VAPT) • SOC Labs"
                  : "Full-Stack Web Engineering • Retail POS SaaS • C++ Systems"}
              </p>
            </motion.div>

            {/* Clean Short Bio */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-xl">
                {isCyber
                  ? "Hands-on defensive security and BS Cybersecurity student at Air University Islamabad. Open for internships, Junior SOC Analyst roles, or VAPT projects."
                  : "Full-Stack Web Developer building high-performance SaaS platforms and retail POS systems. Open for internships, software engineering roles, or client projects."}
              </p>
            </motion.div>

            {/* Clean CTA Action Buttons */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {isCyber ? (
                  <>
                    <a
                      href="#cybersecurity"
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-blue-600/20 transition-all hover:scale-105 active:scale-95"
                    >
                      <span>View VAPT Labs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href="https://github.com/marifphulpoto-cys/win7-vapt-lab/blob/main/VAPT_Report_Win7.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-mono font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>VAPT Report (PDF)</span>
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href="#web-development"
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-blue-600/20 transition-all hover:scale-105 active:scale-95"
                    >
                      <span>Explore Projects</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href="#web-development"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Live Demos</span>
                    </a>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setResumeOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-700 border border-slate-300 font-mono font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span>Resume / CV</span>
                </button>
              </div>
            </motion.div>

            {/* Direct Channels Row (Clean, Uncluttered) */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600">
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition-colors font-semibold"
                >
                  <Github className="w-3.5 h-3.5 text-slate-900" />
                  <span>GitHub</span>
                </a>
                <span className="text-slate-300">•</span>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition-colors font-semibold"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                  <span>LinkedIn</span>
                </a>
                <span className="text-slate-300">•</span>
                <a
                  href={contact.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition-colors font-semibold"
                >
                  <span className="w-3.5 h-3.5 rounded bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold">Up</span>
                  <span>Upwork</span>
                </a>
                <span className="text-slate-300">•</span>
                <a
                  href="https://wa.me/923093383209"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-700 hover:text-emerald-600 transition-colors font-semibold"
                  title="Direct WhatsApp: 0309 3383209"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
                <span className="text-slate-300">•</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition-colors font-semibold"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>{contact.email}</span>
                </a>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Animated Photo Card with Counter-Rotating Cyber Rings & Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 85, damping: 14, delay: 0.2 }}
              className="relative w-full max-w-[285px] sm:max-w-[305px]"
            >
              
              {/* Outer Clockwise Rotating Dashed Cyber Ring with Orbital Nodes */}
              <div className="absolute -inset-5 rounded-3xl border-2 border-dashed border-blue-400/50 animate-spin-slow pointer-events-none -z-10">
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50"></span>
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50"></span>
              </div>

              {/* Inner Counter-Rotating Concentric Orbit Ring */}
              <div className="absolute -inset-2.5 rounded-3xl border border-dashed border-cyan-400/40 animate-spin-reverse pointer-events-none -z-10"></div>
              
              {/* Soft Pulsing Glowing Aura Behind Photo */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-blue-600/30 via-sky-400/25 to-indigo-600/30 blur-2xl animate-pulse-glow -z-20"></div>

              {/* Main Photo Card */}
              <div className="relative glass-panel rounded-2xl p-3 shadow-xl border-2 border-blue-200/90 bg-white group hover:border-blue-500 transition-all">
                
                {/* Photo Container */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                  <img
                    src={about.profileImage}
                    alt="Muhammad Arif Phulpoto"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Bottom Text Overlay inside photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-3 text-white">
                    <div className="text-base font-bold font-heading drop-shadow-md">
                      Muhammad Arif Phulpoto
                    </div>
                    <div className="text-[11px] font-mono text-cyan-300 font-semibold drop-shadow">
                      {isCyber ? "BS Cybersecurity • Air University Islamabad" : "Full-Stack Web Developer • React & Supabase"}
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-600 flex items-center gap-1 font-bold">
                    {isCyber ? <Shield className="w-3.5 h-3.5 text-blue-600" /> : <Code2 className="w-3.5 h-3.5 text-blue-600" />}
                    <span>{isCyber ? "DEFEND • DETECT • RESPOND" : "BUILD • DEPLOY • SCALE"}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200 text-[10px]">
                    Arifsec.com
                  </span>
                </div>

              </div>

              {/* Floating Badge 1 (Top-Left) with Continuous Float Animation */}
              <motion.div
                initial={{ scale: 0, opacity: 0, y: -15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 10, delay: 0.4 }}
                className="absolute -top-3.5 -left-5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-blue-200 shadow-lg flex items-center gap-2 animate-float-1 hover:scale-105 transition-transform cursor-default z-20"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  {isCyber ? <Award className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
                </div>
                <div className="text-left font-mono">
                  <div className="text-[9px] text-slate-400 font-bold uppercase">{isCyber ? "Certified" : "Full-Stack Dev"}</div>
                  <div className="text-[11px] font-bold text-slate-800">{isCyber ? "Blue Team (BTF)" : "React 19 & Supabase"}</div>
                </div>
              </motion.div>

              {/* Floating Badge 2 (Bottom-Right) with Continuous Float Animation */}
              <motion.div
                initial={{ scale: 0, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 10, delay: 0.5 }}
                className="absolute -bottom-3.5 -right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-red-200 shadow-lg flex items-center gap-2 animate-float-2 hover:scale-105 transition-transform cursor-default z-20"
              >
                <div className="w-6 h-6 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold">
                  {isCyber ? <ShieldAlert className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5 text-blue-600" />}
                </div>
                <div className="text-left font-mono">
                  <div className="text-[9px] text-slate-400 font-bold uppercase">{isCyber ? "VAPT Lab" : "Live Demos"}</div>
                  <div className="text-[11px] font-bold text-red-600">{isCyber ? "11 Findings (MS17-010)" : "4 Working Web Apps"}</div>
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
