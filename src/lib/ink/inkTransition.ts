import gsap from "gsap";
import { createNoiseTexture } from "./noiseTexture";
import { createProgram, type InkProgram } from "./program";
import { FULLSCREEN_VERT, INK_FRAG } from "./shaders";

export type ThemeMode = "dark" | "light";

export interface InkPoint {
  x: number;
  y: number;
}

interface InkPalette {
  ink: [number, number, number];
  rim: [number, number, number];
}

// Target ink colors matching Warm Noir (#0F0E0D) and Parchment/Burgundy (#F1E8D8)
const INK_COLORS: Record<ThemeMode, InkPalette> = {
  light: {
    ink: [241 / 255, 232 / 255, 216 / 255], // #F1E8D8 Warm Parchment
    rim: [195 / 255, 166 / 255, 134 / 255], // Warm sepia/champagne rim
  },
  dark: {
    ink: [15 / 255, 14 / 255, 13 / 255], // #0F0E0D Warm Noir
    rim: [48 / 255, 34 / 255, 28 / 255], // Deep warm charcoal/ember rim
  },
};

const SPREAD = {
  duration: 1.0,
  growth: 0.72,
  cleanupFrom: 0.42,
  cleanupPow: 2,
  cleanupReach: 0.42,
  fadeOut: 0.22,
};

function renderScale(): number {
  const isCoarse = window.matchMedia("(pointer: coarse)").matches;
  return Math.min(window.devicePixelRatio || 1, isCoarse ? 1.5 : 2);
}

function farthestCorner(pt: InkPoint): number {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return Math.max(
    Math.hypot(pt.x, pt.y),
    Math.hypot(w - pt.x, pt.y),
    Math.hypot(pt.x, h - pt.y),
    Math.hypot(w - pt.x, h - pt.y)
  );
}

export class InkBleedController {
  private readonly canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext | null = null;
  private program: InkProgram | null = null;
  private vao: WebGLVertexArrayObject | null = null;
  private noise: WebGLTexture | null = null;
  private scale = 1;
  private lost = false;

  private tween: gsap.core.Tween | null = null;
  private fadeTween: gsap.core.Tween | null = null;
  private animating = false;
  private readonly state = { progress: 0, time: 0 };

  private activeCenter: InkPoint = { x: 0, y: 0 };
  private activeMaxDist = 1000;
  private activeSeed = { x: 1.2, y: 2.3, angle: 0.5 };
  private activeTarget: ThemeMode = "light";

  private onContextLostBound = (e: Event) => {
    e.preventDefault();
    this.lost = true;
    this.cancel();
  };

  private onContextRestoredBound = () => {
    this.lost = false;
    this.initWebGL();
  };

  private onResizeBound = () => {
    this.resize();
    if (this.animating) {
      this.activeMaxDist = farthestCorner(this.activeCenter);
      this.drawFrame();
    }
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.initWebGL();

    this.canvas.addEventListener("webglcontextlost", this.onContextLostBound);
    this.canvas.addEventListener(
      "webglcontextrestored",
      this.onContextRestoredBound
    );
    window.addEventListener("resize", this.onResizeBound);
  }

  get isAnimating(): boolean {
    return this.animating;
  }

  private initWebGL(): void {
    const gl = this.canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      this.gl = null;
      return;
    }

