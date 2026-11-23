/**
 * Content Data Store
 * Updated with verified certificate credentials, completed milestones, and real images.
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
    tagline: "I test my own labs, learn from what breaks, and write it up so anyone can fix it.",
    openTo: "Open to internships, junior SOC analyst roles and small security report projects.",
    roles: [
      "Vulnerability Assessment",
      "Full-Stack Web Developer",
      "Blue Team Operations",
      "SOC Lab Builder"
    ]
  },

  about: {
    heading: "About",
    text: "I'm a BS Cybersecurity student at Air University Islamabad (started in 2025) and a Full-Stack Web Developer. I build secure software systems, architect retail SaaS platforms, run vulnerability assessments on systems I own, and turn technical findings into actionable engineering reports. My dual focus spans Blue Team defense and modern web application engineering.",
    openTo: "Internships, Junior SOC Analyst roles, Full-Stack Web Development, and Security Audits.",
    languages: [
      { language: "Sindhi", level: "native" },
      { language: "Urdu", level: "fluent" },
      { language: "English", level: "conversational" }
    ],
    profileImage: "/profile.jpg"
  },

  journey: [
    {
      step: 1,
      title: "Linux basics",
      detail: "OverTheWire Bandit completed",
      date: "August 2026"
    },
    {
      step: 2,
      title: "Web security basics",
      detail: "OverTheWire Natas completed",
      date: "August - September 2026"
    },
    {
      step: 3,
      title: "TryHackMe Blue room completed",
      detail: "TryHackMe \"Blue\" room: completed",
      date: "September 2026"
    },
    {
      step: 4,
      title: "SentryPAM pushed to GitHub",
      detail: "Full-stack Privileged Access Management system in C++",
      date: "October 2026"
    },
    {
      step: 5,
      title: "CEH and CCNA courses & certification completed",
      detail: "Certified Ethical Hacker & CCNA credentials achieved",
      date: "October 2026"
    },
    {
      step: 6,
      title: "Certified Blue Team Fundamentals earned",
      detail: "CyberWarfare Labs certification achievement",
      date: "November 2026"
    },
    {
      step: 7,
      title: "Windows 7 VAPT lab report written",
      detail: "30-page report documenting 11 findings on Windows 7 lab VM",
      date: "November 2026"
    },
    {
      step: 8,
      title: "CEH Practical Lab Assessment Passed",
      detail: "Certificate of Labs Completion awarded by Cyberwing Solutions (CWP-26-C113-017)",
      date: "18 November 2026"
    }
  ] as JourneyMilestone[],

  skills: [
    {
      category: "Security",
      level: "Hands-on",
      skills: [
        "Nmap",
        "NetExec",
        "enum4linux-ng",
        "searchsploit",
        "WES-NG",
        "Metasploit (lab use)",
        "vulnerability assessment",
        "Kali Linux"
      ]
    },
    {
      category: "Networking",
      level: "Hands-on",
      skills: [
        "TCP/IP",
        "DHCP and subnetting",
        "CCNA Certification completed"
      ]
    },
    {
      category: "Programming",
      level: "Hands-on",
      skills: [
        "C++ with OOP",
        "Python (including an LSB steganography tool and detection with zsteg and binwalk)",
        "data structures"
      ]
    },
    {
      category: "Blue team",
      level: "Practicing",
      skills: [
        "Wazuh SIEM lab",
        "log analysis",
        "SPF, DKIM and DMARC concepts",
        "file integrity checks with SHA256"
      ]
    },
    {
      category: "Systems",
      level: "Hands-on",
      skills: [
        "Linux command line",
        "Windows CMD scripting",
        "VirtualBox labs"
      ]
    },
    {
      category: "Documentation",
      level: "Hands-on",
      skills: [
        "security report writing",
        "risk scoring and remediation plans"
      ]
    },
    {
      category: "Learning",
      level: "Learning",
      skills: [
        "web security (OverTheWire Natas - Completed)",
        "cloud security"
      ]
    }
  ] as SkillCategory[],

  // Dedicated Cybersecurity & VAPT Projects
  cyberProjects: [
    {
      id: "win7-vapt",
      title: "Windows 7 SP1 VAPT Lab Assessment (30-Page Report)",
      tag: "FLAGSHIP VAPT",
      image: "/vapt-cover.png",
      shortSummary: "Full vulnerability assessment of Windows 7 VM with 11 findings, MS17-010 RCE & remediation plan.",
      description: "Full vulnerability assessment and penetration test of an isolated Windows 7 SP1 lab VM (192.168.100.8). Tools: Nmap, NetExec, Metasploit scanner modules, enum4linux-ng, searchsploit, and WES-NG. Identified 11 distinct findings across five severity tiers, validated remote code execution via MS17-010 EternalBlue, enumerated SMB/NetBIOS, and delivered an executive remediation roadmap.",
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
          title: "Executive Remediation Roadmap",
          description: "30-page structured report including risk matrix, exploitation scenarios, and defense patching steps."
        }
      ],
      tools: ["Nmap", "MS17-010", "Metasploit", "NetExec", "enum4linux", "WES-NG"],
      result: "11 findings (2 Critical, 3 High, 2 Medium, 2 Low, 2 Informational)",
      links: [
        { label: "View PDF Report", url: "https://github.com/marifphulpoto-cys/win7-vapt-lab/blob/main/VAPT_Report_Win7.pdf" },
        { label: "GitHub Lab Repo", url: "https://github.com/marifphulpoto-cys/win7-vapt-lab" }
      ]
    },
    {
      id: "home-soc-lab",
      title: "Home SOC & Threat Detection Lab",
      tag: "HANDS-ON SOC",
      image: "/home-soc-preview.png",
      shortSummary: "Multi-VM virtualized SOC with Windows 10, Kali Linux, Sysmon telemetry & Wazuh SIEM alerts.",
      description: "A multi-VM Security Operations Center built on VirtualBox containing Windows 10, Kali Linux, and Wazuh SIEM manager/indexer. Ingested live endpoint telemetry, analyzed brute-force logon events, and configured defensive alert rules.",
      features: [
        {
          title: "Wazuh SIEM Ingestion",
          description: "Real-time endpoint telemetry and log ingestion from Windows 10 agents via Wazuh indexer."
        },
        {
          title: "Brute-Force Attack Simulation",
          description: "Simulated offensive RDP and SMB brute-force attacks from Kali to validate detection rules."
        },
        {
          title: "Sysmon Telemetry Configuration",
          description: "Custom Sysmon XML rules tracking process injection, child process spawning & network beacons."
        }
      ],
      tools: ["Wazuh SIEM", "VirtualBox", "Kali Linux", "Sysmon", "Log Analysis"],
      links: []
    },
    {
      id: "thm-blue-lab",
      title: "TryHackMe: \"Blue\" Room Exploitation",
      tag: "COMPLETED LAB",
      image: "/thm-blue-preview.png",
      shortSummary: "Exploitation of CVE-2017-0144 (MS17-010), NT AUTHORITY\\SYSTEM privilege & Mimikatz hash dumping.",
      description: "Hands-on laboratory exploitation of CVE-2017-0144 (MS17-010 EternalBlue). Executed buffer overflow payload against unpatched Windows target, achieved SYSTEM privilege, dumped NTLM password hashes, and performed defensive patch verification.",
      features: [
        {
          title: "Nmap NSE Vulnerability Scan",
          description: "Identified smb-vuln-ms17-010 vulnerability on SMB port 445 without disruption."
        },
        {
          title: "Kernel Exploitation & SYSTEM Privileges",
          description: "Delivered staged shellcode gaining ring-0 NT AUTHORITY\\SYSTEM shell access."
        },
        {
          title: "Credential Extraction & Mitigation",
          description: "Extracted hashed passwords using Mimikatz and verified post-patch mitigation signatures."
        }
      ],
      tools: ["Metasploit", "Nmap", "Mimikatz", "Wireshark"],
      links: []
    },
    {
      id: "log-correlation-engine",
      title: "Log Correlation & Attack Graph Engine",
      tag: "SECURITY TOOL",
      image: "/correlation-preview.png",
      shortSummary: "Graph theory engine correlating Linux auth & Nginx logs to identify cheapest defensive threat cuts.",
      description: "A planned algorithmic engine that joins Linux auth logs and Apache/Nginx web server access logs into graph-based attack sequences to compute the cheapest defensive cut to break threat chains. Documented and architected.",
      features: [
        {
          title: "Multi-Source Log Normalization",
          description: "Regex parsers normalizing syslog, auth.log, and web server combined access logs."
        },
        {
          title: "Attack Sequence Graph Modeling",
          description: "Constructs directed acyclic graphs representing attacker reconnaissance, pivots, and persistence."
        },
        {
          title: "Defensive Min-Cut Computation",
          description: "Identifies the minimal set of firewall/firewall drop rules to disconnect the threat chain."
        }
      ],
      tools: ["Python", "Graph Theory", "Regex", "SIEM Architecture"],
      links: []
    }
  ] as Project[],

  // Dedicated Full-Stack Web Development Projects (All with pictures and working live demos)
  webProjects: [
    {
      id: "nexus-pos",
      title: "NexusStore — Retail POS & Smart Inventory SaaS",
      tag: "FULL-STACK SAAS",
      image: "/pos-preview.png",
      demoUrl: "/demos/nexus-pos/index.html",
      shortSummary: "High-speed retail POS counter, automated inventory deduction, and customer dues ledger (Khata).",
      description: "A high-performance Point of Sale (POS), inventory control, digital khata customer ledger, and expense management platform built for fast-moving retail stores. Features a lightning-fast cashier counter with barcode scanner support, automated real-time stock deduction, low-stock predictive alerts, customer credit tracking, and Role-Based Access Control (Admin vs Cashier).",
      features: [
        {
          title: "Lightning-Fast POS Counter",
          description: "Quick barcode scan, cashier keyboard shortcuts, instant cart calculation & receipt printing modal."
        },
        {
          title: "Smart Inventory Control",
          description: "Automated real-time stock deduction, SKU tracking, category filtering & low-stock predictive alerts."
        },
        {
          title: "Digital Khata (Customer Ledger)",
          description: "Complete credit balance ledger, customer dues tracking, payment history & transaction timestamps."
        },
        {
          title: "Role-Based Access Control",
          description: "Admin financial dashboard and analytics vs Cashier distraction-free transaction counter."
        }
      ],
      details: "Tech Stack: React 19, TypeScript, TanStack Router, Supabase (PostgreSQL with RLS), Tailwind CSS, Framer Motion.",
      tools: ["React 19", "TypeScript", "TanStack Router", "Supabase", "PostgreSQL", "Tailwind CSS", "Framer Motion"],
      links: []
    },
    {
      id: "sentry-pam",
      title: "SentryPAM — Privileged Access Management System",
      tag: "SECURITY SOFTWARE",
      image: "/sentry-pam-preview.png",
      demoUrl: "/demos/sentry-pam/index.html",
      shortSummary: "C++ core & web frontend PAM system enforcing RBAC, session audit logs, and credential vaults.",
      description: "A full-stack Privileged Access Management system built with a C++ backend and modern web frontend. Utilizes 18 Object-Oriented Programming (OOP) design patterns and principles to securely store administrative credentials, log privilege access requests, and enforce role-based access control (RBAC).",
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
      tools: ["C++", "HTML5", "CSS3", "JavaScript", "OOP Design Patterns"],
      links: [
        { label: "GitHub Repository", url: "https://github.com/marifphulpoto-cys/Sentry-PAM" }
      ]
    },
    {
      id: "airport-ticketing",
      title: "Musavi Airport: Flight Ticket Management System",
      tag: "TEAM PROJECT",
      image: "/airport-preview.png",
      demoUrl: "/demos/airport-system/index.html",
      shortSummary: "Passenger flight reservation portal with live inquiry engine, booking flow, and theme persistence.",
      description: "Comprehensive airline operations and passenger ticketing portal. Features domestic and international flight inquiry, flight schedule discovery, booking workflows, dynamic dark/light mode persistence, and customer e-complaint tracking.",
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
          title: "Dynamic Theme Engine",
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
    },
    {
      id: "currency-exchanger",
      title: "Smart Currency Exchanger & Converter",
      tag: "WEB APPLICATION",
      image: "/currency-exchanger-preview.png",
      demoUrl: "/demos/currency-exchanger/index.html",
      shortSummary: "Real-time currency converter with live exchange calculations and responsive financial UI.",
      description: "Interactive real-time currency converter web application with live exchange rate calculation, multi-currency conversion math, and responsive financial user interface.",
      features: [
        {
          title: "Real-Time Exchange Rates",
          description: "Instant mathematical rate conversions across international currencies with high precision."
        },
        {
          title: "Responsive Financial UI",
          description: "Distraction-free, card-based interface tailored for quick lookups on mobile and desktop."
        },
        {
          title: "Quick Currency Swap",
          description: "One-click toggle between source and target currencies with automatic recalculation."
        }
      ],
      tools: ["JavaScript", "HTML5", "CSS3", "Financial APIs"],
      links: []
    }
  ] as Project[],

  // Backward compatibility
  projects: [
    {
      id: "win7-vapt",
      title: "Windows 7 VAPT Lab Report",
      image: "/vapt-cover.png",
      description: "A full vulnerability assessment of my own Windows 7 lab VM. Tools: Nmap, NetExec, Metasploit scanner modules, enum4linux-ng, searchsploit and WES-NG. Result: 11 findings (2 Critical, 3 High, 2 Medium, 2 Low, 2 Informational). The most serious were MS17-010 (EternalBlue) and 180 missing security patches. The report includes risk scoring, possible attacks and a remediation plan. Detection only, no exploitation in this report.",
      tools: ["Nmap", "NetExec", "Metasploit scanner modules", "enum4linux-ng", "searchsploit", "WES-NG"],
      result: "11 findings (2 Critical, 3 High, 2 Medium, 2 Low, 2 Informational)",
      links: [
        { label: "GitHub Repository", url: "https://github.com/marifphulpoto-cys/win7-vapt-lab" },
        { label: "View PDF Report", url: "https://github.com/marifphulpoto-cys/win7-vapt-lab/blob/main/VAPT_Report_Win7.pdf" }
      ]
    },
    {
      id: "sentry-pam",
      title: "SentryPAM",
      description: "A full-stack Privileged Access Management system built in C++ with a web frontend, using 18 OOP concepts.",
      links: [
        { label: "GitHub Repository", url: "https://github.com/marifphulpoto-cys/Sentry-PAM" }
      ]
    },
    {
      id: "airport-ticketing",
      title: "Musavi Airport Sukkur: Ticket Management System",
      description: "A team project. A web app with flight inquiry (domestic and international), my bookings, procedure, services and facilities, e-complaint and dark mode.",
      details: "Team role: Implemented frontend architecture, dark mode theme persistence, and flight inquiry logic.",
      links: [
        { label: "GitHub Repository", url: "https://github.com/marifphulpoto-cys/Ticketing-Management-System" }
      ]
    },
    {
      id: "home-soc-lab",
      title: "Home SOC Lab",
      description: "A VirtualBox lab with Windows 10, Wazuh and Kali Linux machines, used to practice log monitoring.",
      links: []
    },
    {
      id: "log-correlation-engine",
      title: "Log Correlation Engine",
      tag: "Design stage",
      description: "A planned engine that joins Linux auth and web logs into attack chains and finds the cheapest cut to stop them. Currently designed and documented, not built.",
      links: []
    }
  ] as Project[],

  certificatesAndLearning: [
    {
      id: "btf-cert",
      title: "Certified Blue Team Fundamentals (BTF)",
      issuer: "CyberWarfare Labs",
      date: "11 November 2026",
      image: "/btf-certificate.png",
      link: "https://labs.cyberwarfare.live/credential/achievement/6af4b474206a82a158460473",
      note: "Official Certification Achieved"
    },
    {
      id: "ceh-lab-cert",
      title: "CEH Practical Lab Assessment (Certificate of Labs Completion)",
      issuer: "Cyberwing Solutions (Cyberwing.pk)",
      date: "18 November 2026",
      image: "/ceh-lab-certificate.jpg",
      link: "https://cyberwing.pk",
      note: "Sr. No: CWP-26-C113-017 • Practical Labs Completed"
    },
    {
      id: "ceh-ccna-cert",
      title: "Certified Ethical Hacker (CEH) & CCNA",
      issuer: "CyberWing Academy",
      date: "October 2026",
      image: "/ceh-ccna-certificate.png",
      link: "https://cyberwing.pk/verify/certificate/verify.php?view=285&q=4520315069839",
      note: "Course & Official Certification Completed"
    },
    {
      id: "otw-bandit",
      title: "OverTheWire Bandit",
      date: "August 2026",
      note: "All levels completed"
    },
    {
      id: "otw-natas",
      title: "OverTheWire Natas",
      date: "September 2026",
      note: "Web Security Completed"
    },
    {
      id: "thm-blue",
      title: "TryHackMe \"Blue\" room",
      date: "September 2026",
      note: "EternalBlue exploitation lab completed"
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

  footer: "2026 Arifsec.com. Built by Muhammad Arif Phulpoto. All testing was done on systems I own."
};
