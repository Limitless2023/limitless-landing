"use client";

import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { useInView } from "@/hooks/use-intersection";

const LAYER_COLORS = [
  "rgba(232,224,216,0.15)",
  "rgba(200,144,138,0.12)",
  "rgba(196,160,96,0.12)",
  "rgba(124,170,200,0.12)",
  "rgba(128,180,148,0.12)",
  "rgba(176,166,158,0.12)",
  "rgba(232,224,216,0.10)",
];

export function Architecture({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { ref, inView } = useInView(0.1);

  return (
    <section id="architecture" className="relative px-6 py-32" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(232,224,216,0.03),transparent)]" />

      <div className="mx-auto max-w-4xl">
        <div className={`mb-16 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent-frost)]">
            {t.architecture.label}
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t.architecture.title}
          </h2>
        </div>

        {/* ---- Layer stack ---- */}
        <div className="space-y-2">
          {t.architecture.layers.map((layer, i) => {
            const layerNum = 7 - i;
            return (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-xl border border-white/[0.04] bg-white/[0.02] px-5 py-4 transition-all duration-700 hover:border-white/[0.08] hover:bg-white/[0.04] sm:px-6 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 80 + 200}ms` }}
              >
                {/* accent bar */}
                <div
                  className="absolute inset-y-0 left-0 w-[3px]"
                  style={{ background: LAYER_COLORS[i] }}
                />

                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                  <span className="shrink-0 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-white/20">
                    L{layerNum}
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-white/80 sm:min-w-[180px]">
                    {layer.name}
                  </span>
                  <span className="text-xs text-white/30">
                    {layer.tech}
                  </span>
                </div>

                {/* detail (hover reveal) */}
                <div className="mt-0 max-h-0 overflow-hidden text-xs leading-relaxed text-white/30 transition-all duration-300 group-hover:mt-2 group-hover:max-h-24">
                  {layer.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
