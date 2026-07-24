"use client";
import { useRef } from "react";
import { motion, useInView, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef as useReactRef } from "react";

// ── DATA ─────────────────────────────────────────────────────

const MARQUEE_SKILLS = [
  { label: "React",      color: "#61DAFB", icon: "⚛️"  },
  { label: "JavaScript", color: "#F7DF1E", icon: "🟨"  },
  { label: "TypeScript", color: "#3178C6", icon: "🔷"  },
  { label: "HTML5",      color: "#E34F26", icon: "🟧"  },
  { label: "CSS3",       color: "#1572B6", icon: "🔵"  },
  { label: "Tailwind",   color: "#38BDF8", icon: "🌊"  },
  { label: "Firebase",   color: "#FFCA28", icon: "🔥"  },
  { label: "GitHub",     color: "#e2e8f0", icon: "🐙"  },
  { label: "Bootstrap",  color: "#7952B3", icon: "🅱️"  },
  { label: "Node.js",    color: "#68A063", icon: "💚"  },
  { label: "Next.js",    color: "#e2e8f0", icon: "▲"   },
  { label: "MySQL",      color: "#00758F", icon: "🗄️"  },
  { label: "Redux",      color: "#764ABC", icon: "🔮"  },
  { label: "Figma",      color: "#F24E1E", icon: "🎨"  },
];

const SKILL_CARDS = [
  {
    category: "Frontend",
    icon: "🖥️",
    color: "#61DAFB",
    gradient: "from-cyan-500/10 to-blue-500/5",
    border: "border-cyan-500/20",
    glow: "rgba(97,218,251,0.15)",
    skills: [
      { name: "React",      level: 88, years: "2 yrs" },
      { name: "Next.js",    level: 80, years: "1 yr"  },
      { name: "TypeScript", level: 75, years: "1 yr"  },
      { name: "JavaScript", level: 90, years: "3 yrs" },
    ],
  },
  {
    category: "Styling",
    icon: "🎨",
    color: "#38BDF8",
    gradient: "from-blue-500/10 to-cyan-500/5",
    border: "border-blue-500/20",
    glow: "rgba(56,189,248,0.15)",
    skills: [
      { name: "Tailwind CSS", level: 90, years: "2 yrs" },
      { name: "CSS3",         level: 88, years: "3 yrs" },
      { name: "Bootstrap",    level: 85, years: "2 yrs" },
      { name: "HTML5",        level: 95, years: "3 yrs" },
    ],
  },
  {
    category: "Backend & DB",
    icon: "⚙️",
    color: "#68A063",
    gradient: "from-green-500/10 to-emerald-500/5",
    border: "border-green-500/20",
    glow: "rgba(104,160,99,0.15)",
    skills: [
      { name: "Firebase",  level: 80, years: "1.5 yrs" },
      { name: "Node.js",   level: 65, years: "1 yr"    },
      { name: "MySQL",     level: 70, years: "1 yr"    },
      { name: "Express.js",level: 60, years: "1 yr"    },
    ],
  },
  {
    category: "Tools",
    icon: "🛠️",
    color: "#e2e8f0",
    gradient: "from-slate-500/10 to-gray-500/5",
    border: "border-slate-500/20",
    glow: "rgba(226,232,240,0.10)",
    skills: [
      { name: "GitHub",  level: 88, years: "3 yrs" },
      { name: "Figma",   level: 70, years: "1 yr"  },
      { name: "Redux",   level: 72, years: "1 yr"  },
      { name: "VS Code", level: 95, years: "3 yrs" },
    ],
  },
];

// ── Infinite Marquee ─────────────────────────────────────────

