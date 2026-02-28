"use client";

import { NeuralSparkLogo } from "@/components/neural-spark-logo";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 text-center">
      {/* 背景网格 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
      {/* 中心径向渐隐 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_80%)]" />

      <div className="relative animate-fade-in-up">
        <NeuralSparkLogo size={160} animated paletteId="white" className="mx-auto mb-8" />
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-7xl">
          {t.hero.title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          {t.hero.subtitle}
        </p>
        <Button size="lg" className="mt-10 px-8 text-base" asChild>
          <a href="https://limitless-agents.vercel.app" target="_blank" rel="noopener noreferrer">
            {t.hero.cta} →
          </a>
        </Button>
      </div>
    </section>
  );
}
