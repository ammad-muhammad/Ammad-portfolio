"use client";
import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  Calendar,
} from "lucide-react";

// ── DATA ──────────────────────────────────────────────────────

const EXPERIENCE = [
  {
    id: 1,
    type: "work",
    role: "Backend PHP Laravel Intern",
    company: "JoeyCo Logitech Pvt. Ltd",
    location: "Karachi, Pakistan",
    period: "Feb 2023 – Mar 2023",
    duration: "2 months",
    color: "#61DAFB",
    gradient: "from-cyan-500/15 via-blue-500/8 to-transparent",
    border: "rgba(97,218,251,0.2)",
    glow: "rgba(97,218,251,0.12)",
    icon: "🏢",
    front: {
      title: "Backend PHP Laravel Intern",
      company: "JoeyCo Logitech Pvt. Ltd",
      period: "Feb 2023 – Mar 2023",
      tags: ["PHP", "Laravel", "MySQL", "Web Dev"],
    },
    back: {
      points: [
        "Worked on various backend projects gaining real-world web dev experience",
        "Collaborated with skilled developers on robust & scalable web applications",
        "Contributed to backend architecture and database design",
        "Learned professional development workflows and team collaboration",
      ],
    },
  },
  {
    id: 2,
    type: "work",
    role: "Frontend & Backend Developer",
    company: "Software House",
    location: "Karachi, Pakistan",
    period: "Mar 2023 – Aug 2023",
    duration: "6 months",
    color: "#68A063",
    gradient: "from-green-500/15 via-emerald-500/8 to-transparent",
    border: "rgba(104,160,99,0.2)",
    glow: "rgba(104,160,99,0.12)",
    icon: "💻",
    front: {
      title: "Frontend & Backend Developer",
      company: "Software House",
      period: "Mar 2023 – Aug 2023",
      tags: ["Laravel", "React", "Bootstrap", "MySQL", "jQuery"],
    },
    back: {
      points: [
        "Built responsive UIs using HTML, CSS, Bootstrap and JavaScript",
        "Developed backend functionalities using Laravel PHP framework",
        "Worked with MySQL — optimized queries and data validation",
        "Collaborated with designers to integrate UI/UX concepts into code",
      ],
    },
  },
];

const EDUCATION = [
  {
    id: 1,
    degree: "Bachelors in Computer Science",
    institution: "Federal Urdu University of Arts, Science & Technology",
    period: "Mar 2022 – Present",
    status: "Ongoing",
    color: "#7952B3",
    icon: "🎓",
    tags: ["Computer Science", "Programming", "Data Structures"],
  },
];

const CERTIFICATIONS = [
  {
    id: 1,
    title: "Front End Development",
    issuer: "Jawan Pakistan Institute",
    period: "Nov 2022 – Feb 2023",
    color: "#F7DF1E",
    icon: "🏅",
    skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "Firebase", "GitHub"],
    status: "Completed",
  },
  {
    id: 2,
    title: "Web & Mobile App Development (Full Stack)",
    issuer: "Saylani Mass IT Training (SMIT)",
    period: "Sep 2024 – Feb 2026",
    color: "#61DAFB",
    icon: "🚀",
    skills: ["React", "Node.js", "Express.js", "Firebase", "MongoDB"],
    status: "Completed",
  },
];

// ── Flip Card ─────────────────────────────────────────────────

function ExperienceCard({
  item,
  index,
  side,
}: {
  item: (typeof EXPERIENCE)[0];
  index: number;
  side: "left" | "right";
}) {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, x: side === "left" ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
        layout: { duration: 0.4, ease: "easeInOut" }
      }}
      className="relative w-full"
      style={{ perspective: 1200 }}
    >
      {/* Flip container */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={() => setFlipped(!flipped)}
        className="relative w-full cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div
          className={`${
            flipped ? "absolute inset-0 pointer-events-none" : "relative w-full"
          } rounded-2xl border p-6 flex flex-col gap-4 overflow-hidden`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: `rgba(255,255,255,0.03)`,
            borderColor: item.border,
            boxShadow: `0 4px 24px rgba(0,0,0,0.3), 0 0 40px ${item.glow}`,
          }}
        >
          {/* Glow blob */}
          <div
            className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: item.color }}
          />

          {/* Header */}
          <div className="flex items-start justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl border flex-shrink-0"
                style={{
                  background: `${item.color}15`,
                  borderColor: `${item.color}30`,
                }}
              >
                {item.icon}
              </div>
              <div>
                <h3 className="text-white font-bold text-base leading-tight">
                  {item.front.title}
                </h3>
                <p
                  className="font-semibold text-sm mt-0.5"
                  style={{ color: item.color }}
                >
                  {item.front.company}
                </p>
              </div>
            </div>
            <span
              className="text-xs px-2 py-1 rounded-lg border flex-shrink-0 font-medium"
              style={{
                color: item.color,
                borderColor: `${item.color}30`,
                background: `${item.color}12`,
              }}
            >
              {item.duration}
            </span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-3 text-xs text-white/40 relative z-10">
            <span className="flex items-center gap-1">
              <Calendar size={11} /> {item.front.period}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={11} /> {item.location}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 relative z-10">
            {item.front.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ color: item.color, background: `${item.color}12` }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Flip hint */}
          <div className="mt-auto pt-2 flex justify-end text-white/20 text-xs items-center gap-1">
            <span>Tap for details</span>
            <span className="text-base">↩</span>
          </div>
        </div>

        {/* BACK */}
        <div
          className={`${
            flipped ? "relative w-full" : "absolute inset-0 pointer-events-none"
          } rounded-2xl border p-6 flex flex-col gap-4 overflow-hidden`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "rgba(255,255,255,0.03)",
            borderColor: item.border,
            boxShadow: `0 4px 24px rgba(0,0,0,0.3)`,
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Briefcase size={14} style={{ color: item.color }} />
            <span className="font-bold text-sm" style={{ color: item.color }}>
              What I did
            </span>
          </div>
          <ul className="flex flex-col gap-3 flex-1">
            {item.back.points.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-white/65 text-sm leading-relaxed"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ background: item.color }}
                />
                {point}
              </li>
            ))}
          </ul>
          <div className="text-white/20 text-xs text-right">
            Tap to flip back ↩
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Timeline Line ─────────────────────────────────────────────

