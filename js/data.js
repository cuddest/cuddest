/* ============================================================
   CONTENT — this is the only file you edit to add content.
   Everything on the site renders from the objects below.
   ============================================================ */

const PROFILE = {
  name: "Ayoub Touati",
  handle: "cuddest",
  monogram: "AT",
  role: "Cybersecurity Engineer",

  // The large headline in the About section.
  statement: "",

  
  // The spec sheet beside the About text. Add or remove rows freely.
  facts: [
    ["Based", "Algiers, Algeria"],
    ["Year", "Final — Higher School Of Computer Science, Bejaia."],
    ["Focus", "Detection & IR"],
    ["CTFs", "Web, Forensics"],
    ["Status", "Seeking a blue teaming focused PFE"],
  ],

  // ---- LANDING BACKGROUND ----
  // Drop an image at this path and it becomes the full-screen landing.
  // Rendered greyscale under a brass wash, so most photos work.
  // Leave src as "" and the landing falls back to flat navy (still looks fine).
  hero: {
    src: "assets/hero.jpg",
    position: "center 35%",
  },

  // Portrait beside the About text. Same treatment. "" hides it.
  portrait: {
    src: "",
    alt: "Portrait of Ayoub Touati",
    caption: "Algiers, 2026",
  },

  location: "Algeria",
  email: "a_touati@estin.dz",

  links: {
    github: "https://github.com/cuddest",
    linkedin: "https://www.linkedin.com/in/ayoub-touati-916578267/",
    cyberdefenders: "https://cyberdefenders.org/p/cuddest/",
    tryhackme: "https://tryhackme.com/p/cuddest",
    ctftime: "https://ctftime.org/user/219769",
    discord: "https://discord.com/users/[659743566654078986]",
    instagram: "cudddest",
  },

  // Wrap anything in [[double brackets]] to render it as a redaction bar
  // that reveals on hover or tap. Once on the page is a joke; five is a gimmick.
  about: [
    "Touati Ayoub or Cuddest, I'm a cybersecurity student heading for the blue team, detection engineering, incident response, and threat hunting. The work I care about is the part that happens after something has already gone wrong.",
    "I also play CTFs where i enjoy web exploitation, DFIR and Osint, it is fun to look from the other point of view of the scene, it's the way i dived first in this world and I've been hooked since.",
    "I also build backends, which keeps me honest and humble about where the logs come from in the first place, most blind spots are design decisions somebody forgot they made.",
  ],
};

/* ------------------------------------------------------------
   LANDING LINE — set very large over the hero image.
   Always uses the first entry. Move another to the top to swap.
------------------------------------------------------------ */
const QUOTES = [
  { text: "Do we clap when nothing happens?" },
];

/* ------------------------------------------------------------
   SKILLS — grouped. Add/remove groups and items freely.
------------------------------------------------------------ */
const SKILLS = [
  {
    title: "Detection & Monitoring",
    items: ["Splunk", "Elastic / ELK", "Wazuh", "Sigma rules", "Suricata", "Zeek", "Sysmon"],
  },
  {
    title: "Incident Response & Forensics",
    items: ["Velociraptor", "Volatility", "Autopsy", "Timeline analysis", "Memory forensics", "Log triage"],
  },
  {
    title: "Threat Hunting & Intel",
    items: ["MITRE ATT&CK", "YARA", "IOC development", "Malware triage", "OSINT"],
  },
  {
    title: "Backend Engineering",
    items: ["Go", "DRF", "PostgreSQL", "Docker", "REST APIs", "Git"],
  },
  {
    title: "CTFs",
    items: ["Web exploitation", "Dfir", "OSINT"],
  },
];

