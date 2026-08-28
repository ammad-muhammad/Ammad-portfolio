"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
}

const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    id: 1,
    company: "JoeyCo Logitech Pvt. Ltd",
    role: "Backend PHP Laravel Intern",
    period: "Feb 2023 - Mar 2023",
    description: "Developed RESTful APIs, database schema optimizations, and backend routing systems using PHP Laravel & MySQL.",
    tags: ["PHP", "Laravel", "MySQL", "REST API"],
  },
  {
    id: 2,
    company: "Software House",
    role: "Frontend & Backend Developer",
    period: "Mar 2023 - Aug 2023",
    description: "Built full-stack web platforms using React, Node.js, Express, and MongoDB with modern responsive UI/UX.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
  },
];

export function ExperienceSection({
  isSectionActive = false,
}: {
  isSectionActive?: boolean;
} = {}) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (isSectionActive) {
      setHoveredId(null);
      const timer = setTimeout(() => {
        setCanHover(true);
      }, 1800);
      return () => clearTimeout(timer);
    } else {
      setHoveredId(null);
      setCanHover(false);
    }
  }, [isSectionActive]);

  return (
    <section
      id="experience"
      style={{ backgroundColor: "#111111" }}
      className="relative w-full h-screen max-h-screen bg-[#111111] text-white overflow-hidden pt-8 sm:pt-12 pb-8 px-6 sm:px-12 lg:px-16 flex flex-col justify-start select-none"
    >
      <div
        style={{ maxWidth: "min(1100px, 85vw)" }}
        className="exp-container relative mx-auto w-full flex flex-col justify-start"
      >

        {/* Step 1: Heading positioned at the top */}
        <div className="relative mb-6 sm:mb-8 pt-2">
          {/* Ghost watermark background text */}
          <motion.span
            initial={{ opacity: 0, y: -50 }}
            animate={isSectionActive ? { opacity: 0.05, y: 0 } : { opacity: 0, y: -50 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="exp-ghost text-white font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-[0.2em] uppercase absolute -top-5 sm:-top-9 left-0 select-none pointer-events-none z-0"
          >
            EXPERIENCE
          </motion.span>

          {/* Foreground Title & Meta */}
          <div className="flex items-center justify-between relative z-10 pt-3 sm:pt-5">
            <motion.h2
              initial={{ opacity: 0, y: -35 }}
              animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -35 }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wider uppercase"
            >
              /EXPERIENCE
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: -25 }}
              animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -25 }}
              transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm font-medium text-gray-400 font-mono"
            >
              1+ years of experience
            </motion.p>
          </div>
        </div>

        {/* Step 2: Work Experience Rows */}
        <div
          className="flex flex-col gap-2 mt-14 sm:mt-20"
          onMouseLeave={() => setHoveredId(null)}
        >
          {WORK_EXPERIENCE.map((item, i) => {
            const isHovered = hoveredId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 1.2,
                  delay: 1.15 + i * 0.22,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => {
                  if (canHover) setHoveredId(item.id);
                }}
                onMouseLeave={() => setHoveredId(null)}
                className="relative w-full cursor-pointer rounded-xl"
              >
                <div
                  style={{
                    backgroundColor: isHovered ? "rgba(255, 255, 255, 0.05)" : "transparent",
                  }}
                  className={`exp-row w-full transition-all duration-300 py-4 sm:py-5 px-4 sm:px-5 border-t border-gray-800 flex items-center justify-between relative ${
                    isHovered
                      ? "rounded-xl border-transparent"
                      : "hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Left Side: Company & Role */}
                  <div className="flex flex-col gap-0.5 z-10 max-w-md">
                    <h3 className="text-base sm:text-xl font-bold text-white tracking-tight">
                      {item.company}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 font-medium">
                      {item.role}
                    </p>
                  </div>

                  {/* Right Side: Period */}
                  <div className="flex items-center gap-4 z-10">
                    <span className="exp-period text-xs sm:text-sm font-mono text-gray-500">
                      {item.period}
                    </span>
                  </div>

                  {/* Floating Details Card */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 18, scale: 0.92, rotate: 6 }}
                        animate={{ opacity: 1, y: -22, scale: 1, rotate: -3 }}
                        exit={{ opacity: 0, y: 12, scale: 0.92 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute right-36 sm:right-52 -top-10 sm:-top-14 z-30 w-52 sm:w-64 rounded-2xl bg-[#1c1c1c] text-white p-4 shadow-2xl border border-gray-700 pointer-events-none flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between border-b border-gray-700 pb-2">
                          <span className="text-xs font-black text-white tracking-tight">
                            WORK HIGHLIGHTS
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                            {item.period}
                          </span>
                        </div>

                        <p className="text-xs text-gray-300 leading-relaxed font-medium pt-0.5">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-semibold text-gray-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            );
          })}

          <div className="exp-gap border-t border-gray-800" />
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .exp-ghost {
            font-size: clamp(2.5rem, 15vw, 4rem) !important;
            top: -16px !important;
            left: 0 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            max-width: 100% !important;
          }
          .exp-container {
            padding: 60px 20px !important;
          }
          .exp-inner {
            padding: 0 !important;
          }
          .exp-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 4px !important;
            padding: 18px 0 !important;
          }
          .exp-period {
            font-size: 11px !important;
          }
          .exp-gap {
            display: none !important;
          }
        }
        @media (min-width: 1441px) {
          #experience .exp-container {
            max-width: min(1300px, 85vw) !important;
          }
          #experience .exp-ghost {
            font-size: clamp(5rem, 8vw, 9rem) !important;
          }
        }
        @media (min-width: 2000px) {
          #experience .exp-container {
            max-width: min(1600px, 80vw) !important;
          }
        }
      `}</style>
    </section>
  );
}
