import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lightbulb, Rocket, Building2, Repeat } from "lucide-react";
import type { Translations } from "@/lib/i18n";

const PROFILES = [
  { key: "1" as const, icon: Lightbulb },
  { key: "2" as const, icon: Rocket },
  { key: "3" as const, icon: Building2 },
  { key: "4" as const, icon: Repeat },
] as const;

type Landing = Translations["landing"];

export function Profiles({ t }: { t: Landing }) {
  const titles = [t.profile1Title, t.profile2Title, t.profile3Title, t.profile4Title];
  const descs = [t.profile1Desc, t.profile2Desc, t.profile3Desc, t.profile4Desc];

  return (
    <section className="pt-10 sm:pt-14 md:pt-18 pb-12 sm:pb-16 md:pb-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground">
          {t.profilesTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 max-w-5xl mx-auto">
          {PROFILES.map(({ key, icon: Icon }, i) => (
            <Card
              key={key}
              className="h-full rounded-2xl border border-border/80 bg-white shadow-sm hover:shadow-lg hover:border-hub-pink/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              <CardHeader className="pb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-hub-pink/15 text-hub-pink">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mt-4">
                  {titles[i]}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {descs[i]}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
