import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────
   TOKENS
───────────────────────────────────────── */
const C = {
  bg:       "#0a0a0f",
  surface:  "#16162a",
  surface2: "#0e0e15",
  text:     "#e8e4df",
  muted:    "rgba(232,228,223,0.45)",
  faint:    "rgba(232,228,223,0.08)",
  accent:   "#f4a261",
  teal:     "#2a9d8f",
  coral:    "#e76f51",
  purple:   "#a78bfa",
};

const CAT_COLORS = {
  frontend: C.accent,
  backend:  C.teal,
  database: C.coral,
  devops:   C.purple,
};

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const SKILLS = [
  { name: "React",       icon: "⚛",  cat: "frontend" },
  { name: "TypeScript",  icon: "TS", cat: "frontend" },
  { name: "Tailwind",    icon: "🎨", cat: "frontend" },
  { name: "Node.js",     icon: "⬡",  cat: "backend"  },
  { name: "Python",      icon: "🐍", cat: "backend"  },
  { name: "Java",        icon: "☕", cat: "backend"  },
  { name: "C# ASP.NET",  icon: "🔷", cat: "backend"  },
  { name: "PostgreSQL",  icon: "🗄", cat: "database" },
  { name: "MySQL",       icon: "🗄", cat: "database" },
  { name: "Firebase",    icon: "🔥", cat: "database" },
  { name: "Docker",      icon: "🐳", cat: "devops"   },
  { name: "Git",         icon: "⑂",  cat: "devops"   },
];

const PROJECTS = [
  {
    title:  "Banking Dashboard",
    desc:   "Basic Banking System built with ASP .NET, REST API, and MySQL for secure financial management with real-time analytics.",
    tags:   ["React","ASP .NET","REST API","MySQL"],
    color:  C.teal,
    image:  ["/images/banking/banking.PNG","/images/banking/banking2.PNG","/images/banking/banking3.PNG"],
    github: "https://github.com/ARIESTANK/Banking_ASPDotnet",
  },
  {
    title:  "Green Stack App",
    desc:   "AI-based crop recommendations chatbot for farmers using OpenAI API, Flask backend, React frontend, and Firebase auth.",
    tags:   ["React","Python (Flask)","Firebase","OpenAI API"],
    color:  C.accent,
    image:  ["/images/greenstack/greenstack.PNG","/images/greenstack/greenstack2.PNG","/images/greenstack/greenstack3.PNG"],
    github: "https://green-stack-frontend.vercel.app",
  },
  {
    title:  "Attendance Tracking App",
    desc:   "IoT-based attendance system using C++ for device programming, Node.js backend, and Supabase for real-time data.",
    tags:   ["React","Node.js","C++ (IoT)","Supabase"],
    color:  C.coral,
    image:  ["/images/attendance/attendance.PNG","/images/attendance/attendance2.PNG","/images/attendance/attendance3.PNG"],
    github: "https://github.com/ARIESTANK/Attendance_system_Project",
  },
  {
    title:  "Expense Tracker App",
    desc:   "Smart expense tracker powered by an LLM model, built with React, Django backend, and SQLite for lightweight storage.",
    tags:   ["React","Python (Django)","LLM Model","SQLite"],
    color:  C.purple,
    image:  ["/images/expense/expense.PNG","/images/expense/expense2.PNG","/images/expense/expense3.PNG"],
    github: "https://github.com/QaraEzio/attendance_system_pj",
  },
  {
    title:  "Hackathon Website (Core 365)",
    desc:   "Official website for the Core 365 Hackathon, built with React frontend and Flask backend for robust content management.",
    tags:   ["React","Python (Flask)"],
    color:  C.accent,
    image:  ["/images/hackathon/hack.PNG","/images/hackathon/hack2.PNG","/images/hackathon/hack3.PNG"],
    github: "https://hackatom2025.vercel.app",
  },
  {
    title:  "Human Resource Management",
    desc:   "HR management project using Java (Spring Boot) with Oracle Database.",
    tags:   ["React","Spring Boot","JWT Auth","Oracle","REST API"],
    color:  C.coral,
    image:  ["/images/hr/hr.PNG","/images/hr/hr2.PNG","/images/hr/hr3.PNG"],
    github: "https://github.com/ARIESTANK/HR_Management_System",
  },
  {
    title:  "Database Management Project",
    desc:   "DBMS project including database design, constraints, data modeling, stored procedures and indexes.",
    tags:   ["Project Management","Database Design","Data Modeling"],
    color:  C.teal,
    image:  ["/images/db.jpg","/images/db.jpg","/images/db.jpg"],
    github: "https://github.com/ARIESTANK",
  },
];

