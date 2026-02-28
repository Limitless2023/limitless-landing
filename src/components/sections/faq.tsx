"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { useInView } from "@/hooks/use-intersection";

export function FAQ({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { ref, inView } = useInView(0.1);

  return (
    <section id="faq" className="relative px-6 py-32" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(144,200,240,0.03),transparent)]" />

      <div className="mx-auto max-w-2xl">
        <div className={`mb-16 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent-rose)]">
            {locale === "en" ? "Questions" : "问答"}
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t.faq.title}
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {t.faq.items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`q-${i}`}
              className={`glass-card overflow-hidden rounded-xl border-0 px-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <AccordionTrigger className="py-5 text-left text-[15px] font-medium hover:no-underline text-white/80 hover:text-white">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-white/40">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
