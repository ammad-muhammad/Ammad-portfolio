"use client";
import React, { useRef, useEffect, useState, useMemo } from "react";

type Particle = {
  x: number; y: number; originalX: number; originalY: number;
  color: string; opacity: number; originalAlpha: number;
  velocityX: number; velocityY: number; angle: number; speed: number;
  shouldFadeQuickly?: boolean;
  isAmmad: boolean; // For different colors
};

type TextBoundaries = { left: number; right: number; width: number; };

declare global {
  interface HTMLCanvasElement { textBoundaries?: TextBoundaries; }
}

type Props = {
  text: string; // Expected "Muhammad Ammad"
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  revealDuration?: number;
  vaporizeDuration?: number;
  onComplete?: () => void;
};

export default function VaporizeText({
  text,
  fontFamily = "sans-serif",
  fontSize = 80,
  fontWeight = 700,
  revealDuration = 2500,
  vaporizeDuration = 2200,
  onComplete,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const doneRef = useRef(false);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const dpr = useMemo(() => {
    if (typeof window === "undefined") return 1;
    return window.devicePixelRatio * 1.5;
  }, []);

  // Observe wrapper size
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        setSize({ w: e.contentRect.width, h: e.contentRect.height });
      }
    });
    ro.observe(el);
    const r = el.getBoundingClientRect();
    setSize({ w: r.width, h: r.height });
    return () => ro.disconnect();
  }, []);

  // Initialize Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !size.w || !size.h) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    canvas.style.width = size.w + "px";
    canvas.style.height = size.h + "px";
    canvas.width = Math.floor(size.w * dpr);
    canvas.height = Math.floor(size.h * dpr);

    const fontStr = `${fontWeight} ${fontSize * dpr}px ${fontFamily}`;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontStr;
    // @ts-ignore
    ctx.letterSpacing = `${(fontSize * 0.1) * dpr}px`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Measure split for "Ammad" color
    const firstName = "Muhammad";
    const firstMetrics = ctx.measureText(firstName + " ");
    const fullMetrics = ctx.measureText(text);
    const startX = canvas.width / 2 - fullMetrics.width / 2;
    const ammadStartX = startX + firstMetrics.width;

    // Draw white for sampling
    ctx.fillStyle = "white";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    canvas.textBoundaries = {
      left: startX,
      right: startX + fullMetrics.width,
      width: fullMetrics.width,
    };

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const currentDPR = canvas.width / size.w;
    const sampleRate = Math.max(1, Math.round(currentDPR / 3));
    const particles: Particle[] = [];

    for (let y = 0; y < canvas.height; y += sampleRate) {
      for (let x = 0; x < canvas.width; x += sampleRate) {
        const idx = (y * canvas.width + x) * 4;
        if (data[idx + 3] > 0) {
          const originalAlpha = (data[idx + 3] / 255) * (sampleRate / currentDPR);
          const isAmmad = x >= ammadStartX;
          particles.push({
            x, y, originalX: x, originalY: y,
            color: isAmmad ? "rgba(34, 211, 238," : "rgba(255, 255, 255,", // Cyan for Ammad
            opacity: originalAlpha, originalAlpha,
            velocityX: 0, velocityY: 0, angle: 0, speed: 0,
            isAmmad
          });
        }
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesRef.current = particles;
  }, [size, text, fontFamily, fontSize, fontWeight, dpr]);

  // Main Animation Controller
  useEffect(() => {
    if (!particlesRef.current.length) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const boundaries = canvas.textBoundaries;
    if (!boundaries) return;

    let mode: "reveal" | "pause" | "vaporize" = "reveal";
    let revealProgress = 0;
    let vaporizeProgress = 0;
    let pauseTime = 0;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      let allVaporized = true;

      ctx.save();
      ctx.scale(dpr, dpr);

      if (mode === "reveal") {
        revealProgress += dt * 100 / (revealDuration / 1000);
        if (revealProgress >= 100) {
          revealProgress = 100;
          mode = "pause";
          pauseTime = 0;
        }
      } else if (mode === "pause") {
        pauseTime += dt;
        if (pauseTime >= 0.8) {
          mode = "vaporize";
        }
      } else if (mode === "vaporize") {
        vaporizeProgress += dt * 100 / (vaporizeDuration / 1000);
      }

      const revealX = boundaries.left + boundaries.width * revealProgress / 100;
      const vaporizeX = boundaries.left + boundaries.width * vaporizeProgress / 100;

      particles.forEach(p => {
        // REVEAL LOGIC
        const isRevealed = p.originalX <= revealX;
        if (!isRevealed) {
          allVaporized = false;
          return; 
        }

        // VAPORIZE LOGIC
        const shouldVaporize = mode === "vaporize" && p.originalX <= vaporizeX;

        if (shouldVaporize) {
          if (p.speed === 0) {
            p.angle = Math.random() * Math.PI * 2;
            p.speed = (Math.random() * 1.5 + 0.5) * 5;
            p.velocityX = Math.cos(p.angle) * p.speed;
            p.velocityY = Math.sin(p.angle) * p.speed;
            p.shouldFadeQuickly = Math.random() > 0.6;
          }

          if (p.shouldFadeQuickly) {
            p.opacity = Math.max(0, p.opacity - dt * 2);
          } else {
            const dx = p.originalX - p.x;
            const dy = p.originalY - p.y;
            p.velocityX = (p.velocityX + (Math.random()-0.5)*15 + dx*0.002) * 0.97;
            p.velocityY = (p.velocityY + (Math.random()-0.5)*15 + dy*0.002) * 0.97;
            p.x += p.velocityX * dt * 25;
            p.y += p.velocityY * dt * 15;
            p.opacity = Math.max(0, p.opacity - dt * 0.3);
          }
          if (p.opacity > 0.01) allVaporized = false;
        } else {
          // Keep at original position if revealed but not vaporized
          allVaporized = false;
          ctx.fillStyle = p.color + p.opacity + ")";
          ctx.fillRect(p.x / dpr, p.y / dpr, 1, 1);
        }

        if (shouldVaporize && p.opacity > 0) {
          ctx.fillStyle = p.color + p.opacity + ")";
          ctx.fillRect(p.x / dpr, p.y / dpr, 1, 1);
        }
      });

      ctx.restore();

      if (mode === "vaporize" && vaporizeProgress >= 100 && allVaporized) {
        if (!doneRef.current) {
          doneRef.current = true;
          onComplete?.();
        }
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [particlesRef.current.length, revealDuration, vaporizeDuration, dpr, onComplete]);

  return (
    <div ref={wrapperRef} className="w-full h-full pointer-events-none">
      <canvas ref={canvasRef} className="pointer-events-none" />
    </div>
  );
}
