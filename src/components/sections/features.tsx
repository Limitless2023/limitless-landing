"use client";

import {
  Monitor, Shuffle, Brain, Wrench,
  Mic, LayoutGrid, Code, Zap,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

const ICONS = [Monitor, Shuffle, Brain, Wrench, Mic, LayoutGrid, Code, Zap];

export function Features({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section id="features" className="px-6 py-24">
      <h2 className="mb-16 text-center text-3xl font-bold tracking-tight sm:text-4xl">
        {t.features.title}
      </h2>
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.features.items.map((item, i) => {
          const Icon = ICONS[i];
          return (
            <div
              key={i}
              className="group rounded-xl border border-border/50 bg-card/50 p-6 transition-all hover:border-border hover:bg-card/80 hover:shadow-[0_0_24px_rgba(255,255,255,0.04)]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Icon className="h-5 w-5 text-foreground/70" />
              </div>
              <h3 className="mb-2 font-semibold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
