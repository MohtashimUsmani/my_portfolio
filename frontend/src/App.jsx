import { useState, useEffect, useRef } from "react";
import { ArrowRight, Menu, X, Mail, ExternalLink, ChevronDown } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";


/* ─── FONT INJECTION ─────────────────────────────────────────── */
const injectFonts = () => {
  if (document.getElementById("mu-fonts")) return;
  const l = document.createElement("link");
  l.id = "mu-fonts";
  l.rel = "stylesheet";
  l.href =
    "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Instrument+Serif:ital@1&display=swap";
  document.head.appendChild(l);
};

/* ─── GLOBAL STYLES ──────────────────────────────────────────── */
const GlobalStyles = () => {
  useEffect(() => {
    injectFonts();
    const s = document.createElement("style");
    s.id = "mu-global";
    s.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: #05080a; overflow-x: hidden; }

      :root {
        --green: #4fffb0;
        --green-dim: #1a7a4f;
        --dark: #05080a;
        --dark2: #0b1117;
        --dark3: #111820;
        --text: #e8f0ec;
        --text-muted: rgba(232,240,236,0.55);
        --border: rgba(255,255,255,0.07);
        --font-display: 'Syne', sans-serif;
        --font-body: 'DM Sans', sans-serif;
        --font-italic: 'Instrument Serif', serif;
      }

      ::selection { background: #4fffb030; color: #4fffb0; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: var(--dark); }
      ::-webkit-scrollbar-thumb { background: var(--green-dim); border-radius: 2px; }

      .mu-nav-link {
        font-family: var(--font-display);
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.12em;
        color: var(--text-muted);
        text-decoration: none;
        text-transform: uppercase;
        transition: color 0.2s;
        position: relative;
      }
      .mu-nav-link::after {
        content: '';
        position: absolute;
        bottom: -3px; left: 0;
        width: 0; height: 1px;
        background: var(--green);
        transition: width 0.25s;
      }
      .mu-nav-link:hover { color: var(--green); }
      .mu-nav-link:hover::after { width: 100%; }

      .mu-btn-primary {
        display: inline-flex; align-items: center; gap: 10px;
        background: var(--green); color: var(--dark);
        font-family: var(--font-display); font-weight: 800;
        font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase;
        border: none; border-radius: 2px;
        padding: 14px 28px; cursor: pointer;
        transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        text-decoration: none;
      }
      .mu-btn-primary:hover {
        background: #7bffca;
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(79,255,176,0.25);
      }

      .mu-btn-outline {
        display: inline-flex; align-items: center; gap: 8px;
        background: transparent; color: var(--green);
        font-family: var(--font-display); font-weight: 700;
        font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
        border: 1px solid rgba(79,255,176,0.35); border-radius: 2px;
        padding: 12px 24px; cursor: pointer;
        transition: all 0.2s;
        text-decoration: none;
      }
      .mu-btn-outline:hover {
        background: rgba(79,255,176,0.08);
        border-color: var(--green);
        transform: translateY(-2px);
      }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(30px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; } to { opacity: 1; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-12px); }
      }
      @keyframes scanline {
        0%   { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
      }
      @keyframes pulse-glow {
        0%, 100% { opacity: 0.4; }
        50%       { opacity: 0.8; }
      }
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      @keyframes blink {
        0%, 100% { opacity: 1; } 50% { opacity: 0; }
      }

      .mu-fade-up { animation: fadeUp 0.7s ease both; }
      .mu-fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
      .mu-fade-up-2 { animation: fadeUp 0.7s 0.25s ease both; }
      .mu-fade-up-3 { animation: fadeUp 0.7s 0.4s ease both; }
      .mu-fade-up-4 { animation: fadeUp 0.7s 0.55s ease both; }
      .mu-fade-up-5 { animation: fadeUp 0.7s 0.7s ease both; }

      .mu-skill-bar {
        height: 3px;
        background: var(--border);
        border-radius: 2px;
        overflow: hidden;
        position: relative;
      }
      .mu-skill-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--green-dim), var(--green));
        border-radius: 2px;
        transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
      }

      .mu-project-card {
        background: var(--dark2);
        border: 1px solid var(--border);
        border-radius: 4px;
        overflow: hidden;
        transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
      }
      .mu-project-card:hover {
        transform: translateY(-6px);
        border-color: rgba(79,255,176,0.3);
        box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(79,255,176,0.1);
      }

      .mu-tag {
        display: inline-block;
        font-family: var(--font-display);
        font-size: 10px; font-weight: 700;
        letter-spacing: 0.1em; text-transform: uppercase;
        color: var(--green); background: rgba(79,255,176,0.08);
        border: 1px solid rgba(79,255,176,0.2);
        border-radius: 2px; padding: 4px 10px;
      }

      .mu-section-label {
        font-family: var(--font-display);
        font-size: 11px; font-weight: 700;
        letter-spacing: 0.2em; text-transform: uppercase;
        color: var(--green);
        display: flex; align-items: center; gap: 12px;
        margin-bottom: 20px;
      }
      .mu-section-label::before {
        content: '';
        display: block;
        width: 32px; height: 1px;
        background: var(--green);
      }

      .mu-section-heading {
        font-family: var(--font-display);
        font-size: clamp(32px, 4vw, 52px);
        font-weight: 800;
        color: var(--text);
        line-height: 1.05;
        letter-spacing: -0.02em;
      }

      .mu-contact-input {
        width: 100%;
        background: var(--dark3);
        border: 1px solid var(--border);
        border-radius: 2px;
        color: var(--text);
        font-family: var(--font-body);
        font-size: 14px;
        padding: 14px 18px;
        outline: none;
        transition: border-color 0.2s;
      }
      .mu-contact-input:focus { border-color: rgba(79,255,176,0.5); }
      .mu-contact-input::placeholder { color: var(--text-muted); }

      .mu-social-icon {
        display: flex; align-items: center; justify-content: center;
        width: 40px; height: 40px;
        border: 1px solid var(--border); border-radius: 2px;
        color: var(--text-muted);
        transition: all 0.2s;
        text-decoration: none;
      }
      .mu-social-icon:hover {
        color: var(--green);
        border-color: rgba(79,255,176,0.4);
        background: rgba(79,255,176,0.06);
        transform: translateY(-2px);
      }

      .mu-mobile-menu {
        position: fixed; inset: 0;
        background: rgba(5,8,10,0.98);
        z-index: 200;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center; gap: 40px;
        opacity: 0; pointer-events: none;
        transition: opacity 0.3s;
        backdrop-filter: blur(12px);
      }
      .mu-mobile-menu.open { opacity: 1; pointer-events: all; }
      .mu-mobile-menu a {
        font-family: var(--font-display);
        font-size: 32px; font-weight: 800;
        color: rgba(255,255,255,0.7);
        text-decoration: none;
        letter-spacing: 0.05em;
        transition: color 0.2s;
      }
      .mu-mobile-menu a:hover { color: var(--green); }

      .noise-overlay {
        position: fixed; inset: 0; z-index: 1000;
        pointer-events: none; opacity: 0.025;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        background-size: 128px;
      }
    `;
    document.head.appendChild(s);
    return () => { s.remove(); };
  }, []);
  return null;
};

/* ─── DATA + API HELPERS ─────────────────────────────────────── */
const DEFAULT_PORTFOLIO = {
  hero: {
    status_badge: "Available for work",
    first_name: "Mohtashim",
    last_name: "Usmani",
    role_tagline: "Data Scientist & Full-Stack Dev",
    description:
      "I build intelligent web applications and extract meaning from data — turning complex datasets into clear insights and shipping full-stack products powered by Python, Django & Machine Learning.",
    cta_primary_label: "View My Work",
    cta_primary_url: "#projects",
    cta_secondary_label: "Get in Touch",
    cta_secondary_url: "#contact",
  },
  about: {
    heading: "Data-driven builder & problem solver",
    full_name: "Mohtashim Usmani",
    paragraph_one:
      "I'm Mohtashim Usmani — a Data Scientist and Full-Stack Web Developer based in Pakistan. I sit at the intersection of data and engineering, equally comfortable training ML models and deploying them behind a polished web interface.",
    paragraph_two:
      "My work lives in Python and Django on the backend, where I design data pipelines, REST APIs, and intelligent systems. On the data side, I work across the full lifecycle — from raw data wrangling with Pandas to building and evaluating production-ready ML models.",
    years_experience: 3,
    projects_shipped: 15,
    models_deployed: 5,
    fun_stat_label: "Curiosity",
  },
  skills: [
    { name: "Python", level: 92, cat: "Core" },
    { name: "Django / DRF", level: 88, cat: "Core" },
    { name: "Machine Learning", level: 85, cat: "Data" },
    { name: "Data Science", level: 87, cat: "Data" },
    { name: "Pandas / NumPy", level: 90, cat: "Data" },
    { name: "Scikit-learn", level: 82, cat: "Data" },
    { name: "SQL / PostgreSQL", level: 80, cat: "Data" },
    { name: "React / JS", level: 72, cat: "Web" },
    { name: "REST APIs", level: 88, cat: "Web" },
    { name: "Docker", level: 68, cat: "DevOps" },
  ],
  projects: [
    {
      num: "01",
      title: "AI Sales Forecasting Engine",
      desc: "End-to-end ML pipeline that ingests historical sales data, trains a gradient-boosted model, and surfaces real-time predictions via a Django REST API. Reduced forecast error by ~23% over baseline.",
      tags: ["Python", "Django", "Scikit-learn", "PostgreSQL", "React"],
      status: "Featured",
      color: "#4fffb0",
    },
    {
      num: "02",
      title: "Smart Data Dashboard",
      desc: "Interactive analytics platform built with Django backend and React frontend. Supports CSV/Excel ingestion, automated EDA, and dynamic chart generation with export capabilities.",
      tags: ["Django", "React", "Pandas", "Chart.js", "REST API"],
      status: "Live",
      color: "#3de8ff",
    },
    {
      num: "03",
      title: "NLP Sentiment Analyzer",
      desc: "Web app that performs sentiment analysis and topic modeling on social media data. Trained on 500k+ tweets using transformer fine-tuning, deployed via Django with a clean dashboard UI.",
      tags: ["Python", "HuggingFace", "Django", "NLP", "PostgreSQL"],
      status: "Open Source",
      color: "#b87fff",
    },
  ],
  services: [
    {
      icon: "⬡",
      title: "Full-Stack Web Apps",
      desc: "From Django-powered APIs to polished frontends — I build complete, production-ready web applications that are fast, scalable, and maintainable.",
    },
    {
      icon: "◈",
      title: "Data Science & Analytics",
      desc: "I transform raw datasets into actionable insights — through exploratory analysis, visualization dashboards, and automated reporting pipelines.",
    },
    {
      icon: "◉",
      title: "ML Model Development",
      desc: "End-to-end machine learning — from problem framing and feature engineering to model training, evaluation, and deploying models via REST APIs.",
    },
    {
      icon: "◎",
      title: "API Design & Integration",
      desc: "Clean, well-documented REST APIs with Django REST Framework. I make sure your data flows reliably between systems and third-party services.",
    },
  ],
  socials: [
    {
      platform: "github",
      url: "https://github.com/MohtashimUsmani",
      label: "github.com/MohtashimUsmani",
      position: 1,
    },
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/in/mohtashim-usmani",
      label: "linkedin.com/in/mohtashim-usmani",
      position: 2,
    },
    {
      platform: "email",
      url: "mailto:mohtashimusmani09@gmail.com",
      label: "mohtashimusmani09@gmail.com",
      position: 3,
    },
  ],
};

const API_BASE = import.meta?.env?.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const normalizeSkills = (skills) =>
  skills.map((skill) => ({
    name: skill.name,
    level: skill.level,
    cat: skill.category || skill.cat,
  }));

const normalizeProjects = (projects) =>
  projects.map((project) => ({
    num: project.display_number || String(project.position || 0).padStart(2, "0"),
    title: project.title,
    desc: project.description || project.desc,
    tags: (project.tags || []).map((tag) => tag.name || tag),
    status: project.status,
    color: project.accent_color || project.color,
    github_url: project.github_url,
    live_url: project.live_url,
  }));

const normalizeServices = (services) =>
  services.map((service) => ({
    icon: service.icon,
    title: service.title,
    desc: service.description || service.desc,
  }));

const normalizePortfolio = (data, fallback) => ({
  hero: data?.hero || fallback.hero,
  about: data?.about || fallback.about,
  skills: data?.skills?.length ? normalizeSkills(data.skills) : fallback.skills,
  projects: data?.projects?.length ? normalizeProjects(data.projects) : fallback.projects,
  services: data?.services?.length ? normalizeServices(data.services) : fallback.services,
  socials: data?.socials?.length
    ? [...data.socials].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    : fallback.socials,
});

const getSocialHref = (link) => {
  if (!link) return "#";
  if (link.platform === "email" && !link.url.startsWith("mailto:")) {
    return `mailto:${link.url}`;
  }
  return link.url;
};

/* ─── NAV ────────────────────────────────────────────────────── */
function Nav({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: 68,
        background: scrolled ? "rgba(5,8,10,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s",
      }}>
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18,
            color: "var(--text)", letterSpacing: "-0.02em",
          }}>
            MU<span style={{ color: "var(--green)" }}>.</span>
          </span>
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 36 }} className="desktop-nav">
          {["About", "Skills", "Projects", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="mu-nav-link">{l}</a>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href="mailto:mohtashimusmani09@gmail.com" className="mu-btn-primary desktop-nav" style={{ padding: "10px 20px", fontSize: 11 }}>
            Hire Me <ArrowRight size={13} />
          </a>
          <button
            onClick={() => setMenuOpen(true)}
            style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer", display: "none" }}
            className="hamburger-btn"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mu-mobile-menu ${menuOpen ? "open" : ""}`}>
        <button onClick={() => setMenuOpen(false)}
          style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: "var(--text)", cursor: "pointer" }}>
          <X size={28} />
        </button>
        {["About", "Skills", "Projects", "Contact"].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
        <a href="mailto:mohtashimusmani09@gmail.com" className="mu-btn-primary" onClick={() => setMenuOpen(false)}>
          Hire Me <ArrowRight size={14} />
        </a>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

/* ─── HERO ───────────────────────────────────────────────────── */
function Hero({ hero, socials }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const HLS_SRC = "https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8";

    const tryHls = async () => {
      try {
        const mod = await import("hls.js");
        const Hls = mod.default ?? mod;
        if (Hls.isSupported()) {
          const hls = new Hls({ enableWorker: false });
          hls.loadSource(HLS_SRC);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
        }
      } catch {
        if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = HLS_SRC;
          video.play().catch(() => {});
        }
      }
    };
    tryHls();
  }, []);

  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--dark)" }}>

      {/* Video */}
      <video ref={videoRef} autoPlay muted loop playsInline
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45, zIndex: 0 }} />

      {/* Overlays */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #05080a 0%, transparent 60%)", zIndex: 1 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #05080a 0%, transparent 55%)", zIndex: 1 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #05080a 0%, transparent 45%)", zIndex: 1 }} />

      {/* Grid lines */}
      {["25%","50%","75%"].map(p => (
        <div key={p} style={{ position: "absolute", top: 0, bottom: 0, left: p, width: 1, background: "rgba(255,255,255,0.06)", zIndex: 2 }} className="grid-vline" />
      ))}
      <style>{`@media(max-width:767px){.grid-vline{display:none!important}}`}</style>

      {/* Center glow */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 2, pointerEvents: "none" }}>
        <svg width="900" height="220" viewBox="0 0 900 220">
          <defs>
            <filter id="hglow"><feGaussianBlur stdDeviation="28" /></filter>
          </defs>
          <ellipse cx="450" cy="90" rx="400" ry="60" fill="#0d6b4a" opacity="0.5" filter="url(#hglow)" />
          <ellipse cx="450" cy="90" rx="200" ry="28" fill="#4fffb0" opacity="0.15" filter="url(#hglow)" />
        </svg>
      </div>

      {/* Spinning ring decoration */}
      <div style={{ position: "absolute", right: "8%", top: "20%", zIndex: 3, pointerEvents: "none", display: "none" }} className="hero-ring">
        <svg width="220" height="220" viewBox="0 0 220 220" style={{ animation: "spin-slow 20s linear infinite", opacity: 0.15 }}>
          <circle cx="110" cy="110" r="100" fill="none" stroke="#4fffb0" strokeWidth="0.5" strokeDasharray="4 8" />
          <circle cx="110" cy="110" r="70" fill="none" stroke="#4fffb0" strokeWidth="0.5" strokeDasharray="2 12" />
        </svg>
      </div>
      <style>{`@media(min-width:900px){.hero-ring{display:block!important}}`}</style>

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", flexDirection: "column", justifyContent: "center",
        minHeight: "100vh", padding: "120px 48px 80px", maxWidth: 900,
      }} className="hero-pad">
        <style>{`@media(max-width:767px){.hero-pad{padding:100px 24px 60px!important}}`}</style>

        {/* Status badge */}
        <div className="mu-fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#4fffb0", animation: "pulse-glow 2s infinite" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", color: "var(--green)", textTransform: "uppercase" }}>
            {hero?.status_badge}
          </span>
        </div>

        {/* Main headline */}
        <h1 className="mu-fade-up-1" style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: "clamp(44px, 7vw, 84px)",
          color: "var(--text)", lineHeight: 1.0,
          letterSpacing: "-0.04em", marginBottom: 8,
        }}>
          {hero?.first_name}
        </h1>
        <h1 className="mu-fade-up-2" style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: "clamp(44px, 7vw, 84px)",
          lineHeight: 1.0, letterSpacing: "-0.04em", marginBottom: 24,
        }}>
          <span style={{ color: "var(--green)" }}>{hero?.last_name}</span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.6em", fontFamily: "var(--font-italic)", fontStyle: "italic", fontWeight: 400, marginLeft: 16, verticalAlign: "middle" }}>
            — {hero?.role_tagline}
          </span>
        </h1>

        {/* Description */}
        <p className="mu-fade-up-3" style={{
          fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 300,
          color: "var(--text-muted)", maxWidth: 520, lineHeight: 1.8, marginBottom: 40,
          textAlign: 'left'
        }}>
          {hero?.description}
        </p>

        {/* CTAs */}
        <div className="mu-fade-up-4" style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 56 }}>
          <a href={hero?.cta_primary_url || "#projects"} className="mu-btn-primary">
            {hero?.cta_primary_label || "View My Work"} <ArrowRight size={15} />
          </a>
          <a href={hero?.cta_secondary_url || "#contact"} className="mu-btn-outline">
            {hero?.cta_secondary_label || "Get in Touch"}
          </a>
        </div>

        {/* Socials */}
        <div className="mu-fade-up-5" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase", marginRight: 4 }}>Connect</span>
          {socials?.map((link) => (
            <a key={`${link.platform}-${link.url}`} href={getSocialHref(link)} target="_blank" rel="noopener noreferrer" className="mu-social-icon">
              {link.platform === "github" && <FaGithub size={16} />}
              {link.platform === "linkedin" && <FaLinkedinIn size={16} />}
              {link.platform === "email" && <Mail size={16} />}
              {!["github", "linkedin", "email"].includes(link.platform) && <ExternalLink size={16} />}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase" }}>Scroll</span>
        <ChevronDown size={14} color="var(--green)" style={{ animation: "float 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

/* ─── ABOUT ──────────────────────────────────────────────────── */
function About({ about }) {
  const stats = [
    { val: `${about?.years_experience ?? 0}+`, label: "Years Experience" },
    { val: `${about?.projects_shipped ?? 0}+`, label: "Projects Shipped" },
    { val: `${about?.models_deployed ?? 0}+`, label: "ML Models Deployed" },
    { val: "∞", label: about?.fun_stat_label || "Curiosity" },
  ];

  return (
    <section id="about" style={{ background: "var(--dark)", padding: "120px 48px" }} className="section-pad">
      <style>{`@media(max-width:767px){.section-pad{padding:80px 24px!important}}`}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="about-grid">
        <style>{`@media(max-width:900px){.about-grid{grid-template-columns:1fr!important;gap:48px!important}}`}</style>

        {/* Left — text */}
        <div>
          <div className="mu-section-label">About Me</div>
          <h2 className="mu-section-heading" style={{ marginBottom: 24 }}>
            {about?.heading}
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-muted)", lineHeight: 1.9, marginBottom: 16, textAlign: "left" }}>
            {about?.paragraph_one}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-muted)", lineHeight: 1.9, marginBottom: 32, textAlign: "left" }}>
            {about?.paragraph_two}
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="https://github.com/MohtashimUsmani" target="_blank" rel="noopener noreferrer" className="mu-btn-primary">
              GitHub <FaGithub size={14} />
            </a>
            <a href="https://www.linkedin.com/in/mohtashim-usmani" target="_blank" rel="noopener noreferrer" className="mu-btn-outline">
              LinkedIn <FaLinkedinIn size={14} />
            </a>
          </div>
        </div>

        {/* Right — stats + decoration */}
        <div>
          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 32 }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                background: i % 2 === 0 ? "var(--dark2)" : "var(--dark3)",
                padding: "32px 28px",
                borderRadius: i === 0 ? "4px 0 0 0" : i === 1 ? "0 4px 0 0" : i === 2 ? "0 0 0 4px" : "0 0 4px 0",
              }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 800, color: "var(--green)", lineHeight: 1, marginBottom: 8 }}>{s.val}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-muted)", letterSpacing: "0.04em" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tech pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Python", "Django", "Pandas", "Scikit-learn", "NumPy", "REST API", "PostgreSQL", "React", "Docker", "Git"].map(t => (
              <span key={t} className="mu-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ─────────────────────────────────────────────────── */
function Skills({ skills, services }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const cats = [...new Set(skills.map((skill) => skill.cat))];

  return (
    <section id="skills" ref={ref} style={{ background: "var(--dark2)", padding: "120px 48px", borderTop: "1px solid var(--border)" }} className="section-pad">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="mu-section-label">What I Know</div>
        <h2 className="mu-section-heading" style={{ marginBottom: 12 }}>Skills &{" "}
          <span style={{ fontFamily: "var(--font-italic)", fontStyle: "italic", fontWeight: 400, color: "var(--green)" }}>Expertise</span>
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-muted)", maxWidth: 480, margin: "0 auto 60px", lineHeight: 1.7, textAlign: "center" }}>
          A mix of data science depth and full-stack breadth — built over years of real projects.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48 }}>
          {cats.map(cat => (
            <div key={cat}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 24, paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>
                {cat === "Core" ? "Core" : cat === "Data" ? "Data & ML" : cat === "Web" ? "Web" : "DevOps"}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {skills.filter((skill) => skill.cat === cat).map((skill) => (
                  <div key={skill.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{skill.name}</span>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 11, color: "var(--green)" }}>{skill.level}%</span>
                    </div>
                    <div className="mu-skill-bar">
                      <div className="mu-skill-fill" style={{ width: visible ? `${skill.level}%` : "0%" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Services */}
        <div style={{ marginTop: 100 }}>
          <div className="mu-section-label">What I Offer</div>
          <h2 className="mu-section-heading" style={{ marginBottom: 48 }}>How I Can <span style={{ color: "var(--green)" }}>Help You</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 2 }}>
            {services.map((s, i) => (
              <div key={i} style={{
                background: "var(--dark3)", padding: "36px 28px",
                borderTop: "2px solid transparent",
                transition: "border-color 0.2s, background 0.2s",
                cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderTopColor = "var(--green)"; e.currentTarget.style.background = "#0e1a14"; }}
                onMouseLeave={e => { e.currentTarget.style.borderTopColor = "transparent"; e.currentTarget.style.background = "var(--dark3)"; }}
              >
                <div style={{ fontSize: 28, marginBottom: 16, color: "var(--green)" }}>{s.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 800, color: "var(--text)", marginBottom: 12, letterSpacing: "-0.01em" }}>{s.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ───────────────────────────────────────────────── */
function Projects({ projects }) {
  return (
    <section id="projects" style={{ background: "var(--dark)", padding: "120px 48px", borderTop: "1px solid var(--border)" }} className="section-pad">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="mu-section-label">My Work</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, flexWrap: "wrap", gap: 20 }}>
          <h2 className="mu-section-heading">
            Selected <span style={{ color: "var(--green)" }}>Projects</span>
          </h2>
          <a href="https://github.com/MohtashimUsmani" target="_blank" rel="noopener noreferrer" className="mu-btn-outline">
            All Projects <ExternalLink size={13} />
          </a>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {projects.map((p, i) => (
            <div key={i} className="mu-project-card">
              <div style={{ display: "grid", gridTemplateColumns: "80px 1fr auto", gap: 32, padding: "40px 40px", alignItems: "start" }} className="project-inner">
                <style>{`@media(max-width:767px){.project-inner{grid-template-columns:1fr!important;gap:16px!important;padding:28px 20px!important}}`}</style>

                {/* Number */}
                <div style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 800, color: "var(--border)", lineHeight: 1 }}>
                  {p.num}
                </div>

                {/* Content */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em" }}>{p.title}</h3>
                    <span style={{
                      fontFamily: "var(--font-display)", fontSize: 9, fontWeight: 700, letterSpacing: "0.14em",
                      color: p.color, border: `1px solid ${p.color}40`, background: `${p.color}10`,
                      borderRadius: 2, padding: "3px 8px", textTransform: "uppercase",
                    }}>{p.status}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 580, marginBottom: 20, textAlign: "left" }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {p.tags.map((t) => <span key={t} className="mu-tag">{t}</span>)}
                  </div>
                </div>

                {/* Link */}
                <a href={p.github_url || p.live_url || "#"} target="_blank" rel="noopener noreferrer"
                  style={{ color: "var(--text-muted)", transition: "color 0.2s", marginTop: 4 }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--green)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────────── */
function Contact({ socials }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:mohtashimusmani09@gmail.com?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message + "\n\nFrom: " + form.email)}`;
    window.open(mailto);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" style={{ background: "var(--dark2)", padding: "120px 48px", borderTop: "1px solid var(--border)" }} className="section-pad">
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }} className="contact-grid">
        <style>{`@media(max-width:900px){.contact-grid{grid-template-columns:1fr!important;gap:48px!important}}`}</style>

        {/* Left */}
        <div>
          <div className="mu-section-label">Get in Touch</div>
          <h2 className="mu-section-heading" style={{ marginBottom: 20 }}>
            Let's Build<br />
            <span style={{ color: "var(--green)" }}>Something</span>{" "}
            <span style={{ fontFamily: "var(--font-italic)", fontStyle: "italic", fontWeight: 400 }}>Together</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-muted)", lineHeight: 1.9, marginBottom: 40, textAlign: "left" }}>
            Whether you have a data problem to solve, a web app to build, or just want to talk tech — my inbox is open. I typically respond within 24 hours.
          </p>

          {/* Contact details */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
            {socials.map((link, i) => {
              const label = link.platform === "email" ? "Email" : link.platform.charAt(0).toUpperCase() + link.platform.slice(1);
              const rawValue = link.label || link.url;
              const value = rawValue.replace(/^mailto:/, "").replace(/^https?:\/\//, "").replace(/^www\./, "");
              const icon = link.platform === "github"
                ? <FaGithub size={16} />
                : link.platform === "linkedin"
                  ? <FaLinkedinIn size={16} />
                  : <Mail size={16} />;

              return (
              <a key={i} href={getSocialHref(link)} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", padding: "16px 18px", background: "var(--dark3)", borderRadius: 2, border: "1px solid var(--border)", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(79,255,176,0.3)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
              >

                <span style={{ color: "var(--green)", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16 }}>{icon}</span>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                  <div>
                  <div style={{  fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text)" }}>{value}</div>
                </div>
              </a>
              );
            })}
          </div>
        </div>

        {/* Right — form */}
        <div>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Your Name</label>
              <input className="mu-contact-input" placeholder="John Doe" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div>
              <label style={{ fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email Address</label>
              <input className="mu-contact-input" type="email" placeholder="john@company.com" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
            <div>
              <label style={{ fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Message</label>
              <textarea className="mu-contact-input" rows={6} placeholder="Tell me about your project or idea..."
                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{ resize: "vertical" }} required />
            </div>
            <button type="submit" className="mu-btn-primary" style={{ marginTop: 8, justifyContent: "center" }}>
              {sent ? "Message Opened ✓" : <>Send Message <ArrowRight size={15} /></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────── */
function Footer({ socials }) {
  return (
    <footer style={{ background: "var(--dark)", borderTop: "1px solid var(--border)", padding: "32px 48px" }} className="footer-pad">
      <style>{`@media(max-width:767px){.footer-pad{padding:24px!important}}`}</style>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, color: "var(--text)" }}>
          MU<span style={{ color: "var(--green)" }}>.</span>
        </span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-muted)" }}>
          © 2026 Mohtashim Usmani — Built with Django & React
        </span>
        <div style={{ display: "flex", gap: 10 }}>
          {socials.map((link) => (
            <a key={`${link.platform}-${link.url}`} href={getSocialHref(link)} target="_blank" rel="noopener noreferrer" className="mu-social-icon">
              {link.platform === "github" && <FaGithub size={15} />}
              {link.platform === "linkedin" && <FaLinkedinIn size={15} />}
              {link.platform === "email" && <Mail size={15} />}
              {!["github", "linkedin", "email"].includes(link.platform) && <ExternalLink size={15} />}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── ROOT ───────────────────────────────────────────────────── */
export default function MohtashimPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [portfolio, setPortfolio] = useState(DEFAULT_PORTFOLIO);

  useEffect(() => {
    const controller = new AbortController();

    const loadPortfolio = async () => {
      try {
        const response = await fetch(`${API_BASE}/portfolio/`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`API error ${response.status}`);
        }
        const data = await response.json();
        setPortfolio(normalizePortfolio(data, DEFAULT_PORTFOLIO));
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to load portfolio data:", error);
        }
      }
    };

    loadPortfolio();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero hero={portfolio.hero} socials={portfolio.socials} />
      <About about={portfolio.about} />
      <Skills skills={portfolio.skills} services={portfolio.services} />
      <Projects projects={portfolio.projects} />
      <Contact socials={portfolio.socials} />
      <Footer socials={portfolio.socials} />
    </>
  );
}

