import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight, Users, Target, Zap, Calendar, BookOpen } from "lucide-react";
import { getExpertsPreview } from "@/lib/data/experts";
import { getEventsPreview } from "@/lib/data/events";
import { getTranslations } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function LandingPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value === "en" ? "en" : "es";
  const t = getTranslations(locale).landing;
  const dateLocale = locale === "en" ? "en-US" : "es-CL";

  const [experts, events] = await Promise.all([
    getExpertsPreview(6),
    getEventsPreview(3),
  ]);

  return (
    <div className="flex flex-col min-w-0 w-full">
      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[440px] sm:h-[560px] md:h-[620px] w-full min-w-full bg-black/20">
          <Image
            src="/banner.jpg"
            alt="HUB Innovación y Emprendimiento MBA UC"
            fill
            className="object-cover object-center"
            priority
            unoptimized
            sizes="100vw"
          />
          <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-4 sm:px-6 pb-8 sm:pb-16">
            <div className="max-w-2xl animate-in fade-in-0 duration-500 min-w-0">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                {t.heroTitle}
              </h1>
              <p className="text-base sm:text-lg text-white/90 mt-3 sm:mt-4">
                {t.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8">
                <Button
                  asChild
                  size="lg"
                  className="min-h-[44px] bg-cta text-white hover:bg-cta/90 border-0"
                >
                  <Link href="/auth/signin">
                    {t.ctaJoin}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="min-h-[44px] bg-white/90 text-foreground hover:bg-white"
                >
                  <Link href="/expertos">{t.ctaExploreExperts}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Propuesta de valor */}
      <section className="relative w-full bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pt-12 sm:pt-16 md:pt-24 pb-8 sm:pb-10 md:pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-cta text-white border-0 font-medium px-3 py-1">
              {t.ecosystemBadge}
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              {t.ecosystemTitle}
            </h2>
            <p className="text-lg text-muted-foreground mt-4">
              {t.ecosystemDesc}
            </p>
          </div>
          <ul className="grid sm:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
            {[
              { icon: Users, title: t.cardExperts, text: t.cardExpertsText },
              { icon: Calendar, title: t.cardSessions, text: t.cardSessionsText },
              { icon: Zap, title: t.cardResources, text: t.cardResourcesText },
            ].map((item) => (
              <li key={item.title}>
                <Card className="h-full rounded-2xl border-l-4 border-l-cta bg-white shadow-md hover:shadow-lg transition-all hover:border-cta/40 overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-cta/15 text-cta`}>
                      <item.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mt-4">{item.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Para quién es */}
      <section className="pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-16 md:pb-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground">
            {t.forWhoTitle}
          </h2>
          <p className="text-center text-muted-foreground mt-3 max-w-xl mx-auto">
            {t.forWhoSubtitle}
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
            {[
              { title: t.innovator, desc: t.innovatorDesc },
              { title: t.entrepreneur, desc: t.entrepreneurDesc },
              { title: t.founder, desc: t.founderDesc },
            ].map((item) => (
              <Card key={item.title} className="rounded-2xl border border-border/80 bg-gradient-to-b from-white to-primary/5 shadow-sm hover:shadow-md hover:border-cta/20 transition-all">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cta/15 text-cta mb-2">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="bg-gradient-to-b from-primary/5 to-primary/10 py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground">
            {t.howItWorksTitle}
          </h2>
          <p className="text-center text-muted-foreground mt-3 max-w-lg mx-auto">
            {t.howItWorksSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 mt-10 sm:mt-12 items-stretch sm:items-start max-w-3xl mx-auto">
            {[
              { step: "1", title: t.step1Title, text: t.step1Text },
              { step: "2", title: t.step2Title, text: t.step2Text },
              { step: "3", title: t.step3Title, text: t.step3Text },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center sm:items-start sm:text-left w-full sm:w-auto min-w-0">
                <div className="rounded-full h-14 w-14 flex items-center justify-center bg-cta text-white font-bold text-lg shadow-lg shrink-0">
                  {item.step}
                </div>
                <h3 className="font-semibold mt-4 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 w-full">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertos preview */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <Badge variant="secondary" className="mb-2 font-medium">{t.expertsBadge}</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                {t.expertsTitle}
              </h2>
            </div>
            <Button asChild size="sm" className="bg-cta text-white hover:bg-cta/90 w-fit">
              <Link href="/expertos">{t.seeAllExperts}</Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {experts.map((expert) => (
              <Link key={expert.user_id} href={`/expertos/${expert.user_id}`}>
                <Card className="h-full rounded-2xl shadow-md hover:shadow-lg transition-all border border-border/80 hover:border-cta/30 bg-white">
                  <CardHeader className="flex flex-row items-start gap-4">
                    <Avatar className="h-14 w-14 rounded-xl">
                      <AvatarFallback className="rounded-xl bg-hub-accent/20 text-hub-accent">
                        {(expert.user?.name ?? "E").slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{expert.user?.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {expert.profile?.headline ?? expert.expertise?.[0]}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {(expert.expertise ?? []).slice(0, 3).map((e) => (
                          <Badge key={e} variant="secondary" className="text-xs">
                            {e}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Próximos eventos */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <Badge variant="secondary" className="mb-2 font-medium">{t.eventsBadge}</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {t.eventsTitle}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {events.map((ev) => (
              <Card key={ev.id} className="rounded-2xl shadow-md border border-border/80 bg-white hover:shadow-lg hover:border-cta/20 transition-all">
              <CardHeader>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar className="h-4 w-4" />
                  {new Date(ev.start_at).toLocaleDateString(dateLocale, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <h3 className="font-semibold">{ev.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {ev.description}
                </p>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" size="sm">
                  <Link href="/explorar?tab=eventos">{t.seeMore}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
          </div>
        </div>
      </section>

      {/* Casos de uso */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground">
            {t.useCasesTitle}
          </h2>
          <p className="text-center text-muted-foreground mt-3 max-w-lg mx-auto">
            {t.useCasesSubtitle}
          </p>
          <ul className="grid sm:grid-cols-2 gap-4 mt-10 max-w-2xl mx-auto">
            {(t.useCases ?? []).map((text) => (
              <li
                key={text}
                className="flex items-start gap-3 rounded-xl bg-primary/5 border border-primary/10 p-4 hover:bg-primary/10 hover:border-cta/20 transition-colors"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cta/15 text-cta shrink-0">
                  <BookOpen className="h-4 w-4" />
                </div>
                <span className="text-muted-foreground text-sm leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-gradient-to-b from-primary/10 to-primary/15 py-12 sm:py-16 md:py-24 text-center">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {t.ctaFinalTitle}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            {t.ctaFinalDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button asChild size="lg" className="bg-cta text-white hover:bg-cta/90 shadow-lg">
              <Link href="/auth/signin">{t.ctaJoin}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-cta text-cta hover:bg-cta/10">
              <Link href="/expertos">{t.ctaExploreExperts}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
