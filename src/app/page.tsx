"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { Hero } from "@/components/sections/hero";
import { Showcase } from "@/components/sections/showcase";
import { Architecture } from "@/components/sections/architecture";
import { Features } from "@/components/sections/features";
import { Timeline } from "@/components/sections/timeline";
import { TechStack } from "@/components/sections/tech-stack";
import { Highlights } from "@/components/sections/highlights";
import { Footer } from "@/components/sections/footer";
import { NeuralSparkLogo } from "@/components/neural-spark-logo";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");

  return (
    <main className="noise-overlay min-h-screen bg-background">
      {/* ---- 顶部导航栏 ---- */}
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/[0.04] bg-background/70 px-6 py-3 backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <NeuralSparkLogo size={26} animated paletteId="frost" />
          <span className="text-sm font-semibold tracking-tight text-white/80">Limitless Agent</span>
        </div>

        <div className="flex items-center gap-1">
          <a href="#architecture" className="hidden rounded-full px-4 py-1.5 text-xs text-white/35 transition-colors hover:text-white/70 sm:block">
            {locale === "en" ? "Architecture" : "架构"}
          </a>
          <a href="#features" className="hidden rounded-full px-4 py-1.5 text-xs text-white/35 transition-colors hover:text-white/70 sm:block">
            {locale === "en" ? "Features" : "功能"}
          </a>
          <a href="#timeline" className="hidden rounded-full px-4 py-1.5 text-xs text-white/35 transition-colors hover:text-white/70 sm:block">
            {locale === "en" ? "Timeline" : "时间线"}
          </a>
          <div className="mx-2 hidden h-4 w-[1px] bg-white/[0.06] sm:block" />

          <button
            className="rounded-full border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-white/40 transition-all hover:border-white/20 hover:text-white/70"
            onClick={() => setLocale((l) => (l === "en" ? "zh" : "en"))}
          >
            {locale === "en" ? "中文" : "EN"}
          </button>
        </div>
      </nav>

      <Hero locale={locale} />
      <Showcase locale={locale} />

      <div className="section-divider mx-auto max-w-4xl" />

      <Architecture locale={locale} />

      <div className="section-divider mx-auto max-w-4xl" />

      <Features locale={locale} />

      <div className="section-divider mx-auto max-w-4xl" />

      <Timeline locale={locale} />

      <div className="section-divider mx-auto max-w-4xl" />

      <TechStack locale={locale} />

      <div className="section-divider mx-auto max-w-4xl" />

      <Highlights locale={locale} />

      <Footer locale={locale} />
    </main>
  );
}
