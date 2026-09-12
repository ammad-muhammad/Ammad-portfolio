"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUpRight, ExternalLink, GitFork, X, Info, Layers, UserCheck, ShieldCheck, Sparkles, CheckCircle2, Cpu } from "lucide-react";

// ── PROJECT DATA ──────────────────────────────────────────────

export interface ProjectItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  fullOverview: string;
  tags: string[];
  category: "Full Stack" | "AI";
  badge: "REAL PROJECT" | "EXPLORATION";
  image: string;
  color: string;
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
    subtitle: "Smart Clinical SaaS Platform",
    description:
      "Full-stack clinical SaaS platform unifying multi-department appointment queues (Q-001 daily tokens), digital prescribing, real-time Socket.IO chat, and Groq AI assistance.",
    fullOverview:
      "ClinicAI is a modern, full-stack clinic management ecosystem designed to streamline outpatient operations, eliminate paper queues, and empower physicians and patients with intelligent AI capabilities. It includes role-based portals for Admins, Doctors, Receptionists, and Patients, automated per-doctor daily queue token assignment, structured digital prescribing, real-time Socket.IO notifications, and server-mediated Groq AI for non-diagnostic symptom analysis and patient prescription explanations.",
    tags: ["Next.js 16", "React 19", "Express.js", "MongoDB", "Groq AI", "Socket.IO"],
    category: "Full Stack",
    badge: "REAL PROJECT",
    image: "/clinicai.png",
    color: "#111111",
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
    subtitle: "AI Coding Assistant & Developer Workbench",
    description:
      "AI coding platform featuring real-time code debugging, step-by-step code explanation, live UI component previews, and developer markdown interface.",
    fullOverview:
      "DevMind AI is a full-featured developer workbench powered by AI. It assists developers with real-time code debugging, interactive UI component generation with live previews, saved chat session history, JWT user authentication, and a sleek markdown interface optimized for code snippets.",
    tags: ["React", "Node.js", "Gemini AI", "JWT", "Express"],
    category: "AI",
    badge: "EXPLORATION",
    image: "/devmindai.png",
    color: "#111111",
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

const FILTERS = ["All", "Real Project", "Exploration"];

// ── Project Details Modal ──────────────────────────────────────

