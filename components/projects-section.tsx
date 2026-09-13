"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUpRight, ExternalLink, GitFork, X, Info, Sparkles, CheckCircle2, UserCheck, Cpu } from "lucide-react";

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
    title: "Hirely",
    subtitle: "AI-Powered Job Search & Recruitment SaaS Platform",
    description:
      "Production-grade, full-stack recruitment SaaS platform connecting ambitious tech professionals with verified employers through AI candidate matching, automated ATS screening, verified skill assessments, and fraud-resistant employer verification.",
    fullOverview:
      "Hirely transforms the recruitment lifecycle into a high-signal, transparent ecosystem. Built with Next.js 14, Node.js/Express, MongoDB, Socket.io, and Groq Llama-3, it solves hiring friction with automated ATS resume auditing, AI cover letter drafting, timed anti-cheat skill assessments with verifiable badges, and intelligent auto-apply assistance. For employers, it delivers multi-step job posting with AI description polishing, verified business onboarding (NTN/Incorporation docs), candidate evaluation pipelines, and natural language AI talent search. Admins gain 30-day time-series executive analytics, automated fraud detection heuristics, and granular sub-admin permission management.",
    tags: [
      "Next.js 14",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Tailwind CSS",
      "Groq AI",
      "Playwright",
    ],
    category: "Full Stack",
    badge: "REAL PROJECT",
    image: "/hirely.png",
    color: "#111111",
    live: "https://hirely-ai-powered-job-platform.vercel.app/",
    github: "https://github.com/ammad-muhammad/Hirely---AI-powered-job-platform",
    featured: true,
    year: "2026",
    roles: [
      "Job Seeker: Dynamic profile builder, AI resume audit, AI cover letter generator, timed skill assessments & auto-apply assistant",
      "Employer: Multi-step job posting wizard, business verification (NTN/docs), candidate evaluation pipeline & AI talent assistant",
      "Admin: Executive 30-day time-series analytics, fraud detection engine, employer verification queue & sub-admin permissions",
    ],
    highlights: [
      "Role-Based Access Control (Job Seeker, Employer, Super Admin, Sub-Admin)",
      "Real-Time Bi-Directional Chat & Instant Notifications via Socket.io",
      "Groq Llama-3 AI Engine for ATS Resume Scoring & Cover Letter Drafting",
      "Timed Anti-Cheat Skill Assessments with Verifiable Badges",
      "Automated Heuristic Fraud Detection & Document Verification Workflows",
      "Playwright End-to-End Test Automation Suite (13 User Journeys)",
    ],
  },
  {
    id: 2,
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
      "Patient: 24/7 Booking, AI symptom checker & Rx explainer",
    ],
    highlights: [
      "Role-Based Access Control (Admin, Doctor, Receptionist, Patient)",
      "Department-Scoped Receptionist Queue & Daily Token Generation",
      "Structured Digital Prescriptions & Medical Record Linking",
      "Groq AI Server-Mediated Symptom Analysis & Rx Explainer",
      "Real-Time Socket.IO Doctor-Patient Messaging & AI Suggestions",
    ],
  },
  {
    id: 3,
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
      "Developer Markdown Syntax Highlighting",
    ],
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
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
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
      role="dialog"
      aria-modal="true"
      data-modal="true"
      data-project-modal="true"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl border border-gray-200 shadow-2xl text-gray-900 flex flex-col p-6 sm:p-8 gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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
      initial={{ opacity: 0, y: -50 }}
      animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
      transition={{
        duration: 1.1,
        delay: 0.95 + index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex flex-col gap-3"
    >
      {/* Editorial Image Container — Uncropped UI Screenshot */}
      <div
        onClick={() => onOpenDetails(project)}
        className="relative w-full aspect-[2.18/1] rounded-2xl overflow-hidden bg-gray-900 border border-gray-200 cursor-pointer shadow-sm"
      >
        {/* Top-Left Project Badge */}
        <span className="absolute top-3 left-3 z-20 px-3 py-0.5 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-extrabold tracking-wider uppercase text-gray-900 shadow-sm border border-gray-200/50">
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

        {/* Action Button Reveal */}
        <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <div className="px-5 py-2.5 rounded-full bg-black/90 backdrop-blur-md text-white font-bold text-xs flex items-center gap-2 border border-white/20 shadow-2xl transform scale-90 group-hover:scale-100 transition-all duration-300">
            <span>View Case Study</span>
            <ArrowUpRight size={14} className="text-gray-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
      className="relative w-full h-screen max-h-screen bg-white text-gray-900 overflow-hidden pt-4 sm:pt-6 pb-2 px-6 sm:px-12 lg:px-16 flex flex-col justify-start select-none"
    >
      <div
        style={{ maxWidth: "min(1100px, 85vw)" }}
        className="relative mx-auto w-full h-full flex flex-col justify-start"
      >
        
        {/* Step 1: Editorial Section Header (Always at Top) */}
        <div className="relative flex flex-col items-center justify-center mb-3 sm:mb-5 pt-1 shrink-0">
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
          transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between border-b border-gray-200 pb-2.5 mb-3 sm:mb-4 flex-wrap gap-3 shrink-0"
        >
          {/* Filter Pills Container */}
          <div className="flex items-center p-1 bg-gray-100/90 rounded-full border border-gray-200/80 shadow-inner">
            {FILTERS.map((f) => {
              const isActive = activeFilter === f;
              const count =
                f === "All"
                  ? PROJECTS.length
                  : f === "Real Project"
                  ? PROJECTS.filter((p) => p.badge === "REAL PROJECT").length
                  : PROJECTS.filter((p) => p.badge === "EXPLORATION").length;

              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-bold transition-colors duration-200 flex items-center gap-1.5 ${
                    isActive ? "text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectFilterPill"
                      className="absolute inset-0 bg-black rounded-full shadow-md"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{f}</span>
                  <span
                    className={`relative z-10 text-[10px] px-1.5 py-0.2 rounded-full font-extrabold transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-200/80 text-gray-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
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

        {/* Step 3: Scrollable Project Grid Container (2 cards fit cleanly on top, rest scroll smoothly below) */}
        <div
          data-scrollable-projects="true"
          className="projects-scroll-container flex-1 overflow-y-auto pr-1 pb-16"
          style={{ scrollbarWidth: "none" }}
        >
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
        .projects-scroll-container::-webkit-scrollbar {
          display: none;
        }
        @media (min-width: 1441px) {
          #projects > div {
            max-width: min(1300px, 85vw) !important;
            padding: 0 40px !important;
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
