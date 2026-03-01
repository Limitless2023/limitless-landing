"use client";

import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { useInView } from "@/hooks/use-intersection";

export function Timeline({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { ref, inView } = useInView(0.1);

  return (
    <section id="timeline" className="relative px-6 py-32" ref={ref}>
      <div className="mx-auto max-w-3xl">
        <div className={`mb-16 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent-frost)]">
            {t.timeline.label}
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t.timeline.title}
          </h2>
        </div>

        {/* ---- Vertical timeline ---- */}
        <div className="relative ml-4 border-l border-white/[0.06] pl-8 sm:ml-0 sm:pl-10">
          {t.timeline.sprints.map((sprint, i) => {
            const isLast = i === t.timeline.sprints.length - 1;
            return (
              <div
                key={i}
                className={`relative pb-10 last:pb-0 transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                {/* node */}
                <div className={`absolute -left-[calc(2rem+5px)] top-1 h-2.5 w-2.5 rounded-full border-2 sm:-left-[calc(2.5rem+5px)] ${
                  isLast
                    ? "border-[var(--accent-frost)] bg-[var(--accent-frost)]"
                    : "border-white/20 bg-background"
                }`} />

                <p className={`mb-1 text-xs font-mono font-bold uppercase tracking-[0.2em] ${
                  isLast ? "text-[var(--accent-frost)]" : "text-white/25"
                }`}>
                  {sprint.time}
                </p>
                <p className="text-sm leading-relaxed text-white/60">
                  {sprint.event}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
