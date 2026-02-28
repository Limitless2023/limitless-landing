"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { TechStack } from "@/components/sections/tech-stack";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { NeuralSparkLogo } from "@/components/neural-spark-logo";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");

  return (
    <main className="noise-overlay min-h-screen bg-background">
      {/* ---- 顶部导航栏 ---- */}
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/[0.04] bg-background/60 px-6 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <NeuralSparkLogo size={28} animated paletteId="teal" />
          <span className="text-sm font-semibold tracking-tight">Limitless Agent</span>
        </div>

        <div className="flex items-center gap-1">
          {/* 导航链接 */}
          <a href="#features" className="hidden rounded-full px-4 py-1.5 text-xs text-white/40 transition-colors hover:text-white/70 sm:block">
            {locale === "en" ? "Features" : "能力"}
          </a>
          <a href="#tech" className="hidden rounded-full px-4 py-1.5 text-xs text-white/40 transition-colors hover:text-white/70 sm:block">
            {locale === "en" ? "Stack" : "技术栈"}
          </a>
          <a href="#faq" className="hidden rounded-full px-4 py-1.5 text-xs text-white/40 transition-colors hover:text-white/70 sm:block">
            FAQ
          </a>

          {/* 分隔线 */}
          <div className="mx-2 hidden h-4 w-[1px] bg-white/10 sm:block" />

          {/* 语言切换 */}
          <button
            className="rounded-full border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-white/50 transition-all hover:border-white/20 hover:text-white/80"
            onClick={() => setLocale((l) => (l === "en" ? "zh" : "en"))}
          >
            {locale === "en" ? "中文" : "EN"}
          </button>
        </div>
      </nav>

      <Hero locale={locale} />
      <Features locale={locale} />
      <TechStack locale={locale} />
      <FAQ locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}
