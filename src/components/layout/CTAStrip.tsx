import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTAStrip() {
  return (
    <section className="w-full bg-cta text-cta-foreground py-4 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center sm:text-left">
        <p className="text-base sm:text-lg font-semibold">
          ¡Súmate al HUB Innovación y Emprendimiento!
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            asChild
            size="lg"
            className="min-h-[44px] bg-white text-cta hover:bg-white/90 border-0"
          >
            <Link href="/auth/signin">Unirme al Hub</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 min-h-[44px]"
          >
            <Link href="/expertos">Explorar expertos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