/* ------------------------------------------------------------
   PROJECTS
   tags -> used by the filter bar. Keep them consistent.
------------------------------------------------------------ */
const PROJECTS = [
  {
    title: "ELK Home SOC — Security Monitoring Lab",
    blurb:
      "A containerized security monitoring platform built on the Elastic Stack. Filebeat and Winlogbeat ship Nginx, Flask, SSH and Windows telemetry into Logstash, which normalizes and routes it to per-source indexes in Elasticsearch, where a detection engine turns patterns into alerts for investigation in Kibana. Runs in simulation, real endpoint, and hybrid modes.",
    tags: ["Detection", "Blue"],
    stack: ["Elasticsearch", "Logstash", "Kibana", "Filebeat", "Winlogbeat", "Docker"],
    links: { repo: "https://github.com/cuddest/elk-home-soc", demo: "", article: "writeups/elk-security-monitoring.html" },
    status: "Shipped",
  },
  {
    title: "Hybrid Attack Demo — Hashcat",
    blurb:
      "A pedagogical demo of password recovery with Hashcat: MD5 hashes that survive a pure dictionary attack (-a 0) fall within seconds to a hybrid attack (-a 6, wordlist + mask). A single script runs the whole scenario and shows why human-chosen passwords fail against hybrid rules.",
    tags: ["Password Security", "Offensive"],
    stack: ["Hashcat", "Bash", "MD5", "Linux"],
    links: { repo: "https://github.com/cuddest/Hybrid-Attack-Demo", demo: "" },
    status: "Shipped",
  },
];

/* ------------------------------------------------------------
   WRITEUPS
   category -> one of WRITEUP_CATEGORIES. Drives the filter bar.
   tags -> platform + topic. Keep consistent, a typo makes a new button.
   severity -> "Critical" | "High" | "Medium" | "Low" | "Info"
               Only Critical gets the brass mark. Omit to hide.
------------------------------------------------------------ */
const WRITEUP_CATEGORIES = ["Lab writeups", "CTFs", "Articles", "Off-topic"];

const WRITEUPS = [
  {
    title: "Conti — Investigating a Compromised Exchange Server",
    tags: ["TryHackMe", "Splunk", "SIEM", "Ransomware", "Sysmon", "Exchange"],
    event: "TryHackMe",
    category: "Lab writeups",
    severity: "Critical",
    date: "2026-03-11",
    readTime: "15 min",
    summary:
      "Reconstructing a Conti ransomware intrusion on an Exchange server from Sysmon and Windows event logs in Splunk — webshell, lsass injection, and user creation.",
    url: "writeups/conti.html",
  },
  {
    title: "ClickFix / VodkaStealer — Endpoint Hunt & Service Hijacking",
    tags: ["CyberDefenders", "Splunk", "DFIR", "Incident Response", "Infostealer", "ClickFix"],
    event: "CyberDefenders",
    category: "Lab writeups",
    severity: "Critical",
    date: "2026-08-13",
    readTime: "25 min",
    summary:
      "ClickFix CAPTCHA → PowerShell payload → unquoted service path privesc → LSASS dump → pass-the-hash → scheduled-task persistence and exfiltration.",
    url: "writeups/vodkastealer.html",
  },
  {
    title: "FakeGPT — A Malicious ChatGPT Browser Extension",
    tags: ["CyberDefenders", "Malware Analysis", "Browser Extension", "JavaScript", "Exfiltration"],
    event: "CyberDefenders",
    category: "Lab writeups",
    severity: "High",
    date: "2026-03-28",
    readTime: "10 min",
    summary:
      "A fake ChatGPT extension that Base64-obfuscates targets, keylogs, and AES-encrypts stolen credentials before exfiltrating them through an image element.",
    url: "writeups/fakegpt.html",
  },
  {
    title: "OpenWire — Apache ActiveMQ RCE (CVE-2023-46604)",
    tags: ["CyberDefenders", "PCAP", "Wireshark", "ActiveMQ", "CVE-2023-46604", "RCE"],
    event: "CyberDefenders",
    category: "Lab writeups",
    severity: "High",
    date: "2026-03-26",
    readTime: "8 min",
    summary:
      "Tier-2 SOC analysis of an OpenWire handshake smuggling a ClassPathXmlApplicationContext → ProcessBuilder RCE on Apache ActiveMQ, CVE-2023-46604.",
    url: "writeups/openwire.html",
  },
  {
    title: "XLMRat — PCAP Hunt & Malware Analysis",
    tags: ["CyberDefenders", "PCAP", "Malware Analysis", "AsyncRAT", "LOLBin"],
    event: "CyberDefenders",
    category: "Lab writeups",
    severity: "High",
    date: "2026-03-28",
    readTime: "8 min",
    summary:
      "PCAP hunt: fileless VBScript dropper, a hex-encoded PE hiding inside an image, and RegSvcs LOLBin execution leading to AsyncRAT.",
    url: "writeups/xlmrat.html",
  },
  {
    title: "GhostConnect (TA583) — Full Threat Hunt in Splunk",
    tags: ["CyberDefenders", "Splunk", "Threat Hunting", "Phishing", "DFIR", "TA583"],
    event: "CyberDefenders",
    category: "Lab writeups",
    severity: "Critical",
    date: "2026-08-18",
    readTime: "25 min",
    summary:
      "Full hunt on FB-WKS64: phishing VBS → Google Drive staging → SilentConnect implant → AD enumeration → base64 HTTPS exfiltration.",
    url: "writeups/ghostconnect.html",
  },
  {
    title: "ELK Home SOC — Containerized Security Monitoring with the Elastic Stack",
    tags: ["Elastic", "ELK", "SIEM", "Detection Engineering", "Docker", "SOC"],
    event: "Project",
    category: "Articles",
    date: "2026-08-19",
    readTime: "14 min",
    summary:
      "A reproducible Elastic Stack monitoring platform — Filebeat and Winlogbeat telemetry, Logstash normalization, Elasticsearch indexing, Kibana investigation and a detection engine, running in simulation, real and hybrid modes.",
    url: "writeups/elk-security-monitoring.html",
  },
];

