"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    let animationId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const setMorph = (fraction: number) => {
      if (text1Ref.current && text2Ref.current) {
        const blurAmount = Math.min(6 / fraction - 6, 20);
        text2Ref.current.style.filter = blurAmount > 0.5 ? `blur(${blurAmount.toFixed(1)}px)` : "none";
        text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
        fraction = 1 - fraction;
        const blurAmount1 = Math.min(6 / fraction - 6, 20);
        text1Ref.current.style.filter = blurAmount1 > 0.5 ? `blur(${blurAmount1.toFixed(1)}px)` : "none";
        text1Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      }
    };

    const doCooldown = () => {
      morph = 0;
      if (text1Ref.current && text2Ref.current) {
        text1Ref.current.style.filter = "none";
        text1Ref.current.style.opacity = "0%";
        text2Ref.current.style.filter = "none";
        text2Ref.current.style.opacity = "100%";
      }
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;
      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }
      setMorph(fraction);
    };

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) return; // Pause RAF loop if component is not visible on screen!

      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;
      cooldown -= dt;
      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length];
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
          }
        }
        doMorph();
      } else {
        doCooldown();
      }
    };

    animate();
    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [texts, morphTime, cooldownTime]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
      <div
        className="flex items-center justify-start w-full"
        style={{ filter: "url(#threshold)" }}
      >
        <span ref={text1Ref} className={cn("absolute inline-block select-none whitespace-nowrap", textClassName)} />
        <span ref={text2Ref} className={cn("absolute inline-block select-none whitespace-nowrap", textClassName)} />
      </div>
    </div>
  );
}
