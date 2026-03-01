"use client";

import { Zap, Eye, Search, Minimize2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { useInView } from "@/hooks/use-intersection";

const ICONS = [Zap, Eye, Search, Minimize2];
const ACCENTS = [
  "rgba(232,224,216,0.6)",
  "rgba(124,170,200,0.5)",
  "rgba(128,180,148,0.5)",
  "rgba(196,160,96,0.5)",
];

export function Highlights({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { ref, inView } = useInView(0.1);

  return (
    <section id="highlights" className="relative px-6 py-32" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_80%,rgba(232,224,216,0.02),transparent)]" />

      <div className="mx-auto max-w-4xl">
        <div className={`mb-16 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent-frost-mid)]">
            {t.highlights.label}
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t.highlights.title}
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {t.highlights.items.map((item, i) => {
            const Icon = ICONS[i];
            const accent = ACCENTS[i];
            return (
              <div
                key={i}
                className={`glass-card group relative overflow-hidden rounded-2xl p-6 sm:p-8 transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: accent.replace(/[\d.]+\)$/, "0.1)"),
                    boxShadow: `0 0 0 1px ${accent.replace(/[\d.]+\)$/, "0.08)")}`,
                  }}
                >
                  <Icon className="h-[18px] w-[18px]" style={{ color: accent }} />
                </div>

                <h3 className="mb-2 text-base font-semibold tracking-tight text-white/80">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/35">
                  {item.desc}
                </p>

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
