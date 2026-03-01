"use client";

import { useEffect, useRef } from "react";
import { NeuralSparkLogo } from "@/components/neural-spark-logo";
import { ArrowRight, Github } from "lucide-react";
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
        ctx.fillStyle = `rgba(232, 224, 216, ${p.alpha})`;
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
/*  Stats bar                                                        */
/* ================================================================ */
const STATS = [
  { value: "48", key: "hours" as const },
  { value: "33", key: "commits" as const },
  { value: "37", key: "features" as const },
  { value: "3", key: "platforms" as const },
];

/* ================================================================ */
/*  Hero                                                             */
/* ================================================================ */
export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center">
      {/* ---- backgrounds ---- */}
      <div className="pointer-events-none absolute inset-0 animate-gradient bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(232,224,216,0.12),transparent_50%),radial-gradient(ellipse_60%_40%_at_80%_50%,rgba(200,190,182,0.06),transparent_50%),radial-gradient(ellipse_50%_50%_at_20%_60%,rgba(176,166,158,0.05),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
      <AmbientParticles />

      {/* ---- Logo + orbits ---- */}
      <div className="relative mb-8 animate-scale-in" style={{ animationDelay: "0.1s" }}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(232,224,216,0.07),transparent_55%)] animate-pulse-glow" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[240px] w-[240px] rounded-full border border-white/[0.03] animate-orbit">
          <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-[var(--accent-frost)] glow-dot" />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[310px] w-[310px] rounded-full border border-white/[0.02] animate-orbit-reverse">
          <div className="absolute top-1/2 -right-[3px] -translate-y-1/2 h-1 w-1 rounded-full bg-[var(--accent-frost-mid)] opacity-70" />
        </div>
        <NeuralSparkLogo size={160} animated paletteId="frost" />
      </div>

      {/* ---- tagline pill ---- */}
      <div className="animate-fade-in-up mb-5" style={{ animationDelay: "0.2s" }}>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-[var(--accent-frost)] backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-frost)] animate-pulse" />
          {t.hero.tagline}
        </span>
      </div>

      {/* ---- title ---- */}
      <h1
        className="animate-fade-in-up max-w-5xl text-[clamp(2.5rem,7vw,6rem)] font-extrabold leading-[1.08] tracking-[-0.04em] whitespace-pre-line"
        style={{ animationDelay: "0.35s" }}
      >
        <span className="gradient-text">{t.hero.title}</span>
      </h1>

      {/* ---- subtitle ---- */}
      <p
        className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/40 animate-fade-in-up sm:text-lg"
        style={{ animationDelay: "0.5s" }}
      >
        {t.hero.subtitle}
      </p>

      {/* ---- stats bar ---- */}
      <div className="mt-8 flex items-center gap-6 sm:gap-10 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
        {STATS.map((s) => (
          <div key={s.key} className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold tracking-tight text-white/90 sm:text-3xl">{s.value}</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">{t.hero.stats[s.key]}</span>
          </div>
        ))}
      </div>

      {/* ---- dual CTA ---- */}
      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 animate-fade-in-up" style={{ animationDelay: "0.75s" }}>
        <a
          href="https://limitless-agents.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-glow group inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-medium text-white transition-all"
        >
          {t.hero.cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
        <a
          href="https://github.com/Limitless2023/Agent-with-TTS"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-7 py-4 text-sm font-medium text-white/60 backdrop-blur-sm transition-all hover:border-white/15 hover:text-white/80"
        >
          <Github className="h-4 w-4" />
          {t.hero.ctaSource}
        </a>
      </div>

      {/* ---- scroll indicator ---- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "1.4s" }}>
        <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent" />
      </div>
    </section>
  );
}
