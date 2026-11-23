import React, { useState } from 'react';
import { siteContent, SkillCategory } from '../data/content';
import { Shield, CheckCircle2, Code2, Sparkles } from 'lucide-react';
import { RevealHeading, RevealCard } from './Reveal';

interface SkillsProps {
  track?: 'cyber' | 'web';
}

export const Skills: React.FC<SkillsProps> = ({ track = 'cyber' }) => {
  const { skills } = siteContent;
  const isCyber = track === 'cyber';

  const webSkillsList: SkillCategory[] = [
    {
      category: "Frontend Architecture",
      level: "Hands-on",
      skills: [
        "React 19 & React 18",
        "TypeScript & JavaScript (ESNext)",
        "TanStack Router & Start",
        "State Management & Architecture",
        "Single Page Applications (SPA)"
      ]
    },
    {
      category: "UI & Motion Design",
      level: "Hands-on",
      skills: [
        "Tailwind CSS v4 & Tailwind v3",
        "Radix UI Primitives",
        "Framer Motion / Motion",
        "Dark / Light Mode Theming",
        "Mobile-First Responsive Layouts"
      ]
    },
    {
      category: "Backend & Databases",
      level: "Hands-on",
      skills: [
        "Supabase & PostgreSQL",
        "Row Level Security (RLS) Policies",
        "TanStack React Query (State)",
        "REST APIs & JSON Handling",
        "Auth & Role-Based Access Control"
      ]
    },
    {
      category: "Systems & Algorithms",
      level: "Hands-on",
      skills: [
        "C++ (18 OOP Design Patterns)",
        "Python Automation",
        "Git & GitHub Workflows",
        "Vite & Node.js Environment"
      ]
    }
  ];

  const activeSkillSet = isCyber ? skills : webSkillsList;
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...activeSkillSet.map(s => s.category)];

  const filtered = selectedCategory === "All"
    ? activeSkillSet
    : activeSkillSet.filter(s => s.category === selectedCategory);

  const getLevelBadgeClass = (level: "Hands-on" | "Practicing" | "Learning") => {
    switch (level) {
      case "Hands-on":
        return "bg-blue-50 text-blue-700 border-blue-200 font-bold";
      case "Practicing":
        return "bg-cyan-50 text-cyan-800 border-cyan-200 font-bold";
      case "Learning":
        return "bg-slate-100 text-slate-700 border-slate-200 font-bold";
    }
  };

  return (
    <section id="skills" className="py-10 lg:py-14 border-t border-slate-200/80 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-800">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{isCyber ? "TECHNICAL MATRIX" : "ENGINEERING ARSENAL"}</span>
            </div>
            <RevealHeading>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-2">
                {isCyber ? "Skills & Security Arsenal" : "Tech Stack & Engineering Skills"}
              </h2>
            </RevealHeading>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              {isCyber
                ? "Categorized technical capabilities labeled by hands-on proficiency and ongoing learning."
                : "Modern web frameworks, database architectures, state management, and systems programming."}
            </p>
          </div>
        </div>

        {/* Category Filter Pills (Compact) */}
        <div className="flex flex-wrap gap-1.5 mb-6" role="tablist" aria-label="Skill categories">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 font-bold cursor-pointer ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20 scale-102"
                  : "bg-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-200 border border-slate-200"
              }`}
              role="tab"
              aria-selected={selectedCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Compact Skills Grid - 4 Columns on desktop */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${isCyber ? 'lg:grid-cols-3 xl:grid-cols-4' : 'lg:grid-cols-4'} gap-4 items-stretch`}>
          {filtered.map((item, idx) => (
            <RevealCard key={item.category} index={idx} className="h-full flex flex-col">
              <div className="glass-panel p-4 rounded-xl flex flex-col justify-between h-full bg-white hover:border-blue-400 hover:shadow-md transition-all border border-slate-200/90 flex-1">
                <div>
                  {/* Card Header (Compact) */}
                  <div className="flex items-center justify-between gap-1.5 pb-2.5 border-b border-slate-100">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-950 font-heading flex items-center gap-1.5 truncate">
                      {isCyber ? <Shield className="w-3.5 h-3.5 text-blue-600 shrink-0" /> : <Code2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                      <span className="truncate">{item.category}</span>
                    </h3>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border shrink-0 ${getLevelBadgeClass(item.level)}`}>
                      {item.level}
                    </span>
                  </div>

                  {/* Skills List (Compact spacing) */}
                  <ul className="space-y-2 mt-3">
                    {item.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2 text-xs text-slate-800 font-medium leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subtle bottom indicator */}
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>{item.skills.length} skills</span>
                  <span className="text-blue-600 font-bold">Verified</span>
                </div>
              </div>
            </RevealCard>
          ))}
        </div>

      </div>
    </section>
  );
};
