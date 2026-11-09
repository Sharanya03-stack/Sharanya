"use client";

import { useEffect, useRef } from "react";

interface NodePoint {
  baseX: number;
  baseY: number;
  baseZ: number;
  scatterX: number;
  scatterY: number;
  scatterZ: number;
  maxDisplacement: number;
  isAccent: boolean; // Sunset Orange node vs Electric Blue
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

    // Responsive node count and scale
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const nodeCount = isMobile ? 48 : isTablet ? 84 : 124;
    const baseRadius = isMobile ? 180 : isTablet ? 270 : 360;
    const baseConnectionDist = isMobile ? 85 : isTablet ? 115 : 145;

    // Generate points on sphere using Fibonacci distribution + deterministic scattering
    const points: NodePoint[] = [];
    const phi = Math.PI * (Math.sqrt(5) - 1); // Golden ratio

    for (let i = 0; i < nodeCount; i++) {
      const yNorm = 1 - (i / (nodeCount - 1)) * 2; // from 1 to -1
      const radiusAtY = Math.sqrt(Math.max(0, 1 - yNorm * yNorm));
      const theta = phi * i;

      const normX = Math.cos(theta) * radiusAtY;
      const normY = yNorm;
      const normZ = Math.sin(theta) * radiusAtY;

      const baseX = normX * baseRadius;
      const baseY = normY * baseRadius;
      const baseZ = normZ * baseRadius;

      // Deterministic scattering vector: radial push combined with organic curl
      const curlX = Math.sin(i * 3.71);
      const curlY = Math.cos(i * 5.13);
      const curlZ = Math.sin(i * 7.89);

      // Normalizing the scatter vector
      const rawScatterX = normX * 0.75 + curlX * 0.25;
      const rawScatterY = normY * 0.75 + curlY * 0.25;
      const rawScatterZ = normZ * 0.75 + curlZ * 0.25;
      const mag = Math.sqrt(rawScatterX * rawScatterX + rawScatterY * rawScatterY + rawScatterZ * rawScatterZ) || 1;

      // Maximum displacement per particle (disperses 200px to 550px outward)
      const maxDisplacement = (isMobile ? 160 : 320) + (Math.sin(i * 2.14) * 0.5 + 0.5) * (isMobile ? 120 : 260);

      // 1 in 7 nodes is Sunset Orange (#FF713D), others are Electric Blue (#286BFF)
      const isAccent = i % 7 === 0;

      points.push({
        baseX,
        baseY,
        baseZ,
        scatterX: (rawScatterX / mag),
        scatterY: (rawScatterY / mag),
        scatterZ: (rawScatterZ / mag),
        maxDisplacement,
        isAccent,
        pulseOffset: (i * 0.3) % (Math.PI * 2),
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
    let rotX = 0.20;
    let rotY = 0;
    let targetRotX = 0.20;
    let targetRotY = 0;
    let lastTime = performance.now();

    // Scroll progress tracker
    let currentScrollProgress = 0;
    let targetScrollProgress = 0;

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollProgress = docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0;

      // Scroll-linked continuous rotation
      targetRotY = targetScrollProgress * Math.PI * 4.0;
      targetRotX = 0.20 + targetScrollProgress * Math.PI * 1.5;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Render loop
    const render = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Smooth interpolation for scroll progress (enables buttery forward & reverse motion)
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08;

      if (!prefersReducedMotion) {
        rotY += 0.09 * delta; // slow continuous baseline rotation
        rotX += (targetRotX - rotX) * 0.04;
        rotY += (targetRotY - rotY) * 0.04;
      }

      ctx.clearRect(0, 0, width, height);

      // Disintegration factor: 0 at top, continuously and deterministically increasing downward
      // Smooth curve: f(s) = s^1.15
      const disintegrationFactor = prefersReducedMotion ? 0 : Math.pow(currentScrollProgress, 1.15);

      // Dynamic position across sections
      // Hero (progress < 0.15): positioned toward the right
      // Middle sections: centers gradually as it disassembles
      const heroCenterX = isMobile ? width * 0.5 : width * 0.70;
      const centeredX = width * 0.5;
      const transitionProgress = Math.min(currentScrollProgress / 0.25, 1);
      const centerX = heroCenterX * (1 - transitionProgress) + centeredX * transitionProgress;
      const centerY = isMobile ? height * 0.60 : height * 0.48;

      // Scale and baseline opacity
      const sphereScale = isMobile ? 0.65 : 1.0;
      const globalAlpha = isMobile ? 0.45 : 0.78;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Perspective projection constants
      const fov = 680;
      const cameraDistance = 580;

      // 1. Calculate dynamic particle 3D positions with scroll-driven displacement
      const projected = points.map((p) => {
        // Displaced coordinate along deterministic scattering vector
        const currentDisplacement = p.maxDisplacement * disintegrationFactor;
        const curX = p.baseX + p.scatterX * currentDisplacement;
        const curY = p.baseY + p.scatterY * currentDisplacement;
        const curZ = p.baseZ + p.scatterZ * currentDisplacement;

        // Rotate around Y-axis
        const x1 = curX * cosY + curZ * sinY;
        const z1 = -curX * sinY + curZ * cosY;

        // Rotate around X-axis
        const y2 = curY * cosX - z1 * sinX;
        const z2 = curY * sinX + z1 * cosX;

        // Perspective scale factor
        const scale = (fov / (fov + z2 + cameraDistance)) * sphereScale;
        const sx = centerX + x1 * scale;
        const sy = centerY + y2 * scale;

        // Depth ratio from 0 (far background) to 1 (near foreground)
        const depth = Math.max(0, Math.min(1, (z2 + baseRadius * 1.5) / (baseRadius * 3)));

        return {
          sx,
          sy,
          z: z2,
          depth,
          isAccent: p.isAccent,
        };
      });

      // 2. Dynamic connecting lines: disconnect as particles fly apart
      // Max connection threshold contracts as disintegration proceeds
      const currentMaxDist = baseConnectionDist * sphereScale * Math.max(0.2, 1 - disintegrationFactor * 0.65);
      ctx.lineWidth = 0.85;

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];

          const dx = p1.sx - p2.sx;
          const dy = p1.sy - p2.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < currentMaxDist) {
            const distAlpha = 1 - dist / currentMaxDist;
            const depthAlpha = Math.max(0.12, (p1.depth + p2.depth) / 2);
            // Dynamic fade with disintegration: lines break away organically
            const lineAlpha = distAlpha * depthAlpha * 0.50 * globalAlpha * (1 - disintegrationFactor * 0.45);

            if (lineAlpha > 0.01) {
              ctx.strokeStyle = `rgba(40, 107, 255, ${lineAlpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.sx, p1.sy);
              ctx.lineTo(p2.sx, p2.sy);
              ctx.stroke();
            }
          }
        }
      }

      // 3. Render particles with Electric Blue & Sunset Orange glow
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const depthAlpha = Math.max(0.25, p.depth) * globalAlpha;
        const nodeRadius = (p.isAccent ? 3.0 : 2.2) * (0.65 + p.depth * 0.55) * sphereScale;

        if (p.isAccent) {
          // Sunset Orange Accent Node (#FF713D)
          ctx.fillStyle = `rgba(255, 113, 61, ${depthAlpha * 0.95})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, nodeRadius, 0, Math.PI * 2);
          ctx.fill();

          // Restrained neon-style illumination glow
          if (p.depth > 0.4) {
            ctx.fillStyle = `rgba(255, 113, 61, ${depthAlpha * 0.22})`;
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, nodeRadius * 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // Electric Blue Node (#286BFF)
          ctx.fillStyle = `rgba(40, 107, 255, ${depthAlpha * 0.92})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, nodeRadius, 0, Math.PI * 2);
          ctx.fill();

          // Restrained neon-style illumination glow
          if (p.depth > 0.4) {
            ctx.fillStyle = `rgba(40, 107, 255, ${depthAlpha * 0.20})`;
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, nodeRadius * 2.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
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
        className="w-full h-full block opacity-95 transition-opacity duration-300"
      />
    </div>
  );
}
