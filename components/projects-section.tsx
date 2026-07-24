"use client";
import { useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ExternalLink, GitFork, Folder } from "lucide-react";

// ── PROJECT DATA ──────────────────────────────────────────────

const PROJECTS = [
  {
    id: 4,
    title: "DevMind AI",
    description:
      "AI-powered coding assistant featuring context-aware chat, instant code debugging, step-by-step code explanation, and UI generation with live preview. Includes secure JWT authentication, saved history, code snippets, and a developer-optimized markdown interface.",
    tags: ["React", "Node.js", "AI", "JWT"],
    category: "AI",
    color: "#A855F7",
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    border: "rgba(168,85,247,0.25)",
    glow: "rgba(168,85,247,0.15)",
    live: "https://dev-mind-g46052c1l-muhammad-ammads-projects.vercel.app/",
    github: "https://github.com/ammad-muhammad/DevMind-Ai",
    featured: true,
    year: "2026",
  },
  {
    id: 1,
    title: "AI PitchCraft",
    description:
      "AI-powered startup pitch generator built during Saylani Hackathon. Transforms raw ideas into investor-ready pitches using Gemini AI. Features real-time saving, CRUD operations, and AI-generated landing page previews.",
    tags: ["React", "Firebase", "Gemini AI"],
    category: "AI",
    color: "#61DAFB",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    border: "rgba(97,218,251,0.25)",
    glow: "rgba(97,218,251,0.15)",
    live: "https://ai-pitchcraft.vercel.app",
    github: "https://github.com/ammad-muhammad/Hackathon-PitchCraft-AI-Startup-Partner-A",
    featured: true,
    year: "2024",
  },
  {
    id: 2,
    title: "Taxero Solution",
    description:
      "Professional responsive website for a client. Designed and implemented a clean interface highlighting company services, optimized for mobile and desktop with Bootstrap grid and cross-browser compatibility.",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    category: "Client",
    color: "#68A063",
    gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
    border: "rgba(104,160,99,0.25)",
    glow: "rgba(104,160,99,0.15)",
    live: "https://taxerosolution.com",
    github: "https://github.com/ammad-muhammad",
    featured: true,
    year: "2023",
  },
  {
    id: 3,
    title: "Personal Portfolio",
    description:
      "Responsive portfolio website built with HTML, CSS, JavaScript, and Bootstrap. Features CSS animations, smooth scrolling, form validation, and modern UI/UX practices.",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    category: "Portfolio",
    color: "#F7DF1E",
    gradient: "from-yellow-500/20 via-orange-500/10 to-transparent",
    border: "rgba(247,223,30,0.25)",
    glow: "rgba(247,223,30,0.15)",
    live: "https://ammmad-portfolio.netlify.app",
    github: "https://github.com/ammad-muhammad",
    featured: false,
    year: "2023",
  },
];

const FILTERS = ["All", "AI", "Client", "Portfolio", "Tool", "Clone"];

// ── 3D Tilt Card ─────────────────────────────────────────────

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 25,
  });
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{ perspective: 1000 }}
      className="group"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
          relative h-full rounded-2xl border overflow-hidden
          bg-gradient-to-br ${project.gradient}
          backdrop-blur-sm cursor-pointer
          transition-shadow duration-300
        `}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          borderColor: project.border,
          boxShadow: `0 4px 24px rgba(0,0,0,0.4)`,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onHoverStart={() => {
          if (cardRef.current) {
            cardRef.current.style.boxShadow = `0 0 0 1px ${project.border}, 0 8px 40px ${project.glow}, 0 0 80px ${project.glow}`;
          }
        }}
        onHoverEnd={() => {
          if (cardRef.current) {
            cardRef.current.style.boxShadow = `0 4px 24px rgba(0,0,0,0.4)`;
          }
        }}
      >
        {/* Glare effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.06) 0%, transparent 60%)`,
          }}
        />

        {/* Top glow blob */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: project.color }}
        />

        {/* Content */}
        <div className="relative z-10 p-6 flex flex-col h-full gap-4">

          {/* Top row */}
          <div className="flex items-start justify-between">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border"
              style={{
                background: `${project.color}15`,
                borderColor: `${project.color}30`,
              }}
            >
              <Folder size={18} style={{ color: project.color }} />
            </div>

            {/* Links */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg border border-white/10 text-white/50
                             hover:text-white hover:border-white/30
                             hover:bg-white/5 transition-all duration-150"
                >
                  <GitFork size={15} />
                </a>
              )}
              {project.live && project.live !== "#" && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg border text-white/80
                             hover:text-white transition-all duration-150"
                  style={{
                    borderColor: `${project.color}40`,
                    background: `${project.color}15`,
                  }}
                >
                  <ExternalLink size={15} style={{ color: project.color }} />
                </a>
              )}
            </div>
          </div>

          {/* Title + year */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              {project.featured && (
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                  style={{
                    color: project.color,
                    borderColor: `${project.color}40`,
                    background: `${project.color}15`,
                  }}
                >
                  FEATURED
                </span>
              )}
              <span className="text-white/25 text-xs">{project.year}</span>
            </div>
            <h3 className="text-white font-bold text-lg leading-tight">
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-white/50 text-sm leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{
                  color: project.color,
                  background: `${project.color}12`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Filter Button ────────────────────────────────────────────

function FilterBtn({
  label,
  active,
  onClick,
  count,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`
        relative px-4 py-2 rounded-xl text-sm font-semibold
        border transition-all duration-200 flex items-center gap-2
        ${
          active
            ? "text-[#030712] border-transparent"
            : "text-white/50 border-white/10 hover:text-white/80 hover:border-white/20"
        }
      `}
    >
      {active && (
        <motion.div
          layoutId="activeFilter"
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500"
          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        />
      )}
      <span className="relative z-10">{label}</span>
      <span
        className={`
          relative z-10 text-xs px-1.5 py-0.5 rounded-full font-bold
          ${active ? "bg-black/20 text-white" : "bg-white/10 text-white/40"}
        `}
      >
        {count}
      </span>
    </motion.button>
  );
}

// ── Main Section ─────────────────────────────────────────────

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  const getCount = (f: string) =>
    f === "All"
      ? PROJECTS.length
      : PROJECTS.filter((p) => p.category === f).length;

  return (
    <section
      id="projects"
      className="relative w-full bg-[#030712] overflow-hidden py-10"
    >
      {/* Bg glows */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-cyan-500/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-600/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-3"
        >
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
            03.
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Projects
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 to-transparent ml-4" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/40 text-base max-w-xl mb-10"
        >
          Things I&apos;ve built — from hackathons to client work.
        </motion.p>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {FILTERS.map((f) => (
            <FilterBtn
              key={f}
              label={f}
              active={activeFilter === f}
              onClick={() => setActiveFilter(f)}
              count={getCount(f)}
            />
          ))}
        </motion.div>

        {/* Cards grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-white/30"
          >
            <Folder size={40} className="mb-3 opacity-30" />
            <p className="text-sm">No projects in this category yet.</p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-14"
        >
          <a
            href="https://github.com/ammad-muhammad"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl
                       border border-white/15 text-white/60 text-sm font-semibold
                       hover:border-cyan-500/40 hover:text-cyan-400
                       hover:bg-cyan-500/5 transition-all duration-200"
          >
            <GitFork size={16} />
            View all on GitHub
          </a>
        </motion.div>

      </div>
    </section>
  );
}
