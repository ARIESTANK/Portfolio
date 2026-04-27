import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0a0a0f",
  surface: "#16162a",
  surface2: "#0e0e15",
  text: "#e8e4df",
  textMuted: "rgba(232,228,223,0.45)",
  border: "rgba(232,228,223,0.08)",
  accent: "#f4a261",
  teal: "#2a9d8f",
  coral: "#e76f51",
  purple: "#a78bfa",
};

const catColors = {
  frontend: COLORS.accent,
  backend: COLORS.teal,
  database: COLORS.coral,
  devops: COLORS.purple,
};

const SKILLS = [
  { name: "React", icon: "⚛", cat: "frontend" },
  { name: "TypeScript", icon: "TS", cat: "frontend" },
  { name: "Tailwind", icon: "🎨", cat: "frontend" },
  { name: "Node.js", icon: "⬡", cat: "backend" },
  { name: "Python", icon: "🐍", cat: "backend" },
  { name: "Java", icon: "☕", cat: "backend" },
  { name: "C# ASP .NET", icon: "🔷", cat: "backend" },
  { name: "PostgreSQL", icon: "🗄", cat: "database" },
  { name: "MySQL", icon: "🗄", cat: "database" },
  { name: "Firebase", icon: "🔥", cat: "database" },
  { name: "Docker", icon: "🐳", cat: "devops" },
  { name: "Git", icon: "⑂", cat: "devops" },
];

const PROJECTS = [
  {
    title: "Banking Dashboard",
    desc: "Basic Banking System built with ASP .NET, REST API, and MySQL for secure financial management with real-time analytics.",
    tags: ["React", "ASP .NET", "REST API", "MySQL"],
    color: COLORS.teal,
    image: "/images/banking.PNG",
    github: "https://github.com/ARIESTANK/Banking_ASPDotnet",
  },
  {
    title: "Green Stack App",
    desc: "AI-based crop recommendations chatbot for farmers using OpenAI API, Flask backend, React frontend, and Firebase auth.",
    tags: ["React", "Python (Flask)", "Firebase", "OpenAI API"],
    color: COLORS.accent,
    image: "/images/greenstack.PNG",
    github: "https://green-stack-frontend.vercel.app",
  },
  {
    title: "Attendance Tracking App",
    desc: "IoT-based attendance system using C++ for device programming, Node.js backend, and Supabase for real-time data.",
    tags: ["React", "Node.js", "C++ (IoT)", "Supabase"],
    color: COLORS.coral,
    image: "/images/attendance.PNG",
    github: "https://github.com/ARIESTANK/Attendance_system_Project",
  },
  {
    title: "Expense Tracker App",
    desc: "Smart expense tracker powered by an LLM model, built with React, Django backend, and SQLite for lightweight storage.",
    tags: ["React", "Python (Django)", "LLM Model", "SQLite"],
    color: COLORS.purple,
    image: "/images/expense.PNG",
    github: "https://github.com/QaraEzio/attendance_system_pj",
  },
  {
    title: "Hackathon Website (Core 365)",
    desc: "Official website for the Core 365 Hackathon, built with React for a dynamic frontend, Flask backend for robust content management.",
    tags: ["React", "Python (Django)"],
    color: COLORS.accent,
    image: "/images/hack.PNG",
    github: "https://hackatom2025.vercel.app",
  },
  {
    title: "Database Management Project",
    desc: "DBMS project including database design, constraints, modeling, procedures and indexes.",
    tags: ["Project Management", "Database Design", "Data Modeling"],
    color: COLORS.teal,
    image: "/images/db.jpg",
    github: "https://github.com/ARIESTANK",
  },
];

/* ── hooks ── */
function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

/* ── Blob ── */
function Blob({ style }) {
  return (
    <div style={{
      position: "absolute", borderRadius: "50%",
      filter: "blur(90px)", opacity: 0.25, pointerEvents: "none",
      animation: "blobFloat 9s ease-in-out infinite alternate",
      ...style,
    }} />
  );
}