    try {
      this.gl = gl;
      this.program = createProgram(gl, FULLSCREEN_VERT, INK_FRAG);
      const vao = gl.createVertexArray();
      if (!vao) throw new Error("createVertexArray failed");
      this.vao = vao;
      this.noise = createNoiseTexture(gl);
      this.resize();
    } catch {
      this.gl = null;
    }
  }

  private resize(): void {
    if (!this.gl) return;
    this.scale = renderScale();
    const w = Math.max(1, Math.round(window.innerWidth * this.scale));
    const h = Math.max(1, Math.round(window.innerHeight * this.scale));
    if (this.canvas.width !== w) this.canvas.width = w;
    if (this.canvas.height !== h) this.canvas.height = h;
  }

  trigger(
    targetTheme: ThemeMode,
    origin: InkPoint,
    onThemeFlip: () => void,
    onDone: () => void
  ): boolean {
    if (this.animating) return false;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !this.gl || this.lost || !this.program) {
      this.animating = true;
      onThemeFlip();
      const timer = window.setTimeout(() => {
        this.animating = false;
        onDone();
      }, 240);
      this.tween = gsap.delayedCall(0.24, () => {
        window.clearTimeout(timer);
      }) as unknown as gsap.core.Tween;
      return true;
    }

    this.animating = true;
    this.activeTarget = targetTheme;
    this.activeCenter = origin;
    this.activeMaxDist = farthestCorner(origin);
    this.activeSeed = {
      x: Math.random() * 10,
      y: Math.random() * 10,
      angle: Math.random() * Math.PI * 2,
    };
    this.state.progress = 0;
    this.state.time = 0;

    this.resize();
    gsap.set(this.canvas, { opacity: 1, display: "block" });
    this.drawFrame();

    this.tween = gsap.to(this.state, {
      progress: 1,
      duration: SPREAD.duration,
      ease: "power3.out",
      onUpdate: () => {
        this.state.time = this.tween?.time() ?? 0;
        this.drawFrame();
      },
      onComplete: () => {
        this.tween = null;
        // Flip live theme while completely covered by the ink canvas
        onThemeFlip();

        this.fadeTween = gsap.to(this.canvas, {
          opacity: 0,
          duration: SPREAD.fadeOut,
          ease: "power2.out",
          onComplete: () => {
            this.fadeTween = null;
            this.animating = false;
            gsap.set(this.canvas, { display: "none" });
            onDone();
          },
        });
      },
    });

    return true;
  }

  private drawFrame(): void {
    const gl = this.gl;
    const prog = this.program;
    if (!gl || !prog || !this.vao || !this.noise || this.lost) return;

    const { progress, time } = this.state;
    const maxDist = this.activeMaxDist;
    const linear = Math.min(1, time / SPREAD.duration);
    const ramp = Math.max(
      0,
      (linear - SPREAD.cleanupFrom) / (1 - SPREAD.cleanupFrom)
    );
    const cleanup =
      ramp ** SPREAD.cleanupPow * maxDist * SPREAD.cleanupReach +
      Math.max(0, (linear - 0.96) / 0.04) * maxDist;
    const radius = progress * maxDist * SPREAD.growth;

    const palette = INK_COLORS[this.activeTarget];
    const cosA = Math.cos(this.activeSeed.angle);
    const sinA = Math.sin(this.activeSeed.angle);

    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(prog.program);
    gl.bindVertexArray(this.vao);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.noise);
    gl.uniform1i(prog.uniform("uNoise"), 0);

    gl.uniform1f(prog.uniform("uCanvasScale"), this.scale);
    gl.uniform2f(
      prog.uniform("uRes"),
      this.canvas.width,
      this.canvas.height
    );
    gl.uniform2f(
      prog.uniform("uCenter"),
      this.activeCenter.x,
      this.activeCenter.y
    );
    gl.uniform1f(prog.uniform("uRadius"), radius);
    gl.uniform1f(prog.uniform("uCleanup"), cleanup);
    gl.uniform1f(prog.uniform("uTime"), time);
    gl.uniform1f(
      prog.uniform("uRef"),
      Math.max(window.innerWidth, window.innerHeight, 320)
    );
    gl.uniform2f(
      prog.uniform("uSeed"),
      this.activeSeed.x,
      this.activeSeed.y
    );
    gl.uniformMatrix2fv(
      prog.uniform("uSeedRot"),
      false,
      new Float32Array([cosA, sinA, -sinA, cosA])
    );

    gl.uniform1f(prog.uniform("uTendril"), 1.05);
    gl.uniform1f(prog.uniform("uNoiseScale"), 1.0);
    gl.uniform1f(prog.uniform("uSoftness"), 1.6);
    gl.uniform1f(prog.uniform("uDrift"), 1.0);
    gl.uniform3fv(prog.uniform("uInkColor"), palette.ink);
    gl.uniform3fv(prog.uniform("uRimColor"), palette.rim);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  cancel(): void {
    this.tween?.kill();
    this.fadeTween?.kill();
    this.tween = null;
    this.fadeTween = null;
    this.animating = false;
    gsap.set(this.canvas, { opacity: 0, display: "none" });
  }

  destroy(): void {
    this.cancel();
    this.canvas.removeEventListener(
      "webglcontextlost",
      this.onContextLostBound
    );
    this.canvas.removeEventListener(
      "webglcontextrestored",
      this.onContextRestoredBound
    );
    window.removeEventListener("resize", this.onResizeBound);

    if (this.gl) {
      if (this.noise) this.gl.deleteTexture(this.noise);
      if (this.vao) this.gl.deleteVertexArray(this.vao);
      if (this.program) this.gl.deleteProgram(this.program.program);
    }
    this.gl = null;
    this.program = null;
    this.vao = null;
    this.noise = null;
  }
}