/* ─────────────────────────────────────────
   HOOKS
───────────────────────────────────────── */
function useInView(threshold = 0.07) {
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

function useVW() {
  const [vw, setVw] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const h = () => setVw(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return vw;
}

/* ─────────────────────────────────────────
   BREAKPOINTS — single source of truth
   xs  < 400
   sm  400–599
   md  600–767
   lg  768–1023
   xl  >= 1024
───────────────────────────────────────── */
function useBP() {
  const vw = useVW();
  return {
    xs:  vw < 400,
    sm:  vw >= 400  && vw < 600,
    md:  vw >= 600  && vw < 768,
    lg:  vw >= 768  && vw < 1024,
    xl:  vw >= 1024,
    vw,
    mobile: vw < 768,
    tablet: vw >= 768 && vw < 1024,
  };
}

/* ─────────────────────────────────────────
   SMALL COMPONENTS
───────────────────────────────────────── */
function Blob({ w, h, color, top, left, right, bottom, delay = "0s" }) {
  return (
    <div style={{
      position: "absolute", borderRadius: "50%", pointerEvents: "none",
      width: w, height: h, background: color,
      top, left, right, bottom,
      filter: "blur(80px)", opacity: 0.22,
      animation: `blobFloat 9s ease-in-out ${delay} infinite alternate`,
    }} />
  );
}

function GHIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/* Typewriter */
function Typewriter({ words }) {
  const [i, setI]     = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i];
    const t = setTimeout(() => {
      if (!del && txt.length < w.length)        setTxt(w.slice(0, txt.length + 1));
      else if (!del && txt.length === w.length) setDel(true);
      else if (del && txt.length > 0)           setTxt(txt.slice(0, -1));
      else { setDel(false); setI((i + 1) % words.length); }
    }, del ? 40 : txt.length === words[i].length ? 1800 : 75);
    return () => clearTimeout(t);
  }, [txt, del, i, words]);
  return (
    <span style={{ color: C.accent }}>
      {txt}
      <span style={{
        display: "inline-block", width: "2px", height: "0.85em",
        background: C.accent, marginLeft: 2, verticalAlign: "middle",
        animation: "blink 1s step-end infinite",
      }} />
    </span>
  );
}

/* StatBadge */
function Stat({ icon, val, label }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "clamp(8px,2vw,16px) clamp(12px,2.5vw,22px)",
      borderRadius: 14, background: "rgba(232,228,223,0.04)",
      border: `1px solid ${C.faint}`, gap: 4, flex: "1 1 80px",
      minWidth: 70,
    }}>
      <span style={{ fontSize: "clamp(14px,2vw,22px)" }}>{icon}</span>
      <span style={{
        fontSize: "clamp(16px,2.5vw,24px)", fontWeight: 800,
        fontFamily: "'Syne',sans-serif", color: C.accent, lineHeight: 1,
      }}>{val}</span>
      <span style={{ fontSize: "clamp(8px,1vw,11px)", opacity: 0.42, letterSpacing: "0.06em" }}>{label}</span>
    </div>
  );
}

