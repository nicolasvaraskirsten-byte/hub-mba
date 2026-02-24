import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import type { Translations } from "@/lib/i18n";
import { HUB_JOIN_FORM_URL } from "@/lib/constants";

type Landing = Translations["landing"];

const BENEFIT_KEYS = ["benefit1", "benefit2", "benefit3", "benefit4"] as const;

export function HubBenefits({ t }: { t: Landing }) {
  const benefits = BENEFIT_KEYS.map((k) => t[k]);

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-primary/5 to-primary/10">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground">
          {t.benefitsTitle}
        </h2>
        <p className="text-center text-muted-foreground mt-3 max-w-xl mx-auto">
          {t.benefitsSubtitle}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mt-12 max-w-4xl mx-auto items-start">
          <div className="space-y-4">
            {benefits.map((text, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl bg-white/80 border border-border/80 p-4 shadow-sm"
              >
                <CheckCircle2 className="h-6 w-6 text-hub-pink shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm leading-relaxed">
                  {text}
                </span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-hub-pink/20 bg-white/90 p-6 shadow-md flex flex-col justify-center min-h-[200px]">
            <p className="text-foreground font-medium mb-6">
              {t.benefitsCtaText}
            </p>
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-hub-pink text-hub-pink-foreground hover:bg-hub-pink/90 border-0"
            >
              <Link href={HUB_JOIN_FORM_URL} target="_blank" rel="noopener noreferrer">{t.ctaJoin}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
