"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";

// Inline SVG icons for social links
const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

export function HeroSection({
  isSectionActive = true,
}: {
  isSectionActive?: boolean;
} = {}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isVisible = mounted && isSectionActive;
  const smoothTransition = { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section
      id="home"
      className="relative w-full h-screen max-h-screen bg-white overflow-hidden flex flex-col justify-between select-none"
    >
      <Navbar />

      {/* ═════════════════════════════════════════════════════════════
          MOBILE LAYOUT (< 768px): ANIMATED VERTICAL STACK
          Top: Name | Center: Image | Text: Bio | Bottom: Socials
         ═════════════════════════════════════════════════════════════ */}
      <div className="flex md:hidden flex-col items-center justify-between w-full h-full pt-16 pb-4 px-4 overflow-hidden z-20">
        
        {/* 1. Name Header at Top */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ ...smoothTransition, delay: 0.15 }}
          className="flex flex-col items-center justify-center text-center mt-1"
        >
          <span
            className="font-black text-2xl tracking-tighter uppercase leading-none"
            style={{
              WebkitTextStroke: "1.5px #111111",
              color: "transparent",
            }}
          >
            MUHAMMAD
          </span>
          <span className="font-black text-2xl tracking-tighter text-black uppercase leading-tight">
            AMMAD
          </span>
        </motion.div>

        {/* 2. Centered Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 35 }}
          animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.88, y: 35 }}
          transition={{ duration: 1.0, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-h-[32vh] flex items-center justify-center my-1"
        >
          <img
            src="/ammad.png"
            alt="Muhammad Ammad"
            className="object-contain max-h-[30vh] w-auto filter grayscale-[10%]"
          />
        </motion.div>

        {/* 3. Text & Collaborate CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ ...smoothTransition, delay: 0.55 }}
          className="flex flex-col items-center text-center gap-1.5 px-2"
        >
          <h2 className="text-base sm:text-lg font-black text-black tracking-tight">
            Full-Stack Developer
          </h2>
          <p className="text-[11px] text-gray-600 leading-snug max-w-xs">
            Building scalable web applications & digital products with Next.js, React.js, Node.js & Express.
          </p>
          <a
            href="#projects"
            className="inline-flex items-center gap-1.5 mt-0.5 px-5 py-2 rounded-full bg-black text-white text-xs font-semibold hover:bg-gray-800 transition-all shadow-md pointer-events-auto"
          >
            Let's collaborate
            <ArrowUpRight size={13} />
          </a>
        </motion.div>

        {/* 4. Social Links Row (Staggered animation) */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pointer-events-auto">
          {[
            { label: "GitHub",   href: "https://github.com/ammad-muhammad",       Icon: GithubIcon   },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/ammadm/",     Icon: LinkedinIcon },
            { label: "Email",    href: "mailto:official.muhammadammad@gmail.com", Icon: MailIcon     },
          ].map(({ label, href, Icon }, index) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:border-black hover:text-black transition-all shadow-xs"
            >
              <Icon />
              <span>{label}</span>
            </motion.a>
          ))}
        </div>

      </div>

      {/* ═════════════════════════════════════════════════════════════
          DESKTOP LAYOUT (>= 768px): ORIGINAL EDITORIAL DESIGN
         ═════════════════════════════════════════════════════════════ */}
      <div className="hidden md:flex flex-col justify-between w-full h-full pt-20 pb-5 px-6 sm:px-12 lg:px-16">
        
        {/* Desktop Name Header */}
        <div className="relative w-full max-w-7xl mx-auto z-10 pt-2 sm:pt-4 px-4 sm:px-8">
          <div className="w-full flex items-center justify-center gap-3 sm:gap-6 lg:gap-10 font-black uppercase tracking-tight leading-none">
            <motion.span
              initial={{ opacity: 0, y: 35 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
              transition={{ ...smoothTransition, delay: 0.2 }}
              className="hero-muhammad"
              style={{
                fontSize: "clamp(2.8rem, 7.5vw, 8.2rem)",
                WebkitTextStroke: "2.5px #111111",
                color: "transparent",
                letterSpacing: "-0.03em",
              }}
            >
              MUHAMMAD
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 35 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
              transition={{ ...smoothTransition, delay: 0.35 }}
              className="hero-ammad"
              style={{
                fontSize: "clamp(2.8rem, 7.5vw, 8.2rem)",
                color: "#111111",
                letterSpacing: "-0.03em",
              }}
            >
              AMMAD
            </motion.span>
          </div>
        </div>

        {/* Desktop Portrait Photo */}
        <div className="absolute inset-x-0 bottom-0 top-14 flex items-end justify-center pointer-events-none z-20">
          <motion.img
            src="/ammad.png"
            alt="Muhammad Ammad"
            initial={{ opacity: 0, y: 110, scale: 0.92 }}
            animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 110, scale: 0.92 }}
            transition={{ duration: 1.3, delay: 1.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="hero-photo object-contain max-h-[70vh] w-auto filter grayscale-[15%]"
          />
        </div>

        {/* Desktop Bottom Row */}
        <div className="hero-bottom relative z-30 w-full max-w-7xl mx-auto flex flex-row items-end justify-between gap-4 pb-2">
          
          {/* Left: Role Title + Tagline + Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ ...smoothTransition, delay: 0.9 }}
            className="flex flex-col gap-2.5 max-w-sm"
          >
            <h2 className="text-xl sm:text-2xl font-extrabold text-black tracking-tight">
              Full-Stack Developer
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              Building end-to-end scalable web applications & high-performance digital products with Next.js, React.js, Node.js & Express.js.
            </p>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 mt-1 px-6 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-800 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 w-fit shadow-md pointer-events-auto"
            >
              Let's collaborate
              <ArrowUpRight size={15} />
            </a>
          </motion.div>

          {/* Right: Social Pill Buttons Stack */}
          <div className="flex flex-col gap-2 shrink-0 pointer-events-auto">
            {[
              { label: "GitHub",   href: "https://github.com/ammad-muhammad",       Icon: GithubIcon   },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/ammadm/",     Icon: LinkedinIcon },
              { label: "Email",    href: "mailto:official.muhammadammad@gmail.com", Icon: MailIcon     },
            ].map(({ label, href, Icon }, index) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ ...smoothTransition, delay: 1.05 + index * 0.12 }}
                className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-gray-200 bg-white/90 backdrop-blur-md text-sm font-semibold text-gray-800 hover:border-black hover:text-black hover:shadow-md hover:scale-[1.04] transition-all duration-200 shadow-sm"
              >
                <Icon />
                <span>{label}</span>
              </motion.a>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 1441px) and (max-width: 1999px) {
          .hero-muhammad { font-size: 9vw !important; margin-bottom: -24px !important; }
          .hero-ammad { font-size: 9vw !important; margin-top: -24px !important; }
          .hero-photo { height: 28vw !important; max-height: 500px !important; }
          .hero-bottom { padding: 16px 80px 40px 80px !important; }
        }
        @media (min-width: 2000px) {
          .hero-muhammad { font-size: 8vw !important; margin-bottom: -30px !important; }
          .hero-ammad { font-size: 8vw !important; margin-top: -30px !important; }
          .hero-photo { height: 22vw !important; max-height: 580px !important; }
          .hero-bottom { padding: 20px 120px 48px 120px !important; }
        }
      `}</style>
    </section>
  );
}
