"use client";

import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { useInView } from "@/hooks/use-intersection";

const TECHS = [
  { name: "Next.js 15",     color: "#fff" },
  { name: "React 19",       color: "#61dafb" },
  { name: "TypeScript",     color: "#3178c6" },
  { name: "Tailwind CSS",   color: "#38bdf8" },
  { name: "shadcn/ui",      color: "#fff" },
  { name: "Vercel AI SDK",  color: "#fff" },
  { name: "Supabase",       color: "#3ecf8e" },
  { name: "OpenTelemetry",  color: "#f5a623" },
  { name: "Langfuse",       color: "#e879f9" },
  { name: "Electron",       color: "#9feaf9" },
  { name: "Capacitor",      color: "#53b9ff" },
  { name: "Vercel",         color: "#fff" },
];

/* 复制一份用于无缝滚动 */
const DOUBLE = [...TECHS, ...TECHS];

export function TechStack({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { ref, inView } = useInView(0.1);

  return (
    <section id="tech" className="relative overflow-hidden py-32" ref={ref}>
      <div className={`mb-16 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent-blue)]">
          {locale === "en" ? "Stack" : "技术"}
        </p>
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {t.tech.title}
        </h2>
      </div>

      {/* ---- Marquee 无缝横向滚动 ---- */}
      <div className={`transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "300ms" }}>
        {/* 左右渐隐遮罩 */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex animate-marquee">
          {DOUBLE.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="mx-4 flex shrink-0 items-center gap-3 rounded-full border border-white/[0.06] bg-white/[0.03] px-6 py-3 backdrop-blur-sm"
            >
              {/* 色点 */}
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: tech.color, boxShadow: `0 0 8px ${tech.color}40` }}
              />
              <span className="text-sm font-medium text-white/70 whitespace-nowrap">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