/* SkillPill */
function SkillPill({ skill, visible, delay }) {
  const clr = CAT_COLORS[skill.cat] || C.accent;
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center",
        gap: "clamp(6px,1vw,12px)",
        padding: "clamp(8px,1.2vw,14px) clamp(8px,1.2vw,14px)",
        borderRadius: 12,
        background: hov ? "rgba(232,228,223,0.07)" : "rgba(232,228,223,0.04)",
        border: `1px solid ${hov ? "rgba(232,228,223,0.18)" : C.faint}`,
        opacity: visible ? 1 : 0,
        transform: visible ? (hov ? "translateY(-3px)" : "translateY(0)") : "translateY(16px)",
        boxShadow: hov ? "0 8px 20px rgba(0,0,0,0.25)" : "none",
        transition: `opacity .5s ease ${delay}ms, transform .5s ease ${delay}ms, box-shadow .2s, border-color .2s`,
        cursor: "default", minWidth: 0, width: "100%",
      }}
    >
      <div style={{
        width: "clamp(26px,3vw,36px)", height: "clamp(26px,3vw,36px)",
        borderRadius: 8, flexShrink: 0,
        background: clr + "22",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: skill.icon.length === 2 ? "clamp(9px,1.1vw,13px)" : "clamp(12px,1.5vw,18px)",
        color: clr, fontWeight: 700, fontFamily: "monospace",
      }}>{skill.icon}</div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{
          fontSize: "clamp(10px,1.1vw,13px)", fontWeight: 500, color: C.text,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{skill.name}</div>
        <div style={{ fontSize: "clamp(8px,0.85vw,11px)", color: clr, opacity: 0.75, textTransform: "capitalize", marginTop: 2 }}>
          {skill.cat}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   IMAGE CAROUSEL — absolute-positioned slides
   Each slide sits at inset:0 and fades/slides
   in/out independently, so width is always 100%
   of the container regardless of flex layout.
───────────────────────────────────────── */
function Carousel({ images, title }) {
  const [idx, setIdx]   = useState(0);
  const [prev2, setPrev] = useState(null); // previous index for exit animation
  const startX  = useRef(0);
  const touching = useRef(false);
  const len = images.length;

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setIdx(i => {
        const next = (i + 1) % len;
        setPrev(i);
        return next;
      });
    }, 3200);
    return () => clearInterval(timer);
  }, [len]);

  const goTo = useCallback((next, e) => {
    if (e) e.stopPropagation();
    setIdx(cur => { setPrev(cur); return (next + len) % len; });
  }, [len]);

  const onTouchStart = (e) => {
    startX.current  = e.touches[0].clientX;
    touching.current = true;
  };
  const onTouchEnd = (e) => {
    if (!touching.current) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0
        ? goTo(idx + 1)
        : goTo(idx - 1);
    }
    touching.current = false;
  };

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", userSelect: "none" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Render ALL slides stacked; show/hide via opacity + translate */}
      {images.map((src, i) => {
        const isActive = i === idx;
        const isExiting = i === prev2 && prev2 !== idx;
        return (
          <div
            key={i}
            style={{
              position: "absolute", inset: 0,
              opacity: isActive ? 1 : 0,
              transform: isActive
                ? "translateX(0)"
                : isExiting
                  ? "translateX(-8%)"
                  : "translateX(8%)",
              transition: isActive || isExiting
                ? "opacity 0.55s ease, transform 0.55s ease"
                : "none",
              pointerEvents: isActive ? "auto" : "none",
              zIndex: isActive ? 1 : 0,
            }}
          >
            <img
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        );
      })}

      {/* Arrows */}
      {len > 1 && (
        <>
          <button
            onClick={(e) => goTo(idx - 1, e)}
            aria-label="Previous image"
            style={{
              position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
              width: 32, height: 32, borderRadius: "50%",
              background: "rgba(10,10,15,0.72)", border: `1px solid rgba(232,228,223,0.22)`,
              color: C.text, cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: 18, zIndex: 10, lineHeight: 1,
              touchAction: "manipulation",
            }}
          >‹</button>
          <button
            onClick={(e) => goTo(idx + 1, e)}
            aria-label="Next image"
            style={{
              position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
              width: 32, height: 32, borderRadius: "50%",
              background: "rgba(10,10,15,0.72)", border: `1px solid rgba(232,228,223,0.22)`,
              color: C.text, cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: 18, zIndex: 10, lineHeight: 1,
              touchAction: "manipulation",
            }}
          >›</button>
        </>
      )}

      {/* Dots */}
      {len > 1 && (
        <div style={{
          position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: 5, zIndex: 10,
        }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => goTo(i, e)}
              aria-label={`Go to image ${i + 1}`}
              style={{
                width: i === idx ? 18 : 6, height: 6, borderRadius: 3,
                background: i === idx ? C.accent : "rgba(232,228,223,0.35)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "width .3s, background .3s",
                touchAction: "manipulation",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   PROJECT MODAL
───────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  const [visible, setVisible] = useState(false);
  const images = Array.isArray(project.image) ? project.image : [project.image];

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 260);
  }, [onClose]);

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: `rgba(6,6,14,${visible ? 0.88 : 0})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(12px,3vw,32px)",
        transition: "background .26s ease",
        overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: C.surface,
          border: `1px solid rgba(232,228,223,0.13)`,
          borderRadius: 20,
          width: "min(580px, 100%)",
          maxHeight: "calc(100dvh - 24px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.96)",
          transition: "opacity .26s ease, transform .26s ease",
          boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${project.color}22`,
        }}
      >
        {/* Modal Header */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "clamp(14px,2vw,18px) clamp(14px,2vw,20px) 0",
          gap: 12, flexShrink: 0,
        }}>
          <h3 style={{
            fontFamily: "'Syne',sans-serif", fontWeight: 700,
            fontSize: "clamp(14px,1.6vw,19px)", color: C.text, margin: 0, lineHeight: 1.2,
          }}>{project.title}</h3>
          <button
            onClick={handleClose}
            style={{
              width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
              background: "rgba(232,228,223,0.07)",
              border: `1px solid rgba(232,228,223,0.14)`,
              color: "rgba(232,228,223,0.7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: 15, lineHeight: 1,
              transition: "background .18s, color .18s",
            }}
            aria-label="Close modal"
          >✕</button>
        </div>

        {/* Scrollable Body */}
        <div style={{
          overflowY: "auto", flex: 1,
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(232,228,223,0.18) transparent",
        }}>
          {/* Image carousel */}
          <div style={{
            margin: "clamp(10px,2vw,16px) clamp(14px,2vw,20px) 0",
            borderRadius: 14,
            overflow: "hidden",
            background: "#0d0d1a",
            border: `1px solid ${C.faint}`,
            height: "clamp(180px,40vw,340px)",
            position: "relative",
          }}>
            <Carousel images={images} title={project.title} />
          </div>

          {/* Info */}
          <div style={{ padding: "clamp(14px,2vw,18px) clamp(14px,2vw,20px) clamp(20px,3vw,28px)" }}>
            <p style={{
              fontSize: "clamp(12px,1.1vw,14px)", color: C.muted,
              lineHeight: 1.78, margin: "0 0 14px",
            }}>{project.desc}</p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 5px", marginBottom: 22 }}>
              {project.tags.map((t) => (
                <span key={t} style={{
                  fontSize: "clamp(10px,0.9vw,12px)", padding: "4px 12px",
                  borderRadius: 999,
                  background: project.color + "1a",
                  color: project.color, fontWeight: 500,
                }}>{t}</span>
              ))}
            </div>

            {/* GitHub button */}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 9,
                padding: "clamp(10px,1.4vw,12px) clamp(20px,2vw,26px)", borderRadius: 999,
                background: project.color, color: "#0a0a0f",
                fontSize: "clamp(12px,1.1vw,14px)", fontWeight: 700,
                textDecoration: "none",
                transition: "transform .2s, box-shadow .2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.boxShadow = `0 10px 28px ${project.color}55`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <GHIcon size={16} />
              View on GitHub →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────── */
