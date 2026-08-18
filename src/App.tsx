import { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal as TerminalIcon, 
  Shield, 
  Code, 
  User, 
  Briefcase, 
  Award, 
  Mail, 
  Globe, 
  ChevronRight, 
  Send, 
  Lock, 
  CheckCircle, 
  ExternalLink, 
  CornerDownLeft, 
  Activity,
  Layers,
  FileText
} from 'lucide-react';

// --- Custom Inline Animated SVG Components ---
const SystemDiagram = () => (
  <div className="w-full bg-obsidian/60 p-3 rounded-lg border border-white/5 my-3">
    <div className="text-[10px] text-gray-500 font-mono mb-2">SYSTEM PIPELINE FLOW</div>
    <svg width="100%" height="60" viewBox="0 0 300 60" className="opacity-80">
      {/* Node Client */}
      <rect x="5" y="15" width="50" height="26" rx="4" fill="none" stroke="#00ff87" strokeWidth="1.5" />
      <text x="30" y="31" fill="#ecf0f1" fontSize="8" textAnchor="middle" fontFamily="monospace">React19</text>
      
      {/* Node API Gateway */}
      <rect x="115" y="15" width="60" height="26" rx="4" fill="none" stroke="#00ff87" strokeWidth="1.5" />
      <text x="145" y="31" fill="#ecf0f1" fontSize="7.5" textAnchor="middle" fontFamily="monospace">Web Framework</text>

      {/* Node DB */}
      <rect x="235" y="15" width="60" height="26" rx="4" fill="none" stroke="#00ff87" strokeWidth="1.5" />
      <text x="265" y="31" fill="#ecf0f1" fontSize="8" textAnchor="middle" fontFamily="monospace">PostgreSQL</text>

      {/* Paths */}
      <motion.path
        d="M 55 28 L 115 28"
        fill="none"
        stroke="#00ff87"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
      <motion.path
        d="M 175 28 L 235 28"
        fill="none"
        stroke="#00ff87"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 1 }}
      />
    </svg>
  </div>
);