function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={ref}
      className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/5 hidden lg:block"
    >
      <motion.div
        className="w-full origin-top rounded-full"
        style={{
          height,
          background:
            "linear-gradient(to bottom, #22d3ee, #3b82f6, #7c3aed)",
          boxShadow: "0 0 8px rgba(34,211,238,0.4)",
        }}
      />
    </div>
  );
}

// ── Certification Card ────────────────────────────────────────

function CertCard({
  cert,
  index,
}: {
  cert: (typeof CERTIFICATIONS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative p-5 rounded-2xl border overflow-hidden"
      style={{
        borderColor: `${cert.color}25`,
        background: `${cert.color}08`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.25)`,
      }}
    >
      {/* Glow */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none"
        style={{ background: cert.color }}
      />

      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{cert.icon}</span>
            <div>
              <h4 className="text-white font-bold text-sm leading-tight">
                {cert.title}
              </h4>
              <p className="text-sm mt-0.5" style={{ color: cert.color }}>
                {cert.issuer}
              </p>
            </div>
          </div>
          <span
            className="text-xs px-2 py-0.5 rounded-full border font-semibold flex-shrink-0"
            style={{
              color:
                cert.status === "Ongoing" ? "#68A063" : cert.color,
              borderColor:
                cert.status === "Ongoing"
                  ? "rgba(104,160,99,0.3)"
                  : `${cert.color}30`,
              background:
                cert.status === "Ongoing"
                  ? "rgba(104,160,99,0.1)"
                  : `${cert.color}10`,
            }}
          >
            {cert.status === "Ongoing" ? "🟢 Ongoing" : "✅ Done"}
          </span>
        </div>

        <div className="flex items-center gap-1 text-white/35 text-xs">
          <Calendar size={10} /> {cert.period}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {cert.skills.map((s) => (
            <span
              key={s}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ color: cert.color, background: `${cert.color}12` }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative w-full bg-[#030712] overflow-hidden py-10"
    >
      {/* Bg glows */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── EXPERIENCE heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-3"
        >
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
            04.
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Experience
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 to-transparent ml-4" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/40 text-base max-w-xl mb-14"
        >
          My professional journey — tap cards to flip and see details.
        </motion.p>

        {/* Timeline */}
        <div className="relative mb-24">
          <TimelineLine />

          <div className="flex flex-col gap-8 lg:gap-12">
            {EXPERIENCE.map((item, i) => {
              const side = i % 2 === 0 ? "left" : "right";
              return (
                <div
                  key={item.id}
                  className="relative flex flex-col lg:flex-row items-center gap-4 lg:gap-8"
                >
                  {/* Left slot */}
                  <div className="w-full lg:w-[calc(50%-2rem)]">
                    {side === "left" ? (
                      <ExperienceCard item={item} index={i} side="left" />
                    ) : (
                      <div className="hidden lg:block" />
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="hidden lg:flex flex-col items-center flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.15 + 0.2 }}
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg z-10 relative"
                      style={{
                        background: "#030712",
                        borderColor: item.color,
                        boxShadow: `0 0 16px ${item.color}50, 0 0 32px ${item.color}25`,
                      }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  {/* Right slot */}
                  <div className="w-full lg:w-[calc(50%-2rem)]">
                    {side === "right" ? (
                      <ExperienceCard item={item} index={i} side="right" />
                    ) : (
                      <div className="hidden lg:block" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── EDUCATION heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <GraduationCap size={22} className="text-purple-400" />
          <h3 className="text-2xl font-extrabold text-white">Education</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent ml-3" />
        </motion.div>

        {EDUCATION.map((edu) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="relative p-6 rounded-2xl border mb-16 overflow-hidden"
            style={{
              borderColor: `${edu.color}25`,
              background: `${edu.color}06`,
              boxShadow: `0 4px 24px rgba(0,0,0,0.3)`,
            }}
          >
            <div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-15 pointer-events-none"
              style={{ background: edu.color }}
            />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border flex-shrink-0"
                style={{
                  background: `${edu.color}15`,
                  borderColor: `${edu.color}30`,
                }}
              >
                {edu.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold text-lg">{edu.degree}</h4>
                <p
                  style={{ color: edu.color }}
                  className="font-semibold text-sm mt-0.5"
                >
                  {edu.institution}
                </p>
                <div className="flex items-center gap-4 mt-2 text-white/35 text-xs">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {edu.period}
                  </span>
                  <span className="text-green-400 font-semibold">
                    🟢 {edu.status}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {edu.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{ color: edu.color, background: `${edu.color}12` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* ── CERTIFICATIONS heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <Award size={22} className="text-yellow-400" />
          <h3 className="text-2xl font-extrabold text-white">Certifications</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-yellow-500/30 to-transparent ml-3" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
