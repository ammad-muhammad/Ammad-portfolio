"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const STATS = [
  { value: "1",  label: "Years of Experience" },
  { value: "3", label: "Projects Built"       },
  { value: "2",   label: "Certifications"       },
  { value: "1",   label: "Hackathon Won"        },
];

export function AboutSection({
  isSectionActive = true,
}: {
  isSectionActive?: boolean;
}) {
  return (
    <section
      id="about"
      className="relative w-full h-screen max-h-screen bg-white text-gray-900 overflow-hidden pt-3 sm:pt-6 pb-4 px-6 sm:px-12 lg:px-16 flex flex-col justify-center select-none"
    >
      <div
        style={{ maxWidth: "min(1100px, 85vw)" }}
        className="relative mx-auto w-full flex flex-col justify-center"
      >

        {/* Step 1: Ghost Header & Title (Animates DOWN from Top FIRST) */}
        <div className="relative flex flex-col justify-start mb-4 sm:mb-6 pt-1">
          {/* Ghost watermark background text */}
          <motion.span
            initial={{ opacity: 0, y: -50 }}
            animate={isSectionActive ? { opacity: 0.2, y: 0 } : { opacity: 0, y: -50 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray-300 font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-[0.2em] uppercase select-none pointer-events-none z-0"
          >
            ABOUT
          </motion.span>

          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: -35 }}
            animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -35 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 -mt-6 sm:-mt-9 pl-1"
          >
            <h2 className="text-xl sm:text-3xl font-semibold text-gray-900 tracking-wider uppercase">
              /ABOUT
            </h2>
          </motion.div>
        </div>

        {/* Main split layout */}
        <div className="about-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">

          {/* Step 2: LEFT Content (Animates in from LEFT TO RIGHT SECOND) */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isSectionActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
            transition={{ duration: 1.2, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 sm:gap-5"
          >
            {/* Big quote text */}
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              I build things that{" "}
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px #111" }}>
                actually work.
              </span>
            </h3>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isSectionActive ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] bg-gray-200 w-full origin-left"
            />

            {/* Full Stack Developer Bio paragraphs */}
            <div className="flex flex-col gap-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
              <p>
                I started coding to engineer end-to-end applications that perform effortlessly at scale. From crafting responsive frontend interfaces to architecting robust backend APIs, databases, and AI integrations, every line of code is written with purpose.
              </p>
              <p>
                I&apos;m a <strong className="text-gray-900">Full Stack Web & Mobile Developer</strong> based in <strong className="text-gray-900">Karachi, Pakistan</strong>. I specialize in Next.js, Node.js, Express, TypeScript, and modern database solutions focused on clean architecture, smooth user experiences, and maintainable code.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex items-center gap-3 pt-1 flex-wrap">
              <a
                href="mailto:official.muhammadammad@gmail.com"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-black text-white text-xs font-semibold hover:bg-gray-800 transition-all shadow-sm"
              >
                <span>Let's Talk</span>
                <ArrowUpRight size={14} />
              </a>
              <a
                href="/resume.docx"
                download="Muhammad_Ammad_Resume.docx"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-gray-900 text-xs font-semibold hover:border-black transition-all shadow-sm"
              >
                <span>Download CV</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>

          {/* Step 3: RIGHT Stats Grid (Animates in from RIGHT TO LEFT THIRD) */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isSectionActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
            transition={{ duration: 1.2, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-[1px] bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isSectionActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 1.45 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-5 sm:p-7 flex flex-col gap-1.5"
              >
                <span className="text-3xl sm:text-5xl font-black text-gray-900 leading-none tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs font-medium text-gray-400 leading-snug">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>

      <style>{`
        @media (min-width: 1441px) {
          .about-grid {
            max-width: 1300px !important;
            margin: 0 auto !important;
            gap: 100px !important;
          }
        }
        @media (min-width: 2000px) {
          .about-grid {
            max-width: 1600px !important;
            gap: 120px !important;
          }
        }
      `}</style>
    </section>
  );
}
