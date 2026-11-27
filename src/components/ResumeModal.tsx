import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  Printer, 
  Shield, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Github, 
  Linkedin, 
  Layers,
  FileText
} from 'lucide-react';
import { siteContent } from '../data/content';
import { stopLenis, startLenis } from '../hooks/useLenis';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { contact } = siteContent;

  // Handle ESC key to close, body scroll lock, and stop Lenis smoothly
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

  const handlePrint = () => {
    window.print();
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div 
          data-lenis-prevent="true"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
        >
          {/* Deep Backdrop */}
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
            className="relative w-full max-w-4xl h-[92vh] sm:h-[88vh] bg-white rounded-2xl shadow-2xl border-2 border-slate-300 overflow-hidden flex flex-col z-[100000]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-title"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pinned Top Action Bar */}
            <div className="bg-slate-950 text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b border-slate-800 shrink-0 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="resume-title" className="text-sm font-bold font-heading text-white flex items-center gap-2">
                    Muhammad Arif Phulpoto
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-600/30 text-blue-200 border border-blue-500/40">
                      Resume
                    </span>
                  </h3>
                  <p className="text-[11px] font-mono text-slate-300 font-medium">
                    BS Cybersecurity • Blue Team & VAPT
                  </p>
                </div>
              </div>

              {/* Action Buttons: Download, Print & Close */}
              <div className="flex items-center gap-2">
                <a
                  href="/Muhammad_Arif_Resume.pdf"
                  download="Muhammad_Arif_Phulpoto_Resume.pdf"
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/30 hover:scale-105 active:scale-95 cursor-pointer"
                  title="Download Resume as PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download PDF</span>
                </a>

                <button
                  onClick={handlePrint}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all border border-slate-700 cursor-pointer"
                  title="Print or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Print</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
                  aria-label="Close resume view"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Smooth Scrollable Printable Resume Sheet */}
            <div 
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-6 md:p-8 bg-slate-100 text-slate-900 space-y-6"
              style={{
                touchAction: 'pan-y',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain'
              }}
            >
              {/* White A4 Sheet Wrapper */}
              <div className="max-w-[780px] mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-md border border-slate-300 space-y-6">
                
                {/* Header Section */}
                <div className="border-b-2 border-blue-600 pb-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                    {/* Left: Name, Title & Academic Info */}
                    <div className="flex-1 min-w-0">
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 font-heading tracking-tight">
                        Muhammad Arif Phulpoto
                      </h1>
                      <div className="text-sm sm:text-base font-bold text-blue-700 font-mono mt-1">
                        BS Cybersecurity Student • Blue Team Operations • VAPT
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1.5 flex flex-wrap items-center gap-2">
                        <span>Air University Islamabad</span>
                        <span>•</span>
                        <span>Islamabad, Pakistan</span>
                        <span>•</span>
                        <span className="font-bold text-blue-700">Arifsec.tech</span>
                      </div>
                    </div>

                    {/* Right: Quick Action Channels */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 shrink-0 text-xs sm:text-sm font-mono font-bold space-y-2 shadow-xs self-start md:self-center">
                      <div className="flex items-center gap-2 text-slate-800">
                        <WhatsAppIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                        <a href="https://wa.me/923093383209" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline whitespace-nowrap">
                          Direct WhatsApp Chat
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-slate-800">
                        <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                        <a href={`mailto:${contact.email}`} className="text-blue-700 hover:underline whitespace-nowrap">
                          Send Email
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-slate-800">
                        <Github className="w-4 h-4 text-slate-900 shrink-0" />
                        <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:underline whitespace-nowrap">
                          GitHub Profile
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-slate-800">
                        <Linkedin className="w-4 h-4 text-blue-700 shrink-0" />
                        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline whitespace-nowrap">
                          LinkedIn Profile
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Summary */}
                <div>
                  <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-950 flex items-center gap-2 border-b-2 border-slate-200 pb-1.5 mb-2.5">
                    <span className="w-2.5 h-2.5 rounded bg-blue-600 shrink-0"></span>
                    Professional Summary
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal text-justify">
                    Cybersecurity student at Air University Islamabad with a strong practical focus on Blue Team defense and Vulnerability Assessment & Penetration Testing (VA/PT). Certified Blue Team Fundamentals (CyberWarfare Labs), passed the CEH Practical Laboratory Assessment (Cyberwing Solutions), and completed CEH & CCNA coursework. Experienced in setting up virtual lab environments, performing hands-on security testing, analyzing system logs, and writing technical reports—including a 30-page Windows 7 SP1 VAPT report detailing 11 findings and actionable remediation roadmaps. Actively seeking junior SOC analyst and cybersecurity internship opportunities.
                  </p>
                </div>

                {/* Education */}
                <div>
                  <h2 className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-wider text-slate-950 flex items-center gap-2 border-b-2 border-slate-200 pb-1.5 mb-2.5">
                    <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
                    Education
                  </h2>
                  <div className="flex items-start justify-between text-xs sm:text-sm">
                    <div>
                      <span className="font-extrabold text-slate-950 text-sm sm:text-base">Air University</span>, Islamabad, Pakistan
                      <div className="text-xs sm:text-sm text-blue-700 font-bold mt-0.5">
                        Bachelor of Science in Cybersecurity (BS-CYS)
                      </div>
                    </div>
                    <span className="font-mono text-xs text-slate-700 font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      2025 – Present
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1.5">
                    Relevant Coursework: Network Security, Blue Team Defense, Object-Oriented Programming (C++), Operating Systems Hardening, Information Security Fundamentals.
                  </p>
                </div>

                {/* Certifications & Accreditations (3 Official Only with Direct Verify Links) */}
                <div>
                  <h2 className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-wider text-slate-950 flex items-center gap-2 border-b-2 border-slate-200 pb-1.5 mb-2.5">
                    <Award className="w-4 h-4 text-blue-600 shrink-0" />
                    Certifications & Accreditations
                  </h2>
                  
                  <div className="space-y-3">
                    {/* BTF */}
                    <div className="bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between font-extrabold">
                        <span className="text-slate-950 text-xs sm:text-sm">Certified Blue Team Fundamentals (BTF)</span>
                        <span className="font-mono text-xs text-slate-700 font-bold">November 2026</span>
                      </div>
                      <div className="text-blue-700 font-bold text-xs sm:text-sm mt-0.5">CyberWarfare Labs</div>
                      <p className="text-xs sm:text-sm text-slate-800 font-medium mt-1">
                        Verified Credential: <a href="https://labs.cyberwarfare.live/credential/achievement/6af4b474206a82a158460473" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline font-mono font-bold">CyberWarfare Labs Verification (ID: 6af4b474206a82a158460473)</a>. Practical verification of blue team defensive operations, log analysis, threat detection, and incident response fundamentals.
                      </p>
                    </div>

                    {/* CEH Practical Lab Assessment */}
                    <div className="bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between font-extrabold">
                        <span className="text-slate-950 text-xs sm:text-sm">CEH Practical Laboratory Assessment (Certificate of Labs Completion)</span>
                        <span className="font-mono text-xs text-slate-700 font-bold">18 November 2026</span>
                      </div>
                      <div className="text-blue-700 font-bold text-xs sm:text-sm mt-0.5">Cyberwing Solutions (Cyberwing.pk) • Serial No: CWP-26-C113-017</div>
                      <p className="text-xs sm:text-sm text-slate-800 font-medium mt-1">
                        Verified Credential: <a href="https://cyberwing.pk/verify/certificate/verify.php?view=285&q=4520315069839" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline font-mono font-bold">cyberwing.pk/verify (Official Verification Link)</a>. Successfully passed practical laboratory assessment demonstrating hands-on skills in ethical hacking, vulnerability assessment, penetration testing, and security hardening.
                      </p>
                    </div>

                    {/* CEH & CCNA */}
                    <div className="bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between font-extrabold">
                        <span className="text-slate-950 text-xs sm:text-sm">Certified Ethical Hacker (CEH) & CCNA Course & Certification</span>
                        <span className="font-mono text-xs text-slate-700 font-bold">October 2026</span>
                      </div>
                      <div className="text-blue-700 font-bold text-xs sm:text-sm mt-0.5">CyberWing Academy</div>
                      <p className="text-xs sm:text-sm text-slate-800 font-medium mt-1">
                        Verified Credential: <a href="https://cyberwing.pk/verify/certificate/verify.php?view=285&q=4520315069839" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline font-mono font-bold">cyberwing.pk/verify (Q: 4520315069839)</a>. Hands-on network reconnaissance, routing & switching fundamentals, Cisco CLI, and penetration testing techniques.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Featured Projects & Security Reports */}
                <div>
                  <h2 className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-wider text-slate-950 flex items-center gap-2 border-b-2 border-slate-200 pb-1.5 mb-2.5">
                    <Briefcase className="w-4 h-4 text-blue-600 shrink-0" />
                    Key Security Projects & Systems
                  </h2>

                  <div className="space-y-3.5">
                    {/* VAPT Report */}
                    <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between font-extrabold">
                        <span className="text-slate-950 text-sm sm:text-base">Windows 7 SP1 VAPT Lab Assessment (30-Page Technical Report)</span>
                        <span className="font-mono text-xs text-slate-700 font-bold">November 2026</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 my-2 font-mono text-[11px] font-bold">
                        <span className="px-2.5 py-0.5 rounded-lg bg-red-100 text-red-800 border border-red-300">2 Critical</span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-orange-100 text-orange-800 border border-orange-300">3 High</span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-800 border border-blue-300">2 Medium</span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-cyan-100 text-cyan-800 border border-cyan-300">2 Low</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                        <li>Conducted end-to-end vulnerability assessment and penetration test against Windows 7 SP1 lab machine.</li>
                        <li>Identified and validated Remote Code Execution vulnerability MS17-010 (CVE-2017-0144 EternalBlue), enumerated SMB/NetBIOS, and delivered an executive remediation roadmap.</li>
                      </ul>
                    </div>

                    {/* SentryPAM */}
                    <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between font-extrabold">
                        <span className="text-slate-950 text-sm sm:text-base">SentryPAM — Privileged Access Management System</span>
                        <span className="font-mono text-xs text-slate-700 font-bold">October 2026</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal mt-1">
                        Built a Privileged Access Management system in C++ with a web frontend. Implemented 18 Object-Oriented Programming (OOP) design patterns, Role-Based Access Control (RBAC), session audit logging, and an encrypted credential vault.
                      </p>
                    </div>

                    {/* Airport Ticketing */}
                    <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between font-extrabold">
                        <span className="text-slate-950 text-sm sm:text-base">Musavi Airport: Ticket Management System</span>
                        <span className="font-mono text-xs text-slate-700 font-bold">2026</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal mt-1">
                        Airline flight reservation and ticket management web application featuring a live flight inquiry engine, dynamic theme persistence, passenger booking workflow, and feedback system.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technical Skills */}
                <div>
                  <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-950 flex items-center gap-2 border-b-2 border-slate-200 pb-1.5 mb-2.5">
                    <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                    Technical Skills
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="font-extrabold text-slate-950 block mb-0.5">Vulnerability Assessment & VAPT:</span>
                      <span className="text-slate-800 font-medium">Nmap, Metasploit Framework, NetExec, enum4linux-ng, WES-NG, searchsploit, Kali Linux.</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="font-extrabold text-slate-950 block mb-0.5">Blue Team & SOC Defense:</span>
                      <span className="text-slate-800 font-medium">Wazuh SIEM Ingestion, Sysmon Telemetry, Windows/Linux Log Analysis, SHA256 Integrity Checks.</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="font-extrabold text-slate-950 block mb-0.5">Networking & Infrastructure:</span>
                      <span className="text-slate-800 font-medium">TCP/IP, Subnetting, CCNA Certified, Linux CLI, Windows Scripting, VirtualBox Labs.</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="font-extrabold text-slate-950 block mb-0.5">Programming & Software:</span>
                      <span className="text-slate-800 font-medium">C++ (18 OOP Design Patterns), Python Security Automation, JavaScript, HTML5/CSS3, Git.</span>
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h2 className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-wider text-slate-950 flex items-center gap-2 border-b-2 border-slate-200 pb-1.5 mb-2">
                    <Shield className="w-4 h-4 text-blue-600 shrink-0" />
                    Languages
                  </h2>
                  <div className="text-xs sm:text-sm text-slate-900 font-bold flex flex-wrap gap-4">
                    <span>Sindhi (Native)</span>
                    <span>•</span>
                    <span>Urdu (Fluent)</span>
                    <span>•</span>
                    <span>English (Conversational / Professional)</span>
                  </div>
                </div>

              </div>

              {/* Bottom Notice */}
              <div className="text-center pb-4">
                <p className="text-xs font-mono text-slate-600 font-bold">
                  Arifsec.tech • Muhammad Arif Phulpoto • All testing performed on owned lab systems.
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
