"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { getTranslations } from "@/lib/i18n";

export function CTAStrip() {
  const { locale } = useLocale();
  const t = getTranslations(locale).ctaStrip;
  return (
    <section className="w-full bg-cta text-cta-foreground py-5 px-4">
      <div className="container mx-auto flex items-center justify-center text-center">
        <p className="text-base sm:text-lg font-semibold">
          {t.title}
        </p>
      </div>
    </section>
  );
}