function ProjectCard({ project, delay }) {
  const [ref, inView] = useInView(0.06);
  const [hov, setHov]           = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen && (
        <ProjectModal project={project} onClose={() => setModalOpen(false)} />
      )}
      <div
        ref={ref}
        onClick={() => setModalOpen(true)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          borderRadius: 18, overflow: "hidden",
          display: "flex", flexDirection: "column",
          background: C.surface,
          border: `1px solid ${hov ? "rgba(232,228,223,0.14)" : C.faint}`,
          opacity: inView ? 1 : 0,
          transform: inView ? (hov ? "translateY(-5px)" : "translateY(0)") : "translateY(24px)",
          boxShadow: hov ? `0 20px 56px rgba(0,0,0,0.5), 0 0 0 1px ${project.color}28` : "none",
          transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms, box-shadow .3s, border-color .3s`,
          cursor: "pointer",
          height: "100%",
        }}
      >
        {/* Image */}
        <div style={{
          height: "clamp(140px,18vw,220px)",
          position: "relative", overflow: "hidden", background: "#0d0d1a",
          flexShrink: 0,
        }}>
          {/* Static first image on card — hover overlay */}
          <img
            src={project.image[0]}
            alt={project.title}
            loading="lazy"
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transform: hov ? "scale(1.06)" : "scale(1)",
              transition: "transform .5s ease",
              display: "block",
            }}
          />

          {/* Hover overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: hov ? "rgba(6,6,14,.72)" : "transparent",
            backdropFilter: hov ? "blur(4px)" : "none",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 10,
            opacity: hov ? 1 : 0,
            transition: "opacity .28s, background .28s",
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: project.color,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#0a0a0f", boxShadow: `0 6px 20px ${project.color}55`,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <span style={{
              padding: "7px 18px", borderRadius: 999,
              fontSize: "clamp(11px,1.1vw,13px)", fontWeight: 600,
              background: project.color, color: "#0a0a0f",
            }}>Preview Project →</span>
          </div>
        </div>

        {/* Body */}
        <div style={{
          padding: "clamp(12px,2vw,20px)",
          display: "flex", flexDirection: "column", flex: 1, gap: 10,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
            <h4 style={{
              fontSize: "clamp(13px,1.4vw,17px)", fontWeight: 700, color: C.text,
              margin: 0, fontFamily: "'Syne',sans-serif", lineHeight: 1.3,
            }}>{project.title}</h4>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                flexShrink: 0, width: 30, height: 30, borderRadius: "50%",
                border: `1px solid ${C.faint}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: C.text, opacity: 0.45,
                transition: "opacity .2s, border-color .2s, color .2s",
              }}
              onMouseEnter={e => {
                e.stopPropagation();
                e.currentTarget.style.opacity = 1;
                e.currentTarget.style.borderColor = project.color;
                e.currentTarget.style.color = project.color;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = 0.45;
                e.currentTarget.style.borderColor = C.faint;
                e.currentTarget.style.color = C.text;
              }}
            ><GHIcon size={14} /></a>
          </div>
          <p style={{
            fontSize: "clamp(11px,1.05vw,13px)", color: C.muted,
            lineHeight: 1.7, margin: 0, flex: 1,
          }}>
            {project.desc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {project.tags.map(t => (
              <span key={t} style={{
                fontSize: "clamp(9px,0.85vw,11px)", padding: "3px 9px", borderRadius: 999,
                background: project.color + "18", color: project.color, fontWeight: 500,
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* HeroBtn */
function HeroBtn({ href, children, primary }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "clamp(10px,1.2vw,14px) clamp(16px,2vw,28px)",
        borderRadius: 999,
        fontSize: "clamp(12px,1.1vw,14px)", fontWeight: 600, textDecoration: "none",
        background: primary ? (hov ? "#f5b07a" : C.accent) : "transparent",
        color: primary ? "#0a0a0f" : C.text,
        border: primary ? "none" : `1px solid rgba(232,228,223,${hov ? .35 : .2})`,
        transform: hov ? "scale(1.04)" : "scale(1)",
        boxShadow: primary && hov ? `0 8px 24px ${C.accent}55` : "none",
        transition: "all .2s ease", whiteSpace: "nowrap",
        touchAction: "manipulation",
      }}>{children}</a>
  );
}

/* SocialBtn */
function SocialBtn({ label, url, icon }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" title={label}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: "clamp(38px,4vw,44px)", height: "clamp(38px,4vw,44px)",
        borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: `1px solid ${hov ? "rgba(232,228,223,.3)" : C.faint}`,
        color: C.text, fontSize: "clamp(13px,1.5vw,18px)", fontWeight: 700,
        opacity: hov ? 1 : 0.38,
        transition: "opacity .2s, border-color .2s",
        textDecoration: "none",
        touchAction: "manipulation",
      }}>{icon}</a>
  );
}

