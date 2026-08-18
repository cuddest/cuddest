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
  statement: "In a journey of getting better at defending systems",

  tagline:
    "Cybersecurity student focused into defence detection engineering, incident response, and threat hunting. I play offensive CTFs, one could enjoy the other side of the alert too.",

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
    "I'm a cybersecurity student heading for the blue team — detection engineering, incident response, and threat hunting. The work I care about is the part that happens after something has already gone wrong.",
    "I still play offensive CTFs, and that's deliberate. You can't write a detection for an attack you've never run. Learning to break things is how I learned what the logs were trying to tell me. My first real bug was [[a forgotten .git directory]], and I've been hooked since.",
    "I also build backends, which keeps me honest about where the logs come from in the first place — most blind spots are design decisions somebody forgot they made.",
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
    items: ["Web exploitation", "Dfir", "OSINT],
  },
];

/* ------------------------------------------------------------
   PROJECTS
   tags -> used by the filter bar. Keep them consistent.
------------------------------------------------------------ */
const PROJECTS = [
  {
    title: "Example — Home SOC Lab",
    blurb:
      "A full detection stack on spare hardware: Wazuh and Elastic ingesting Sysmon and Suricata, with attacks replayed from an isolated host so every rule is tested against the real thing.",
    tags: ["Detection", "Blue"],
    stack: ["Wazuh", "Elastic", "Suricata", "Sysmon", "Docker"],
    links: { repo: "#", demo: "" },
    status: "Ongoing",
  },
  {
    title: "Example — Sigma Rule Pack",
    blurb:
      "Detection rules for the techniques I kept exploiting in CTFs, mapped to MITRE ATT&CK and tested for false positives against a week of clean baseline traffic.",
    tags: ["Detection", "Blue"],
    stack: ["Sigma", "MITRE ATT&CK", "Python"],
    links: { repo: "#", demo: "" },
    status: "Shipped",
  },
  {
    title: "Example — Log Anomaly Detector",
    blurb:
      "Parses auth logs and flags brute-force patterns and impossible-travel logins, with a small triage dashboard for analysts.",
    tags: ["Detection", "Backend"],
    stack: ["Python", "FastAPI", "Redis"],
    links: { repo: "#", demo: "" },
    status: "Shipped",
  },
  {
    title: "Example — Hardened Auth API",
    blurb:
      "A REST authentication service built around the failure modes I keep finding in CTFs: rotating refresh tokens, rate limiting, argon2id, and audit logging that an analyst can actually read.",
    tags: ["Backend"],
    stack: ["Node.js", "Express", "PostgreSQL", "Docker"],
    links: { repo: "#", demo: "" },
    status: "Shipped",
  },
];

/* ------------------------------------------------------------
   WRITEUPS
   category -> "Detection", "DFIR", "Hunting", "Web", "Pwn", "Crypto", "Rev", "Notes"
   severity -> "Critical" | "High" | "Medium" | "Low" | "Info"
               Only Critical gets the brass mark. Omit to hide.
------------------------------------------------------------ */
const WRITEUPS = [
  {
    title: "Example — Detecting Impossible-Travel Logins Without a SIEM",
    tags: ["siem","geoip","auth-logs","false-positives"],
    event: "Home lab",
    category: "Detection",
    severity: "High",
    date: "2026-07-14",
    readTime: "9 min",
    summary:
      "Geolocating auth events and flagging physically impossible session pairs, plus why the naive version drowns you in false positives from VPN users.",
    url: "#",
  },
  {
    title: "Example — Reading a Compromise from Windows Event Logs Alone",
    tags: ["dfir","event-logs","sysmon","timeline","anti-forensics"],
    event: "DFIR exercise",
    category: "DFIR",
    severity: "Critical",
    date: "2026-05-02",
    readTime: "14 min",
    summary:
      "Rebuilding an intrusion timeline from 4624s, 4688s, and Sysmon process trees — what was recoverable, and what the attacker successfully cleared.",
    url: "#",
  },
  {
    title: "Example — Writing Sigma Rules for the Attacks I Used to Run",
    tags: ["sigma","mitre-attack","privesc","detection-gaps"],
    event: "Notes",
    category: "Hunting",
    severity: "Medium",
    date: "2026-02-11",
    readTime: "7 min",
    summary:
      "Turning three CTF privilege-escalation techniques into detections, and discovering that two of them are nearly invisible without command-line logging enabled.",
    url: "#",
  },
  {
    title: "Example — SQL Injection to RCE via File Write",
    tags: ["sqli","rce","mysql","picoctf","web"],
    event: "PicoCTF 2025",
    category: "Web",
    severity: "Critical",
    date: "2025-11-02",
    readTime: "8 min",
    summary:
      "A blind boolean injection that turned into remote code execution once the database user had FILE privileges — and the log lines that would have caught it.",
    url: "#",
  },
];

/* ------------------------------------------------------------
   CTF RESULTS
   highlight: true -> gets the brass stamp.
------------------------------------------------------------ */
const CTFS = [
  {
    event: "Example National CTF",
    placement: "1st",
    team: "Team Name",
    year: "2025",
    note: "Finals, 40+ competing teams. Led the web exploitation track.",
    highlight: true,
  },
  {
    event: "Example University Qualifiers",
    placement: "3rd",
    team: "Team Name",
    year: "2025",
    note: "Qualified for nationals with a full clear on the crypto category.",
    highlight: false,
  },
  {
    event: "Example Blue Team CTF",
    placement: "Top 5%",
    team: "Solo",
    year: "2024",
    note: "Defensive format — log analysis, memory forensics, and incident triage.",
    highlight: false,
  },
];

/* ------------------------------------------------------------
   CERTIFICATIONS / EDUCATION — set to [] to hide the section.
------------------------------------------------------------ */
const CREDENTIALS = [
  {
    title: "Example — B.Sc. Computer Science",
    issuer: "Your University",
    period: "2023 — 2026",
    note: "Specialization in networks and security.",
  },
  {
    title: "Example — Blue Team Level 1",
    issuer: "Security Blue Team",
    period: "2026",
    note: "Defensive operations: SIEM, DFIR, threat intelligence.",
  },
];
