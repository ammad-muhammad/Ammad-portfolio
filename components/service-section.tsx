"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: "FRONTEND DEVELOPMENT",
    description: "Building fast, responsive and interactive web applications using React, Next.js, and modern CSS. Clean code, smooth animations, pixel-perfect UI.",
    tags: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    image: "/service_frontend.jpg",
  },
  {
    id: 2,
    title: "UI/UX IMPLEMENTATION",
    description: "Turning design mockups into fully functional interfaces. I bridge the gap between design and development with attention to detail and user experience.",
    tags: ["Figma to Code", "Responsive Design", "Animations", "Framer Motion"],
    image: "/service_uiux.jpg",
  },
  {
    id: 3,
    title: "FULL STACK DEVELOPMENT",
    description: "End-to-end web application development with Node.js, Express, Firebase and MongoDB backend. REST APIs, authentication, and database design.",
    tags: ["Node.js", "Express.js", "Firebase", "MongoDB"],
    image: "/service_fullstack.jpg",
  },
  {
    id: 4,
    title: "AI INTEGRATION",
    description: "Integrating AI APIs like Gemini and Groq into web apps. Building intelligent chatbots, content generators, and AI-powered tools.",
    tags: ["Gemini AI", "Groq API", "LLaMA", "Prompt Engineering"],
    image: "/service_ai.jpg",
  },
];

export function ServiceSection({
  isSectionActive = false,
}: {
  isSectionActive?: boolean;
}) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (isSectionActive) {
      setHoveredId(null);
      // Enable hover interactions strictly AFTER full entrance sequence completes
      const timer = setTimeout(() => {
        setCanHover(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setHoveredId(null);
      setCanHover(false);
    }
  }, [isSectionActive]);

  return (
    <section
      id="service"
      className="relative w-full h-screen max-h-screen bg-white text-gray-900 overflow-hidden pt-4 sm:pt-8 pb-4 px-6 sm:px-12 lg:px-16 flex flex-col justify-center select-none"
    >
      <div
        style={{ maxWidth: "min(1100px, 85vw)", margin: "0 auto", padding: "0 40px" }}
        className="relative w-full flex flex-col justify-center"
      >

        {/* Step 1: Sequential Heading Entrance (Watermark FIRST, Black Title SECOND) */}
        <div className="relative flex flex-col justify-start mb-6 sm:mb-10 pt-2">
          {/* 1. Ghost watermark background text (Slides down FIRST at 0.15s) */}
          <motion.span
            initial={{ opacity: 0, y: -60 }}
            animate={isSectionActive ? { opacity: 0.2, y: 0 } : { opacity: 0, y: -60 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray-300 font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-[0.2em] uppercase select-none pointer-events-none z-0"
          >
            SERVICE
          </motion.span>

          {/* 2. Black foreground heading (Slides down SECOND at 0.55s after watermark) */}
          <motion.div
            initial={{ opacity: 0, y: -45 }}
            animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -45 }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 -mt-6 sm:-mt-9 pl-1"
          >
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 tracking-wider uppercase">
              /SERVICE
            </h2>
          </motion.div>
        </div>

        {/* Step 2: Interactive Service Rows (Slides in THIRD sequentially from left to right at 1.35s+) */}
        <div
          className="flex flex-col gap-2"
          onMouseLeave={() => setHoveredId(null)}
        >
          {SERVICES.map((service, i) => {
            const isHovered = hoveredId === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -80 }}
                animate={isSectionActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
                transition={{
                  duration: 1.2,
                  delay: 1.35 + i * 0.22, // Starts strictly AFTER black heading finishes
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => {
                  if (canHover) setHoveredId(service.id);
                }}
                onMouseLeave={() => setHoveredId(null)}
                className="relative w-full cursor-pointer rounded-xl"
              >
                {/* Ultra-Smooth Animated Hover Card Container */}
                <motion.div
                  layout
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-full transition-colors duration-400 ${
                    isHovered
                      ? "bg-[#1c1c1c] text-white p-5 sm:p-6 rounded-2xl border border-white/10 shadow-2xl mt-4"
                      : "bg-white text-gray-900 py-4 sm:py-5 px-3 border-t border-gray-200 hover:px-4"
                  }`}
                >
                  {isHovered ? (
                    /* HOVER CONTENT: Sleek Dark Card Banner */
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-center justify-between gap-4 relative"
                    >
                      {/* Left: Title, Description & Tags */}
                      <div className="flex flex-col gap-2 max-w-xl z-10">
                        <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white uppercase">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-2">
                          {service.description}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-1">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-xs font-medium text-gray-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right: Floating Mockup Preview Card */}
                      <div className="flex items-center gap-3 shrink-0 z-20">
                        <motion.div
                          initial={{ opacity: 0, y: 15, rotate: 6 }}
                          animate={{ opacity: 1, y: -22, rotate: -4 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="relative -mt-10 sm:-mt-14 w-36 sm:w-48 h-24 sm:h-32 rounded-xl bg-white p-1.5 shadow-2xl border border-white/40 transform hover:rotate-0 transition-transform duration-300"
                        >
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover object-top rounded-lg"
                          />
                        </motion.div>

                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setHoveredId(null);
                          }}
                          className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                          <X size={18} />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* DEFAULT CONTENT: Clean Minimal Row */
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight uppercase">
                        {service.title}
                      </h3>

                      <div className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-800 shrink-0 shadow-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                        <ArrowUpRight size={15} />
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}

          <div className="border-t border-gray-200" />
        </div>

      </div>

      <style>{`
        @media (min-width: 1441px) {
          #service > div {
            max-width: min(1300px, 85vw) !important;
          }
          #service h3 {
            font-size: clamp(1.5rem, 2.5vw, 2.5rem) !important;
          }
        }
        @media (min-width: 2000px) {
          #service > div {
            max-width: min(1600px, 80vw) !important;
          }
        }
      `}</style>
    </section>
  );
}
