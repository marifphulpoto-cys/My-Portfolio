/**
 * CYBER SECURITY & VAPT SPECIALIST PORTFOLIO CONFIGURATION
 * Focus: Vulnerability Assessment & Penetration Testing (VAPT), Security Report Writing, and Web Development.
 */
const portfolioData = {
  profile: {
    name: "Alex Rivera",
    role: "Cyber Security Analyst & VAPT Specialist",
    tagline: "Penetration Tester • Security Report Writer • Secure Web Developer",
    typingRoles: [
      "Cyber Security Specialist",
      "VAPT & Web Penetration Tester",
      "Security Report Writer (CVSS 3.1)",
      "Secure Web Application Developer",
      "Bug Bounty & OWASP Top 10 Researcher",
      "Cybersecurity Student & Freelancer"
    ],
    bio: "Cybersecurity student and freelancer specialized in Vulnerability Assessment and Penetration Testing (VAPT), comprehensive security report writing, and secure web development. I identify critical vulnerabilities before threat actors do, provide clear executive remediation reports, and build hardened, resilient web applications.",
    location: "Global / Remote Available",
    email: "alex.cybersecurity@example.com",
    phone: "+1 (555) 019-2834",
    status: "Open for VAPT Audits & Web Projects",
    statusColor: "emerald",
    resumeLink: "#resume",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mailto:alex.cybersecurity@example.com"
    }
  },

  stats: [
    { label: "Vulnerabilities Identified", value: "140+", icon: "shield-alert" },
    { label: "VAPT Security Reports Delivered", value: "35+", icon: "file-text" },
    { label: "Web Applications Secured", value: "28+", icon: "lock" },
    { label: "CVSS Severity Resolved", value: "9.8 Peak", icon: "activity" }
  ],

  services: [
    {
      id: "vapt-web",
      title: "Web App Penetration Testing (VAPT)",
      icon: "crosshair",
      tag: "CORE SERVICE",
      description: "Comprehensive vulnerability assessment of web applications following OWASP Top 10, WSTG, and PTES standards. Thorough testing for SQLi, XSS, CSRF, IDOR, SSRF, Auth Bypass, and business logic flaws.",
      tools: ["Burp Suite Pro", "OWASP ZAP", "Postman", "SQLmap", "Custom Python Scripts"]
    },
    {
      id: "report-writing",
      title: "Security & Audit Report Writing",
      icon: "file-check",
      tag: "HIGH DEMAND",
      description: "Delivering professional, executive-ready penetration testing reports. Includes CVSS v3.1 risk scores, visual proof-of-concepts (PoC), compliance gap analysis, and developer remediation guidelines.",
      tools: ["CVSS 3.1 Calculator", "Markdown / LaTeX", "Risk Matrix", "Remediation Playbooks"]
    },
    {
      id: "network-api-sec",
      title: "API & Network Security Auditing",
      icon: "network",
      tag: "SPECIALIZED",
      description: "Auditing RESTful/GraphQL APIs, cloud endpoints, and network services. Testing for rate-limiting bypasses, insecure direct object references, token leakage, and server misconfigurations.",
      tools: ["Nmap", "Wireshark", "Postman", "Metasploit", "Nikto"]
    },
    {
      id: "secure-web-dev",
      title: "Secure Full-Stack Web Development",
      icon: "code-2",
      tag: "DEV-SEC",
      description: "Designing and building secure, performant web applications from the ground up. Implementing defense-in-depth, strict CORS, CSP policies, sanitized inputs, and encrypted database layers.",
      tools: ["React.js", "Python / FastAPI", "Node.js", "PostgreSQL", "Tailwind CSS"]
    }
  ],

  skillCategories: [
    {
      id: "vapt-offensive",
      name: "VAPT & Offensive Security",
      description: "Hands-on tools and methodologies for discovering, testing, and exploiting vulnerabilities.",
      skills: [
        { name: "Web App Penetration Testing (OWASP)", level: 94, badge: "Expert" },
        { name: "Burp Suite Professional & ZAP", level: 92, badge: "Advanced" },
        { name: "API Security Testing (REST / GraphQL)", level: 88, badge: "Advanced" },
        { name: "Network Recon (Nmap, Wireshark)", level: 86, badge: "Proficient" },
        { name: "Vulnerability Scanners (Nessus, Nikto)", level: 85, badge: "Proficient" },
        { name: "Exploit PoC Scripting (Python, Bash)", level: 90, badge: "Advanced" }
      ]
    },
    {
      id: "reporting-defensive",
      name: "Report Writing & Defensive Audit",
      description: "Transforming technical findings into actionable executive reports and secure architectures.",
      skills: [
        { name: "Technical & Executive Report Writing", level: 96, badge: "Mastery" },
        { name: "CVSS v3.1 Scoring & Risk Analysis", level: 95, badge: "Expert" },
        { name: "Remediation & Patch Verification", level: 90, badge: "Advanced" },
        { name: "DevSecOps & Secure Code Review", level: 84, badge: "Proficient" },
        { name: "OWASP ASVS & NIST Standards", level: 85, badge: "Proficient" },
        { name: "Authentication Security (OAuth, JWT, 2FA)", level: 89, badge: "Advanced" }
      ]
    },
    {
      id: "web-development",
      name: "Secure Web Development Stack",
      description: "Modern, scalable web engineering with built-in security best practices.",
      skills: [
        { name: "HTML5, Modern CSS & Tailwind", level: 95, badge: "Expert" },
        { name: "JavaScript (ES6+) & React.js", level: 90, badge: "Advanced" },
        { name: "Python (FastAPI, Flask, Automation)", level: 88, badge: "Advanced" },
        { name: "Node.js & Express Security", level: 85, badge: "Proficient" },
        { name: "PostgreSQL & Secure Database Design", level: 84, badge: "Proficient" },
        { name: "Git, Docker & Linux Security Hardening", level: 88, badge: "Advanced" }
      ]
    }
  ],

  projects: [
    {
      id: "fintech-vapt-audit",
      title: "FinTech Banking Portal VAPT & Audit Report",
      category: "vapt",
      categoryLabel: "VAPT & Security Audit",
      summary: "Comprehensive grey-box penetration test uncovering critical authorization flaws and delivering an executive-grade 42-page remediation report.",
      description: "Conducted simulated cyber attacks against a financial dashboard handling real-time payments. Discovered a critical IDOR flaw (CVSS 8.8) allowing account balance manipulation and a Blind SSRF vulnerability. Delivered an exhaustive audit report with step-by-step PoCs and developer code fixes.",
      imageBg: "from-rose-500 via-red-600 to-amber-600",
      icon: "shield-alert",
      tags: ["Burp Suite Pro", "CVSS 8.8", "IDOR Exploit", "Audit Report", "OWASP Top 10"],
      metrics: ["4 Criticals Found", "42-Page Audit Report", "100% Bugs Patched"],
      cvssScore: "8.8 High",
      findings: ["Broken Object Level Auth (IDOR)", "Blind Server-Side Request Forgery", "JWT Signature Exclusion Flaw"],
      liveUrl: "#view-sample-report",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: "vuln-recon-tool",
      title: "Cerberus - Automated Recon & OSINT Suite",
      category: "tools",
      categoryLabel: "Security Tooling",
      summary: "Python-driven reconnaissance automation tool aggregating subdomains, port states, and CVE vulnerabilities for attack surface mapping.",
      description: "Engineered an offensive security intelligence tool combining Nmap automation, Sublist3r APIs, SSL certificate validation, and real-time CVE correlation. Enables security engineers to map an organization's perimeter within minutes.",
      imageBg: "from-blue-600 via-indigo-600 to-cyan-600",
      icon: "terminal",
      tags: ["Python 3", "AsyncIO", "Nmap Engine", "CVE Database", "OSINT"],
      metrics: ["<3 Min Full Recon", "Multi-threaded", "PDF Summary Output"],
      cvssScore: "Tooling",
      findings: ["Automated Port Scanning", "Subdomain Takeover Detection", "Outdated Service Detection"],
      liveUrl: "#",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: "vapt-report-generator",
      title: "SecReport - Interactive VAPT Report Generator",
      category: "webdev",
      categoryLabel: "Secure Web App",
      summary: "Full-stack web application designed for penetration testers to generate client-ready vulnerability assessment reports with live CVSS 3.1 calculation.",
      description: "Developed a secure web portal featuring real-time CVSS v3.1 vector calculation, markdown report builder with PoC screenshot uploads, encrypted client database, and one-click PDF export tailored for enterprise audits.",
      imageBg: "from-emerald-600 via-teal-600 to-cyan-700",
      icon: "file-text",
      tags: ["React", "FastAPI", "PostgreSQL", "CVSS v3.1 Engine", "PDF Generator"],
      metrics: ["Instant PDF Generation", "CVSS 3.1 Compliant", "AES-256 Encrypted"],
      cvssScore: "Defensive",
      findings: ["CVSS Vector Math Engine", "Client Confidentiality Vault", "Zero-Knowledge Storage"],
      liveUrl: "#",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: "healthcare-api-vapt",
      title: "MediVault API Penetration Testing",
      category: "vapt",
      categoryLabel: "API Security Audit",
      summary: "Restricted black-box and white-box security assessment of healthcare patient record APIs for HIPAA compliance.",
      description: "Evaluated 60+ microservice API endpoints. Identified improper rate-limiting enabling brute-force authentication, mass assignment vulnerabilities, and sensitive patient data leakage in HTTP response headers. Formulated a 35-page compliance security report.",
      imageBg: "from-indigo-600 via-purple-600 to-pink-600",
      icon: "lock",
      tags: ["REST APIs", "OWASP API Top 10", "Postman", "HIPAA Audit", "Report Writing"],
      metrics: ["60+ Endpoints Tested", "HIPAA Compliance Gap", "35-Page Report"],
      cvssScore: "7.5 High",
      findings: ["BOLA in Patient Records", "API Key Exposure in Client JS", "Lack of Rate Limiting"],
      liveUrl: "#",
      githubUrl: "https://github.com",
      featured: false
    },
    {
      id: "secure-auth-gateway",
      title: "Sentinel - Zero-Trust Auth & Web Portal",
      category: "webdev",
      categoryLabel: "Secure Web App",
      summary: "High-security authentication gateway featuring WebAuthn / FIDO2 hardware keys, Argon2id hashing, and brute-force IP throttling.",
      description: "Constructed a reference architecture web application emphasizing defense-in-depth. Incorporates strict Content Security Policy (CSP), HTTP security headers, time-based one-time password (TOTP), and automated anomaly alerts.",
      imageBg: "from-teal-600 via-emerald-600 to-slate-800",
      icon: "shield-check",
      tags: ["Node.js", "WebAuthn", "Argon2id", "Tailwind CSS", "Docker"],
      metrics: ["FIDO2 Hardware Key", "A+ Security Header", "Zero Password Leaks"],
      cvssScore: "Hardened",
      findings: ["CSRF Protection Tokens", "Strict SameSite Cookies", "Real-Time Anomaly Logs"],
      liveUrl: "#",
      githubUrl: "https://github.com",
      featured: false
    },
    {
      id: "bug-bounty-poc-vault",
      title: "OWASP Top 10 Exploits & Remediation Labs",
      category: "tools",
      categoryLabel: "Research & PoCs",
      summary: "Curated research repository of reproducible Proof-of-Concepts and developer remediation patches for web vulnerabilities.",
      description: "A publicly accessible knowledge base containing documented security writeups, sanitization recipes for XSS/SQLi, secure CORS configuration templates, and interactive attack scenarios for junior developers and security students.",
      imageBg: "from-slate-700 via-zinc-800 to-cyan-900",
      icon: "bug",
      tags: ["OWASP", "Remediation", "Code Fixes", "PoC Lab", "Documentation"],
      metrics: ["20+ Detailed PoCs", "Executive Summaries", "Copy-Paste Code Fixes"],
      cvssScore: "Educational",
      findings: ["Reflected & Stored XSS", "Second-Order SQL Injection", "Race Conditions"],
      liveUrl: "#",
      githubUrl: "https://github.com",
      featured: false
    }
  ],

  sampleReport: {
    title: "Vulnerability Assessment & Penetration Testing (VAPT) Report",
    client: "Acme Financial Services Inc.",
    date: "November 2026",
    auditor: "Alex Rivera, Lead VAPT Specialist",
    executiveSummary: "Between Nov 1 and Nov 10, a grey-box penetration testing assessment was conducted against the Acme Online Banking Portal. The objective was to identify security weaknesses that malicious actors could exploit to compromise data confidentiality, integrity, or system availability. A total of 7 vulnerabilities were identified, including 1 CRITICAL, 2 HIGH, 3 MEDIUM, and 1 LOW severity risk according to the Common Vulnerability Scoring System (CVSS v3.1).",
    criticalFinding: {
      title: "Insecure Direct Object Reference (IDOR) Leading to Account Takeover",
      cvss: "9.8 CRITICAL (CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H)",
      affectedUrl: "POST /api/v1/user/account-transfer",
      impact: "An unauthenticated or low-privilege attacker can manipulate the 'account_id' parameter in HTTP POST requests to transfer funds or access sensitive transaction history belonging to arbitrary bank clients without validation.",
      pocDescription: "1. Intercept transaction request via Burp Suite Proxy.\n2. Modify payload parameter 'source_account_id' from 1042 to 1088.\n3. Send request to server. Server processes transfer with HTTP 200 OK without verifying session ownership.",
      remediation: "Implement strict server-side authorization checks verifying that the authenticated session identity matches the account owner before executing any transaction. Never rely on client-supplied ID parameters alone."
    }
  },

  terminalCommands: {
    help: "Available commands: 'vapt', 'scan', 'skills', 'projects', 'report', 'tools', 'contact', 'clear'",
    vapt: "VAPT SUITE: Web Application Pentesting (OWASP Top 10) | Network & API Auditing | Professional Remediation Reports (CVSS 3.1)",
    scan: "SIMULATED TARGET: scanning target.local... Ports 80, 443, 8080 OPEN. Vulnerabilities: IDOR (High), XSS (Med), Missing CSP. Type 'report' for details.",
    report: "AUDIT REPORT: Sample executive summary ready. Click 'Inspect Sample Report' in the featured project card or type 'vapt' for methodology.",
    tools: "ARSENAL: Burp Suite Pro, OWASP ZAP, Nmap, Wireshark, SQLMap, Postman, Python 3, Metasploit, Linux Hardening",
    skills: "SPECIALTIES: Web Pentesting (94%) | Security Report Writing (96%) | CVSS 3.1 (95%) | Secure Web Dev (90%)",
    projects: "PORTFOLIO: 1. FinTech VAPT Audit | 2. Cerberus Recon Tool | 3. SecReport Generator | 4. MediVault API Test",
    contact: "DIRECT ENCRYPTION: alex.cybersecurity@example.com | Available for freelance VAPT contracts & pentest audits."
  },

  testimonials: [
    {
      name: "Marcus Vance",
      title: "Chief Information Security Officer (CISO)",
      quote: "Alex conducted a full VAPT on our client portal. The quality of his security report was on par with Big-4 consulting firms — crystal-clear CVSS scores and exact code patches for our developers.",
      avatar: "MV"
    },
    {
      name: "Elena Rostova",
      title: "VP of Engineering at FinPay",
      quote: "Discovered a critical authorization flaw that two automated scanners had missed. His professional report helped our board understand the business risk instantly.",
      avatar: "ER"
    },
    {
      name: "Tariq Mansoor",
      title: "Lead Web Architect",
      quote: "Rare combination of offensive pentesting knowledge and real full-stack web development skills. Alex not only breaks systems ethically, he knows how to build them secure by design.",
      avatar: "TM"
    }
  ]
};
