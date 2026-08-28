"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ammadm/",
    icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/ammad-muhammad",
    icon: GithubIcon,
  },
  {
    label: "Email",
    href: "mailto:official.muhammadammad@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    href: "tel:+923144492427",
    icon: Phone,
  },
];

export function CtaSection({
  isSectionActive = false,
}: {
  isSectionActive?: boolean;
}) {
  return (
    <section
      id="cta"
      className="relative w-full h-screen max-h-screen bg-white text-gray-900 overflow-hidden py-6 sm:py-10 px-4 sm:px-8 lg:px-12 flex flex-col items-center justify-center select-none"
    >
      <div className="relative max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center z-10">
        
        {/* Full-Screen Pure White Content Container */}
        <div className="w-full flex flex-col items-center text-center">

          {/* Step 1. Availability Badge (Enters FIRST at 0.15s) */}
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -25 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold shadow-xs mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for New Projects</span>
          </motion.div>

          {/* Step 2. Main Heading (Enters SECOND at 0.45s) */}
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
            transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight uppercase leading-[1.05] max-w-3xl mb-5"
          >
            HAVE A PROJECT IN MIND?
          </motion.h2>

          {/* Step 3. Short Supporting Description (Enters THIRD at 0.80s) */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.75, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-base text-gray-500 max-w-lg leading-relaxed font-medium mb-9"
          >
            Together, we can create something clear and impactful. Let&apos;s collaborate to bring our ideas to life in a way that resonates with everyone.
          </motion.p>

          {/* Step 4. Primary CTA Button (Enters FOURTH at 1.15s) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={isSectionActive ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.65, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 sm:mb-14"
          >
            <a
              href="mailto:official.muhammadammad@gmail.com"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-black text-white font-bold text-xs sm:text-sm hover:bg-gray-800 transition-all duration-300 shadow-xl hover:-translate-y-0.5 hover:scale-[1.03] group"
            >
              <span>Contact Me</span>
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* Step 5. Social & Contact Pills (Enters FIFTH — Each Pill animates one by one at 1.45s+) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full max-w-2xl mx-auto px-2">
            
            {/* Profile Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isSectionActive ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 1.45, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-black text-white text-xs font-semibold shadow-md"
            >
              <div className="w-5 h-5 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center text-[10px] font-bold">
                MA
              </div>
              <span>Muhammad Ammad</span>
            </motion.div>

            {/* Individual Social Links */}
            {SOCIAL_LINKS.map((s, index) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={isSectionActive ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 1.57 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 bg-gray-50/80 text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all duration-300 text-xs font-medium shadow-xs group"
              >
                <s.icon className="transition-colors duration-300 group-hover:text-white" />
                <span>{s.label}</span>
              </motion.a>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
