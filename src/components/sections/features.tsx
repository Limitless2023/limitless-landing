"use client";

import {
  Shuffle, Wrench, Brain, Mic,
  Swords, LayoutGrid, Code, Monitor,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { useInView } from "@/hooks/use-intersection";

const ICONS = [Shuffle, Wrench, Brain, Mic, Swords, LayoutGrid, Code, Monitor];
const ACCENTS = [
  "rgba(232,224,216,0.6)",  // frost
  "rgba(124,170,200,0.5)",  // stone blue
  "rgba(128,180,148,0.5)",  // sage
  "rgba(196,160,96,0.5)",   // amber
  "rgba(200,144,138,0.5)",  // dust rose
  "rgba(232,224,216,0.6)",  // frost
  "rgba(124,170,200,0.5)",  // stone blue
  "rgba(200,144,138,0.5)",  // dust rose
];

export function Features({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { ref, inView } = useInView(0.1);

  return (
    <section id="features" className="relative px-6 py-32" ref={ref}>
      {/* 背景渐变 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(232,224,216,0.03),transparent)]" />

      <div className="mx-auto max-w-6xl">
        <div className={`mb-20 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent-frost)]">
            {t.features.label}
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t.features.title}
          </h2>
        </div>

        {/* ---- Bento Grid ---- */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.features.items.map((item, i) => {
            const Icon = ICONS[i];
            const accent = ACCENTS[i];
            /* 首尾各两张卡片在大屏占 2 列，保持网格平衡 */
            const span = i < 2 || i >= 6 ? "lg:col-span-2" : "";
            return (
              <div
                key={i}
                className={`glass-card group relative overflow-hidden rounded-2xl p-6 sm:p-8 ${span} transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80 + 200}ms` }}
              >
                {/* 图标 */}
                <div
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl transition-shadow duration-300"
                  style={{ background: `${accent.replace(/[\d.]+\)$/, "0.1)")}`, boxShadow: `0 0 0 1px ${accent.replace(/[\d.]+\)$/, "0.1)")}` }}
                >
                  <Icon className="h-5 w-5" style={{ color: accent }} />
                </div>

                {/* 序号 */}
                <span className="mb-2 block text-[10px] font-mono uppercase tracking-[0.3em] text-white/20">
                  0{i + 1}
                </span>

                <h3 className="mb-2 text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/40">{item.desc}</p>

                {/* hover 渐变光带 */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
