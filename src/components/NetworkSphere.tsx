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

    // Substantially increased size: 1.6x - 1.9x previous dimensions
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const nodeCount = isMobile ? 48 : isTablet ? 76 : 106;
    const baseRadius = isMobile ? 220 : isTablet ? 310 : 410;
    const maxConnectionDist = isMobile ? 95 : isTablet ? 125 : 160;

    // Generate points on sphere using Fibonacci distribution
    const points: NodePoint[] = [];
    const phi = Math.PI * (Math.sqrt(5) - 1); // Golden ratio

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2; // from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Restrained Sunset Orange accent nodes (~14%), rest Dusk Blue
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

      // Continuous gentle rotation + smooth scroll interpolation
      if (!prefersReducedMotion) {
        rotY += 0.18 * delta;
        rotX += (targetRotX - rotX) * 0.06;
        rotY += (targetRotY - rotY) * 0.06;
      }

      ctx.clearRect(0, 0, width, height);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0;

      // Centered position across all sections:
      // True horizontal center (0.50), subtle vertical adjustment for comfortable balance
      const centerX = width * 0.5;
      const centerY = height * 0.48;

      // Scale & Global Alpha based on scroll section:
      // Hero (0.00 - 0.25): Full large central sphere
      // Tech (0.25 - 0.50): Remains full & visible through glass cards
      // Services (0.50 - 0.75): Prominent & rotating behind services
      // Projects (0.75 - 0.88): Slightly condensed (0.90) behind project cards
      // Contact (0.88 - 1.00): Fades gracefully to 0
      let sphereScale = 1.0;
      let globalAlpha = 0.88;

      if (scrollProgress > 0.88) {
        // Smooth fade out in contact section
        globalAlpha = Math.max(0, 0.88 - (scrollProgress - 0.88) * 7.0);
      } else if (scrollProgress > 0.72) {
        // Projects section: slightly condensed
        sphereScale = 0.92;
        globalAlpha = 0.82;
      }

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

      // 1. Draw fine connecting lines
      ctx.lineWidth = 0.9;
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
            const depthAlpha = Math.max(0.12, (p1.depth + p2.depth) / 2);
            // High visibility through glass cards:
            const lineAlpha = distAlpha * depthAlpha * 0.58 * globalAlpha;

            ctx.strokeStyle = `rgba(145, 184, 227, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.stroke();
          }
        }
      }

      // 2. Draw nodes with crisp depth hierarchy
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const depthAlpha = Math.max(0.25, p.depth) * globalAlpha;
        const nodeRadius = (p.isAccent ? 3.4 : 2.4) * (0.65 + p.depth * 0.6) * sphereScale;

        if (p.isAccent) {
          // Restrained Sunset Orange Accent Node (#FF713D)
          ctx.fillStyle = `rgba(255, 113, 61, ${depthAlpha * 0.98})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, nodeRadius, 0, Math.PI * 2);
          ctx.fill();

          // Subtle soft aura around foreground orange nodes
          if (p.depth > 0.45) {
            ctx.fillStyle = `rgba(255, 113, 61, ${depthAlpha * 0.22})`;
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, nodeRadius * 2.4, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // Dusk Blue Node (#91B8E3)
          ctx.fillStyle = `rgba(145, 184, 227, ${depthAlpha * 0.92})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, nodeRadius, 0, Math.PI * 2);
          ctx.fill();

          // Subtle aura for foreground dusk nodes
          if (p.depth > 0.6) {
            ctx.fillStyle = `rgba(145, 184, 227, ${depthAlpha * 0.16})`;
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
