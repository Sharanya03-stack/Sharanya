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

    // Responsive node count and radius
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const nodeCount = isMobile ? 36 : isTablet ? 54 : 72;
    const baseRadius = isMobile ? 140 : isTablet ? 180 : 230;
    const maxConnectionDist = isMobile ? 85 : 105;

    // Generate points on sphere using Fibonacci distribution
    const points: NodePoint[] = [];
    const phi = Math.PI * (Math.sqrt(5) - 1); // Golden ratio

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2; // from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Assign ~14% of nodes as Sunset Orange accents, rest Dusk Blue
      const isAccent = i % 7 === 0;

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

    // Resize handler
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

    // Continuous rotation angles & scroll tracking
    let rotX = 0.2;
    let rotY = 0;
    let targetRotX = 0.2;
    let targetRotY = 0;
    let lastTime = performance.now();

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;

      // Rotate sphere based on scroll depth
      targetRotY = progress * Math.PI * 4;
      targetRotX = 0.2 + progress * Math.PI * 1.5;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Render loop
    const render = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Continuous slow rotation + smooth scroll interpolation
      if (!prefersReducedMotion) {
        rotY += 0.15 * delta;
        rotX += (targetRotX - rotX) * 0.05;
        rotY += (targetRotY - rotY) * 0.05;
      }

      ctx.clearRect(0, 0, width, height);

      // Scroll-linked position and scale
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0;

      // Dynamic position:
      // Hero (0.0): Center-right, behind portrait
      // Tech (0.25): Slightly center
      // Services (0.5): Shifts right
      // Projects (0.75): Centers and scales down
      // Contact (0.95): Fades out
      let targetXPercent = 0.72;
      let targetYPercent = 0.38;
      let sphereScale = 1.0;
      let globalAlpha = 0.75;

      if (isMobile) {
        targetXPercent = 0.5;
        targetYPercent = 0.25;
        sphereScale = 0.85;
      } else if (scrollProgress < 0.25) {
        // Hero
        targetXPercent = 0.72;
        targetYPercent = 0.38;
        sphereScale = 1.0;
        globalAlpha = 0.8;
      } else if (scrollProgress < 0.5) {
        // Tech
        targetXPercent = 0.55 + (scrollProgress - 0.25) * 0.4;
        targetYPercent = 0.45;
        sphereScale = 0.95;
        globalAlpha = 0.65;
      } else if (scrollProgress < 0.75) {
        // Services
        targetXPercent = 0.75;
        targetYPercent = 0.5;
        sphereScale = 0.9;
        globalAlpha = 0.6;
      } else if (scrollProgress < 0.9) {
        // Projects
        targetXPercent = 0.5;
        targetYPercent = 0.55;
        sphereScale = 0.8;
        globalAlpha = 0.45;
      } else {
        // Contact (graceful fade)
        targetXPercent = 0.5;
        targetYPercent = 0.6;
        sphereScale = 0.7;
        globalAlpha = Math.max(0, 0.45 - (scrollProgress - 0.9) * 4.5);
      }

      if (globalAlpha <= 0.01) {
        // Don't render if completely faded in contact
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const centerX = width * targetXPercent;
      const centerY = height * targetYPercent;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const fov = 420;
      const cameraDistance = 380;

      // Project 3D points to 2D screen
      const projected = points.map((p) => {
        // Rotate around Y
        const x1 = p.baseX * cosY + p.baseZ * sinY;
        const z1 = -p.baseX * sinY + p.baseZ * cosY;

        // Rotate around X
        const y2 = p.baseY * cosX - z1 * sinX;
        const z2 = p.baseY * sinX + z1 * cosX;

        // Perspective scale
        const scale = (fov / (fov + z2 + cameraDistance)) * sphereScale;
        const sx = centerX + x1 * scale;
        const sy = centerY + y2 * scale;

        // Depth ratio from 0 (back) to 1 (front)
        const depth = (z2 + baseRadius) / (baseRadius * 2);

        return {
          sx,
          sy,
          z: z2,
          depth,
          isAccent: p.isAccent,
          pulseOffset: p.pulseOffset,
        };
      });

      // 1. Draw connecting lines between close nodes
      ctx.lineWidth = 0.8;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];

          const dx = p1.sx - p2.sx;
          const dy = p1.sy - p2.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDist * sphereScale) {
            const distAlpha = 1 - dist / (maxConnectionDist * sphereScale);
            const depthAlpha = Math.max(0.1, (p1.depth + p2.depth) / 2);
            const lineAlpha = distAlpha * depthAlpha * 0.45 * globalAlpha;

            ctx.strokeStyle = `rgba(145, 184, 227, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.stroke();
          }
        }
      }

      // 2. Draw nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const depthAlpha = Math.max(0.2, p.depth) * globalAlpha;
        const nodeRadius = (p.isAccent ? 2.8 : 2.0) * (0.6 + p.depth * 0.6) * sphereScale;

        if (p.isAccent) {
          // Sunset Orange Node (#FF713D)
          ctx.fillStyle = `rgba(255, 113, 61, ${depthAlpha * 0.95})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, nodeRadius, 0, Math.PI * 2);
          ctx.fill();

          // Subtle soft aura around key orange nodes
          if (p.depth > 0.5) {
            ctx.fillStyle = `rgba(255, 113, 61, ${depthAlpha * 0.18})`;
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, nodeRadius * 2.2, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // Dusk Blue Node (#91B8E3)
          ctx.fillStyle = `rgba(145, 184, 227, ${depthAlpha * 0.85})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, nodeRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    // Pause animation when tab is inactive to preserve battery
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
        className="w-full h-full block opacity-90 transition-opacity duration-700"
      />
    </div>
  );
}
