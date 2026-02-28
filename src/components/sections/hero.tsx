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

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.12,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = window.innerWidth;
      const h = window.innerHeight;
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
/*  Hero                                                             */
/* ================================================================ */
export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* ---- 多层背景 ---- */}
      {/* 径向渐变：中心微亮 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(120,224,200,0.06),transparent_70%)]" />
      {/* 第二层辉光：蓝紫 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_60%_55%,rgba(144,200,240,0.04),transparent_70%)]" />
      {/* 网格 */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      {/* 底部渐隐 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
      {/* 粒子 */}
      <AmbientParticles />

      {/* ---- Logo + 轨道环 ---- */}
      <div className="relative mb-12 animate-scale-in" style={{ animationDelay: "0.1s" }}>
        {/* 外层辉光 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(120,224,200,0.08),transparent_60%)] animate-pulse-glow" />
        {/* 轨道环 1 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[280px] w-[280px] rounded-full border border-white/[0.04] animate-orbit" />
        {/* 轨道环 2 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[340px] rounded-full border border-white/[0.03] animate-orbit-reverse" />
        {/* 轨道上的小光点 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[280px] w-[280px] animate-orbit">
          <div className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-[var(--accent-teal)] glow-dot" />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[340px] animate-orbit-reverse">
          <div className="absolute top-1/2 -right-1 h-1.5 w-1.5 rounded-full bg-[var(--accent-blue)] opacity-60" />
        </div>

        <div className="relative">
          <NeuralSparkLogo size={200} animated paletteId="teal" />
        </div>
      </div>

      {/* ---- 文字 ---- */}
      <div className="relative max-w-4xl">
        <h1
          className="animate-fade-in-up text-6xl font-extrabold tracking-[-0.03em] sm:text-8xl gradient-text leading-[1.1]"
          style={{ animationDelay: "0.3s" }}
        >
          {t.hero.title}
        </h1>
        <p
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/50 animate-fade-in-up sm:text-xl"
          style={{ animationDelay: "0.5s" }}
        >
          {t.hero.subtitle}
        </p>

        {/* ---- CTA ---- */}
        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
          <a
            href="https://limitless-agents.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-[var(--accent-teal)]/30 hover:bg-white/[0.08] hover:shadow-[0_0_40px_rgba(120,224,200,0.12)]"
          >
            {t.hero.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* ---- 滚动提示 ---- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "1.2s" }}>
        <div className="flex flex-col items-center gap-2 text-white/20">
          <div className="h-8 w-[1px] bg-gradient-to-b from-transparent to-white/20" />
        </div>
      </div>
    </section>
  );
}
