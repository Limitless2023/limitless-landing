"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

export function FAQ({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section id="faq" className="px-6 py-24">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
        {t.faq.title}
      </h2>
      <Accordion type="single" collapsible className="mx-auto max-w-2xl">
        {t.faq.items.map((item, i) => (
          <AccordionItem key={i} value={`q-${i}`}>
            <AccordionTrigger className="text-left text-base">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
