"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import profilePic from "@/app/profile.png";

// ── Floating skill bubbles data ──────────────────────────────
const SKILLS = [
  { label: "React",      color: "#61DAFB", size: 52 },
  { label: "Next.js",    color: "#ffffff", size: 46 },
  { label: "TypeScript", color: "#3178C6", size: 44 },
  { label: "JavaScript", color: "#F7DF1E", size: 44 },
  { label: "Tailwind",   color: "#38BDF8", size: 48 },
  { label: "HTML5",      color: "#E34F26", size: 40 },
  { label: "CSS3",       color: "#1572B6", size: 40 },
  { label: "Node.js",    color: "#539E43", size: 42 },
  { label: "Express",    color: "#808080", size: 40 },
  { label: "MongoDB",    color: "#47A248", size: 44 },
  { label: "PostgreSQL", color: "#336791", size: 40 },
  { label: "Firebase",   color: "#FFCA28", size: 42 },
  { label: "Cloudinary", color: "#3448C5", size: 38 },
  { label: "Vercel",     color: "#ffffff", size: 40 },
  { label: "GitHub",     color: "#ffffff", size: 40 },
  { label: "Bootstrap",  color: "#7952B3", size: 44 },
  { label: "Docker",     color: "#2496ED", size: 38 },
  { label: "Redux",      color: "#764ABC", size: 38 },
];

// ── Stats ────────────────────────────────────────────────────
const STATS = [
  { value: "1",  label: "Years Experience" },
  { value: "5", label: "Projects Built"   },
  { value: "2",   label: "Certifications"   },
];