/* ─────────────────────────────────────────
   MAIN
───────────────────────────────────────── */
export default function Home() {
  const bp = useBP();

  const [scrolled,  setScrolled]  = useState(false);
  const [heroVis,   setHeroVis]   = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVis(true), 80);
    const s = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", s, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", s); };
  }, []);

  // Close menu on resize to desktop
  useEffect(() => { if (!bp.mobile) setMenuOpen(false); }, [bp.mobile]);

  const [skillsRef,  skillsIn]  = useInView(0.04);
  const [contactRef, contactIn] = useInView(0.1);

  const anim = (d) => ({
    opacity:   heroVis ? 1 : 0,
    transform: heroVis ? "translateY(0)" : "translateY(22px)",
    transition: `opacity .7s ease ${d}ms, transform .7s ease ${d}ms`,
  });

  const NAV = ["About","Skills","Projects","Contact"];

  /* ── Responsive grid columns ── */
  const skillGrid = bp.xs || bp.sm
    ? "1fr 1fr"
    : bp.md
    ? "1fr 1fr 1fr"
    : bp.lg
    ? "repeat(3,1fr)"
    : "repeat(4,1fr)";

  const projGrid = bp.mobile ? "1fr" : "repeat(2,1fr)";

  /* ── Section padding ── */
  const secPad = bp.xs
    ? "40px 16px"
    : bp.sm
    ? "48px 20px"
    : bp.md
    ? "56px 28px"
    : bp.lg
    ? "72px 40px"
    : "88px 64px";

  const navH = bp.mobile ? "54px" : "64px";

  return (
    <div style={{
      background: C.bg, color: C.text,
      fontFamily: "'DM Sans',sans-serif",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>

      {/* ── Global CSS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 16px; }
        body { overflow-x: hidden; -webkit-text-size-adjust: 100%; }
        img  { display: block; max-width: 100%; }
        a    { text-decoration: none; }
        button { font-family: inherit; }

        @keyframes blobFloat {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(24px,-16px) scale(1.07); }
        }
        @keyframes blink {
          0%,100% { opacity:1; } 50% { opacity:0; }
        }
        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes menuIn {
          from { opacity:0; transform:translateY(-6px); }
          to   { opacity:1; transform:translateY(0); }
        }

        ::-webkit-scrollbar          { width: 5px; }
        ::-webkit-scrollbar-track    { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb    { background: rgba(232,228,223,.14); border-radius:3px; }

        /* Prevent tap highlight on touch */
        a, button { -webkit-tap-highlight-color: transparent; }

        /* Safe area for notched phones */
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          footer { padding-bottom: max(16px, env(safe-area-inset-bottom)); }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", inset: "0 0 auto 0", zIndex: 200,
        background: scrolled || menuOpen ? "rgba(10,10,15,.96)" : "rgba(10,10,15,.72)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: `1px solid ${scrolled ? "rgba(232,228,223,.1)" : "rgba(232,228,223,.05)"}`,
        transition: "background .3s, border-color .3s",
      }}>
        <div style={{
          maxWidth: 1140, margin: "0 auto",
          padding: `0 clamp(16px,3vw,40px)`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: navH,
        }}>
          <span style={{
            fontSize: "clamp(16px,2vw,20px)", fontWeight: 800,
            fontFamily: "'Syne',sans-serif", color: C.accent, letterSpacing: ".04em",
          }}>K.K.L</span>

          {/* Desktop links */}
          {!bp.mobile && (
            <div style={{ display: "flex", gap: "clamp(20px,2.5vw,36px)" }}>
              {NAV.map(l => (
                <a key={l} href={`#${l.toLowerCase()}`}
                  style={{ color: C.text, opacity: .55, fontSize: "clamp(12px,1.1vw,14px)", fontWeight: 400, transition: "opacity .2s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = .55}
                >{l}</a>
              ))}
            </div>
          )}

          {/* Hamburger */}
          {bp.mobile && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "8px", display: "flex", flexDirection: "column",
                gap: 5, touchAction: "manipulation",
              }}
            >
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: "block", width: 22, height: 2,
                  background: C.text, borderRadius: 2,
                  transition: "transform .25s, opacity .25s",
                  transform: menuOpen
                    ? i === 0 ? "translateY(7px) rotate(45deg)"
                    : i === 2 ? "translateY(-7px) rotate(-45deg)"
                    : "scaleX(0)" : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          )}
        </div>

        {/* Mobile menu */}
        {bp.mobile && menuOpen && (
          <div style={{
            borderTop: `1px solid ${C.faint}`,
            padding: "12px 20px clamp(16px,4vw,24px)",
            animation: "menuIn .2s ease",
          }}>
            {NAV.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block", padding: "13px 0",
                  color: C.text, fontSize: "clamp(14px,3.5vw,17px)", fontWeight: 500,
                  borderBottom: `1px solid ${C.faint}`, opacity: .8,
                }}>{l}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <header id="about" style={{
        position: "relative",
        paddingTop: `calc(${navH} + clamp(36px,6vw,72px))`,
        paddingBottom: `clamp(48px,8vw,100px)`,
        paddingLeft: `clamp(16px,5vw,64px)`,
        paddingRight: `clamp(16px,5vw,64px)`,
        overflow: "hidden",
        minHeight: `calc(${navH} + clamp(360px,50vw,600px))`,
      }}>
        {/* Blobs — scaled for mobile */}
        <Blob
          w="clamp(120px,35vw,380px)" h="clamp(120px,35vw,380px)"
          color={C.accent} top="0%" left="-8%"
        />
        <Blob
          w="clamp(100px,25vw,300px)" h="clamp(100px,25vw,300px)"
          color={C.teal} top="50%" right="-8%" delay="3s"
        />
        <Blob
          w="clamp(80px,18vw,200px)" h="clamp(80px,18vw,200px)"
          color={C.purple} bottom="5%" left="40%" delay="5.5s"
        />

        <div style={{ maxWidth: 720, position: "relative", zIndex: 10 }}>

          <p style={{
            ...anim(0),
            fontSize: "clamp(9px,1vw,12px)", letterSpacing: ".28em",
            textTransform: "uppercase", opacity: heroVis ? .44 : 0,
            marginBottom: "clamp(6px,1vw,14px)",
          }}>Full-Stack Developer</p>

          <h1 style={{
            ...anim(100),
            fontFamily: "'Syne',sans-serif", fontWeight: 800,
            fontSize: "clamp(1.7rem,5.5vw,3.8rem)",
            lineHeight: 1.06,
            background: `linear-gradient(120deg, ${C.text} 0%, ${C.accent} 50%, ${C.text} 100%)`,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 6s linear infinite",
            marginBottom: "clamp(8px,1.5vw,18px)",
          }}>Kaung Khant Lin</h1>

          <div style={{
            ...anim(200),
            display: "flex", alignItems: "center", flexWrap: "wrap",
            gap: 4, marginBottom: "clamp(16px,2.5vw,28px)",
            minHeight: "clamp(22px,3vw,36px)",
          }}>
            <span style={{ fontSize: "clamp(13px,1.8vw,18px)", fontWeight: 500, color: "rgba(232,228,223,.6)" }}>
              I build&nbsp;
            </span>
            <span style={{ fontSize: "clamp(13px,1.8vw,18px)", fontWeight: 500 }}>
              <Typewriter words={["web applications.","REST APIs.","AI-powered apps.","IoT systems.","reliable backend services."]} />
            </span>
          </div>

          {/* Bio card */}
          <div style={{
            ...anim(300),
            position: "relative", maxWidth: "min(520px, 100%)",
            padding: "clamp(12px,1.8vw,22px) clamp(14px,2vw,24px)",
            borderRadius: 16,
            background: "rgba(22,22,42,.72)",
            border: `1px solid ${C.faint}`,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            marginBottom: "clamp(18px,3vw,34px)",
          }}>
            <div style={{
              position: "absolute", left: 0, top: 14, bottom: 14,
              width: 3, borderRadius: "0 3px 3px 0",
              background: `linear-gradient(to bottom,${C.accent},${C.teal})`,
            }} />
            <p style={{
              fontSize: "clamp(12px,1.1vw,14px)",
              lineHeight: 1.78, color: "rgba(232,228,223,.7)", paddingLeft: 6,
            }}>
              A full-stack engineer passionate about crafting{" "}
              <strong style={{ color: C.text, fontWeight: 600 }}>scalable</strong>,{" "}
              <strong style={{ color: C.text, fontWeight: 600 }}>elegant products</strong> — turning
              complex problems into clean, beautiful solutions. Experienced across the full stack
              from databases to polished UIs.
            </p>
          </div>

          {/* Stats */}
          <div style={{
            ...anim(380),
            display: "flex", flexWrap: "wrap",
            gap: "clamp(6px,1.2vw,14px)",
            marginBottom: "clamp(18px,3vw,34px)",
          }}>
            <Stat icon="🚀" val="5+" label="PROJECTS" />
            <Stat icon="⚡" val="4+" label="LANGUAGES" />
            <Stat icon="🛠" val="12+" label="TOOLS" />
          </div>

          {/* CTA buttons */}
          <div style={{
            ...anim(460),
            display: "flex", gap: "clamp(8px,1.2vw,14px)",
            flexWrap: "wrap",
          }}>
            <HeroBtn href="#projects" primary>View Projects ↓</HeroBtn>
            <HeroBtn href="#contact">Get in Touch</HeroBtn>
          </div>
        </div>
      </header>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: secPad }}>
        <div ref={skillsRef} style={{ maxWidth: 1140, margin: "0 auto" }}>
          <p style={{
            fontSize: "clamp(9px,1vw,11px)", letterSpacing: ".26em",
            textTransform: "uppercase", opacity: .36, marginBottom: 6,
          }}>Expertise</p>
          <h3 style={{
            fontSize: "clamp(20px,3vw,30px)", fontWeight: 700,
            fontFamily: "'Syne',sans-serif", color: C.text,
            marginBottom: "clamp(20px,3.5vw,40px)",
          }}>Skills & Technologies</h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: skillGrid,
            gap: "clamp(7px,1.2vw,14px)",
          }}>
            {SKILLS.map((s, i) => (
              <SkillPill key={s.name} skill={s} visible={skillsIn} delay={i * 40} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: secPad, background: C.surface2 }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <p style={{
            fontSize: "clamp(9px,1vw,11px)", letterSpacing: ".26em",
            textTransform: "uppercase", opacity: .36, marginBottom: 6,
          }}>Portfolio</p>
          <h3 style={{
            fontSize: "clamp(20px,3vw,30px)", fontWeight: 700,
            fontFamily: "'Syne',sans-serif", color: C.text,
            marginBottom: "clamp(20px,3.5vw,40px)",
          }}>Featured Projects</h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: projGrid,
            gap: "clamp(12px,2vw,26px)",
            alignItems: "start",
          }}>
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} project={p} delay={i * 70} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: secPad }}>
        <div ref={contactRef} style={{
          maxWidth: 520, margin: "0 auto", textAlign: "center",
          opacity: contactIn ? 1 : 0,
          transform: contactIn ? "translateY(0)" : "translateY(20px)",
          transition: "opacity .7s ease, transform .7s ease",
          padding: `0 clamp(0px,2vw,16px)`,
        }}>
          <h2 style={{
            fontSize: "clamp(20px,3.5vw,32px)", fontWeight: 700,
            fontFamily: "'Syne',sans-serif", color: C.text, marginBottom: 12,
          }}>Let's Work Together</h2>
          <p style={{ opacity: .44, marginBottom: 28, fontSize: "clamp(12px,1.2vw,15px)", lineHeight: 1.65 }}>
            Have a project in mind? I'd love to hear about it.
          </p>
          <a
            href="mailto:kaungkhantlin2332003@gmail.com"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              flexWrap: "wrap", justifyContent: "center",
              padding: "clamp(11px,1.4vw,15px) clamp(14px,2.5vw,28px)",
              borderRadius: 999, fontSize: "clamp(11px,1.2vw,14px)", fontWeight: 600,
              background: C.accent, color: "#0a0a0f",
              transition: "transform .2s, box-shadow .2s",
              wordBreak: "break-all", maxWidth: "100%",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow = `0 10px 28px ${C.accent}55`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >✉ kaungkhantlin2332003@gmail.com</a>

          <div style={{
            display: "flex", justifyContent: "center",
            gap: "clamp(14px,2vw,22px)",
            marginTop: "clamp(24px,4vw,44px)",
          }}>
            <SocialBtn label="GitHub"   url="https://github.com/ARIESTANK"                           icon="⑂" />
            <SocialBtn label="LinkedIn" url="https://www.linkedin.com/in/kaung-khant-lin-792b13390/" icon="in" />
            <SocialBtn label="Twitter"  url="https://twitter.com/kaungkhantlin2332003"               icon="𝕏" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: "clamp(16px,2.5vw,24px) clamp(16px,4vw,24px)",
        textAlign: "center", fontSize: "clamp(10px,1vw,12px)",
        opacity: .26, borderTop: `1px solid rgba(232,228,223,.06)`,
      }}>
        © 2026 Kaung Khant Lin · ARIES. Crafted with care.
      </footer>
    </div>
  );
}