/* ── GitHubIcon ── */
function GitHubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/* ── TypewriterText ── */
function TypewriterText({ words }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx];
    let timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((idx + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, words]);

  return (
    <span style={{ color: COLORS.accent }}>
      {displayed}
      <span style={{
        display: "inline-block", width: 2, height: "0.85em",
        background: COLORS.accent, marginLeft: 2, verticalAlign: "middle",
        animation: "cursorBlink 1s step-end infinite",
      }} />
    </span>
  );
}

/* ── StatBadge ── */
function StatBadge({ icon, value, label }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "14px 20px", borderRadius: 14,
      background: "rgba(232,228,223,0.04)",
      border: "1px solid rgba(232,228,223,0.08)",
      minWidth: 90,
    }}>
      <span style={{ fontSize: 20, marginBottom: 4 }}>{icon}</span>
      <span style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Syne', sans-serif", color: COLORS.accent, lineHeight: 1 }}>{value}</span>
      <span style={{ fontSize: 10, opacity: 0.45, marginTop: 4, textAlign: "center", letterSpacing: "0.04em" }}>{label}</span>
    </div>
  );
}

/* ── SkillPill ── */
function SkillPill({ skill, visible, delay }) {
  const color = catColors[skill.cat] || COLORS.accent;
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "12px 14px", borderRadius: 14,
        background: hov ? "rgba(232,228,223,0.07)" : "rgba(232,228,223,0.04)",
        border: `1px solid ${hov ? "rgba(232,228,223,0.18)" : COLORS.border}`,
        transform: visible ? (hov ? "translateY(-3px)" : "translateY(0)") : "translateY(18px)",
        opacity: visible ? 1 : 0,
        boxShadow: hov ? "0 8px 24px rgba(0,0,0,0.28)" : "none",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, box-shadow 0.2s, border-color 0.2s, background 0.2s`,
        cursor: "default",
      }}
    >
      <div style={{
        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
        background: color + "22",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: skill.icon.length === 2 ? 12 : 16,
        color, fontWeight: 700, fontFamily: "monospace",
      }}>{skill.icon}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {skill.name}
        </div>
        <div style={{ fontSize: 10, color, opacity: 0.75, textTransform: "capitalize", marginTop: 1 }}>
          {skill.cat}
        </div>
      </div>
    </div>
  );
}

/* ── ProjectCard ── */
function ProjectCard({ project, delay }) {
  const [ref, inView] = useInView(0.07);
  const [hov, setHov] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 20, overflow: "hidden",
        display: "flex", flexDirection: "column",
        background: COLORS.surface,
        border: `1px solid ${hov ? "rgba(232,228,223,0.15)" : COLORS.border}`,
        opacity: inView ? 1 : 0,
        transform: inView ? (hov ? "translateY(-8px)" : "translateY(0)") : "translateY(28px)",
        boxShadow: hov ? `0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px ${project.color}30` : "none",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.3s, border-color 0.3s`,
      }}
    >
      <div style={{ height: 210, position: "relative", overflow: "hidden", flexShrink: 0, background: "#0d0d1a" }}>
        <img
          src={project.image} alt={project.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hov ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.55s ease",
          }}
        />
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          style={{
            position: "absolute", inset: 0,
            background: hov ? "rgba(8,8,16,0.78)" : "rgba(8,8,16,0)",
            backdropFilter: hov ? "blur(6px)" : "blur(0px)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 12,
            opacity: hov ? 1 : 0,
            transition: "opacity 0.3s, background 0.3s",
            textDecoration: "none",
          }}
        >
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: project.color,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#0a0a0f", boxShadow: `0 8px 24px ${project.color}55`,
          }}>
            <GitHubIcon size={20} />
          </div>
          <span style={{
            padding: "9px 22px", borderRadius: 999,
            fontSize: 13, fontWeight: 600,
            background: project.color, color: "#0a0a0f",
          }}>View on GitHub →</span>
        </a>
      </div>

      <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 10 }}>
          <h4 style={{ fontSize: 17, fontWeight: 700, color: COLORS.text, margin: 0, fontFamily: "'Syne', sans-serif", lineHeight: 1.3 }}>
            {project.title}
          </h4>
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            style={{
              flexShrink: 0, width: 32, height: 32, borderRadius: "50%",
              border: `1px solid ${COLORS.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: COLORS.text, opacity: 0.45,
              transition: "opacity 0.2s, border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.borderColor = project.color; e.currentTarget.style.color = project.color; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = 0.45; e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.text; }}
          ><GitHubIcon /></a>
        </div>
        <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.7, margin: "0 0 16px", flex: 1 }}>{project.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tags.map(t => (
            <span key={t} style={{
              fontSize: 11, padding: "4px 11px", borderRadius: 999,
              background: project.color + "18", color: project.color, fontWeight: 500,
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── HeroBtn ── */
function HeroBtn({ href, children, primary }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "13px 26px", borderRadius: 999,
        fontSize: 14, fontWeight: 600, textDecoration: "none",
        background: primary ? (hov ? "#f5b07a" : COLORS.accent) : "transparent",
        color: primary ? "#0a0a0f" : COLORS.text,
        border: primary ? "none" : `1px solid rgba(232,228,223,${hov ? 0.35 : 0.2})`,
        transform: hov ? "scale(1.04)" : "scale(1)",
        boxShadow: primary && hov ? `0 8px 28px ${COLORS.accent}55` : "none",
        transition: "all 0.2s ease",
      }}
    >{children}</a>
  );
}

/* ── SocialLink ── */
function SocialLink({ label, url, icon }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      title={label}
      style={{
        width: 44, height: 44, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: `1px solid ${hov ? "rgba(232,228,223,0.3)" : COLORS.border}`,
        color: COLORS.text, fontSize: 17, fontWeight: 700,
        opacity: hov ? 1 : 0.38,
        transition: "opacity 0.2s, border-color 0.2s",
        textDecoration: "none",
      }}
    >{icon}</a>
  );
}

/* ── Main ── */
export default function Home() {
  const vw = useWindowWidth();
  const isMobile = vw < 768;

  const [scrolled, setScrolled] = useState(false);
  const [heroVis, setHeroVis] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVis(true), 60);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  const [skillsRef, skillsIn] = useInView(0.05);
  const [contactRef, contactIn] = useInView(0.1);

  const anim = (d) => ({
    opacity: heroVis ? 1 : 0,
    transform: heroVis ? "translateY(0)" : "translateY(26px)",
    transition: `opacity 0.7s ease ${d}ms, transform 0.7s ease ${d}ms`,
  });

  const NAV = ["About", "Skills", "Projects", "Contact"];
  const projCols = vw < 640 ? "1fr" : "repeat(2, 1fr)";
  const skillCols = vw < 480 ? "repeat(2, 1fr)" : vw < 768 ? "repeat(2, 1fr)" : vw < 1024 ? "repeat(3, 1fr)" : "repeat(4, 1fr)";
  const px = isMobile ? "16px" : "24px";
  const sectionPy = isMobile ? "64px" : "96px";

  return (
    <div style={{ background: COLORS.bg, color: COLORS.text, fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        a { text-decoration: none; }
        img { display: block; }
        @keyframes blobFloat {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(28px,-18px) scale(1.08); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; } 50% { opacity: 0; }
        }
        @keyframes menuSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: rgba(232,228,223,0.14); border-radius: 3px; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled || menuOpen ? "rgba(10,10,15,0.96)" : "rgba(10,10,15,0.72)",
        backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${scrolled ? "rgba(232,228,223,0.1)" : "rgba(232,228,223,0.05)"}`,
        transition: "background 0.3s, border-color 0.3s",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", padding: `0 ${px}`,
          display: "flex", alignItems: "center", justifyContent: "space-between", height: 62,
        }}>
          <span style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Syne', sans-serif", color: COLORS.accent, letterSpacing: "0.04em" }}>K.K.L</span>

          {!isMobile && (
            <div style={{ display: "flex", gap: 28 }}>
              {NAV.map(l => (
                <a key={l} href={`#${l.toLowerCase()}`}
                  style={{ color: COLORS.text, opacity: 0.55, fontSize: 14, fontWeight: 400, transition: "opacity 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0.55}
                >{l}</a>
              ))}
            </div>
          )}

          {isMobile && (
            <button onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: "block", width: 22, height: 2, background: COLORS.text, borderRadius: 2,
                  transition: "transform 0.25s, opacity 0.25s",
                  transform: menuOpen ? i === 0 ? "translateY(7px) rotate(45deg)" : i === 2 ? "translateY(-7px) rotate(-45deg)" : "scaleX(0)" : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          )}
        </div>

        {isMobile && menuOpen && (
          <div style={{ borderTop: `1px solid ${COLORS.border}`, padding: "14px 20px 20px", animation: "menuSlide 0.2s ease" }}>
            {NAV.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                style={{ display: "block", padding: "10px 0", color: COLORS.text, fontSize: 15, fontWeight: 500, borderBottom: `1px solid ${COLORS.border}`, opacity: 0.75 }}
              >{l}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <header id="about" style={{
        position: "relative",
        paddingTop: isMobile ? 90 : 120,
        paddingBottom: isMobile ? 60 : 80,
        paddingLeft: px, paddingRight: px,
        minHeight: isMobile ? 500 : 600,
        overflow: "hidden",
      }}>
        <Blob style={{ width: isMobile ? 200 : 380, height: isMobile ? 200 : 380, background: COLORS.accent, top: "0%", left: "-10%" }} />
        <Blob style={{ width: isMobile ? 160 : 300, height: isMobile ? 160 : 300, background: COLORS.teal, top: "50%", right: "-8%", animationDelay: "3s" }} />
        <Blob style={{ width: 180, height: 180, background: COLORS.purple, bottom: "5%", left: "40%", animationDelay: "5.5s" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 10 }}>

        
          {/* ── Name block ── */}
          <div style={{ ...anim(100), marginBottom: 6 }}>
            <p style={{ fontSize: isMobile ? 12 : 13, letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.45, marginBottom: 10 }}>
              Full-Stack Developer
            </p>
            <h1 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: `clamp(2.6rem, ${isMobile ? "10vw" : "5.5vw"}, 5rem)`,
              lineHeight: 1.05, color: COLORS.text,
              // Gradient shimmer on name
              background: `linear-gradient(135deg, ${COLORS.text} 0%, ${COLORS.accent} 50%, ${COLORS.text} 100%)`,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 5s linear infinite",
            }}>
              Kaung Khant Lin
            </h1>
          </div>

          {/* ── Typewriter role line ── */}
          <div style={{ ...anim(200), marginBottom: 24, height: 32, display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: isMobile ? 15 : 18, fontWeight: 500, color: "rgba(232,228,223,0.6)" }}>
              I build&nbsp;
            </span>
            <TypewriterText words={["web applications.", "REST APIs.", "AI-powered apps.", "IoT systems.", "Relaible backend systems"]} />
          </div>

          {/* ── Description card ── */}
          <div style={{
            ...anim(300),
            position: "relative",
            maxWidth: 520,
            padding: "20px 24px",
            borderRadius: 16,
            background: "rgba(22,22,42,0.7)",
            border: "1px solid rgba(232,228,223,0.08)",
            backdropFilter: "blur(8px)",
            marginBottom: 32,
          }}>
            {/* Accent left bar */}
            <div style={{
              position: "absolute", left: 0, top: 16, bottom: 16,
              width: 3, borderRadius: "0 3px 3px 0",
              background: `linear-gradient(to bottom, ${COLORS.accent}, ${COLORS.teal})`,
            }} />
            <p style={{ fontSize: 14, lineHeight: 1.78, color: "rgba(232,228,223,0.7)", paddingLeft: 4 }}>
              A full-stack engineer passionate about crafting <strong style={{ color: COLORS.text, fontWeight: 600 }}>scalable</strong>,{" "}
              <strong style={{ color: COLORS.text, fontWeight: 600 }}>elegant products</strong> — turning complex problems into clean, beautiful solutions.
              Experienced across the full stack from databases to polished UIs.
            </p>
          </div>

          {/* ── Stats row ── */}
          <div style={{ ...anim(380), display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
            <StatBadge icon="🚀" value="5+" label="PROJECTS" />
            <StatBadge icon="⚡" value="4+" label="LANGUAGES" />
            <StatBadge icon="🛠" value="12+" label="TOOLS" />
          </div>

          {/* ── CTA buttons ── */}
          <div style={{ ...anim(460), display: "flex", gap: 12, flexWrap: "wrap" }}>
            <HeroBtn href="#projects" primary>View Projects ↓</HeroBtn>
            <HeroBtn href="#contact">Get in Touch</HeroBtn>
          </div>
        </div>
      </header>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: `${sectionPy} ${px}` }}>
        <div ref={skillsRef} style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", opacity: 0.38, marginBottom: 6 }}>Expertise</p>
          <h3 style={{ fontSize: isMobile ? 24 : 30, fontWeight: 700, fontFamily: "'Syne', sans-serif", color: COLORS.text, marginBottom: 36 }}>
            Skills & Technologies
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: skillCols, gap: 12 }}>
            {SKILLS.map((s, i) => (
              <SkillPill key={s.name} skill={s} visible={skillsIn} delay={i * 45} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: `${sectionPy} ${px}`, background: COLORS.surface2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", opacity: 0.38, marginBottom: 6 }}>Portfolio</p>
          <h3 style={{ fontSize: isMobile ? 24 : 30, fontWeight: 700, fontFamily: "'Syne', sans-serif", color: COLORS.text, marginBottom: 36 }}>
            Featured Projects
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: projCols, gap: isMobile ? 16 : 24 }}>
            {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} delay={i * 80} />)}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: `${isMobile ? "72px" : "110px"} ${px}` }}>
        <div ref={contactRef} style={{
          maxWidth: 520, margin: "0 auto", textAlign: "center",
          opacity: contactIn ? 1 : 0,
          transform: contactIn ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <h2 style={{ fontSize: isMobile ? 26 : 32, fontWeight: 700, fontFamily: "'Syne', sans-serif", color: COLORS.text, marginBottom: 12 }}>
            Let's Work Together
          </h2>
          <p style={{ opacity: 0.44, marginBottom: 32, fontSize: 14, lineHeight: 1.6 }}>
            Have a project in mind? I'd love to hear about it.
          </p>
          <a href="mailto:kaungkhantlin2332003@gmail.com"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: isMobile ? "13px 18px" : "15px 28px",
              borderRadius: 999, fontSize: isMobile ? 13 : 15, fontWeight: 600,
              background: COLORS.accent, color: "#0a0a0f",
              transition: "transform 0.2s, box-shadow 0.2s",
              wordBreak: "break-all", maxWidth: "100%",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = `0 10px 28px ${COLORS.accent}55`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            ✉ kaungkhantlin2332003@gmail.com
          </a>
          <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 40 }}>
            <SocialLink label="GitHub"   url="https://github.com/ARIESTANK"  icon="⑂" />
            <SocialLink label="LinkedIn" url="https://www.linkedin.com/in/kaung-khant-lin-792b13390/" icon="in" />
            <SocialLink label="Twitter"  url="https://twitter.com/kaungkhantlin2332003" icon="𝕏" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: "24px 20px", textAlign: "center",
        fontSize: 12, opacity: 0.27,
        borderTop: `1px solid rgba(232,228,223,0.06)`,
      }}>
        © 2025 Kaung Khant Lin · ARIES. Crafted with care.
      </footer>
    </div>
  );
}
