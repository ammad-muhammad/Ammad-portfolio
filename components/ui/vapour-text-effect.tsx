"use client";
import React, { useRef, useEffect, useState, useMemo } from "react";

type Particle = {
  x: number; y: number; originalX: number; originalY: number;
  colorPrefix: string; opacity: number; originalAlpha: number;
  velocityX: number; velocityY: number; angle: number; speed: number;
  shouldFadeQuickly?: boolean;
  isAmmad: boolean;
};

type TextBoundaries = { left: number; right: number; width: number; };

declare global {
  interface HTMLCanvasElement { textBoundaries?: TextBoundaries; }
}

type Props = {
  text: string;
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
  revealDuration = 1800,
  vaporizeDuration = 1600,
  onComplete,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const doneRef = useRef(false);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Cap DPR at 1.5 to prevent memory explosion & frame drops on 3x-4x DPR screens
  const dpr = useMemo(() => {
    if (typeof window === "undefined") return 1;
    return Math.min(window.devicePixelRatio || 1, 1.5);
  }, []);

  // Observe wrapper size
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        setSize({ w: e.contentRect.width, h: e.contentRect.height });
      }
    });
    ro.observe(el);
    const r = el.getBoundingClientRect();
    setSize({ w: r.width, h: r.height });
    return () => ro.disconnect();
  }, []);

  // Initialize Particles with dynamic sample rate (~400 particles max)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !size.w || !size.h) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.style.width = size.w + "px";
    canvas.style.height = size.h + "px";
    canvas.width = Math.floor(size.w * dpr);
    canvas.height = Math.floor(size.h * dpr);

    const fontStr = `${fontWeight} ${fontSize * dpr}px ${fontFamily}`;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontStr;
    // @ts-ignore
    ctx.letterSpacing = `${fontSize * 0.08 * dpr}px`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const firstName = "Muhammad";
    const firstMetrics = ctx.measureText(firstName + " ");
    const fullMetrics = ctx.measureText(text);
    const startX = canvas.width / 2 - fullMetrics.width / 2;

    ctx.fillStyle = "white";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    canvas.textBoundaries = {
      left: startX,
      right: startX + fullMetrics.width,
      width: fullMetrics.width,
    };

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Calculate sample rate to keep particle count ~400-600 max
    const particleStep = Math.max(3, Math.floor((fontSize * dpr) / 12));
    const particles: Particle[] = [];
    const ammadStartX = startX + firstMetrics.width;

    for (let y = 0; y < canvas.height; y += particleStep) {
      for (let x = 0; x < canvas.width; x += particleStep) {
        const idx = (y * canvas.width + x) * 4;
        if (data[idx + 3] > 80) {
          const isAmmad = x >= ammadStartX;
          particles.push({
            x,
            y,
            originalX: x,
            originalY: y,
            colorPrefix: isAmmad ? "rgba(34, 211, 238," : "rgba(255, 255, 255,",
            opacity: 1,
            originalAlpha: 1,
            velocityX: 0,
            velocityY: 0,
            angle: 0,
            speed: 0,
            isAmmad,
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
      const dt = Math.min((now - lastTime) / 1000, 0.05); // cap delta time
      lastTime = now;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const fontStr = `${fontWeight} ${fontSize * dpr}px ${fontFamily}`;
      const revealX = boundaries.left + (boundaries.width * revealProgress) / 100;
      const vaporizeX = boundaries.left + (boundaries.width * vaporizeProgress) / 100;

      if (mode === "reveal") {
        revealProgress += dt * 100 / (revealDuration / 1000);
        if (revealProgress >= 100) {
          revealProgress = 100;
          mode = "pause";
          pauseTime = 0;
        }
      } else if (mode === "pause") {
        pauseTime += dt;
        if (pauseTime >= 0.5) {
          mode = "vaporize";
        }
      } else if (mode === "vaporize") {
        vaporizeProgress += dt * 100 / (vaporizeDuration / 1000);
      }

      // Render crisp vector text for un-vaporized portion
      ctx.save();
      ctx.beginPath();
      if (mode === "reveal") {
        ctx.rect(0, 0, revealX, canvas.height);
      } else if (mode === "pause") {
        ctx.rect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.rect(vaporizeX, 0, canvas.width - vaporizeX, canvas.height);
      }
      ctx.clip();

      ctx.font = fontStr;
      // @ts-ignore
      ctx.letterSpacing = `${fontSize * 0.08 * dpr}px`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const grad = ctx.createLinearGradient(boundaries.left, 0, boundaries.right, 0);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.55, "#e0f2fe");
      grad.addColorStop(1, "#22d3ee");
      ctx.fillStyle = grad;
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      ctx.restore();

      // Animate vaporizing particles only during vaporize phase
      if (mode === "vaporize") {
        const particles = particlesRef.current;
        let activeParticles = 0;
        const particleSize = Math.max(1.5, 2 * dpr);

        particles.forEach((p) => {
          if (p.originalX <= vaporizeX) {
            if (p.speed === 0) {
              p.angle = Math.random() * Math.PI * 2;
              p.speed = (Math.random() * 1.5 + 0.5) * 4;
              p.velocityX = Math.cos(p.angle) * p.speed;
              p.velocityY = Math.sin(p.angle) * p.speed;
              p.shouldFadeQuickly = Math.random() > 0.5;
            }

            if (p.shouldFadeQuickly) {
              p.opacity = Math.max(0, p.opacity - dt * 2.5);
            } else {
              p.velocityX = (p.velocityX + (Math.random() - 0.5) * 12) * 0.96;
              p.velocityY = (p.velocityY + (Math.random() - 0.5) * 12 - 0.5) * 0.96;
              p.x += p.velocityX * dt * 20;
              p.y += p.velocityY * dt * 20;
              p.opacity = Math.max(0, p.opacity - dt * 0.6);
            }

            if (p.opacity > 0.02) {
              activeParticles++;
              ctx.fillStyle = `${p.colorPrefix}${p.opacity.toFixed(2)})`;
              ctx.fillRect(p.x, p.y, particleSize, particleSize);
            }
          }
        });

        if (vaporizeProgress >= 100 && activeParticles === 0) {
          if (!doneRef.current) {
            doneRef.current = true;
            onComplete?.();
          }
          return;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [particlesRef.current.length, revealDuration, vaporizeDuration, dpr, onComplete, fontFamily, fontSize, fontWeight, text]);

  return (
    <div ref={wrapperRef} className="w-full h-full pointer-events-none flex items-center justify-center">
      <canvas ref={canvasRef} className="pointer-events-none" />
    </div>
  );
}

