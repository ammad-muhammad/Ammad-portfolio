'use client'
import { motion } from 'framer-motion'

import { Spotlight } from '@/components/ui/spotlight'
import { GooeyText } from '@/components/ui/gooey-text-morphing'
import { Mail } from 'lucide-react'

// ── Dev Particles Background ─────────────────────────────────
const DEV_SYMBOLS = [
  "const", "=>", "{}", "[]", "( )", "//", "&&", "||",
  "React", "</>", "npm", "git", "===", "!==", "async",
  "await", "return", "import", "export", "useState",
  "><", "*/", "??", "::", "++", "--", "0x1F",
];

function DevParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none transform-gpu">
      {DEV_SYMBOLS.map((symbol, i) => {
        const left = ((i * 37.7) % 90) + 5;
        const top = ((i * 23.3) % 85) + 5;
        const duration = 15 + (i % 7) * 4;
        const delay = -(i * 1.8);
        const size = i % 3 === 0 ? "text-xs" : i % 3 === 1 ? "text-[10px]" : "text-[9px]";
        const opacity = i % 4 === 0 ? "opacity-[0.12]" : i % 4 === 1 ? "opacity-[0.07]" : i % 4 === 2 ? "opacity-[0.09]" : "opacity-[0.05]";
        return (
          <div
            key={i}
            className={`absolute font-mono font-bold text-cyan-400 ${size} ${opacity} will-change-transform`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animation: `devFloat ${duration}s ease-in-out ${delay}s infinite`,
            }}
          >
            {symbol}
          </div>
        );
      })}

      {/* Floating dots */}
      {Array.from({ length: 20 }).map((_, i) => {
        const left = ((i * 53.1) % 95) + 2;
        const top = ((i * 31.7) % 90) + 5;
        const duration = 8 + (i % 5) * 3;
        const delay = -(i * 0.9);
        const isLarge = i % 5 === 0;
        return (
          <div
            key={`dot-${i}`}
            className={`absolute rounded-full ${isLarge ? "w-1 h-1" : "w-0.5 h-0.5"}`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              background: i % 3 === 0 ? "rgba(34,211,238,0.25)" : i % 3 === 1 ? "rgba(59,130,246,0.2)" : "rgba(139,92,246,0.15)",
              animation: `devFloat ${duration}s ease-in-out ${delay}s infinite`,
              boxShadow: isLarge ? `0 0 4px rgba(34,211,238,0.3)` : "none",
            }}
          />
        );
      })}

      {/* Horizontal scan lines (subtle) */}
      {[20, 45, 70].map((top, i) => (
        <div
          key={`line-${i}`}
          className="absolute left-0 right-0 h-px"
          style={{
            top: `${top}%`,
            background: "linear-gradient(to right, transparent, rgba(34,211,238,0.04), rgba(34,211,238,0.06), rgba(34,211,238,0.04), transparent)",
            animation: `scanLine ${12 + i * 4}s ease-in-out ${-i * 3}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TailwindIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
  </svg>
);

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full h-[100dvh] bg-[#030712] overflow-hidden flex flex-col snap-start transform-gpu"
    >
      <DevParticles />
      {/* Spotlight */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="cyan" />

      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-full max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-16 pb-6 gap-4 lg:gap-0">

        {/* LEFT — Text Content */}
        <div className="flex-1 flex flex-col justify-center items-start gap-2 overflow-visible w-full lg:w-1/2 pt-4">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-medium mt-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Available for work
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="leading-none mb-0 mt-1"
          >
            <p className="text-white/50 text-base mb-0">Hi, I'm</p>
            <h1 className="font-extrabold leading-[0.95] tracking-tight">
              <span className="text-5xl sm:text-6xl lg:text-7xl bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent block">
                Muhammad
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-600 bg-clip-text text-transparent block font-nosifer py-2">
                Ammad
              </span>
            </h1>
          </motion.div>

          {/* Gooey Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="h-12 flex items-center mt-10"
          >
            <GooeyText
              texts={[
                'Frontend Developer',
                'React Specialist',
                'UI/UX Enthusiast',
                'Full Stack Learner',
              ]}
              morphTime={1.2}
              cooldownTime={2}
              className="h-12 w-full max-w-lg"
              textClassName="text-lg sm:text-xl lg:text-2xl font-normal text-cyan-400 font-nosifer whitespace-nowrap"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-white/50 text-sm sm:text-base max-w-md leading-relaxed mt-0"
          >
            Passionate frontend developer from Karachi, building modern web experiences
            with React & Next.js. Currently leveling up with full-stack at SMIT.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-3 mt-0"
          >
            <a
              href="#projects"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-white/20 text-white/80 text-sm font-semibold rounded-xl hover:border-cyan-500/60 hover:text-cyan-400 hover:bg-white/5 transition-all duration-200"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-3 mt-1"
          >
            {[
              { icon: GithubIcon, href: 'https://github.com/ammad-muhammad', label: 'GitHub' },
              { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/ammadm/', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:official.muhammadammad@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg border border-white/10 text-white/50 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Creative Abstract Composition */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 w-full lg:w-1/2 h-[350px] sm:h-[450px] lg:h-full relative flex-shrink-0 flex items-center justify-center perspective-[2000px] lg:pl-10"
        >
          {/* Animated Background Gradients */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0] 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 rounded-full blur-[80px]" 
          />

          {/* Main Floating Glass Card */}
          <motion.div
            animate={{ 
              y: [-15, 15, -15],
              rotateX: [10, -5, 10],
              rotateY: [-10, 5, -10]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] p-5 sm:p-7 rounded-3xl border border-white/10 bg-[#0a0f1e]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Inner Glare */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-30 pointer-events-none" />
            
            <div className="relative z-20 flex flex-col gap-4 sm:gap-5">
              {/* Window controls */}
              <div className="flex items-center gap-2 mb-2 sm:mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              </div>
              
              {/* Code text */}
              <div className="space-y-3 font-mono text-[13px] sm:text-[15px] leading-relaxed">
                <p className="text-purple-400">const <span className="text-white">developer</span> <span className="text-cyan-400">=</span> {'{'}</p>
                <p className="pl-4 sm:pl-6 text-white/80">name: <span className="text-green-400">'Ammad'</span>,</p>
                <p className="pl-4 sm:pl-6 text-white/80">role: <span className="text-green-400">'Frontend Eng'</span>,</p>
                <p className="pl-4 sm:pl-6 text-white/80">skills: [<span className="text-orange-300">'React'</span>, <span className="text-cyan-300">'Next.js'</span>],</p>
                <p className="pl-4 sm:pl-6 text-white/80 flex items-center gap-2">
                  status: <span className="text-yellow-300">'Coding'</span> 
                  <span className="inline-block w-1.5 h-4 bg-cyan-400 animate-pulse" />
                </p>
                <p className="text-purple-400">{'}'};</p>
              </div>
            </div>
          </motion.div>

          {/* Orbiting React Icon Card */}
          <motion.div
            animate={{ 
              y: [10, -10, 10],
              x: [-10, 10, -10],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[15%] right-[5%] sm:-right-4 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border border-cyan-500/30 bg-[#0a0f1e]/80 backdrop-blur-lg flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.2)]"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="text-cyan-400 font-bold text-2xl sm:text-3xl"
            >
              ⚛
            </motion.div>
          </motion.div>

          {/* Orbiting Tailwind Icon Card */}
          <motion.div
            animate={{ 
              y: [-15, 15, -15],
              x: [10, -10, 10],
              rotate: [0, -15, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[20%] left-[5%] sm:-left-4 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-cyan-500/30 bg-[#0a0f1e]/80 backdrop-blur-lg flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.2)] text-cyan-400"
          >
            <TailwindIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          </motion.div>

          {/* Orbiting Tech Pill */}
          <motion.div
            animate={{ 
              y: [20, -20, 20],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-[5%] right-[20%] sm:right-10 z-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-purple-500/30 bg-[#0a0f1e]/80 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]"
          >
            <span className="text-purple-300 font-mono text-xs sm:text-sm tracking-wider">UI/UX</span>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}


