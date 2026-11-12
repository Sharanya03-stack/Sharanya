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
  tier: "primary" | "secondary" | "accent";
  repelX: number;
  repelY: number;
}

interface SpherePalette {
  primary: string;
  secondary: string;
  accent: string;
  lineBase: string;
  lineNear: string;
  baseAlpha: number;
}

const SPHERE_PALETTES: Record<"dark" | "light", SpherePalette> = {
  dark: {
    primary: "243, 238, 228", // #F3EEE4 Bone
    secondary: "201, 168, 124", // #C9A87C Champagne
    accent: "228, 87, 46", // #E4572E Ember
    lineBase: "140, 133, 123", // #8C857B Warm Grey
    lineNear: "201, 168, 124", // #C9A87C Champagne
    baseAlpha: 0.72,
  },
  light: {
    primary: "64, 56, 50", // #403832 Espresso Body
    secondary: "116, 122, 85", // #747A55 Olive
    accent: "109, 38, 61", // #6D263D Burgundy
    lineBase: "129, 117, 104", // #817568 Warm Taupe
    lineNear: "109, 38, 61", // #6D263D Burgundy
    baseAlpha: 0.56,
  },
};

export function NetworkSphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = motionQuery.matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    let activeTheme: "dark" | "light" =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const nodeCount = isMobile ? 46 : isTablet ? 82 : 118;
    const baseRadius = isMobile ? 170 : isTablet ? 260 : 350;
    const baseConnectionDist = isMobile ? 84 : isTablet ? 114 : 142;

    const points: NodePoint[] = [];
    const phi = Math.PI * (Math.sqrt(5) - 1);

    for (let i = 0; i < nodeCount; i++) {
      const yNorm = 1 - (i / (nodeCount - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - yNorm * yNorm));
      const theta = phi * i;

      const normX = Math.cos(theta) * radiusAtY;
      const normY = yNorm;
      const normZ = Math.sin(theta) * radiusAtY;

      const baseX = normX * baseRadius;
      const baseY = normY * baseRadius;
      const baseZ = normZ * baseRadius;

      const curlX = Math.sin(i * 3.71);
      const curlY = Math.cos(i * 5.13);
      const curlZ = Math.sin(i * 7.89);

      const rawScatterX = normX * 0.75 + curlX * 0.25;
      const rawScatterY = normY * 0.75 + curlY * 0.25;
      const rawScatterZ = normZ * 0.75 + curlZ * 0.25;
      const mag =
        Math.sqrt(
          rawScatterX * rawScatterX +
            rawScatterY * rawScatterY +
            rawScatterZ * rawScatterZ
        ) || 1;

      const maxDisplacement =
        (isMobile ? 150 : 300) +
        (Math.sin(i * 2.14) * 0.5 + 0.5) * (isMobile ? 110 : 240);

      let tier: NodePoint["tier"] = "primary";
      if (i % 9 === 0) {
        tier = "accent";
      } else if (i % 3 === 0) {
        tier = "secondary";
      }

      points.push({
        baseX,
        baseY,
        baseZ,
        scatterX: rawScatterX / mag,
        scatterY: rawScatterY / mag,
        scatterZ: rawScatterZ / mag,
        maxDisplacement,
        tier,
        repelX: 0,
        repelY: 0,
      });
    }

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();

    let rotX = 0.22;
    let rotY = 0;
    let targetRotX = 0.22;
    let targetRotY = 0;
    let lastTime = performance.now();

    let currentScrollProgress = 0;
    let targetScrollProgress = 0;

    let mouseX = -9999;
    let mouseY = -9999;
    let pointerActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!finePointer || prefersReducedMotion) return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      pointerActive = true;
    };

    const handleMouseLeave = () => {
      pointerActive = false;
    };

    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      targetScrollProgress =
        docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0;

      targetRotY = targetScrollProgress * Math.PI * 3.8;
      targetRotX = 0.22 + targetScrollProgress * Math.PI * 1.4;
    };

    const drawFrame = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (prefersReducedMotion) {
        currentScrollProgress = 0;
      } else {
        currentScrollProgress +=
          (targetScrollProgress - currentScrollProgress) * 0.08;
        rotY += 0.075 * delta;
        rotX += (targetRotX - rotX) * 0.04;
        rotY += (targetRotY - rotY) * 0.04;
      }

      ctx.clearRect(0, 0, width, height);

      const palette = SPHERE_PALETTES[activeTheme];
      const disintegrationFactor = prefersReducedMotion
        ? 0
        : Math.pow(currentScrollProgress, 1.15);

      const heroCenterX = isMobile
        ? width * 0.5
        : Math.min(width * 0.74, width * 0.5 + 340);
      const centeredX = width * 0.5;
      const transitionProgress = Math.min(currentScrollProgress / 0.25, 1);
      const centerX =
        heroCenterX * (1 - transitionProgress) + centeredX * transitionProgress;
      const centerY = isMobile ? height * 0.58 : height * 0.48;

      const sphereScale = isMobile ? 0.62 : 1.0;
      const globalAlpha = isMobile ? palette.baseAlpha * 0.52 : palette.baseAlpha;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const fov = 680;
      const cameraDistance = 580;
      const interactionRadius = 155;
      const maxRepulsion = 18;

      const projected = points.map((p) => {
        const currentDisplacement = p.maxDisplacement * disintegrationFactor;
        const curX = p.baseX + p.scatterX * currentDisplacement;
        const curY = p.baseY + p.scatterY * currentDisplacement;
        const curZ = p.baseZ + p.scatterZ * currentDisplacement;

        const x1 = curX * cosY + curZ * sinY;
        const z1 = -curX * sinY + curZ * cosY;

        const y2 = curY * cosX - z1 * sinX;
        const z2 = curY * sinX + z1 * cosX;

        const scale = (fov / (fov + z2 + cameraDistance)) * sphereScale;
        const baseSx = centerX + x1 * scale;
        const baseSy = centerY + y2 * scale;

        let targetRepelX = 0;
        let targetRepelY = 0;
        let mouseProximity = 0;

        if (pointerActive && !prefersReducedMotion) {
          const dx = baseSx - mouseX;
          const dy = baseSy - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0.1 && dist < interactionRadius) {
            const force = Math.pow(1 - dist / interactionRadius, 1.6);
            mouseProximity = force;
            targetRepelX = (dx / dist) * force * maxRepulsion;
            targetRepelY = (dy / dist) * force * maxRepulsion;
          }
        }

        p.repelX += (targetRepelX - p.repelX) * 0.1;
        p.repelY += (targetRepelY - p.repelY) * 0.1;

        const sx = baseSx + p.repelX;
        const sy = baseSy + p.repelY;

        const depth = Math.max(
          0,
          Math.min(1, (z2 + baseRadius * 1.5) / (baseRadius * 3))
        );

        return {
          sx,
          sy,
          depth,
          tier: p.tier,
          mouseProximity,
        };
      });

      const currentMaxDist =
        baseConnectionDist *
        sphereScale *
        Math.max(0.22, 1 - disintegrationFactor * 0.65);
      ctx.lineWidth = 0.8;

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];

          const dx = p1.sx - p2.sx;
          const dy = p1.sy - p2.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < currentMaxDist) {
            const distAlpha = 1 - dist / currentMaxDist;
            const depthAlpha = Math.max(0.1, (p1.depth + p2.depth) / 2);
            const nearCursor = Math.max(p1.mouseProximity, p2.mouseProximity);

            const baseLineAlpha =
              distAlpha *
              depthAlpha *
              0.34 *
              globalAlpha *
              (1 - disintegrationFactor * 0.45);
            const boostedAlpha = baseLineAlpha + nearCursor * 0.24 * distAlpha;

            if (boostedAlpha > 0.01) {
              const rgb = nearCursor > 0.15 ? palette.lineNear : palette.lineBase;
              ctx.strokeStyle = `rgba(${rgb}, ${Math.min(0.65, boostedAlpha)})`;
              ctx.beginPath();
              ctx.moveTo(p1.sx, p1.sy);
              ctx.lineTo(p2.sx, p2.sy);
              ctx.stroke();
            }
          }
        }
      }

      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const depthAlpha = Math.max(0.22, p.depth) * globalAlpha;
        const baseSize =
          p.tier === "accent" ? 2.8 : p.tier === "secondary" ? 2.3 : 1.9;
        const nodeRadius =
          baseSize *
          (0.65 + p.depth * 0.5 + p.mouseProximity * 0.35) *
          sphereScale;

        const rgb =
          p.tier === "accent"
            ? palette.accent
            : p.tier === "secondary"
            ? palette.secondary
            : palette.primary;
        const strength =
          p.tier === "accent" ? 0.92 : p.tier === "secondary" ? 0.88 : 0.85;

        ctx.fillStyle = `rgba(${rgb}, ${Math.min(1, depthAlpha * strength)})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const renderLoop = (time: number) => {
      drawFrame(time);
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    handleScroll();
    if (prefersReducedMotion) {
      drawFrame(performance.now());
    } else {
      animationFrameId = requestAnimationFrame(renderLoop);
    }

    const handleResizeAndRedraw = () => {
      handleResize();
      if (prefersReducedMotion) {
        drawFrame(performance.now());
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else if (!prefersReducedMotion) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      cancelAnimationFrame(animationFrameId);
      if (prefersReducedMotion) {
        drawFrame(performance.now());
      } else {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    // Observe theme changes on <html> so sphere recolors immediately upon theme switch
    const themeObserver = new MutationObserver(() => {
      activeTheme =
        document.documentElement.dataset.theme === "light" ? "light" : "dark";
      if (prefersReducedMotion) {
        drawFrame(performance.now());
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    window.addEventListener("resize", handleResizeAndRedraw);
    window.addEventListener("scroll", handleScroll, { passive: true });
    if (finePointer) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.addEventListener("mouseleave", handleMouseLeave);
    }
    document.addEventListener("visibilitychange", handleVisibility);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      themeObserver.disconnect();
      window.removeEventListener("resize", handleResizeAndRedraw);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      motionQuery.removeEventListener("change", handleMotionChange);
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
