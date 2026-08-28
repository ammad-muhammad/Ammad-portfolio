"use client";
import { motion } from "framer-motion";

const SKILLS_LIST = [
  {
    name: "React JS",
    icon: (
      <svg className="w-8 h-8 text-[#61DAFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: "Next JS",
    icon: (
      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-extrabold text-xs border border-gray-300">
        N
      </div>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <div className="w-8 h-8 bg-[#3178C6] rounded-md flex items-end justify-end p-1 font-extrabold text-white text-xs leading-none">
        TS
      </div>
    ),
  },
  {
    name: "JavaScript",
    icon: (
      <div className="w-8 h-8 bg-[#F7DF1E] rounded-md flex items-end justify-end p-1 font-extrabold text-black text-xs leading-none">
        JS
      </div>
    ),
  },
  {
    name: "Tailwind CSS",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#38BDF8">
        <path d="M12 6c-3.3 0-5.5 1.6-6.5 4.8 1.3-1.6 2.8-2.2 4.5-1.7 1 .3 1.7 1 2.5 1.8C13.8 12.2 15.5 14 19.5 14c3.3 0 5.5-1.6 6.5-4.8-1.3 1.6-2.8 2.2-4.5 1.7-1-.3-1.7-1-2.5-1.8C17.7 7.8 16 6 12 6zm-7 7.5c-3.3 0-5.5 1.6-6.5 4.8 1.3-1.6 2.8-2.2 4.5-1.7 1 .3 1.7 1 2.5 1.8C6.8 19.7 8.5 21.5 12.5 21.5c3.3 0 5.5-1.6 6.5-4.8-1.3 1.6-2.8 2.2-4.5 1.7-1-.3-1.7-1-2.5-1.8C10.7 15.3 9 13.5 5 13.5z"/>
      </svg>
    ),
  },
  {
    name: "CSS3",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#1572B6">
        <path d="M5 3l-.6 3h13.1l-.4 2H3.4l-.6 3h13.5l-.9 5-4.4 1.3-4.4-1.3.3-2.3H4.3l-.6 4.6 6.3 1.9 6.3-1.9 1.3-7.5.3-2.1L18.4 3H5z"/>
      </svg>
    ),
  },
  {
    name: "Bootstrap",
    icon: (
      <div className="w-8 h-8 bg-[#7952B3] rounded-lg flex items-center justify-center font-black text-white text-base">
        B
      </div>
    ),
  },
  {
    name: "HTML5",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#E34F26">
        <path d="M5 3l-.6 3h13.1l-.4 2H3.4l-.6 3h13.5l-.9 5-4.4 1.3-4.4-1.3.3-2.3H4.3l-.6 4.6 6.3 1.9 6.3-1.9 1.3-7.5.3-2.1L18.4 3H5z"/>
      </svg>
    ),
  },
  {
    name: "Firebase",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#FFCA28">
        <path d="M3.8 14.7l5.2-9.8c.3-.5.9-.6 1.3-.3.2.1.3.3.4.5l2.1 4 4.5-8.5c.3-.5.9-.7 1.4-.4.2.1.4.3.4.6l3 13.9-8.1 4.6c-.6.3-1.4.3-2 0L3.8 14.7z"/>
      </svg>
    ),
  },
  {
    name: "Node JS",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#68A063">
        <path d="M12 2L2 7.8v11.4L12 25l10-5.8V7.8L12 2zm-1 16.5l-4-2.3V11.6l4 2.3v4.6zm6-2.3l-4 2.3v-4.6l4-2.3v4.6z"/>
      </svg>
    ),
  },
  {
    name: "MongoDB",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#47A248">
        <path d="M12 2s-6 7.5-6 12.5C6 18.5 8.7 21 12 21s6-2.5 6-6.5C18 9.5 12 2 12 2zm.8 17.5v-6.8c.8.3 1.4 1 1.4 2 0 1.2-.8 2.2-1.4 4.8z"/>
      </svg>
    ),
  },
  {
    name: "Express JS",
    icon: (
      <div className="w-8 h-8 flex items-center justify-center font-bold text-gray-800 text-sm font-mono tracking-tighter">
        ex
      </div>
    ),
  },
  {
    name: "GitHub",
    icon: (
      <svg className="w-8 h-8 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      </svg>
    ),
  },
  {
    name: "Figma",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M12 12A3 3 0 1 1 6 12a3 3 0 0 1 6 0z" fill="#1ABCFE"/>
        <path d="M6 6a3 3 0 0 1 6 0v6H6V6z" fill="#F24E1E"/>
        <path d="M12 6a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" fill="#FF7262"/>
        <path d="M18 12a3 3 0 1 1 6 0 3 3 0 0 1 6 0z" fill="#0ACF83"/>
        <path d="M6 18a3 3 0 0 1 3-3h3v3a3 3 0 1 1-6 0z" fill="#A259FF"/>
      </svg>
    ),
  },
  {
    name: "Redux",
    icon: (
      <svg className="w-8 h-8 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16.5 9.4c-1-.3-2.1.2-2.5 1.2l-.7 1.7c-.3.8-.1 1.7.5 2.3.8.8 2 .8 2.8 0l2.3-2.3c.9-.9.9-2.3 0-3.2-.7-.7-1.7-1-2.4-.3z" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    name: "VS Code",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#007ACC">
        <path d="M23.15 2.587L18.21.78a1.494 1.494 0 00-1.705.518L.745 15.654a.747.747 0 00.126.96l3.414 3.013a1.493 1.493 0 001.761.16l17.15-8.497a1.493 1.493 0 00.865-1.341V3.978a1.494 1.494 0 00-.911-1.391z"/>
      </svg>
    ),
  },
];

