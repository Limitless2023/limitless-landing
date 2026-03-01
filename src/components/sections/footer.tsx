"use client";

import { NeuralSparkLogo } from "@/components/neural-spark-logo";
import { ArrowRight, Github } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <footer className="relative px-6 pb-12 pt-32">
      {/* 顶部渐变分隔线 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-frost)]/20 to-transparent" />

      <div className="mx-auto flex max-w-4xl flex-col items-center gap-12 text-center">
        {/* Logo */}
        <div className="animate-float">
          <NeuralSparkLogo size={64} animated paletteId="frost" />
        </div>

        {/* CTA */}
        <div>
          <h3 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl gradient-text">
            {locale === "en" ? "Ready to explore?" : "准备好了吗？"}
          </h3>
          <a
            href="https://limitless-agents.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-[var(--accent-frost)]/30 hover:bg-white/[0.08] hover:shadow-[0_0_40px_rgba(232,224,216,0.12)]"
          >
            {t.footer.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Limitless2023/Agent-with-TTS"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/30 transition-colors hover:text-white/60"
          >
            <Github className="h-4 w-4" />
            {t.footer.github}
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-white/15">{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