// ── Bubble component ─────────────────────────────────────────
function FloatingBubble({
  skill, index,
}: {
  skill: typeof SKILLS[0];
  index: number;
}) {
  const size = skill.size;
  // Horizontal spread, start below the section
  const startX = ((index * 137.5) % 90) + 5;
  const duration = 14 + (index % 6) * 3; // 14–32 seconds
  const delay = index * 0.5; // staggered start

  return (
    <motion.div
      className="absolute flex items-center justify-center rounded-full
                 border border-white/10 backdrop-blur-sm cursor-default select-none"
      style={{
        width: size,
        height: size,
        left: `${startX}%`,
        top: "105%", // start just below the section
        background: `radial-gradient(circle at 35% 35%, ${skill.color}22, ${skill.color}08)`,
        boxShadow: `0 0 12px ${skill.color}22, inset 0 0 8px ${skill.color}11`,
        fontSize: size < 44 ? "8px" : "9px",
      }}
      animate={{
        y: [0, -1400], // rise upward past the viewport
        x: [0, 18, -14, 10, -6, 0], // gentle wobble
        opacity: [0, 1, 1, 0], // fade in → visible → fade out
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      whileHover={{ scale: 1.25, zIndex: 10 }}
    >
      <span
        className="font-bold tracking-wide text-center leading-tight px-1"
        style={{ color: skill.color }}
      >
        {skill.label}
      </span>
    </motion.div>
  );
}

// ── Avatar placeholder ───────────────────────────────────────
function AvatarCard() {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -20, x: -60 }}
      whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative flex-shrink-0"
      style={{ perspective: 1000 }}
    >
      {/* Outer glow ring */}
      <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent blur-xl" />

      {/* Glass card */}
      <motion.div
        whileHover={{ rotateY: 6, rotateX: -4, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl overflow-hidden
                   border border-white/15
                   bg-gradient-to-br from-white/10 via-white/5 to-transparent
                   backdrop-blur-xl shadow-2xl shadow-black/40"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Inner shimmer */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-600/10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

        {/* Avatar illustration */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
          {/* Head */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400/80 to-blue-600/80
                            flex items-center justify-center shadow-lg shadow-cyan-500/30
                            border-2 border-cyan-400/30 overflow-hidden">
              <Image src={profilePic} alt="Muhammad Ammad" className="w-full h-full object-cover" />
            </div>
            {/* Online dot */}
            <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-400
                            border-2 border-[#030712] animate-pulse" />
          </div>

          {/* Name badge */}
          <div className="text-center">
            <p className="text-white font-bold text-lg tracking-wide" style={{ fontFamily: 'var(--font-acme)' }}>Muhammad Ammad</p>
            <p className="text-cyan-400 text-sm font-medium" style={{ fontFamily: 'var(--font-acme)' }}>Full Stack Developer</p>
          </div>

          {/* Mini code snippet */}
          <div className="w-full rounded-xl bg-black/40 border border-white/10 p-3 text-left">
            <p className="text-[10px] font-mono">
              <span className="text-purple-400">const </span>
              <span className="text-cyan-300">ammad</span>
              <span className="text-white"> = {"{"}</span>
            </p>
            <p className="text-[10px] font-mono pl-3">
              <span className="text-blue-300">passion</span>
              <span className="text-white">: </span>
              <span className="text-green-300">&quot;100%&quot;</span>
              <span className="text-white">,</span>
            </p>
            <p className="text-[10px] font-mono pl-3">
              <span className="text-blue-300">coffee</span>
              <span className="text-white">: </span>
              <span className="text-green-300">&quot;☕++&quot;</span>
              <span className="text-white">,</span>
            </p>
            <p className="text-[10px] font-mono pl-3">
              <span className="text-blue-300">status</span>
              <span className="text-white">: </span>
              <span className="text-yellow-300">&quot;Hiring&quot;</span>
            </p>
            <p className="text-[10px] font-mono">
              <span className="text-white">{"}"}</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Floating badge: location */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-4 -right-4 px-3 py-1.5 rounded-xl
                   bg-black/60 border border-white/15 backdrop-blur-xl
                   text-xs text-white/70 flex items-center gap-1.5 shadow-lg"
      >
        <span style={{ fontFamily: 'var(--font-acme)' }}>📍 Karachi, PK</span>
      </motion.div>

      {/* Floating badge: available */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -top-4 -right-6 px-3 py-1.5 rounded-xl
                   bg-black/60 border border-cyan-500/30 backdrop-blur-xl
                   text-xs text-cyan-400 flex items-center gap-1.5 shadow-lg"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span style={{ fontFamily: 'var(--font-acme)' }}>Open to work</span>
      </motion.div>
    </motion.div>
  );
}

// ── Main component ───────────────────────────────────────────
export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full bg-[#030712] overflow-hidden py-10"
    >
      {/* ── Floating skill bubbles background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {SKILLS.map((skill, i) => (
          <FloatingBubble
            key={skill.label}
            skill={skill}
            index={i}
          />
        ))}
      </div>

      {/* ── Radial gradient overlay so content is readable ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_30%,#030712_80%)] pointer-events-none" />

      {/* ── Section content ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">01.</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white" style={{ fontFamily: 'var(--font-nosifer)' }}>About Me</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 to-transparent ml-4" />
        </motion.div>

        {/* Main grid */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          {/* Left: Avatar */}
          <AvatarCard />

          {/* Right: Content */}
          <div className="flex-1 flex flex-col gap-6">

            {/* Paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative p-6 rounded-2xl border border-white/10
                         bg-white/[0.03] backdrop-blur-sm"
            >
              {/* Quote mark */}
              <span className="absolute -top-4 -left-2 text-6xl text-cyan-500/20 font-serif leading-none select-none">&ldquo;</span>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-acme)' }}>
                I started coding not because it was trending but because I wanted to{" "}
                <span className="text-white font-medium">build things that actually work.</span>{" "}
                From my first HTML page to building AI-powered apps at a hackathon, every line
                of code taught me something new. I&apos;m a Frontend Developer based in{" "}
                <span className="text-cyan-400 font-medium">Karachi, Pakistan,</span>{" "}
                currently deepening my full-stack skills at SMIT. I care about clean UI,
                smooth interactions, and code that makes sense to the next person who reads it.
                When I&apos;m not coding, I&apos;m probably exploring new tech,{" "}
                <span className="text-white font-medium">breaking things,</span>{" "}
                and figuring out why they broke.
              </p>
            </motion.div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(34,211,238,0.4)" }}
                  className="flex flex-col items-center justify-center gap-1 p-4 rounded-2xl
                             border border-white/10 bg-white/[0.03] backdrop-blur-sm
                             hover:bg-cyan-500/5 transition-all duration-300 cursor-default"
                >
                  <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-b from-cyan-300 to-blue-500 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                  <span className="text-white/50 text-xs sm:text-sm text-center" style={{ fontFamily: 'var(--font-acme)' }}>{stat.label}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-3 mt-2"
            >
              <a
                href="#projects"
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600
                           text-white text-sm font-semibold rounded-xl
                           hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25
                           transition-all duration-200"
              >
                <span style={{ fontFamily: 'var(--font-acme)' }}>See My Projects</span>
              </a>
              <a
                href="mailto:official.muhammadammad@gmail.com"
                className="px-6 py-3 border border-white/20 text-white/80 text-sm
                           font-semibold rounded-xl hover:border-cyan-500/60
                           hover:text-cyan-400 hover:bg-white/5 transition-all duration-200"
              >
                <span style={{ fontFamily: 'var(--font-acme)' }}>Get In Touch</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
