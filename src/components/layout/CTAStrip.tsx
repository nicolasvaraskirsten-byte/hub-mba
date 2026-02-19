"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getTranslations } from "@/lib/i18n";

export function CTAStrip() {
  const { locale } = useLocale();
  const t = getTranslations(locale).ctaStrip;
  return (
    <section className="w-full bg-cta text-cta-foreground py-5 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center sm:text-left">
        <p className="text-base sm:text-lg font-semibold">
          {t.title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="h-11 px-6 rounded-md bg-white text-[hsl(var(--cta))] font-semibold hover:bg-white/95 shadow-sm border-0 min-w-[140px]"
          >
            <Link href="/auth/signin">{t.joinHub}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-11 px-6 rounded-md border-2 border-white text-white font-semibold bg-transparent hover:bg-white/15 min-w-[160px]"
          >
            <Link href="/expertos">{t.exploreExperts}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
