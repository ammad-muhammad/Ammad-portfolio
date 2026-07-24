"use client";
import { motion } from "framer-motion";
import { Mail, Heart, ArrowUp } from "lucide-react";

// ── DATA ──────────────────────────────────────────────────────

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  {
    emoji: "🐙",
    href: "https://github.com/ammad-muhammad",
    label: "GitHub",
    color: "#e2e8f0",
  },
  {
    emoji: "💼",
    href: "https://linkedin.com/in/muhammad-ammad",
    label: "LinkedIn",
    color: "#0A66C2",
  },
  {
    emoji: "✉️",
    href: "mailto:official.muhammadammad@gmail.com",
    label: "Email",
    color: "#61DAFB",
  },
];

// ── Footer ────────────────────────────────────────────────────

export function Footer() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative w-full bg-[#030712] overflow-hidden">

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      {/* Bg glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-500/[0.05] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex flex-col items-center gap-5">

          {/* Logo + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <a
              href="#home"
              className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              &lt;Ammad /&gt;
            </a>
            <p className="text-white/30 text-sm text-center">
              Frontend Developer · Karachi, Pakistan
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2"
          >
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/35 hover:text-cyan-400 text-sm transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Social icon buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-3"
          >
            {SOCIALS.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ y: -3, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-10 h-10 rounded-xl border border-white/10
                           bg-white/[0.03] flex items-center justify-center
                           text-white/40 hover:text-white
                           hover:border-white/25 hover:bg-white/[0.06]
                           transition-colors duration-200 text-lg"
              >
                {s.emoji}
              </motion.a>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

          {/* Bottom row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-between w-full gap-3"
          >
            <p className="text-white/25 text-xs text-center sm:text-left">
              © 2026 Muhammad Ammad · All rights reserved
            </p>

            {/* <p className="flex items-center gap-1.5 text-white/25 text-xs">
              Designed &amp; Built with
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart size={12} className="text-red-400 fill-red-400 inline-block" />
              </motion.span>
              using React &amp; Next.js
            </p> */}

            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                         border border-white/10 bg-white/[0.03]
                         text-white/35 hover:text-cyan-400
                         hover:border-cyan-500/30 hover:bg-cyan-500/[0.05]
                         text-xs font-medium transition-all duration-200"
            >
              <ArrowUp size={12} />
              Back to top
            </motion.button>
          </motion.div>

        </div>
      </div>
    </footer>
  );
}
