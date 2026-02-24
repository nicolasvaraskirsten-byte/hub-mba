"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getTranslations } from "@/lib/i18n";
import { HUB_JOIN_FORM_URL } from "@/lib/constants";

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
            className="h-11 px-6 rounded-md bg-hub-pink text-hub-pink-foreground font-semibold hover:bg-hub-pink/90 shadow-sm border-0 min-w-[140px]"
          >
            <Link href={HUB_JOIN_FORM_URL} target="_blank" rel="noopener noreferrer">{t.joinHub}</Link>
          </Button>
          <Link
            href="/expertos"
            className="text-sm font-medium text-white/90 hover:text-white underline underline-offset-2"
          >
            {t.exploreExperts}
          </Link>
        </div>
      </div>
    </section>
  );
}
