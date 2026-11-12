"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import { InkBleedController, type ThemeMode } from "@/lib/ink/inkTransition";

const THEME_STORAGE_KEY = "portfolio-theme";

interface ThemeContextValue {
  theme: ThemeMode;
  mounted: boolean;
  isTransitioning: boolean;
  toggleTheme: (triggerElement?: HTMLElement | null) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const controllerRef = useRef<InkBleedController | null>(null);

  // Sync React state with the theme already applied pre-paint by layout.tsx
  useEffect(() => {
    const initial =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(initial);
    setMounted(true);

    if (canvasRef.current) {
      controllerRef.current = new InkBleedController(canvasRef.current);
    }

    return () => {
      controllerRef.current?.destroy();
      controllerRef.current = null;
    };
  }, []);

  const applyThemeImmediate = useCallback((next: ThemeMode) => {
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore storage failures in restricted contexts
    }
    setTheme(next);
  }, []);

  const toggleTheme = useCallback(
    (triggerElement?: HTMLElement | null) => {
      const controller = controllerRef.current;
      if (controller?.isAnimating || isTransitioning) return;

      const current: ThemeMode =
        document.documentElement.dataset.theme === "light" ? "light" : "dark";
      const next: ThemeMode = current === "dark" ? "light" : "dark";

      // Capture exact viewport coordinates of the toggle button
      let origin = { x: window.innerWidth - 64, y: 32 };
      if (triggerElement) {
        const rect = triggerElement.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          origin = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
        }
      }

      if (!controller) {
        document.documentElement.dataset.themeFade = "active";
        applyThemeImmediate(next);
        window.setTimeout(() => {
          delete document.documentElement.dataset.themeFade;
        }, 260);
        return;
      }

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reducedMotion) {
        document.documentElement.dataset.themeFade = "active";
      }

      setIsTransitioning(true);

      const started = controller.trigger(
        next,
        origin,
        () => applyThemeImmediate(next),
        () => {
          setIsTransitioning(false);
          delete document.documentElement.dataset.themeFade;
        }
      );

      if (!started) {
        setIsTransitioning(false);
        delete document.documentElement.dataset.themeFade;
      }
    },
    [applyThemeImmediate, isTransitioning]
  );

  return (
    <ThemeContext.Provider
      value={{ theme, mounted, isTransitioning, toggleTheme }}
    >
      {children}
      {/* Fullscreen WebGL2 Ink-Bleed Overlay Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 w-screen h-screen pointer-events-none z-[55] hidden"
      />
    </ThemeContext.Provider>
  );
}
