"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { TechStack } from "@/components/sections/tech-stack";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");

  return (
    <main className="min-h-screen">
      {/* ---- 语言切换 ---- */}
      <button
        className="fixed right-4 top-4 z-50 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-colors hover:bg-accent"
        onClick={() => setLocale((l) => (l === "en" ? "zh" : "en"))}
      >
        {locale === "en" ? "中文" : "EN"}
      </button>

      <Hero locale={locale} />
      <Features locale={locale} />
      <TechStack locale={locale} />
      <FAQ locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}
