"use client";
import { useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ExternalLink,
  GitFork,
  Folder,
  Sparkles,
  Activity,
  ShieldCheck,
  CheckCircle2,
  X,
  Info,
  Layers,
  Cpu,
  UserCheck,
  FileText,
  MessageSquare,
  Stethoscope,
} from "lucide-react";

// ── PROJECT DATA ──────────────────────────────────────────────

interface ProjectItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  fullOverview: string;
  tags: string[];
  category: "Full Stack" | "AI" | "Client";
  color: string;
  gradient: string;
  border: string;
  glow: string;
  live: string;
  github: string;
  featured: boolean;
  year: string;
  highlights: string[];
  roles?: string[];
}

const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    title: "ClinicAI",
    subtitle: "AI-Powered Clinic Management & Smart Clinical Assistance Platform",
    description:
      "Full-stack clinical SaaS platform unifying multi-department appointment queues (Q-001 daily tokens), digital prescribing, real-time Socket.IO chat, and Groq AI assistance.",
    fullOverview:
      "ClinicAI is a modern, full-stack clinic management ecosystem designed to streamline outpatient operations, eliminate paper queues, and empower physicians and patients with intelligent AI capabilities. It includes role-based portals for Admins, Doctors, Receptionists, and Patients, automated per-doctor daily queue token assignment, structured digital prescribing, real-time Socket.IO notifications, and server-mediated Groq AI for non-diagnostic symptom analysis and patient prescription explanations.",
    tags: ["Next.js 16", "React 19", "Express.js", "MongoDB", "Groq AI", "Socket.IO"],
    category: "Full Stack",
    color: "#22D3EE",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    border: "rgba(34,211,238,0.35)",
    glow: "rgba(34,211,238,0.2)",
    live: "https://clinic-ai-git-main-muhammad-ammads-projects.vercel.app/",
    github: "https://github.com/ammad-muhammad/Clinic_AI",
    featured: true,
    year: "2026",
    roles: [
      "Admin: Global staff provisioning, audit logs & analytics",
      "Doctor: Consultation queue, digital Rx & AI draft reply",
      "Receptionist: Department-scoped scheduling & token generation (Q-001)",
      "Patient: 24/7 Booking, AI symptom checker & Rx explainer"
    ],
    highlights: [
      "Role-Based Access Control (Admin, Doctor, Receptionist, Patient)",
      "Department-Scoped Receptionist Queue & Daily Token Generation",
      "Structured Digital Prescriptions & Medical Record Linking",
      "Groq AI Server-Mediated Symptom Analysis & Rx Explainer",
      "Real-Time Socket.IO Doctor-Patient Messaging & AI Suggestions"
    ]
  },
  {
    id: 2,
    title: "DevMind AI",
    subtitle: "Context-Aware AI Coding Assistant & Developer Workbench",
    description:
      "AI coding platform featuring real-time code debugging, step-by-step code explanation, live UI component previews, and developer markdown interface.",
    fullOverview:
      "DevMind AI is a full-featured developer workbench powered by AI. It assists developers with real-time code debugging, interactive UI component generation with live previews, saved chat session history, JWT user authentication, and a sleek markdown interface optimized for code snippets.",
    tags: ["React", "Node.js", "Gemini AI", "JWT", "Express"],
    category: "AI",
    color: "#A855F7",
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    border: "rgba(168,85,247,0.3)",
    glow: "rgba(168,85,247,0.18)",
    live: "https://dev-mind-g46052c1l-muhammad-ammads-projects.vercel.app/",
    github: "https://github.com/ammad-muhammad/DevMind-Ai",
    featured: true,
    year: "2026",
    highlights: [
      "Context-Aware Code Debugging & Explanation",
      "Interactive UI Component Generation & Live Preview",
      "Secure JWT User Authentication & Saved History",
      "Developer Markdown Syntax Highlighting"
    ]
  },
];

const FILTERS = ["All", "Full Stack", "AI"];

