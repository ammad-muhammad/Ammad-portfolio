"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VaporizeText from "@/components/ui/vapour-text-effect";

interface PageLoaderProps {
  onComplete: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [fontSize, setFontSize] = useState(96);

  useEffect(() => {
    const handleResize = () => {
      // Equivalent to clamp(1.4rem, 6.5vw, 5.5rem)
      // 1.4rem = 22.4px, 5.5rem = 88px
      const vwSize = window.innerWidth * 0.065;
      const clamped = Math.max(22.4, Math.min(vwSize, 88));
      setFontSize(clamped);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #000510 0%, #000d1a 40%, #000a14 70%, #000510 100%)"
        }}
      >
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: "600px",
            height: "300px",
            background: "radial-gradient(ellipse at center, rgba(6,182,212,0.06) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* UNIFIED CANVAS LOADER */}
        <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 flex items-center justify-center">
          <VaporizeText
            text="Muhammad Ammad"
            fontFamily="Orbitron, sans-serif"
            fontSize={fontSize}
            fontWeight={700}
            revealDuration={2400}
            vaporizeDuration={2200}
            onComplete={onComplete}
          />
        </div>

        {/* Progress bar hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
