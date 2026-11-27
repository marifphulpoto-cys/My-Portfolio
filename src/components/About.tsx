import React from 'react';
import { siteContent } from '../data/content';
import { Globe, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';
import { RevealHeading, FlyInLeft, FlyInRight } from './Reveal';

export const About: React.FC = () => {
  const { about } = siteContent;

  return (
    <section id="about" className="py-8 lg:py-10 border-t border-slate-200/80 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-5">
          <RevealHeading>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading tracking-tight">
              About Me
            </h2>
          </RevealHeading>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
            Background, hands-on lab focus, and goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left Column: Natural Human Story */}
          <div className="lg:col-span-8 space-y-3.5">
            
            <FlyInLeft delay={0.05}>
              <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3 shadow-xs">
                <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-normal">
                  I am a BS Cybersecurity student at Air University Islamabad (started in 2025). Rather than just studying theory, I spend most of my time building isolated virtual lab environments, testing them with tools like Nmap, Metasploit, and Wazuh SIEM, and seeing how real attacks and defenses work in practice.
                </p>
                
                <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-normal">
                  Recently, I completed a full vulnerability assessment on a Windows 7 lab VM—identifying 11 security findings (including EternalBlue MS17-010) and writing a 30-page remediation report with CVSS scores. I also built SentryPAM, a Privileged Access Management tool in C++ with a web interface.
                </p>

                <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-normal">
                  I'm actively looking for internships, junior SOC analyst roles, or entry-level security testing opportunities where I can contribute and continue developing practical skills.
                </p>

                <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-2 text-xs text-slate-700">
                  <span className="inline-flex items-center gap-1 font-medium bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    Hands-on Lab Tester
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    Technical Report Writing
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    Defensive Security Focus
                  </span>
                </div>
              </div>
            </FlyInLeft>

          </div>

          {/* Right Column: Key Details */}
          <div className="lg:col-span-4 space-y-3.5">
            
            {/* Education Card */}
            <FlyInRight delay={0.1}>
              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-1.5">
                <div className="flex items-center gap-2 text-blue-700 font-semibold text-xs pb-1 border-b border-slate-100">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>Education</span>
                </div>
                <div className="text-sm font-bold text-slate-950 font-heading">
                  Air University Islamabad
                </div>
                <div className="text-xs text-blue-700 font-medium">
                  BS in Cybersecurity (2025 – Present)
                </div>
                <div className="text-xs text-slate-600 pt-0.5">
                  Focus: Vulnerability Assessment, Blue Team Defense & Network Security
                </div>
              </div>
            </FlyInRight>

            {/* Opportunities */}
            <FlyInRight delay={0.15}>
              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs pb-1 border-b border-slate-100">
                  <Briefcase className="w-4 h-4 text-emerald-600" />
                  <span>Open To</span>
                </div>
                <div className="text-xs text-slate-700 leading-relaxed font-medium">
                  Cybersecurity internships, Junior SOC Analyst positions, and entry-level security testing roles.
                </div>
              </div>
            </FlyInRight>

            {/* Languages */}
            <FlyInRight delay={0.2}>
              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-xs pb-1 border-b border-slate-100">
                  <Globe className="w-4 h-4 text-slate-500" />
                  <span>Languages</span>
                </div>
                <div className="space-y-1">
                  {about.languages.map((lang) => (
                    <div key={lang.language} className="flex items-center justify-between text-xs py-0.5">
                      <span className="text-slate-800 font-medium">{lang.language}</span>
                      <span className="text-slate-500 text-[11px] font-medium">
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FlyInRight>

          </div>

        </div>

      </div>
    </section>
  );
};