/* ------------------------------------------------------------
   CTF RESULTS
   highlight: true -> gets the brass stamp.
------------------------------------------------------------ */
const CTFS = [
  {
    event: "Fennec CTF",
    placement: "1st",
    team: "CascRoot",
    year: "2026",
    note: "National CTF, 12–14 Feb in Algiers. Held at the Sidi Abdellah tech park, ~75 players. RE, exploitation, forensics and defensive challenges.",
    highlight: true,
  },
  {
    event: "Hackini CTF (Shellmates)",
    placement: "2nd",
    team: "CascRoot",
    year: "2025",
    note: "Online CTF by Shellmates Club. Podium finish out of ~100 teams, sharing the weekend with Industrial Intrusion CTF.",
    highlight: false,
  },
  {
    event: "TryHackMe — Hackfinity Battle",
    placement: "Top 10",
    team: "CascRoot",
    year: "2025",
    note: "17–20 Mar, 4,300+ teams and 24,000+ players worldwide. Boot2root, cloud, forensics and more.",
    highlight: false,
  },
  {
    event: "AFRICC — Team Africa qualifiers",
    placement: "3rd",
    team: "Individual",
    year: "2026",
    note: "3rd individually in the Africa Region International Cybersecurity Challenge qualifiers selecting Team Africa for the ICC finals. Selection still in process — finals run in Dublin.",
    highlight: false,
  },
  {
    event: "CTF Aldjazair",
    placement: "5th",
    team: "S4NDW1CH",
    year: "2025",
    note: "First national CTF held in Algeria, 45 teams. Web and forensics focus.",
    highlight: false,
  },
  {
    event: "NexTrace mini CTF",
    placement: "4th",
    team: "CascRoot",
    year: "2023",
    note: "First edition of Nexus Security Club's mini-CTF. One of my earliest competitive results.",
    highlight: false,
  },
];

/* ------------------------------------------------------------
   CERTIFICATIONS / EDUCATION — set to [] to hide the section.
------------------------------------------------------------ */
const CREDENTIALS = [
  {
    title: "Engineering Degree — Cybersecurity",
    issuer: "ESTIN — Béjaïa",
    period: "2022 — 2027",
    note: "Final year. Higher School of Computer Science and Digital Technologies (ESTIN), Amizour campus. 5-year state engineer program — 2 years preparatory cycle + cybersecurity specialization.",
  },
  {
    title: "Baccalaureate — Scientific",
    issuer: "Omar Mokhtar High School",
    period: "2022",
    note: "Graduated with honours (very good) — 16/20.",
  },
];