function ProjectDetailsModal({
  project,
  onClose,
}: {
  project: ProjectItem;
  onClose: () => void;
}) {
  const lenis = useLenis();

  useEffect(() => {
    lenis?.stop();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lenis, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl border border-gray-200 shadow-2xl text-gray-900 flex flex-col p-6 sm:p-8 gap-6"
        style={{ scrollbarWidth: "thin" }}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-black text-white">
                {project.badge}
              </span>
              <span className="text-xs text-gray-400 font-semibold">{project.year}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
              {project.title}
            </h2>
            <p className="text-sm font-semibold text-gray-500">{project.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition-colors text-gray-700 shrink-0"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Screenshot Banner */}
        <div className="w-full aspect-[16/9] max-h-[300px] rounded-2xl overflow-hidden bg-gray-900 border border-gray-200 shadow-inner relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Project Full Overview */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900">
            <Sparkles size={14} />
            <span>Architecture & Overview</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
            {project.fullOverview}
          </p>
        </div>

        {/* Key Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Key Features & Engineering Highlights</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.highlights.map((highlight, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-700 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-1.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Roles Breakdown (if available) */}
        {project.roles && project.roles.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900">
              <UserCheck size={14} className="text-blue-600" />
              <span>Multi-Role User Portals</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {project.roles.map((role, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-700 font-medium"
                >
                  <span className="font-bold text-black">{role.split(":")[0]}:</span>
                  <span>{role.split(":")[1]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900">
            <Cpu size={14} />
            <span>Technologies & Stack</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold border border-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 text-xs font-bold text-gray-800 hover:border-black hover:text-black transition-colors"
          >
            <GitFork size={14} />
            <span>Source Code</span>
          </a>

          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-gray-800 transition-colors shadow-md"
          >
            <span>Live Deployment</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Single Project Card ────────────────────────────────────────

function ProjectCard({
  project,
  index,
  isSectionActive,
  onOpenDetails,
}: {
  project: ProjectItem;
  index: number;
  isSectionActive: boolean;
  onOpenDetails: (project: ProjectItem) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -70 }}
      animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -70 }}
      transition={{
        duration: 1.4,
        delay: 1.25,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex flex-col gap-3"
    >
      {/* Editorial Image Container — Uncropped UI Screenshot */}
      <div
        onClick={() => onOpenDetails(project)}
        className="relative w-full max-h-[34vh] sm:max-h-[38vh] aspect-[16/10] rounded-2xl overflow-hidden bg-gray-900 border border-gray-200 cursor-pointer shadow-sm"
      >
        {/* Top-Left Project Badge */}
        <span className="absolute top-3.5 left-3.5 z-20 px-3.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-extrabold tracking-wider uppercase text-gray-900 shadow-sm border border-gray-200/50">
          {project.badge}
        </span>

        {/* Project Preview Image */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Dark Hover Overlay */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

        {/* Circular Action Button Reveal */}
        <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-white text-black font-bold text-xs flex flex-row items-center justify-center gap-1 shadow-2xl transition-transform duration-200">
            <span>VIEW</span>
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>

      {/* Project Title & Metadata Below Image */}
      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-start justify-between gap-3">
          <h3
            onClick={() => onOpenDetails(project)}
            className="text-base sm:text-lg font-bold text-gray-900 tracking-tight leading-snug group-hover:text-black transition-colors cursor-pointer"
          >
            {project.title} — {project.subtitle}
          </h3>
          <button
            onClick={() => onOpenDetails(project)}
            className="p-1.5 rounded-full border border-gray-200 text-gray-500 hover:text-black hover:border-black transition-colors shrink-0"
            aria-label="View Details"
          >
            <Info size={14} />
          </button>
        </div>

        {/* Sub-row: Tags / Metadata */}
        <div className="flex items-center justify-between text-xs text-gray-500 font-medium pt-0.5">
          <span>{project.category}</span>
          <div className="flex items-center gap-1.5">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span key={tag}>
                {tag}{i < 2 && i < project.tags.slice(0, 3).length - 1 ? " · " : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Projects Section ─────────────────────────────────────

export function ProjectsSection({
  isSectionActive = false,
}: {
  isSectionActive?: boolean;
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) =>
          activeFilter === "Real Project"
            ? p.badge === "REAL PROJECT"
            : p.badge === "EXPLORATION"
        );

  return (
    <section
      id="projects"
      className="relative w-full h-screen max-h-screen bg-white text-gray-900 overflow-hidden pt-4 sm:pt-6 pb-4 px-6 sm:px-12 lg:px-16 flex flex-col justify-center select-none"
    >
      <div
        style={{ maxWidth: "min(1100px, 85vw)" }}
        className="relative mx-auto w-full flex flex-col justify-center"
      >
        
        {/* Step 1: Editorial Section Header */}
        <div className="relative flex flex-col items-center justify-center mb-5 sm:mb-7 pt-2">
          {/* 1. Watermark Background Text */}
          <motion.span
            initial={{ opacity: 0, y: -70 }}
            animate={isSectionActive ? { opacity: 0.25, y: 0 } : { opacity: 0, y: -70 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray-300 font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-[0.2em] uppercase select-none pointer-events-none text-center"
          >
            PORTFOLIO
          </motion.span>

          {/* 2. Foreground Title */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 -mt-6 sm:-mt-9"
          >
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 tracking-wider uppercase text-center">
              /SELECTED WORK
            </h2>
          </motion.div>
        </div>

        {/* Step 2: Filter Navigation Row */}
        <motion.div
          initial={{ opacity: 0, y: -35 }}
          animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -35 }}
          transition={{ duration: 1.1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4 sm:mb-5 flex-wrap gap-3"
        >
          {/* Filter Pills */}
          <div className="flex items-center gap-6">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs sm:text-sm font-bold tracking-wide transition-colors duration-150 relative py-1 ${
                  activeFilter === f
                    ? "text-black"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {f}
                {activeFilter === f && (
                  <motion.div
                    layoutId="activeProjectFilter"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right Action Link */}
          <a
            href="https://github.com/ammad-muhammad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-bold text-gray-800 hover:border-black hover:text-black transition-all shadow-sm"
          >
            <span>View All Work</span>
            <ArrowUpRight size={13} />
          </a>
        </motion.div>

        {/* Step 3: Project Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isSectionActive={isSectionActive}
                onOpenDetails={(p) => setSelectedProject(p)}
              />
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Project Specs Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 1441px) {
          #projects > div {
            max-width: min(1300px, 85vw) !important;
            padding: 0 40px !important;
          }
          #projects .projects-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 24px !important;
          }
        }
        @media (min-width: 2000px) {
          #projects > div {
            max-width: min(1600px, 80vw) !important;
          }
        }
      `}</style>
    </section>
  );
}
