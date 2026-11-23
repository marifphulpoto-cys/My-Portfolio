import React, { useState } from 'react';
import { siteContent } from '../data/content';
import { Mail, Github, Linkedin, ExternalLink, Copy, Check, Terminal, Send } from 'lucide-react';
import { RevealHeading, FlyInLeft, FlyInRight } from './Reveal';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ContactProps {
  track?: 'cyber' | 'web';
}

export const Contact: React.FC<ContactProps> = ({ track = 'cyber' }) => {
  const { contact } = siteContent;
  const isCyber = track === 'cyber';
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const defaultSubject = isCyber ? 'Security & VAPT Inquiry' : 'Web Development Inquiry';
    const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(subject || defaultSubject)}&body=${encodeURIComponent(`Name: ${name}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-12 lg:py-16 border-t border-slate-200/80 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {isCyber ? "Encrypted Channel" : "Direct Channel"}
          </span>
          <RevealHeading>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1.5">
              Contact & Opportunities
            </h2>
          </RevealHeading>
          <p className="text-sm sm:text-base text-slate-800 font-medium mt-1">
            {isCyber 
              ? "Reach out regarding internships, junior SOC roles, or security report projects."
              : "Reach out regarding full-stack web applications, SaaS platforms, or frontend engineering."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info (Flies in from Left) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct WhatsApp Instant Contact Card */}
            <FlyInLeft delay={0.1}>
              <div className="glass-panel p-5 rounded-2xl bg-white border-2 border-emerald-200/90 shadow-sm space-y-3 hover:border-emerald-500 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700">
                    <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                    <span>WHATSAPP DIRECT CHAT</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                    Instant Response
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div>
                    <div className="text-xl font-mono font-black text-slate-950 tracking-tight">
                      0309 3383209
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 font-medium">
                      Direct WhatsApp • Muhammad Arif
                    </div>
                  </div>

                  <a
                    href="https://wa.me/923093383209"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>Open WhatsApp</span>
                  </a>
                </div>
              </div>
            </FlyInLeft>

            {/* Direct Email Inbox */}
            <FlyInLeft delay={0.15}>
              <div className="glass-panel p-5 rounded-2xl space-y-2.5 bg-white border border-slate-300 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-700">
                    <Mail className="w-4 h-4" />
                    <span>DIRECT INBOX</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-xs font-mono font-bold text-blue-700 flex items-center gap-1.5 transition-all cursor-pointer"
                    aria-label="Copy email address"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy email"}</span>
                  </button>
                </div>
                <div className="text-sm sm:text-base font-mono font-bold text-slate-950 break-all">
                  {contact.email}
                </div>
              </div>
            </FlyInLeft>

            {/* Verified Channels */}
            <FlyInLeft delay={0.25}>
              <div className="glass-panel p-5 rounded-2xl space-y-3 bg-white border border-slate-300 shadow-sm">
                <div className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                  Verified Public Channels
                </div>
                <div className="space-y-2">
                  <a
                    href="https://wa.me/923093383209"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between text-xs sm:text-sm text-slate-900 hover:border-emerald-400 hover:bg-emerald-100/50 transition-all font-bold group"
                  >
                    <div className="flex items-center gap-3">
                      <WhatsAppIcon className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                      <span>WhatsApp: 0309 3383209</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs sm:text-sm text-slate-900 hover:border-blue-400 hover:bg-blue-50/50 transition-all font-bold group"
                  >
                    <div className="flex items-center gap-3">
                      <Github className="w-4 h-4 text-slate-900 group-hover:scale-110 transition-transform" />
                      <span>GitHub: marifphulpoto-cys</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs sm:text-sm text-slate-900 hover:border-blue-400 hover:bg-blue-50/50 transition-all font-bold group"
                  >
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                      <span>LinkedIn Profile</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <a
                    href={contact.upwork}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs sm:text-sm text-slate-900 hover:border-blue-400 hover:bg-blue-50/50 transition-all font-bold group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-4 h-4 rounded bg-blue-600 text-white flex items-center justify-center text-[9px] font-bold">Up</span>
                      <span>Upwork Freelance</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </FlyInLeft>

          </div>

          {/* Right: Terminal-Style Contact Block (Flies in from Right) */}
          <div className="lg:col-span-7">
            <FlyInRight delay={0.2}>
              <div className="glass-panel p-6 sm:p-8 rounded-3xl font-mono text-sm bg-white border border-slate-300 shadow-md">
                <div className="flex items-center gap-2 pb-4 mb-6 border-b border-slate-200 text-xs font-bold text-slate-700">
                  <Terminal className="w-4 h-4 text-blue-600" />
                  <span>TERMINAL CONTACT BLOCK</span>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-blue-700 mb-1">
                      &gt; name:
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name or organization"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-bold text-blue-700 mb-1">
                      &gt; subject:
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Internship / SOC Role / Security Report Project"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-blue-700 mb-1">
                      &gt; message:
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type transmission message details..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-mono"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 hover:scale-[1.01] active:scale-[0.99] group"
                  >
                    <span>[ Send Message via Mailto ]</span>
                    <Send className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            </FlyInRight>
          </div>

        </div>

      </div>
    </section>
  );
};