export function SkillsSection({
  isSectionActive = true,
}: {
  isSectionActive?: boolean;
}) {
  return (
    <section
      id="skills"
      className="relative w-full h-screen max-h-screen bg-white text-gray-900 overflow-hidden pt-4 sm:pt-8 pb-6 px-6 sm:px-12 lg:px-16 flex flex-col justify-between select-none"
    >
      <div
        style={{ maxWidth: "min(1100px, 85vw)" }}
        className="skills-container relative mx-auto w-full flex flex-col h-full justify-between py-2 sm:py-4"
      >

        {/* Step 1: Top-Left Header (Animates DOWN FIRST) */}
        <div className="relative flex flex-col justify-start">
          {/* Ghost watermark background text */}
          <motion.span
            initial={{ opacity: 0, y: -50 }}
            animate={isSectionActive ? { opacity: 0.2, y: 0 } : { opacity: 0, y: -50 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray-300 font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-[0.2em] uppercase select-none pointer-events-none z-0"
          >
            SKILLS
          </motion.span>

          {/* Foreground Title */}
          <motion.div
            initial={{ opacity: 0, y: -35 }}
            animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -35 }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 -mt-6 sm:-mt-9 pl-1"
          >
            <h2 className="text-xl sm:text-3xl font-semibold text-gray-900 tracking-wider uppercase">
              /SKILLS
            </h2>
          </motion.div>
        </div>

        {/* Centered Content Block */}
        <div className="flex flex-col items-center justify-center my-auto w-full">

          {/* Step 2: Subtitle (Animates DOWN SECOND) */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{ duration: 1.0, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-6 sm:mb-10"
          >
            <h3 className="text-sm sm:text-xl font-bold text-gray-700 uppercase tracking-wide">
              WORKING WITH LATEST TECHNOLOGIES & STACK
            </h3>
          </motion.div>

          {/* Step 3: Technology Icons Grid (Animates UP THIRD with Stagger) */}
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-y-6 sm:gap-y-10 gap-x-4 sm:gap-x-6 max-w-5xl mx-auto w-full items-center justify-center">
            {SKILLS_LIST.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 40, scale: 0.85 }}
                animate={isSectionActive ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.85 }}
                transition={{
                  duration: 0.7,
                  delay: 1.25 + index * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.12, y: -5 }}
                className="skill-card flex flex-col items-center justify-center gap-2 cursor-pointer group"
              >
                {/* Technology Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center shadow-xs group-hover:shadow-md group-hover:bg-white group-hover:border-black transition-all duration-300">
                  {tech.icon}
                </div>

                {/* Technology Name */}
                <span className="text-[11px] sm:text-xs font-semibold text-gray-700 group-hover:text-black transition-colors text-center whitespace-nowrap">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 1441px) {
          #skills .skills-container {
            max-width: min(1300px, 85vw) !important;
          }
          #skills .skill-card {
            padding: 48px 40px !important;
          }
        }
        @media (min-width: 2000px) {
          #skills .skills-container {
            max-width: min(1600px, 80vw) !important;
          }
        }
      `}</style>
    </section>
  );
}
