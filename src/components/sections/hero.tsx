"use client";

import { useEffect, useRef } from "react";
import { NeuralSparkLogo } from "@/components/neural-spark-logo";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

/* ================================================================ */
/*  Ambient particle canvas                                          */
/* ================================================================ */
function AmbientParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.2,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.1,
      alpha: Math.random() * 0.5 + 0.05,
    }));

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120, 224, 200, ${p.alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

/* ================================================================ */
/*  Feature pills                                                    */
/* ================================================================ */
const PILLS_EN = ["Multi-Model", "Memory", "Voice", "Tools", "Arena", "MCP"];
const PILLS_ZH = ["多模型", "记忆", "语音", "工具", "Arena", "MCP"];

/* ================================================================ */
/*  Hero                                                             */
/* ================================================================ */
export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pills = locale === "en" ? PILLS_EN : PILLS_ZH;

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center">
      {/* ---- 多层背景 ---- */}
      {/* Animated gradient mesh */}
      <div className="pointer-events-none absolute inset-0 animate-gradient bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,224,200,0.12),transparent_50%),radial-gradient(ellipse_60%_40%_at_80%_50%,rgba(144,200,240,0.06),transparent_50%),radial-gradient(ellipse_50%_50%_at_20%_60%,rgba(200,184,232,0.05),transparent_50%)]" />
      {/* 网格 */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:72px_72px]" />
      {/* 底部渐隐 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
      {/* 粒子 */}
      <AmbientParticles />

      {/* ---- Logo + 轨道环 ---- */}
      <div className="relative mb-10 animate-scale-in" style={{ animationDelay: "0.1s" }}>
        {/* 大面积辉光 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(120,224,200,0.07),transparent_55%)] animate-pulse-glow" />
        {/* 轨道环 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full border border-white/[0.03] animate-orbit">
          <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-[var(--accent-teal)] glow-dot" />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[380px] rounded-full border border-white/[0.02] animate-orbit-reverse">
          <div className="absolute top-1/2 -right-[3px] -translate-y-1/2 h-1 w-1 rounded-full bg-[var(--accent-blue)] opacity-70" />
        </div>

        <NeuralSparkLogo size={200} animated paletteId="teal" />
      </div>

      {/* ---- 标语 pill ---- */}
      <div className="animate-fade-in-up mb-6" style={{ animationDelay: "0.2s" }}>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-[var(--accent-teal)] backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-teal)] animate-pulse" />
          {locale === "en" ? "Web · Mac · iPhone — One codebase, three platforms" : "Web · Mac · iPhone — 一套代码，三端运行"}
        </span>
      </div>

      {/* ---- 主标题 ---- */}
      <h1
        className="animate-fade-in-up max-w-5xl text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[1.05] tracking-[-0.04em]"
        style={{ animationDelay: "0.35s" }}
      >
        <span className="gradient-text">{t.hero.title}</span>
      </h1>

      {/* ---- 副标题 ---- */}
      <p
        className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/40 animate-fade-in-up sm:text-xl"
        style={{ animationDelay: "0.5s" }}
      >
        {t.hero.subtitle}
      </p>

      {/* ---- Feature pills ---- */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
        {pills.map((p) => (
          <span key={p} className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-xs text-white/30">
            {p}
          </span>
        ))}
      </div>

      {/* ---- CTA ---- */}
      <div className="mt-12 animate-fade-in-up" style={{ animationDelay: "0.75s" }}>
        <a
          href="https://limitless-agents.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-glow group inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-medium text-white transition-all"
        >
          {t.hero.cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {/* ---- 滚动提示线 ---- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "1.4s" }}>
        <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent" />
      </div>
    </section>
  );
}