// ── Project Card ─────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  onOpenDetails,
}: {
  project: ProjectItem;
  index: number;
  onOpenDetails: (project: ProjectItem) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 25,
  });
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
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
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{ perspective: 1000 }}
      className="group transform-gpu h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
          relative h-full rounded-2xl border overflow-hidden flex flex-col justify-between
          bg-[#060b18]/90 bg-gradient-to-br ${project.gradient}
          cursor-pointer transition-all duration-300
        `}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          borderColor: project.border,
          boxShadow: `0 8px 24px rgba(0,0,0,0.4)`,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onHoverStart={() => {
          if (cardRef.current) {
            cardRef.current.style.boxShadow = `0 0 0 1px ${project.border}, 0 10px 40px ${project.glow}`;
          }
        }}
        onHoverEnd={() => {
          if (cardRef.current) {
            cardRef.current.style.boxShadow = `0 8px 24px rgba(0,0,0,0.4)`;
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

        {/* Top background radial glow */}
        <div
          className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: project.color }}
        />

        {/* Main Content */}
        <div className="relative z-10 p-6 flex flex-col justify-between flex-1 gap-5">

          {/* Top Info Bar */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-md"
                style={{
                  background: `${project.color}15`,
                  borderColor: `${project.color}35`,
                }}
              >
                {project.id === 1 ? (
                  <Stethoscope size={18} style={{ color: project.color }} />
                ) : (
                  <Folder size={18} style={{ color: project.color }} />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  {project.featured && (
                    <span
                      className="text-[10px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider"
                      style={{
                        color: project.color,
                        borderColor: `${project.color}40`,
                        background: `${project.color}15`,
                      }}
                    >
                      FEATURED
                    </span>
                  )}
                  <span className="text-white/35 font-mono text-xs">{project.year}</span>
                </div>
                <h3 className="text-white font-extrabold text-xl tracking-tight mt-0.5">
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Quick Link Icons */}
            <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="GitHub Repository"
                  className="p-2 rounded-lg border border-white/10 text-white/60
                             hover:text-white hover:border-cyan-400/40 hover:bg-cyan-500/10
                             transition-all duration-150"
                >
                  <GitFork size={15} />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Live Demo"
                  className="p-2 rounded-lg border text-white/80 transition-all duration-150"
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

          {/* Subtitle & Description */}
          <div className="space-y-2 flex-1">
            <p className="text-cyan-300/90 font-medium text-xs sm:text-sm leading-snug">
              {project.subtitle}
            </p>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Tech Tag Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-0.5 rounded-full font-medium border"
                style={{
                  color: project.color,
                  borderColor: `${project.color}25`,
                  background: `${project.color}10`,
                }}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full text-white/40 border border-white/10">
                +{project.tags.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Bottom Card Action Bar */}
        <div className="relative z-10 px-6 py-3 border-t border-white/8 bg-black/20 flex items-center justify-between">
          <button
            onClick={() => onOpenDetails(project)}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
          >
            <Info size={14} />
            <span>Full Specs & Details</span>
          </button>

          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-bold text-white/80 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Live Demo</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Project Details Modal Popup ──────────────────────────────

function ProjectDetailsModal({
  project,
  onClose,
}: {
  project: ProjectItem;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-lenis-prevent
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative max-w-2xl w-full bg-[#080d1a] border rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[85vh] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ borderColor: project.border }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Top Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg"
            style={{
              background: `${project.color}20`,
              borderColor: `${project.color}40`,
            }}
          >
            {project.id === 1 ? (
              <Stethoscope size={24} style={{ color: project.color }} />
            ) : (
              <Folder size={24} style={{ color: project.color }} />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase"
                style={{
                  color: project.color,
                  borderColor: `${project.color}40`,
                  background: `${project.color}15`,
                }}
              >
                {project.category}
              </span>
              <span className="text-white/40 font-mono text-xs">{project.year}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-cyan-300 font-medium text-sm sm:text-base mb-6">
          {project.subtitle}
        </p>

        {/* Full Overview Paragraph */}
        <div className="mb-6 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 flex items-center gap-1.5">
            <Layers size={14} className="text-cyan-400" /> System Overview
          </h4>
          <p className="text-white/80 text-sm leading-relaxed bg-white/[0.03] border border-white/8 rounded-2xl p-4">
            {project.fullOverview}
          </p>
        </div>

        {/* Role Breakdown (if present) */}
        {project.roles && (
          <div className="mb-6 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 flex items-center gap-1.5">
              <UserCheck size={14} className="text-cyan-400" /> Role & Access Model
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {project.roles.map((r, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-white/80 bg-white/[0.02] border border-white/5 p-2.5 rounded-xl">
                  <ShieldCheck size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Features List */}
        <div className="mb-6 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 flex items-center gap-1.5">
            <Sparkles size={14} className="text-cyan-400" /> Key Feature Highlights
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-white/80 bg-white/[0.02] border border-white/5 p-2.5 rounded-xl">
                <CheckCircle2 size={14} className="text-cyan-400 flex-shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Tech Stack */}
        <div className="mb-8 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 flex items-center gap-1.5">
            <Cpu size={14} className="text-cyan-400" /> Technology Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full font-semibold border"
                style={{
                  color: project.color,
                  borderColor: `${project.color}35`,
                  background: `${project.color}15`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom CTA Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-white/10">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-white/80 hover:text-white hover:border-white/30 text-xs font-semibold transition-all"
            >
              <GitFork size={15} />
              <span>GitHub Repository</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${project.color}, #2563eb)`,
              }}
            >
              <span>Launch Live App</span>
              <ExternalLink size={15} />
            </a>
          )}
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
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

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
      className="relative w-full bg-[#030712] overflow-hidden py-16 sm:py-24"
    >
      {/* Background glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
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
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Featured Projects
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 to-transparent ml-4" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/50 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed"
        >
          Production-grade AI applications and full-stack web platforms engineered with Next.js, Express, MongoDB, and Groq AI.
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

        {/* Balanced Grid Cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpenDetails={(p) => setSelectedProject(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-16"
        >
          <a
            href="https://github.com/ammad-muhammad"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl
                       border border-cyan-500/30 text-cyan-300 text-sm font-semibold
                       hover:border-cyan-400 hover:text-white hover:bg-cyan-500/10
                       transition-all duration-200 shadow-lg shadow-cyan-500/10"
          >
            <GitFork size={18} />
            Explore More Repositories on GitHub
          </a>
        </motion.div>

      </div>

      {/* Interactive Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}