function MarqueeRow({
  skills,
  direction = 1,
  speed = 40,
}: {
  skills: typeof MARQUEE_SKILLS;
  direction?: 1 | -1;
  speed?: number;
}) {
  const x = useMotionValue(0);
  const containerRef = useReactRef<HTMLDivElement>(null);
  const isPaused = useReactRef(false);

  useAnimationFrame((_, delta) => {
    if (isPaused.current) return;
    const moveBy = direction * (speed / 1000) * delta;
    const container = containerRef.current;
    if (!container) return;
    const halfWidth = container.scrollWidth / 2;
    let newX = x.get() + moveBy;
    if (direction === 1 && newX > 0) newX -= halfWidth;
    if (direction === -1 && newX <= -halfWidth) newX += halfWidth;
    x.set(newX);
  });

  const doubled = [...skills, ...skills];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => { isPaused.current = true; }}
      onMouseLeave={() => { isPaused.current = false; }}
    >
      <motion.div
        ref={containerRef}
        style={{ x }}
        className="flex gap-3 w-max"
      >
        {doubled.map((skill, i) => (
          <motion.div
            key={`${skill.label}-${i}`}
            whileHover={{ scale: 1.08, y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full
                       border backdrop-blur-sm cursor-default select-none
                       whitespace-nowrap"
            style={{
              background: `${skill.color}12`,
              borderColor: `${skill.color}35`,
              boxShadow: `0 0 14px ${skill.color}18, inset 0 1px 0 rgba(255,255,255,0.06)`,
            }}
          >
            <span className="text-base leading-none">{skill.icon}</span>
            <span
              className="text-sm font-semibold tracking-wide"
              style={{ color: skill.color }}
            >
              {skill.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// ── Progress Bar ─────────────────────────────────────────────

function SkillBar({
  name,
  level,
  years,
  color,
  delay,
}: {
  name: string;
  level: number;
  years: string;
  color: string;
  delay: number;
}) {
  const ref = useReactRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-white/80 text-sm font-medium">{name}</span>
        <div className="flex items-center gap-2">
          <span className="text-white/30 text-xs">{years}</span>
          <span className="text-xs font-bold" style={{ color }}>{level}%</span>
        </div>
      </div>
      {/* Track */}
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(to right, ${color}99, ${color})`,
            boxShadow: `0 0 8px ${color}60`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </div>
    </div>
  );
}

// ── Skill Card ───────────────────────────────────────────────

function SkillCard({
  card,
  index,
}: {
  card: typeof SKILL_CARDS[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`
        relative flex flex-col gap-5 p-6 rounded-2xl
        border ${card.border} bg-gradient-to-br ${card.gradient}
        backdrop-blur-sm overflow-hidden
        transition-shadow duration-300
      `}
      style={{
        boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.3)`,
      }}
      onHoverStart={(e) => {
        (e.target as HTMLElement).style.boxShadow =
          `0 0 0 1px ${card.color}30, 0 8px 32px ${card.glow}, 0 0 60px ${card.glow}`;
      }}
      onHoverEnd={(e) => {
        (e.target as HTMLElement).style.boxShadow =
          `0 0 0 1px rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.3)`;
      }}
    >
      {/* Top corner glow */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none"
        style={{ background: card.color }}
      />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl
                     border"
          style={{
            background: `${card.color}15`,
            borderColor: `${card.color}30`,
          }}
        >
          {card.icon}
        </div>
        <div>
          <h3 className="text-white font-bold text-base">{card.category}</h3>
          <p className="text-white/30 text-xs">{card.skills.length} technologies</p>
        </div>
      </div>

      {/* Skill bars */}
      <div className="flex flex-col gap-4">
        {card.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            years={skill.years}
            color={card.color}
            delay={index * 0.12 + i * 0.08 + 0.3}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── Main Section ─────────────────────────────────────────────

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative w-full bg-[#030712] overflow-hidden py-10"
    >
      {/* Background glow blobs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-3"
        >
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">02.</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Skills</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 to-transparent ml-4" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/40 text-base max-w-xl mb-12"
        >
          Technologies I've worked with — always learning, always building.
        </motion.p>

        {/* ── Marquee rows ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col gap-3 mb-16"
        >
          <MarqueeRow skills={MARQUEE_SKILLS} direction={1}  speed={35} />
          <MarqueeRow skills={MARQUEE_SKILLS} direction={-1} speed={28} />
          <MarqueeRow skills={MARQUEE_SKILLS} direction={1}  speed={42} />
        </motion.div>

        {/* ── Skill cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {SKILL_CARDS.map((card, i) => (
            <SkillCard key={card.category} card={card} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
