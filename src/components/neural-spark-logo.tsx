/**
 * NeuralSparkLogo — Canvas 随机漂移动画品牌 Logo
 * Ported from Agent-with-TTS. 9 色板 + 明暗主题自适应。
 */

"use client";

import { useRef, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";

/* ================================================================ */
/*  色板注册表 — 9 套配色                                              */
/* ================================================================ */

export interface LogoPalette {
  id: string;
  name: string;
  /** 暗色模式：中心 / 节点 / 辉光 / 连线 */
  c: string; n: string; g: string; l: string;
  /** 亮色模式 */
  lc: string; ln: string; lg: string; ll: string;
}

export const LOGO_PALETTES: LogoPalette[] = [
  { id: "white",    name: "Pure White",   c: "#ffffff", n: "#b0b0b0", g: "rgba(255,255,255,0.10)", l: "rgba(200,200,200,0.18)", lc: "#333", ln: "#888", lg: "rgba(50,50,50,0.06)", ll: "rgba(100,100,100,0.18)" },
  { id: "neutral",  name: "Warm Neutral", c: "#e8e0d4", n: "#c4b8a8", g: "rgba(228,220,210,0.10)", l: "rgba(196,184,168,0.20)", lc: "#8b7e6e", ln: "#a89980", lg: "rgba(139,126,110,0.06)", ll: "rgba(168,153,127,0.20)" },
  { id: "silver",   name: "Cool Silver",  c: "#d0d4e4", n: "#a0a8c0", g: "rgba(208,212,228,0.10)", l: "rgba(160,168,192,0.20)", lc: "#6b7394", ln: "#8891b0", lg: "rgba(107,115,148,0.06)", ll: "rgba(136,145,176,0.20)" },
  { id: "teal",     name: "Mint Teal",    c: "#78e0c8", n: "#50c4a8", g: "rgba(120,224,200,0.08)", l: "rgba(80,196,168,0.18)", lc: "#2a9e80", ln: "#40b898", lg: "rgba(42,158,128,0.06)", ll: "rgba(64,184,152,0.18)" },
  { id: "rose",     name: "Soft Rose",    c: "#f0b0b8", n: "#d48890", g: "rgba(240,176,184,0.08)", l: "rgba(212,136,144,0.18)", lc: "#c05060", ln: "#d07080", lg: "rgba(192,80,96,0.06)", ll: "rgba(208,112,128,0.18)" },
  { id: "sky",      name: "Sky Blue",     c: "#90c8f0", n: "#68a8d8", g: "rgba(144,200,240,0.08)", l: "rgba(104,168,216,0.18)", lc: "#3878b0", ln: "#5090c8", lg: "rgba(56,120,176,0.06)", ll: "rgba(80,144,200,0.18)" },
  { id: "lavender", name: "Lavender",     c: "#c8b8e8", n: "#a898d0", g: "rgba(200,184,232,0.08)", l: "rgba(168,152,208,0.18)", lc: "#7860b0", ln: "#9078c8", lg: "rgba(120,96,176,0.06)", ll: "rgba(144,120,200,0.18)" },
  { id: "peach",    name: "Warm Peach",   c: "#f0c8a0", n: "#d8a878", g: "rgba(240,200,160,0.08)", l: "rgba(216,168,120,0.18)", lc: "#b88040", ln: "#c89858", lg: "rgba(184,128,64,0.06)", ll: "rgba(200,152,88,0.18)" },
  { id: "slate",    name: "Dark Slate",   c: "#a0a8b0", n: "#788090", g: "rgba(160,168,176,0.08)", l: "rgba(120,128,144,0.18)", lc: "#505860", ln: "#687078", lg: "rgba(80,88,96,0.06)", ll: "rgba(104,112,120,0.18)" },
];

/* ---- 卫星节点归一化坐标 ---- */
const NODES = [
  { x: 0.27, y: 0.22 },
  { x: 0.78, y: 0.25 },
  { x: 0.82, y: 0.65 },
  { x: 0.22, y: 0.72 },
  { x: 0.50, y: 0.85 },
];

/* ================================================================ */
/*  DriftState — 中心随机漂移状态机                                    */
/* ================================================================ */

class DriftState {
  targetIdx: number;
  cx: number;
  cy: number;
  nextSwitch: number;
  elapsed: number;

  constructor() {
    this.targetIdx = Math.floor(Math.random() * NODES.length);
    this.cx = 0.5;
    this.cy = 0.5;
    this.nextSwitch = 0.8 + Math.random() * 0.6;
    this.elapsed = 0;
  }

  update(dt: number) {
    this.elapsed += dt;
    if (this.elapsed >= this.nextSwitch) {
      let next: number;
      do { next = Math.floor(Math.random() * NODES.length); } while (next === this.targetIdx);
      this.targetIdx = next;
      this.nextSwitch = 0.8 + Math.random() * 0.6;
      this.elapsed = 0;
    }
    const target = NODES[this.targetIdx];
    const goalX = 0.5 + (target.x - 0.5) * 0.5;
    const goalY = 0.5 + (target.y - 0.5) * 0.5;
    const speed = 3.0 * dt;
    this.cx += (goalX - this.cx) * speed;
    this.cy += (goalY - this.cy) * speed;
  }
}

/* ================================================================ */
/*  渲染一帧                                                          */
/* ================================================================ */

interface DrawColors { c: string; n: string; g: string; l: string }

function drawFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  colors: DrawColors,
  drift: DriftState,
  animated: boolean,
) {
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  ctx.clearRect(0, 0, w * dpr, w * dpr);
  ctx.save();
  ctx.scale(dpr, dpr);

  const nodeR = w * 0.032;
  const coreR = w * 0.07;
  const ccx = animated ? drift.cx * w : w * 0.5;
  const ccy = animated ? drift.cy * w : w * 0.5;

  const t = performance.now() / 1000;
  const nodes = NODES.map((nd, i) => {
    if (!animated) return { x: nd.x * w, y: nd.y * w };
    const amp = w * 0.06;
    const ox = Math.sin(t * 1.2 + i * 2.1) * amp * (0.7 + 0.3 * Math.sin(t * 0.5 + i));
    const oy = Math.cos(t * 1.0 + i * 1.7) * amp * (0.7 + 0.3 * Math.cos(t * 0.4 + i));
    return { x: nd.x * w + ox, y: nd.y * w + oy };
  });

  /* ---- 辉光 ---- */
  const glowR = coreR * 2.8;
  const glow = ctx.createRadialGradient(ccx, ccy, 0, ccx, ccy, glowR);
  glow.addColorStop(0, colors.g);
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(ccx, ccy, glowR, 0, Math.PI * 2);
  ctx.fill();

  /* ---- 连线 ---- */
  nodes.forEach((nd, i) => {
    const isTarget = animated && i === drift.targetIdx;
    ctx.beginPath();
    ctx.moveTo(ccx, ccy);
    ctx.lineTo(nd.x, nd.y);
    ctx.strokeStyle = colors.l;
    ctx.lineWidth = isTarget ? 1.8 : 1;
    ctx.globalAlpha = isTarget ? 0.5 : 0.25;
    ctx.stroke();
    ctx.globalAlpha = 1;
  });

  /* ---- 卫星节点 ---- */
  nodes.forEach((nd, i) => {
    const isTarget = animated && i === drift.targetIdx;
    const r = nodeR * (isTarget ? 1.15 : 0.85 + i * 0.06);
    ctx.globalAlpha = isTarget ? 0.8 : 0.45;
    ctx.beginPath();
    ctx.arc(nd.x, nd.y, r, 0, Math.PI * 2);
    ctx.fillStyle = colors.n;
    ctx.fill();
    ctx.globalAlpha = 1;
  });

  /* ---- 中心核心 ---- */
  ctx.beginPath();
  ctx.arc(ccx, ccy, coreR, 0, Math.PI * 2);
  ctx.fillStyle = colors.c;
  ctx.fill();

  /* ---- 外环 ---- */
  ctx.beginPath();
  ctx.arc(ccx, ccy, coreR * 1.5, 0, Math.PI * 2);
  ctx.strokeStyle = colors.l;
  ctx.lineWidth = 0.8;
  ctx.globalAlpha = 0.3;
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.restore();
}

/* ================================================================ */
/*  NeuralSparkLogo — React 组件                                      */
/* ================================================================ */

interface NeuralSparkLogoProps {
  size: number;
  animated?: boolean;
  paletteId?: string;
  className?: string;
}

export function NeuralSparkLogo({
  size,
  animated = false,
  paletteId = "white",
  className,
}: NeuralSparkLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const driftRef = useRef<DriftState>(new DriftState());
  const rafRef = useRef<number>(0);
  const { resolvedTheme } = useTheme();

  const getColors = useCallback((): DrawColors => {
    const palette = LOGO_PALETTES.find((p) => p.id === paletteId) ?? LOGO_PALETTES[0];
    if (resolvedTheme === "light") {
      return { c: palette.lc, n: palette.ln, g: palette.lg, l: palette.ll };
    }
    return { c: palette.c, n: palette.n, g: palette.g, l: palette.l };
  }, [paletteId, resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drift = driftRef.current;

    if (!animated) {
      drawFrame(ctx, size, getColors(), drift, false);
      return;
    }

    let last = performance.now();
    function loop(now: number) {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      drift.update(dt);
      drawFrame(ctx!, size, getColors(), drift, true);
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafRef.current);
  }, [size, animated, getColors]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
