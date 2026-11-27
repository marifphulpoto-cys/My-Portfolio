/**
 * Content Data Store
 * Clean, authentic, human-written content for Muhammad Arif Phulpoto's portfolio.
 */

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  tag?: string;
  shortSummary?: string;
  description: string;
  image?: string;
  demoUrl?: string;
  features?: ProjectFeature[];
  tools?: string[];
  result?: string;
  details?: string;
  links: {
    label: string;
    url: string;
    isPlaceholder?: boolean;
  }[];
}

export interface SkillCategory {
  category: string;
  level: "Hands-on" | "Practicing" | "Learning";
  skills: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  link?: string;
  note?: string;
  image?: string;
}

export interface JourneyMilestone {
  step: number;
  title: string;
  detail: string;
  date: string;
}

export const siteContent = {
  hero: {
    name: "Muhammad Arif Phulpoto",
    tagline: "I learn by setting up my own labs, testing vulnerabilities, and writing practical reports on what works.",
    openTo: "Open to cybersecurity internships, junior SOC analyst roles, and security testing projects.",
    roles: [
      "Vulnerability Assessment (VAPT)",
      "Blue Team Defense",
      "SOC Lab Building",
      "Security Tool Development"
    ]
  },

  about: {
    heading: "About Me",
    text: "I am a BS Cybersecurity student at Air University Islamabad (started in 2025). Rather than just studying theory, I spend most of my time building isolated virtual lab environments, testing them with tools like Nmap, Metasploit, and Wazuh SIEM, and seeing how real attacks and defenses work in practice.\n\nRecently, I completed a full vulnerability assessment on a Windows 7 lab VM—identifying 11 security findings (including EternalBlue MS17-010) and writing a 30-page remediation report with CVSS scores. I also built SentryPAM, a Privileged Access Management tool in C++ with a web interface.\n\nI'm actively looking for internships, junior SOC analyst roles, or entry-level security testing opportunities.",
    openTo: "Cybersecurity internships, Junior SOC Analyst roles, and entry-level security assessments.",
    languages: [
      { language: "Sindhi", level: "Native" },
      { language: "Urdu", level: "Fluent" },
      { language: "English", level: "Conversational" }
    ],
    profileImage: "/profile.jpg"
  },

  journey: [
    {
      step: 1,
      title: "Linux Fundamentals",
      detail: "Completed OverTheWire Bandit challenges covering Linux command-line security and navigation.",
      date: "August 2026"
    },
    {
      step: 2,
      title: "Web Security Basics",
      detail: "Completed OverTheWire Natas challenges covering authentication bypass, path traversal, and SQL injection basics.",
      date: "August - September 2026"
    },
    {
      step: 3,
      title: "TryHackMe: Blue Room",
      detail: "Hands-on lab exploiting CVE-2017-0144 (MS17-010 EternalBlue), dumping password hashes, and testing patches.",
      date: "September 2026"
    },
    {
      step: 4,
      title: "Built SentryPAM in C++",
      detail: "Developed a full Privileged Access Management tool using 18 OOP design patterns with encrypted credential storage and a web UI.",
      date: "October 2026"
    },
    {
      step: 5,
      title: "CEH & CCNA Coursework",
      detail: "Completed certified ethical hacking training and Cisco networking coursework.",
      date: "October 2026"
    },
    {
      step: 6,
      title: "Certified Blue Team Fundamentals (BTF)",
      detail: "Earned official certification from CyberWarfare Labs covering defensive monitoring and triage.",
      date: "November 2026"
    },
    {
      step: 7,
      title: "Windows 7 VAPT Report",
      detail: "Wrote an in-depth 30-page technical report detailing 11 findings and remediation roadmaps for an isolated Windows 7 VM.",
      date: "November 2026"
    },
    {
      step: 8,
      title: "Passed CEH Practical Lab Exam",
      detail: "Awarded Certificate of Labs Completion from Cyberwing Solutions (CWP-26-C113-017).",
      date: "18 November 2026"
    }
  ] as JourneyMilestone[],

  // Practical, genuine skills categories
  skills: [
    {
      category: "Vulnerability Assessment & Pen Testing",
      level: "Hands-on",
      skills: [
        "Nmap & Port Scanning",
        "Metasploit Framework",
        "NetExec & enum4linux-ng",
        "WES-NG & searchsploit",
        "Technical Report Writing (CVSS)",
        "Kali Linux & Active Labs"
      ]
    },
    {
      category: "Blue Team & SOC Defense",
      level: "Hands-on",
      skills: [
        "Wazuh SIEM Setup",
        "Sysmon Telemetry Rules",
        "Windows & Linux Log Analysis",
        "Brute-Force Attack Triage",
        "File Integrity Checks (SHA256)",
        "Patching & Remediation Roadmaps"
      ]
    },
    {
      category: "Networking & Systems",
      level: "Hands-on",
      skills: [
        "TCP/IP, Subnetting & DHCP",
        "CCNA Concepts (Completed)",
        "Linux Command Line",
        "Windows Command Prompt",
        "VirtualBox Lab Topologies"
      ]
    },
    {
      category: "Programming & Tools",
      level: "Hands-on",
      skills: [
        "C++ (18 OOP Design Patterns)",
        "Python Scripting for Security",
        "Steganography Tools (zsteg, binwalk)",
        "Data Structures & Algorithms",
        "Git & GitHub Workflows"
      ]
    }
  ] as SkillCategory[],

  // 3 Verified Projects (Real previews, live demos / PDF reports)
  cyberProjects: [
    {
      id: "win7-vapt",
      title: "Windows 7 SP1 VAPT Lab Report (30 Pages)",
      tag: "VAPT Lab Report",
      image: "/vapt-cover.png",
      shortSummary: "Full vulnerability assessment of an isolated Windows 7 VM with 11 documented findings, MS17-010 RCE, and remediation steps.",
      description: "Conducted an end-to-end vulnerability assessment and penetration test against an isolated Windows 7 SP1 lab machine (192.168.100.8). Used Nmap, NetExec, Metasploit scanner modules, enum4linux-ng, searchsploit, and WES-NG. Identified 11 distinct findings across five severity levels, validated remote code execution via MS17-010 EternalBlue, enumerated SMB/NetBIOS, and authored a 30-page report with actionable remediation roadmaps.",
      features: [
        {
          title: "2 Critical Findings (MS17-010)",
          description: "EternalBlue RCE validation, unauthenticated SMBv1 exploitation, and remote kernel pool corruption."
        },
        {
          title: "3 High Severity Vulnerabilities",
          description: "SMB signing disabled, NetBIOS null session enumeration, and cleartext credential exposures."
        },
        {
          title: "2 Medium & 2 Low Findings",
          description: "Over 180 missing Windows hotfixes, insecure service configurations & deprecated protocols."
        },
        {
          title: "Remediation Roadmap",
          description: "30-page structured report including risk matrix, exploitation scenarios, and defensive patching steps."
        }
      ],
      tools: ["Nmap", "Metasploit", "NetExec", "MS17-010", "WES-NG", "Report Writing"],
      result: "11 findings (2 Critical, 3 High, 2 Medium, 2 Low, 2 Informational)",
      links: [
        { label: "View PDF Report", url: "https://github.com/marifphulpoto-cys/win7-vapt-lab/blob/main/VAPT_Report_Win7.pdf" },
        { label: "GitHub Lab Repo", url: "https://github.com/marifphulpoto-cys/win7-vapt-lab" }
      ]
    },
    {
      id: "sentry-pam",
      title: "SentryPAM — Privileged Access Management",
      tag: "Security Software",
      image: "/sentry-pam-preview.png",
      demoUrl: "/demos/sentry-pam/index.html",
      shortSummary: "Privileged Access Management system with a C++ backend and web interface, enforcing RBAC, audit logs, and credential vaults.",
      description: "A full Privileged Access Management tool built with a C++ backend and a modern web interface. Built using 18 Object-Oriented Programming (OOP) design patterns to securely store administrative credentials, log privilege access requests, and enforce role-based access control (RBAC).",
      features: [
        {
          title: "Encrypted Credential Vault",
          description: "Secure storage, hashing, and retrieval of administrative credentials with zero plain-text leaks."
        },
        {
          title: "Privilege Session Logging",
          description: "Real-time auditing, command tracking, and telemetry recording for all elevated session requests."
        },
        {
          title: "Role-Based Access Control",
          description: "Granular administrative privileges, approval workflows, and multi-tier session isolation."
        },
        {
          title: "18 OOP Design Patterns",
          description: "Architected with solid C++ design principles (Singleton, Factory, Observer, Decorator, etc.)."
        }
      ],
      details: "Features: Encrypted credential vault, privilege session logging, and role-based administration.",
      tools: ["C++", "HTML5", "CSS3", "JavaScript", "OOP Patterns"],
      links: [
        { label: "GitHub Repository", url: "https://github.com/marifphulpoto-cys/Sentry-PAM" }
      ]
    },
    {
      id: "airport-ticketing",
      title: "Musavi Airport: Flight Ticket Portal",
      tag: "Web Application",
      image: "/airport-preview.png",
      demoUrl: "/demos/airport-system/index.html",
      shortSummary: "Flight inquiry and reservation portal with interactive schedule search, ticket booking workflow, and dark/light theme.",
      description: "A passenger flight ticketing and inquiry website built as a team project. Features domestic and international flight inquiry, flight schedule discovery, booking workflows, dark/light theme persistence, and customer e-complaint tracking.",
      features: [
        {
          title: "Flight Inquiry Engine",
          description: "Instant search for domestic and international flight schedules, timings, and seat availability."
        },
        {
          title: "Passenger Booking Workflow",
          description: "Interactive ticket reservation workflow with seat selection and digital boarding pass generation."
        },
        {
          title: "Theme Engine",
          description: "Custom dark/light mode switching with persistent local state across user sessions."
        },
        {
          title: "Customer Support Portal",
          description: "Online e-complaint submission, passenger feedback tracking, and inquiry status review."
        }
      ],
      details: "Team role: Implemented frontend architecture, flight inquiry engine, and theme persistence.",
      tools: ["JavaScript", "HTML5", "CSS3", "Theme Engine", "Flight Inquiry"],
      links: [
        { label: "GitHub Repository", url: "https://github.com/marifphulpoto-cys/Ticketing-Management-System" }
      ]
    }
  ] as Project[],

  // Web Projects list retained empty for type safety
  webProjects: [] as Project[],

  // Backward compatibility alias
  projects: [] as Project[],

  // 3 Official Certificates with direct verification links
  certificatesAndLearning: [
    {
      id: "btf-cert",
      title: "Certified Blue Team Fundamentals (BTF)",
      issuer: "CyberWarfare Labs",
      date: "November 2026",
      image: "/btf-certificate.png",
      link: "https://labs.cyberwarfare.live/credential/achievement/6af4b474206a82a158460473",
      note: "Credential ID: 6af4b474206a82a158460473"
    },
    {
      id: "ceh-lab-cert",
      title: "CEH Practical Lab Assessment (Certificate of Labs Completion)",
      issuer: "Cyberwing Solutions (Cyberwing.pk)",
      date: "18 November 2026",
      image: "/ceh-lab-certificate.jpg",
      link: "https://cyberwing.pk/verify/certificate/verify.php?view=285&q=4520315069839",
      note: "Certificate Serial: CWP-26-C113-017"
    },
    {
      id: "ceh-ccna-cert",
      title: "Certified Ethical Hacker (CEH) & CCNA",
      issuer: "CyberWing Academy",
      date: "October 2026",
      image: "/ceh-ccna-certificate.png",
      link: "https://cyberwing.pk/verify/certificate/verify.php?view=285&q=4520315069839",
      note: "Course & Certification Completed • Q: 4520315069839"
    }
  ] as CertificateItem[],

  toolsMarquee: [
    "Nmap",
    "NetExec",
    "enum4linux-ng",
    "searchsploit",
    "WES-NG",
    "Metasploit",
    "Wazuh",
    "Kali Linux",
    "VirtualBox",
    "Wireshark",
    "Python",
    "C++",
    "zsteg",
    "binwalk",
    "SHA256"
  ],

  contact: {
    email: "marifphulpoto7@gmail.com",
    github: "https://github.com/marifphulpoto-cys",
    linkedin: "https://www.linkedin.com/in/muhammad-arif-068467383",
    upwork: "https://www.upwork.com/freelancers/~012ee09c992fdf5623?mp_source=share",
    phone: "03093383209",
    whatsapp: "https://wa.me/923093383209"
  },

  footer: "© 2026 Muhammad Arif Phulpoto • Arifsec.tech"
};
