"use client";

import { Button } from "@/components/ui/button";
import { NeuralSparkLogo } from "@/components/neural-spark-logo";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <footer className="border-t border-border/50 px-6 py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <NeuralSparkLogo size={48} animated paletteId="white" />
        <Button size="lg" className="px-8 text-base" asChild>
          <a href="https://limitless-agents.vercel.app" target="_blank" rel="noopener noreferrer">
            {t.footer.cta} →
          </a>
        </Button>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a
            href="https://github.com/Limitless2023/Agent-with-TTS"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            {t.footer.github}
          </a>
        </div>
        <p className="text-xs text-muted-foreground/60">{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
