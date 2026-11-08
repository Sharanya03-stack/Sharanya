"use client";

import { useEffect, useRef } from "react";

interface NodePoint {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  isAccent: boolean; // Sunset Orange node
  pulseOffset: number;
}

export function NetworkSphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Balanced node distribution & sizes
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const nodeCount = isMobile ? 38 : isTablet ? 68 : 96;
    const baseRadius = isMobile ? 180 : isTablet ? 280 : 380;
    const maxConnectionDist = isMobile ? 85 : isTablet ? 115 : 150;

    // Generate points on sphere using Fibonacci distribution
    const points: NodePoint[] = [];
    const phi = Math.PI * (Math.sqrt(5) - 1); // Golden ratio

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2; // from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Restrained, dimmed Sunset Orange accent nodes (~12%), rest Sky Blue / Dusk Blue
      const isAccent = i % 8 === 0;

      points.push({
        x: x * baseRadius,
        y: y * baseRadius,
        z: z * baseRadius,
        baseX: x * baseRadius,
        baseY: y * baseRadius,
        baseZ: z * baseRadius,
        isAccent,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Resize handler with DPR cap at 2
    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Continuous rotation angles & scroll-linked target
    let rotX = 0.25;
    let rotY = 0;
    let targetRotX = 0.25;
    let targetRotY = 0;
    let lastTime = performance.now();

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;

      // Scroll-linked rotation: Continuous re-orientation as user traverses sections
      targetRotY = progress * Math.PI * 5.5;
      targetRotX = 0.25 + progress * Math.PI * 2.2;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Render loop
    const render = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Continuous gentle rotation + smooth scroll interpolation (reduced rotation speed)
      if (!prefersReducedMotion) {
        rotY += 0.08 * delta;
        rotX += (targetRotX - rotX) * 0.04;
        rotY += (targetRotY - rotY) * 0.04;
      }

      ctx.clearRect(0, 0, width, height);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0;

      // Dynamic position based on viewport & scroll:
      // Hero (scrollProgress < 0.10): positioned on the RIGHT side to balance left typography
      // About (0.10 - 0.26): shifts to deep background with reduced opacity so it never obstructs portrait or cards
      // Remaining sections: ambient background presence
      let targetCenterX = isMobile ? width * 0.5 : isTablet ? width * 0.68 : width * 0.72;
      let targetCenterY = isMobile ? height * 0.65 : height * 0.50;
      let sphereScale = isMobile ? 0.58 : 1.0;
      let globalAlpha = isMobile ? 0.25 : 0.65; // Reduced by 25-30% as requested

      if (scrollProgress >= 0.08 && scrollProgress < 0.28) {
        // About Section: smoothly shift further back with dimmed opacity
        const aboutFactor = (scrollProgress - 0.08) / 0.20;
        targetCenterX = (isMobile ? width * 0.5 : width * 0.72) * (1 - aboutFactor) + (width * 0.5) * aboutFactor;
        targetCenterY = height * 0.48;
        sphereScale = isMobile ? 0.50 : 0.85;
        globalAlpha = isMobile ? 0.15 : 0.32; // Dimmed so portrait remains absolute hero
      } else if (scrollProgress >= 0.28 && scrollProgress < 0.72) {
        // Tech & Services: gentle centered ambient presence
        targetCenterX = width * 0.5;
        targetCenterY = height * 0.48;
        sphereScale = isMobile ? 0.60 : 0.95;
        globalAlpha = isMobile ? 0.20 : 0.58;
      } else if (scrollProgress >= 0.72 && scrollProgress <= 0.88) {
        // Projects section: slightly condensed
        targetCenterX = width * 0.5;
        targetCenterY = height * 0.48;
        sphereScale = isMobile ? 0.55 : 0.88;
        globalAlpha = isMobile ? 0.18 : 0.52;
      } else if (scrollProgress > 0.88) {
        // Smooth fade out in contact section
        targetCenterX = width * 0.5;
        sphereScale = 0.85;
        globalAlpha = Math.max(0, (isMobile ? 0.18 : 0.52) - (scrollProgress - 0.88) * 5.0);
      }

      const centerX = targetCenterX;
      const centerY = targetCenterY;

      if (globalAlpha <= 0.01) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Perspective projection constants
      const fov = 650;
      const cameraDistance = 580;

      // Project 3D points to 2D canvas coordinates
      const projected = points.map((p) => {
        // Rotate around Y-axis
        const x1 = p.baseX * cosY + p.baseZ * sinY;
        const z1 = -p.baseX * sinY + p.baseZ * cosY;

        // Rotate around X-axis
        const y2 = p.baseY * cosX - z1 * sinX;
        const z2 = p.baseY * sinX + z1 * cosX;

        // Perspective scale factor
        const scale = (fov / (fov + z2 + cameraDistance)) * sphereScale;
        const sx = centerX + x1 * scale;
        const sy = centerY + y2 * scale;

        // Depth ratio from 0 (far background) to 1 (near foreground)
        const depth = (z2 + baseRadius) / (baseRadius * 2);

        return {
          sx,
          sy,
          z: z2,
          depth,
          isAccent: p.isAccent,
        };
      });

      // 1. Draw fine connecting lines with Sky Blue & Dusk Blue tones
      ctx.lineWidth = 0.85;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];

          const dx = p1.sx - p2.sx;
          const dy = p1.sy - p2.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = maxConnectionDist * sphereScale;
          if (dist < maxDist) {
            const distAlpha = 1 - dist / maxDist;
            const depthAlpha = Math.max(0.10, (p1.depth + p2.depth) / 2);
            // Sophisticated sky blue connecting lines
            const lineAlpha = distAlpha * depthAlpha * 0.52 * globalAlpha;

            ctx.strokeStyle = `rgba(79, 195, 247, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.stroke();
          }
        }
      }

      // 2. Draw nodes with subdued, dimmed orange accents
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const depthAlpha = Math.max(0.20, p.depth) * globalAlpha;
        const nodeRadius = (p.isAccent ? 2.5 : 2.0) * (0.65 + p.depth * 0.55) * sphereScale;

        if (p.isAccent) {
          // Dimmed, restrained Sunset Orange Accent Node (#FF713D)
          ctx.fillStyle = `rgba(255, 113, 61, ${depthAlpha * 0.70})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, nodeRadius, 0, Math.PI * 2);
          ctx.fill();

          // Subtle subdued glow
          if (p.depth > 0.5) {
            ctx.fillStyle = `rgba(255, 113, 61, ${depthAlpha * 0.12})`;
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, nodeRadius * 2.0, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // Sky Blue / Dusk Blue Node (#4FC3F7)
          ctx.fillStyle = `rgba(79, 195, 247, ${depthAlpha * 0.85})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, nodeRadius, 0, Math.PI * 2);
          ctx.fill();

          // Subtle aura for foreground nodes
          if (p.depth > 0.6) {
            ctx.fillStyle = `rgba(79, 195, 247, ${depthAlpha * 0.14})`;
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, nodeRadius * 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    // Pause animation when tab is inactive to preserve CPU/battery
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-95 transition-opacity duration-500"
      />
    </div>
  );
}
