"use client";

import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

const TECHS = [
  "Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4", "shadcn/ui",
  "Vercel AI SDK", "Supabase", "OpenTelemetry", "Langfuse",
  "Electron", "Capacitor iOS", "Vercel",
];

export function TechStack({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section id="tech" className="px-6 py-24">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
        {t.tech.title}
      </h2>
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
        {TECHS.map((name) => (
          <Badge
            key={name}
            variant="secondary"
            className="px-4 py-2 text-sm font-medium"
          >
            {name}
          </Badge>
        ))}
      </div>
    </section>
  );
}
