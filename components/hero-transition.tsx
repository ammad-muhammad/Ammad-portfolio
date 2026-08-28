"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { ServiceSection } from "@/components/service-section";
import { ExperienceSection } from "@/components/experience-section";
import { CtaSection } from "@/components/cta-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

type SectionKey =
  | "hero"
  | "about"
  | "skills"
  | "projects"
  | "service"
  | "experience"
  | "cta"
  | "contact";

const SECTIONS: SectionKey[] = [
  "hero",
  "about",
  "skills",
  "projects",
  "service",
  "experience",
  "cta",
  "contact",
];

const SECTION_MAP: Record<string, number> = {
  home: 0,
  hero: 0,
  about: 1,
  skills: 2,
  projects: 3,
  service: 4,
  services: 4,
  experience: 5,
  cta: 6,
  contact: 7,
};

export function HeroToNextTransition() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);
  const shouldReduceMotion = useReducedMotion();
  const lenis = useLenis();

  // Control Lenis scrolling state based on active section
  useEffect(() => {
    if (activeIdx < SECTIONS.length - 1) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [activeIdx, lenis]);

  const navigateToSection = useCallback((targetIdx: number) => {
    const validTarget = Math.max(0, Math.min(targetIdx, SECTIONS.length - 1));
    isAnimating.current = true;
    setActiveIdx(validTarget);
    window.scrollTo({ top: 0, behavior: "instant" });

    setTimeout(() => {
      if (validTarget === SECTIONS.length - 1) {
        lenis?.start();
      }
      isAnimating.current = false;
    }, 1100);
  }, [lenis]);

  // Handle Hash Changes, Custom Events, and Anchor Clicks
  useEffect(() => {
    const handleGlobalAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#")) {
        const key = href.replace("#", "").toLowerCase();
        if (key in SECTION_MAP) {
          e.preventDefault();
          navigateToSection(SECTION_MAP[key]);
        }
      }
    };

    const handleCustomNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      if (typeof customEvent.detail === "number") {
        navigateToSection(customEvent.detail);
      }
    };

    const handleHash = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (hash && hash in SECTION_MAP) {
        navigateToSection(SECTION_MAP[hash]);
      }
    };

    document.addEventListener("click", handleGlobalAnchorClick, { capture: true });
    window.addEventListener("navigate-section", handleCustomNavigate);
    window.addEventListener("hashchange", handleHash);

    // Check initial hash on mount
    handleHash();

    return () => {
      document.removeEventListener("click", handleGlobalAnchorClick, { capture: true });
      window.removeEventListener("navigate-section", handleCustomNavigate);
      window.removeEventListener("hashchange", handleHash);
    };
  }, [navigateToSection]);

  const handleNext = useCallback(() => {
    if (isAnimating.current) return;
    if (activeIdx >= SECTIONS.length - 1) return;

    isAnimating.current = true;
    const nextIdx = activeIdx + 1;
    setActiveIdx(nextIdx);
    lenis?.stop();

    setTimeout(() => {
      if (nextIdx === SECTIONS.length - 1) {
        lenis?.start();
      }
      isAnimating.current = false;
    }, 1100);
  }, [activeIdx, lenis]);

  const handlePrev = useCallback(() => {
    if (isAnimating.current) return;
    if (activeIdx <= 0) return;

    isAnimating.current = true;
    setActiveIdx((prev) => prev - 1);
    lenis?.stop();

    window.scrollTo({ top: 0, behavior: "instant" });

    setTimeout(() => {
      isAnimating.current = false;
    }, 1100);
  }, [activeIdx, lenis]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleWheel = (e: WheelEvent) => {
      const scrollY = window.scrollY;

      // Downward wheel gesture
      if (e.deltaY > 5) {
        if (activeIdx < SECTIONS.length - 1) {
          e.preventDefault();
          handleNext();
        }
      }
      // Upward wheel gesture
      else if (e.deltaY < -5) {
        if (activeIdx > 0 && scrollY <= 10) {
          e.preventDefault();
          handlePrev();
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isAnimating.current) return;
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      const scrollY = window.scrollY;

      if (deltaY > 30 && activeIdx < SECTIONS.length - 1) {
        handleNext();
      } else if (deltaY < -30 && activeIdx > 0 && scrollY <= 10) {
        handlePrev();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [activeIdx, handleNext, handlePrev, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <>
        <HeroSection />
        <AboutSection isSectionActive={true} />
        <SkillsSection isSectionActive={true} />
        <ProjectsSection isSectionActive={true} />
        <ServiceSection isSectionActive={true} />
        <ExperienceSection isSectionActive={true} />
        <CtaSection isSectionActive={true} />
        <ContactSection isSectionActive={true} />
        <Footer />
      </>
    );
  }

  // Ultra-smooth luxurious cubic-bezier transition curves
  const transitionCurve = [0.22, 1, 0.36, 1] as const;
  const filmClosingCurve = [0.76, 0, 0.24, 1] as const;

  return (
    <div className="relative w-full bg-white">
      {/* Fullscreen Viewport Section Transition Container */}
      <div className="relative w-full h-screen min-h-screen overflow-hidden bg-white">
        
        {/* HERO SECTION (Index 0) */}
        <motion.div
          initial={false}
          animate={
            activeIdx === 0
              ? { y: "0%", opacity: 1 }
              : { y: "-100%", opacity: 0 }
          }
          transition={{
            duration: 1.2,
            delay: activeIdx === 0 ? 0.08 : 0,
            ease: transitionCurve,
          }}
          className="absolute inset-0 w-full h-full z-10 will-change-transform bg-white"
        >
          <HeroSection isSectionActive={activeIdx === 0} />
        </motion.div>

        {/* ABOUT SECTION (Index 1) */}
        <motion.div
          initial={false}
          animate={
            activeIdx === 1
              ? { y: "0%", opacity: 1 }
              : activeIdx > 1
              ? { y: "-100%", opacity: 0 }
              : { y: "100%", opacity: 0 }
          }
          transition={{
            duration: 1.2,
            delay: activeIdx === 1 ? 0.08 : 0,
            ease: transitionCurve,
          }}
          className="absolute inset-0 w-full h-full z-20 overflow-y-auto overflow-x-hidden will-change-transform bg-white"
        >
          <AboutSection isSectionActive={activeIdx === 1} />
        </motion.div>

        {/* SKILLS SECTION (Index 2) */}
        <motion.div
          initial={false}
          animate={
            activeIdx === 2
              ? { y: "0%", opacity: 1 }
              : activeIdx > 2
              ? { y: "-100%", opacity: 0 }
              : { y: "100%", opacity: 0 }
          }
          transition={{
            duration: 1.2,
            delay: activeIdx === 2 ? 0.08 : 0,
            ease: transitionCurve,
          }}
          className="absolute inset-0 w-full h-full z-30 overflow-y-auto overflow-x-hidden will-change-transform bg-white"
        >
          <SkillsSection isSectionActive={activeIdx === 2} />
        </motion.div>

        {/* PROJECTS SECTION (Index 3) */}
        <motion.div
          initial={false}
          animate={
            activeIdx === 3
              ? { y: "0%", opacity: 1 }
              : activeIdx > 3
              ? { y: "-100%", opacity: 0 }
              : { y: "100%", opacity: 0 }
          }
          transition={{
            duration: 1.2,
            delay: activeIdx === 3 ? 0.08 : 0,
            ease: transitionCurve,
          }}
          className="absolute inset-0 w-full h-full z-40 overflow-y-auto overflow-x-hidden will-change-transform bg-white"
        >
          <ProjectsSection isSectionActive={activeIdx === 3} />
        </motion.div>

        {/* SERVICE SECTION (Index 4) */}
        <motion.div
          initial={false}
          animate={
            activeIdx === 4
              ? { y: "0%", opacity: 1 }
              : activeIdx > 4
              ? { y: "-100%", opacity: 0 }
              : { y: "100%", opacity: 0 }
          }
          transition={{
            duration: 1.2,
            delay: activeIdx === 4 ? 0.08 : 0,
            ease: transitionCurve,
          }}
          className="absolute inset-0 w-full h-full z-50 overflow-y-auto overflow-x-hidden will-change-transform bg-white"
        >
          <ServiceSection isSectionActive={activeIdx === 4} />
        </motion.div>

        {/* EXPERIENCE SECTION (Index 5) */}
        <motion.div
          initial={false}
          animate={
            activeIdx === 5
              ? { y: "0%", opacity: 1 }
              : activeIdx > 5
              ? { y: "-100%", opacity: 0 }
              : { y: "100%", opacity: 0 }
          }
          transition={{
            duration: 1.2,
            delay: activeIdx === 5 ? 0.08 : 0,
            ease: transitionCurve,
          }}
          className="absolute inset-0 w-full h-full z-[60] overflow-y-auto overflow-x-hidden will-change-transform bg-white"
        >
          <ExperienceSection isSectionActive={activeIdx === 5} />
        </motion.div>

        {/* CTA SECTION (Index 6) - Features Cinematic Vertical Collapse ("Film Closing") Squeeze */}
        <motion.div
          initial={false}
          animate={
            activeIdx === 6
              ? {
                  y: "0%",
                  clipPath: "inset(0% 0% 0% 0%)",
                  opacity: 1,
                }
              : activeIdx === 7
              ? {
                  y: "0%",
                  clipPath: "inset(49.8% 0% 49.8% 0%)",
                  opacity: 0,
                }
              : {
                  y: "100%",
                  clipPath: "inset(0% 0% 0% 0%)",
                  opacity: 0,
                }
          }
          transition={{
            duration: 1.1,
            ease: filmClosingCurve,
          }}
          className="absolute inset-0 w-full h-full z-[70] overflow-hidden will-change-transform bg-white"
        >
          <CtaSection isSectionActive={activeIdx === 6} />
        </motion.div>

        {/* CONTACT SECTION (Index 7) */}
        <motion.div
          initial={false}
          animate={
            activeIdx === 7
              ? { y: "0%", opacity: 1 }
              : { y: "100%", opacity: 0 }
          }
          transition={{
            duration: activeIdx === 7 ? 1.1 : 0.8,
            ease: filmClosingCurve,
          }}
          className="absolute inset-0 w-full h-full z-[65] overflow-y-auto overflow-x-hidden will-change-transform bg-white"
        >
          <ContactSection isSectionActive={activeIdx === 7} />
        </motion.div>

      </div>
    </div>
  );
}
