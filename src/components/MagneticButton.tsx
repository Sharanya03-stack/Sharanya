"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  strength?: number;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  className = "",
  wrapperClassName = "inline-block",
  strength = 0.22,
  onClick,
  type = "button",
  disabled = false,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [canHover, setCanHover] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 240, damping: 20, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 240, damping: 20, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isMagnetic = canHover && !prefersReducedMotion && !disabled;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMagnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const offsetY = (e.clientY - (rect.top + rect.height / 2)) * strength;
    // Clamp max displacement to 7px for refined restraint
    rawX.set(Math.max(-7, Math.min(7, offsetX)));
    rawY.set(Math.max(-7, Math.min(7, offsetY)));
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={isMagnetic ? { x, y } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={wrapperClassName}
    >
      {onClick || type === "submit" || type === "reset" ? (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          aria-label={ariaLabel}
          className={className}
        >
          {children}
        </button>
      ) : (
        <div className={className}>{children}</div>
      )}
    </motion.div>
  );
}