const SecurityDiagram = () => (
  <div className="w-full bg-obsidian/60 p-3 rounded-lg border border-white/5 my-3">
    <div className="text-[10px] text-gray-500 font-mono mb-2">AUDIT ASSESSMENT ROUTING</div>
    <svg width="100%" height="60" viewBox="0 0 300 60" className="opacity-80">
      {/* Target Node */}
      <circle cx="40" cy="30" r="14" fill="none" stroke="#6b7280" strokeWidth="1.5" />
      <text x="40" y="33" fill="#ecf0f1" fontSize="8" textAnchor="middle" fontFamily="monospace">Target</text>
      
      {/* Scanner Node */}
      <circle cx="260" cy="30" r="14" fill="none" stroke="#00ff87" strokeWidth="1.5" />
      <text x="260" y="33" fill="#00ff87" fontSize="8" textAnchor="middle" fontFamily="monospace">Scout</text>

      {/* Connection path scan */}
      <motion.path
        d="M 246 30 L 54 30"
        fill="none"
        stroke="#00ff87"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0.2 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      
      {/* Scan waves */}
      <motion.circle
        cx="150"
        cy="30"
        r="8"
        fill="none"
        stroke="#00ff87"
        strokeWidth="0.75"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [1, 3.5], opacity: [0.8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
      />
    </svg>
  </div>
);

// --- Projects Data ---
interface Project {
  title: string;
  desc: string;
  tech: string[];
  link: string;
  featured: boolean;
  type: 'webDeveloper' | 'cybersecurity' | 'both';
  diagram?: 'system' | 'security';
}

const projectsData: Project[] = [
  {
    title: "Aegis Telemetry System",
    desc: "A high-performance telemetry system bridging Python data analysis and a C execution engine. Utilizes POSIX shared memory for ultra-low latency, secure IPC data streams.",
    tech: ["Python", "C", "Systems Programming", "IPC/Shared Memory"],
    link: "#",
    featured: true,
    type: "both",
    diagram: "system"
  },
  {
    title: "Rat-Trap",
    desc: "Specifically engineered to combat automated mass-scanners checking for outdated and vulnerable CMS and Cpanels. Detects scanning patterns and deploys decoy responses to trap and mitigate malicious scanners.",
    tech: ["Python", "Threat Mitigation", "Intrusion Prevention", "Network Security"],
    link: "https://github.com/ElormDesmond/Rat-Trap",
    featured: true,
    type: "cybersecurity",
    diagram: "security"
  },
  {
    title: "CheVera V2: The Architect's Canvas",
    desc: "Modern corporate website redesign for CheVera Company LTD. Employs a custom sideways scrolling exhibit, three-pillar architecture modules, and interactive before/after asset comparison sliders.",
    tech: ["React 19", "Modern Web Frameworks", "PostgreSQL", "Tailwind 4.0", "Docker"],
    link: "https://www.cheveracompany.com",
    featured: false,
    type: "webDeveloper"
  },
  {
    title: "Civic & Municipal Web Portal",
    desc: "A civic services platform featuring role-based dashboard profiles (citizens vs. municipal moderators), interactive GIS project overlays via Leaflet, and real-time updates.",
    tech: ["React 19", "Modern Web Frameworks", "PostgreSQL", "JWT/HTTP-Only", "WebSockets"],
    link: "https://civicportal-lilac.vercel.app/",
    featured: false,
    type: "webDeveloper"
  },
  {
    title: "BugTracker",
    desc: "A robust bug tracker application featuring AI-assisted ticket prioritization, real-time collaboration widgets, and MongoDB Cloud database integration.",
    tech: ["React", "Node.js", "MongoDB Cloud", "AI-Assisted Dev"],
    link: "https://github.com/ElormDesmond/bugtracker",
    featured: false,
    type: "webDeveloper"
  },
  {
    title: "Sample Electronic Showroom Website",
    desc: "A high-performance electronics showroom catalog. Implements minimalist bento-box layouts, client-side routing, and custom animation hooks.",
    tech: ["React 19", "Tailwind 4.0", "Framer Motion", "TypeScript"],
    link: "https://simple-showroom-design-9ovk.vercel.app/",
    featured: false,
    type: "webDeveloper"
  }
];

export default function App() {
  const [role, setRole] = useState<'webDeveloper' | 'cybersecurity'>('webDeveloper');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "System terminal initialized. Type 'help' for commands.",
    "Dual identity node configured: Web Developer / Cybersecurity Specialist.",
    ""
  ]);
  const [isScanning, setIsScanning] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [secureProgress, setSecureProgress] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto Scroll Terminal to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  // Track scroll position for Dock Highlights
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'certs', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Terminal Command Engine ---
  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let response: string[] = [];

    if (trimmedCmd === '') return;

    response.push(`guest@desmond:~# ${cmd}`);

    switch (trimmedCmd) {
      case 'help':
        response.push(
          "Available system commands:",
          "  about         - Fetch professional background",
          "  skills        - List validated technical capacities",
          "  projects      - Display current deployment logs",
          "  scan-network  - Trigger simulated cybersecurity audit",
          "  contact       - Fetch secure transmission ports",
          "  clear         - Flush CLI registers"
        );
        break;
      case 'about':
        response.push(
          "DESMOND ELORM HONU",
          "------------------",
          "Roles: Web Developer & Cybersecurity Specialist",
          "Curated competence in secure APIs, modern web frameworks, and STEM curriculum designs.",
          "Curriculum: MIS Department Intern (LEKMA), Nyansapo STEM Facilitator, YIST X STEM Facilitator, Chevera Developer.",
          "Core Mindset: Relentless growth, quick iteration, structured secure engineering."
        );
        break;
      case 'skills':
        response.push(
          "TECHNICAL CAPABILITIES:",
          "  Programming:   Python, JavaScript, React, Go, FastAPI, Bash, Lua, C",
          "  Cybersecurity: Web Pentesting, Threat Scanning, Linux Distros, Docker Containment",
          "  Infrastructure: Git, Vercel, Heroku, AI Models & Agents, API Integration",
          "  Languages:     English (Native), Twi (Native), Ewe (Native), Japanese (Basic)"
        );
        break;
      case 'projects':
        response.push(
          "DEPLOYMENT LOGS:",
          "  - [Aegis Telemetry System] Low-latency POSIX Shared Memory IPC (Python/C/Shared Memory)",
          "  - [Rat-Trap] Combat automated mass-scanners on CMS & Cpanels (Python)",
          "  - [CheVera V2] High-end horizontal portfolio display (React19/Modern Web Frameworks/PgSQL)",
          "  - [Civic Portal] Municipal Permit Portal with JWT and GIS Maps (React19/Modern Web Frameworks)",
          "  - [BugTracker] AI-assisted tracking portal with MongoDB Cloud"
        );
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'scan-network':
        setIsScanning(true);
        response.push("[!] INITIALIZING TARGET NETWORK SCAN (desmond.local)...");
        setTerminalHistory(prev => [...prev, `guest@desmond:~# ${cmd}`, "[!] INITIALIZING TARGET NETWORK SCAN (desmond.local)..."]);
        
        let scanSteps = [
          "[+] Establishing connection handshake...",
          "[+] Auditing TCP/UDP listening ports [22, 80, 443, 8080, 9999]...",
          "[+] Port 22/tcp (ssh)   - OPEN (OpenSSH 8.9p1)",
          "[+] Port 80/tcp (http)  - OPEN (Nginx v1.22)",
          "[+] Port 8080/tcp (api) - OPEN (Modern API Web Framework)",
          "[+] Port 9999/tcp (db)  - SHIELDED (PostgreSQL - Row Level Security enabled)",
          "[*] Querying database parameters... zero vulnerabilities found.",
          "[!] SCAN COMPLETE: Desmond's host profile is highly SECURED and optimized."
        ];

        scanSteps.forEach((step, idx) => {
          setTimeout(() => {
            setTerminalHistory(prev => [...prev, step]);
            if (idx === scanSteps.length - 1) {
              setIsScanning(false);
            }
          }, (idx + 1) * 600);
        });
        setTerminalInput('');
        return;
      case 'contact':
        response.push(
          "SECURE TRANSMISSION DIRECTORY:",
          "  Mail:    desmondhonu123@gmail.com",
          "  Phone:   +233 536317508",
          "  GitHub:  github.com/ElormDesmond",
          "  LinkedIn: linkedin.com/in/desmond-honu"
        );
        break;
      default:
        response.push(`[!] Command '${cmd}' not recognized. Type 'help' for listing.`);
    }

    setTerminalHistory(prev => [...prev, ...response, ""]);
    setTerminalInput('');
  };

  // --- Secure Uplink Form Submission ---
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    setIsSending(true);
    setSecureProgress([]);

    const steps = [
      "Initializing TLS handshake...",
      "Generating ephemeral DH keys...",
      "Encrypting message payload (AES-256-GCM)...",
      "Signing packet with HMAC SHA-256...",
      "Routing packet via secure node uplink...",
      "Transmission confirmed. Desmond's console updated."
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSecureProgress(prev => [...prev, step]);
        if (idx === steps.length - 1) {
          setIsSending(false);
          setContactForm({ name: '', email: '', message: '' });
          // Clear progress list after a delay
          setTimeout(() => {
            setSecureProgress([]);
          }, 3000);
        }
      }, (idx + 1) * 700);
    });
  };

  // Filter projects by active role
  const filteredProjects = projectsData.filter(
    proj => proj.type === 'both' || proj.type === role
  );

  return (
    <div className="min-h-screen bg-obsidian text-glacial-silver relative font-sans selection:bg-cyber-mint selection:text-obsidian pb-24">
      {/* Background Matrix Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,135,0.02),transparent_70%)] pointer-events-none z-0" />
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-40 glass-panel border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 group font-mono text-sm font-semibold tracking-wider text-cyber-mint">
          <TerminalIcon className="w-4 h-4 group-hover:rotate-6 transition-transform" />
          <span>DESMOND_HONU.SYS</span>
        </a>

        {/* --- Dual-Identity Switcher Toggle --- */}
        <div className="flex items-center gap-2 bg-black/60 p-1 rounded-full border border-white/5">
          <button 
            onClick={() => setRole('webDeveloper')}
            className={`px-3 py-1 rounded-full text-xs font-mono tracking-tight transition-all duration-300 flex items-center gap-1.5 ${
              role === 'webDeveloper' 
                ? 'bg-cyber-mint text-obsidian font-bold shadow-[0_0_10px_rgba(0,255,135,0.3)]' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Web Developer</span>
          </button>
          <button 
            onClick={() => setRole('cybersecurity')}
            className={`px-3 py-1 rounded-full text-xs font-mono tracking-tight transition-all duration-300 flex items-center gap-1.5 ${
              role === 'cybersecurity' 
                ? 'bg-cyber-mint text-obsidian font-bold shadow-[0_0_10px_rgba(0,255,135,0.3)]' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Cybersecurity</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 md:py-16 relative z-10 space-y-24">
        
        {/* --- SECTION 1: HERO / TERMINAL CONSOLE --- */}
        <section id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[75vh]">
          {/* Hero text branding */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-mint/10 border border-cyber-mint/20 text-cyber-mint text-xs font-mono tracking-wider">
                <span className="w-2 h-2 rounded-full bg-cyber-mint animate-ping" />
                <span>PROTOCOL ACTIVE</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
                Desmond Elorm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-mint to-accent-teal">Honu</span>
              </h1>
              <h2 className="text-lg md:text-xl text-gray-400 font-mono">
                {role === 'webDeveloper' 
                  ? "Web Developer & Software Engineer" 
                  : "Cybersecurity Specialist & Pentester"}
              </h2>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-sm md:text-base max-w-lg">
              {role === 'webDeveloper'
                ? "Designing high-performance systems, robust web APIs, and fluid frontend interfaces using React 19. Dedicated to type-safe code, modern optimized web frameworks, and secure web application lifecycles."
                : "Assessing system vulnerabilities, conducting penetration tests, and automating custom security scan tools. Competitor in Cyberteq CTF and Google Code Wars with a threat-aware auditing approach."
              }
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="px-5 py-2.5 rounded-lg bg-cyber-mint text-obsidian text-sm font-bold font-mono tracking-tight hover:shadow-[0_0_15px_rgba(0,255,135,0.4)] transition-all duration-300 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Secure Link</span>
              </a>
              <a 
                href="#projects" 
                className="px-5 py-2.5 rounded-lg border border-white/10 hover:border-cyber-mint/50 hover:bg-white/5 text-sm font-semibold tracking-tight transition-all duration-300 flex items-center gap-2"
              >
                <span>View Exhibits</span>
                <ChevronRight className="w-4 h-4 text-cyber-mint" />
              </a>
              {/* Dynamic CV Download buttons */}
              <a 
                href="https://docs.google.com/document/d/1j1IfeX72u7oS2OwBoJ0fIuEWcOeqBGZOpVXCucfZsd0/edit?usp=drive_link" 
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyber-mint hover:bg-cyber-mint/5 text-sm font-semibold tracking-tight transition-all duration-300 flex items-center gap-2 text-white"
              >
                <FileText className="w-4 h-4 text-cyber-mint" />
                <span>Get CV</span>
              </a>
            </div>
          </div>

          {/* Interactive Shell Terminal emulator */}
          <div className="lg:col-span-6 w-full">
            <div className="w-full glass-panel border border-white/10 rounded-xl overflow-hidden shadow-2xl scanlines">
              {/* Terminal header controls */}
              <div className="bg-black/60 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-xs text-gray-500 font-mono">guest@desmond: ~ (sh)</div>
                <Activity className="w-3.5 h-3.5 text-cyber-mint/60 animate-pulse" />
              </div>
              {/* Terminal screen body */}
              <div className="h-64 overflow-y-auto p-4 font-mono text-xs text-gray-300 bg-black/80 space-y-1.5 scrollbar-thin">
                {terminalHistory.map((line, index) => (
                  <div key={index} className="whitespace-pre-wrap leading-relaxed">
                    {line.startsWith("guest@desmond") ? (
                      <span className="text-cyber-mint">{line}</span>
                    ) : line.startsWith("[!]") ? (
                      <span className="text-yellow-400">{line}</span>
                    ) : line.startsWith("[+]") ? (
                      <span className="text-emerald-400">{line}</span>
                    ) : (
                      line
                    )}
                  </div>
                ))}
                {isScanning && (
                  <div className="flex items-center gap-1.5 text-cyber-mint animate-pulse">
                    <span>Searching network registers</span>
                    <span className="animate-bounce">...</span>
                  </div>
                )}
                <div ref={terminalEndRef} />
              </div>
              {/* Terminal Input prompt */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommand(terminalInput);
                }}
                className="bg-black/95 border-t border-white/5 flex items-center px-3"
              >
                <span className="text-cyber-mint font-mono text-xs pr-1.5">guest@desmond:~#</span>
                <input 
                  type="text" 
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  disabled={isScanning}
                  placeholder="Type 'help' to audit system commands..."
                  className="w-full bg-transparent text-white font-mono text-xs py-3 outline-none caret-cyber-mint placeholder:text-gray-600 disabled:opacity-50"
                />
                <button type="submit" className="text-gray-500 hover:text-cyber-mint p-1">
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: ABOUT / DUAL IDENTITY BRIEF --- */}
        <section id="about" className="space-y-6 pt-12">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">System Profile</h2>
            <div className="flex-grow h-px bg-gradient-to-r from-cyber-mint/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            {/* Biography card */}
            <div className="md:col-span-8 glass-panel rounded-2xl p-6 md:p-8 flex flex-col justify-between border-white/5 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <User className="w-5 h-5 text-cyber-mint" />
                    <span>Desmond Elorm Honu</span>
                  </span>
                  {/* Biography CV Quick access */}
                  <a 
                    href="https://docs.google.com/document/d/1j1IfeX72u7oS2OwBoJ0fIuEWcOeqBGZOpVXCucfZsd0/edit?usp=drive_link" 
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-cyber-mint/10 border border-cyber-mint/20 text-cyber-mint text-[10px] font-mono hover:bg-cyber-mint hover:text-obsidian transition-all"
                  >
                    <FileText className="w-3 h-3" />
                    <span>Download CV</span>
                  </a>
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  I am a digital architect specializing in building secure systems and optimized frontend interfaces. My background ranges from automated vulnerability auditing pipelines to writing robust web applications with modern, optimized web frameworks. I hold a strong interest in securing platforms against threat vectors while building highly responsive services.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Competed as runner-up in both the <span className="text-cyber-mint font-semibold">Cyberteq CTF</span> and <span className="text-cyber-mint font-semibold">Google Code Wars</span>. I thrive on diving headfirst into complex systems, reverse-engineering architectures, and resolving logical roadblocks. I regularly practice penetration methodologies on Hack The Box labs to keep my skills sharp.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                <div>
                  <div className="text-[10px] text-gray-500 font-mono">CAPABILITY 01</div>
                  <div className="text-sm font-bold text-white">Vulnerability Scanning</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-mono">CAPABILITY 02</div>
                  <div className="text-sm font-bold text-white">Secure API Engineering</div>
                </div>
              </div>
            </div>

            {/* Quote and dual-roles display card */}
            <div className="md:col-span-4 bg-gradient-to-br from-cyber-mint/10 to-transparent rounded-2xl p-6 md:p-8 border border-cyber-mint/10 flex flex-col justify-between">
              <div className="space-y-4">
                <Lock className="w-8 h-8 text-cyber-mint" />
                <blockquote className="text-gray-300 italic text-sm">
                  "If you don't take risks, you can't create a future."
                </blockquote>
              </div>

              <div className="space-y-2 mt-6">
                <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">Active Identities</div>
                <div className="space-y-1.5">
                  <div className={`flex items-center gap-2 text-xs font-mono ${role === 'webDeveloper' ? 'text-cyber-mint' : 'text-gray-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${role === 'webDeveloper' ? 'bg-cyber-mint' : 'bg-gray-600'}`} />
                    <span>01 // Web Developer</span>
                  </div>
                  <div className={`flex items-center gap-2 text-xs font-mono ${role === 'cybersecurity' ? 'text-cyber-mint' : 'text-gray-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${role === 'cybersecurity' ? 'bg-cyber-mint' : 'bg-gray-600'}`} />
                    <span>02 // Cybersecurity Specialist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: SKILLS AND CAPABILITIES --- */}
        <section id="skills" className="space-y-6 pt-12">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Core Competence</h2>
            <div className="flex-grow h-px bg-gradient-to-r from-cyber-mint/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Development Stack */}
            <div className="glass-panel rounded-2xl p-6 border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyber-mint/10 border border-cyber-mint/20">
                  <Code className="w-5 h-5 text-cyber-mint" />
                </div>
                <h3 className="font-bold text-white">Development</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-400 font-mono">
                <li className="flex items-center justify-between border-b border-white/5 py-1">
                  <span>Go (Fiber/Echo)</span>
                  <span className="text-cyber-mint">Intermediate</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 py-1">
                  <span>Python (FastAPI)</span>
                  <span className="text-cyber-mint">Intermediate</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 py-1">
                  <span>React 19 / Vite</span>
                  <span className="text-cyber-mint">Intermediate</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 py-1">
                  <span>TypeScript</span>
                  <span className="text-cyber-mint">Intermediate</span>
                </li>
                <li className="flex items-center justify-between py-1">
                  <span>Node.js / JS</span>
                  <span className="text-cyber-mint">Intermediate</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Cybersecurity & Infrastructure */}
            <div className="glass-panel rounded-2xl p-6 border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyber-mint/10 border border-cyber-mint/20">
                  <Shield className="w-5 h-5 text-cyber-mint" />
                </div>
                <h3 className="font-bold text-white">Cybersecurity</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-400 font-mono">
                <li className="flex items-center justify-between border-b border-white/5 py-1">
                  <span>Web Pentesting</span>
                  <span className="text-cyber-mint">Intermediate</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 py-1">
                  <span>Wireless Auditing</span>
                  <span className="text-cyber-mint">Intermediate</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 py-1">
                  <span>Nmap Security Scans</span>
                  <span className="text-cyber-mint">Intermediate</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 py-1">
                  <span>Linux Distros</span>
                  <span className="text-cyber-mint">Intermediate</span>
                </li>
                <li className="flex items-center justify-between py-1">
                  <span>Docker Containment</span>
                  <span className="text-cyber-mint">Intermediate</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Logistics & Languages */}
            <div className="glass-panel rounded-2xl p-6 border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyber-mint/10 border border-cyber-mint/20">
                  <Globe className="w-5 h-5 text-cyber-mint" />
                </div>
                <h3 className="font-bold text-white">Logistics & Language</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-400 font-mono">
                <li className="flex items-center justify-between border-b border-white/5 py-1">
                  <span>AI Models & Agents</span>
                  <span className="text-cyber-mint">Intermediate</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 py-1">
                  <span>Git / Version Control</span>
                  <span className="text-cyber-mint">Intermediate</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 py-1">
                  <span>API Integration</span>
                  <span className="text-cyber-mint">Intermediate</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 py-1">
                  <span>English</span>
                  <span className="text-cyber-mint">Native</span>
                </li>
                <li className="flex items-center justify-between py-1">
                  <span>Japanese</span>
                  <span className="text-cyber-mint">Basic</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: PROJECTS BENTO GRID --- */}
        <section id="projects" className="space-y-6 pt-12">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">Bento Exhibits</h2>
                <div className="w-24 h-px bg-cyber-mint/30" />
              </div>
              <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                Filtered: {role === 'webDeveloper' ? 'Web Developer deployments' : 'Vulnerability testing systems'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <div 
                key={idx}
                className={`glass-panel border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group hover:border-cyber-mint/30 relative overflow-hidden ${
                  project.featured ? 'md:col-span-2 border-cyber-mint/20 bg-cyber-mint/[0.02]' : 'border-white/5'
                }`}
              >
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyber-mint transition-colors">
                      {project.title}
                    </h3>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-gray-500 hover:text-cyber-mint p-1 border border-transparent hover:border-white/10 hover:bg-black/40 rounded-lg transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.desc}
                  </p>

                  {/* SVG diagram representation for wow-factor */}
                  {project.diagram === 'system' && <SystemDiagram />}
                  {project.diagram === 'security' && <SecurityDiagram />}
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5 relative z-10">
                  {project.tech.map((tag, tagIdx) => (
                    <span 
                      key={tagIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/60 border border-white/5 text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 5: CERTIFICATIONS & EXPERIENCE --- */}
        <section id="certs" className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12">
          {/* Experience timeline (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">Experience</h2>
              <div className="flex-grow h-px bg-gradient-to-r from-cyber-mint/20 to-transparent" />
            </div>

            <div className="space-y-6 relative border-l border-white/5 pl-6 ml-3">
              {/* Experience Node 1 (YIST X STEM Facilitator) */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-cyber-mint border-4 border-obsidian" />
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-cyber-mint">June 2026</span>
                    <span className="text-gray-500">Accra, Ghana</span>
                  </div>
                  <h3 className="text-base font-bold text-white">STEM Facilitator & 3D Modeling Tutor</h3>
                  <h4 className="text-sm text-gray-400 font-mono">YIST X</h4>
                  <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Taught Design Thinking algorithms and interactive 3D modeling frameworks.</li>
                    <li>Emphasized the practical importance of prototyping and hardware validation.</li>
                    <li>Guided students in structural design projects and physical drafting loops.</li>
                  </ul>
                </div>
              </div>

              {/* Experience Node 2 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-cyber-mint border-4 border-obsidian" />
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-cyber-mint">Jan 2026 - Present</span>
                    <span className="text-gray-500">Accra, Ghana</span>
                  </div>
                  <h3 className="text-base font-bold text-white">National Service Intern (MIS Dept)</h3>
                  <h4 className="text-sm text-gray-400 font-mono">Ledzokuku Municipal Assembly (LEKMA) Headquarters</h4>
                  <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Built interactive dashboards using Advanced Excel for visual logistics tracking.</li>
                    <li>Maintained and optimized the official WordPress content management system.</li>
                    <li>Collaborated in resolving daily technical operations and network checks.</li>
                  </ul>
                </div>
              </div>

              {/* Experience Node 3 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-cyber-mint border-4 border-obsidian" />
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-cyber-mint">May 2025 - Aug 2025</span>
                    <span className="text-gray-500">Accra, Ghana</span>
                  </div>
                  <h3 className="text-base font-bold text-white">STEM Facilitator & Curriculum Developer</h3>
                  <h4 className="text-sm text-gray-400 font-mono">Nyansapo Institute</h4>
                  <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Developed cybersecurity lesson curricula for Summer programs.</li>
                    <li>Taught Design Thinking algorithms and game mechanics in Python.</li>
                    <li>Mentored students in foundational scripting loops and logic models.</li>
                  </ul>
                </div>
              </div>

              {/* Experience Node 4 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-cyber-mint border-4 border-obsidian" />
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-cyber-mint">May 2022 - Aug 2024</span>
                    <span className="text-gray-500">Accra, Ghana</span>
                  </div>
                  <h3 className="text-base font-bold text-white">Web Development Intern</h3>
                  <h4 className="text-sm text-gray-400 font-mono">Chevera Company LTD</h4>
                  <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Programmed company website templates using HTML, CSS, JavaScript.</li>
                    <li>Ran WCAG compliance checks and responsive testing across browsers.</li>
                    <li>Migrated content database nodes and troubleshot application crashes.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications & Awards (5 columns) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Certifications card */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-cyber-mint" />
                <h3 className="text-xl font-bold text-white">Certifications</h3>
              </div>
              <div className="glass-panel rounded-2xl p-5 border-white/5 space-y-3 font-mono text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-cyber-mint mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-white">Google Cybersecurity Certificate</div>
                    <div className="text-gray-500">Credly Assessed Security Controls</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-cyber-mint mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-white">ISC2 Candidate (ISCA Pre-Assessment)</div>
                    <div className="text-gray-500">Certified Associate Pathway</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-cyber-mint mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-white">IBM Intro to Cybersecurity Certificate</div>
                    <div className="text-gray-500">Foundational Security Controls & Careers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Awards card */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-cyber-mint" />
                <h3 className="text-xl font-bold text-white">Awards & Contests</h3>
              </div>
              <div className="glass-panel rounded-2xl p-5 border-white/5 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-white">Cyberteq CTF Tournament</span>
                  <span className="text-cyber-mint font-bold">Runner Up</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-white">Google Code Wars (Ghana)</span>
                  <span className="text-cyber-mint font-bold">Runner Up</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white">Hack The Box Labs</span>
                  <span className="text-cyber-mint font-bold">Active Practice (Linux/Windows)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 6: CONTACT PORTAL (SECURE TRANSMISSION) --- */}
        <section id="contact" className="space-y-6 pt-12 max-w-xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Secure Transmission Uplink</h2>
            <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">
              Establish TLS tunnels for direct communications.
            </p>
          </div>

          <div className="glass-panel border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative">
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Identifier</label>
                  <input 
                    type="text" 
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Name / Company" 
                    className="w-full bg-black/60 border border-white/5 focus:border-cyber-mint/50 rounded-lg p-2.5 text-xs text-white outline-none font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Uplink Address</label>
                  <input 
                    type="email" 
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@address.com" 
                    className="w-full bg-black/60 border border-white/5 focus:border-cyber-mint/50 rounded-lg p-2.5 text-xs text-white outline-none font-mono"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Secure Payload</label>
                <textarea 
                  rows={4}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Enter transmission contents here..." 
                  className="w-full bg-black/60 border border-white/5 focus:border-cyber-mint/50 rounded-lg p-2.5 text-xs text-white outline-none font-mono resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSending}
                className="w-full py-3 rounded-lg bg-cyber-mint text-obsidian text-xs font-mono font-extrabold tracking-widest uppercase hover:shadow-[0_0_15px_rgba(0,255,135,0.4)] disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Packet</span>
              </button>
            </form>

            {/* Cryptographic Transmission logs console */}
            {secureProgress.length > 0 && (
              <div className="bg-black border border-cyber-mint/20 rounded-lg p-4 font-mono text-[10px] text-cyber-mint space-y-1 mt-4">
                {secureProgress.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-mint animate-pulse" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* --- FLOATING NAVIGATION DOCK --- */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-panel border border-white/10 rounded-full px-6 py-3 flex items-center gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <a 
          href="#home" 
          onClick={() => setActiveSection('home')}
          className={`flex flex-col items-center gap-0.5 group relative p-1 ${activeSection === 'home' ? 'text-cyber-mint' : 'text-gray-400 hover:text-white'}`}
        >
          <TerminalIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1" />
          <span className="text-[8px] font-mono uppercase opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5 bg-black/90 border border-white/5 px-1.5 py-0.5 rounded text-white whitespace-nowrap">Home</span>
          {activeSection === 'home' && <motion.span layoutId="activeDot" className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-cyber-mint" />}
        </a>
        <a 
          href="#about" 
          onClick={() => setActiveSection('about')}
          className={`flex flex-col items-center gap-0.5 group relative p-1 ${activeSection === 'about' ? 'text-cyber-mint' : 'text-gray-400 hover:text-white'}`}
        >
          <User className="w-5 h-5 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1" />
          <span className="text-[8px] font-mono uppercase opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5 bg-black/90 border border-white/5 px-1.5 py-0.5 rounded text-white whitespace-nowrap">Profile</span>
          {activeSection === 'about' && <motion.span layoutId="activeDot" className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-cyber-mint" />}
        </a>
        <a 
          href="#skills" 
          onClick={() => setActiveSection('skills')}
          className={`flex flex-col items-center gap-0.5 group relative p-1 ${activeSection === 'skills' ? 'text-cyber-mint' : 'text-gray-400 hover:text-white'}`}
        >
          <Layers className="w-5 h-5 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1" />
          <span className="text-[8px] font-mono uppercase opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5 bg-black/90 border border-white/5 px-1.5 py-0.5 rounded text-white whitespace-nowrap">Skills</span>
          {activeSection === 'skills' && <motion.span layoutId="activeDot" className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-cyber-mint" />}
        </a>
        <a 
          href="#projects" 
          onClick={() => setActiveSection('projects')}
          className={`flex flex-col items-center gap-0.5 group relative p-1 ${activeSection === 'projects' ? 'text-cyber-mint' : 'text-gray-400 hover:text-white'}`}
        >
          <Briefcase className="w-5 h-5 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1" />
          <span className="text-[8px] font-mono uppercase opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5 bg-black/90 border border-white/5 px-1.5 py-0.5 rounded text-white whitespace-nowrap">Exhibits</span>
          {activeSection === 'projects' && <motion.span layoutId="activeDot" className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-cyber-mint" />}
        </a>
        <a 
          href="#certs" 
          onClick={() => setActiveSection('certs')}
          className={`flex flex-col items-center gap-0.5 group relative p-1 ${activeSection === 'certs' ? 'text-cyber-mint' : 'text-gray-400 hover:text-white'}`}
        >
          <Award className="w-5 h-5 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1" />
          <span className="text-[8px] font-mono uppercase opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5 bg-black/90 border border-white/5 px-1.5 py-0.5 rounded text-white whitespace-nowrap">Certs</span>
          {activeSection === 'certs' && <motion.span layoutId="activeDot" className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-cyber-mint" />}
        </a>
        <a 
          href="#contact" 
          onClick={() => setActiveSection('contact')}
          className={`flex flex-col items-center gap-0.5 group relative p-1 ${activeSection === 'contact' ? 'text-cyber-mint' : 'text-gray-400 hover:text-white'}`}
        >
          <Mail className="w-5 h-5 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1" />
          <span className="text-[8px] font-mono uppercase opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5 bg-black/90 border border-white/5 px-1.5 py-0.5 rounded text-white whitespace-nowrap">Secure link</span>
          {activeSection === 'contact' && <motion.span layoutId="activeDot" className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-cyber-mint" />}
        </a>
      </nav>

      {/* --- FOOTER --- */}
      <footer className="w-full py-8 text-center text-[10px] text-gray-500 font-mono border-t border-white/5 mt-16 bg-black/30">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>&copy; 2026 Desmond Elorm Honu. All systems nominal.</div>
          <div className="flex gap-4">
            <a href="mailto:desmondhonu123@gmail.com" className="hover:text-cyber-mint transition-colors flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span>EMAIL</span>
            </a>
            <a href="https://github.com/ElormDesmond" target="_blank" rel="noreferrer" className="hover:text-cyber-mint transition-colors flex items-center gap-1">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              <span>GITHUB</span>
            </a>
            <a href="https://www.linkedin.com/in/desmond-honu" target="_blank" rel="noreferrer" className="hover:text-cyber-mint transition-colors flex items-center gap-1">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              <span>LINKEDIN</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
