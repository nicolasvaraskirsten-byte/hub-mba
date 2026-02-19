import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight, Users, Target, Zap, Calendar, BookOpen } from "lucide-react";
import { getExpertsPreview } from "@/lib/data/experts";
import { getEventsPreview } from "@/lib/data/events";

export const dynamic = "force-dynamic";

export default async function LandingPage() {
  const [experts, events] = await Promise.all([
    getExpertsPreview(6),
    getEventsPreview(3),
  ]);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[440px] sm:h-[560px] md:h-[620px] w-full min-w-full bg-black/20">
          <Image
            src="/banner.jpg"
            alt="HUB Innovación y Emprendimiento MBA UC"
            fill
            className="object-cover object-center"
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-4 pb-16">
            <div className="max-w-2xl animate-in fade-in-0 duration-500">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Conecta experiencia ejecutiva con emprendimiento con impacto
              </h1>
              <p className="text-lg text-white/90 mt-4">
                El espacio del MBA UC que articula trayectoria empresarial e
                innovación para que despegues tu siguiente paso.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-cta text-white hover:bg-cta/90 border-0"
                >
                  <Link href="/auth/signin">
                    Unirme al Hub
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="bg-white/90 text-foreground hover:bg-white"
                >
                  <Link href="/expertos">Explorar expertos</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Propuesta de valor */}
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Un ecosistema que potencia tu transición
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            Accede a mentores de industria, agenda sesiones one-on-one y conecta
            con una red de ejecutivos y emprendedores MBA UC.
          </p>
        </div>
        <ul className="grid sm:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          {[
            {
              icon: Users,
              title: "Red de expertos",
              text: "Mentores con experiencia en retail, minería, fintech, salud, energía y más.",
            },
            {
              icon: Calendar,
              title: "Sesiones a tu medida",
              text: "Agenda reuniones con expertos según tu objetivo: mentoría, inversión o cofounder.",
            },
            {
              icon: Zap,
              title: "Recursos y eventos",
              text: "Workshops, guías y eventos para acelerar tu proyecto o carrera.",
            },
          ].map((item) => (
            <li key={item.title}>
              <Card className="h-full rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-hub-accent/10 text-hub-accent">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{item.text}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* Para quién es */}
      <section className="bg-muted/50 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground">
            Para quién es el Hub
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            {[
              {
                title: "Innovador corporativo",
                desc: "Lideras o quieres impulsar innovación dentro de tu empresa y buscas metodologías y conexiones.",
              },
              {
                title: "Emprendedor en transición",
                desc: "Estás dando el salto de lo corporativo al emprendimiento y necesitas mentoría y red.",
              },
              {
                title: "Founder senior",
                desc: "Ya tienes un proyecto en marcha y buscas escalar, inversión o socios estratégicos.",
              },
            ].map((item) => (
              <Card key={item.title} className="rounded-2xl shadow-sm">
                <CardHeader>
                  <Target className="h-8 w-8 text-cta mb-2" />
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground">
          Cómo funciona
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 mt-12 items-start max-w-3xl mx-auto">
          {[
            { step: "1", title: "Únete", text: "Regístrate con tu cuenta Google y completa tu perfil." },
            { step: "2", title: "Explora", text: "Revisa expertos, eventos y recursos según tu objetivo." },
            { step: "3", title: "Conecta", text: "Agenda sesiones con expertos y participa en actividades." },
          ].map((item) => (
            <div key={item.step} className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="rounded-full h-12 w-12 flex items-center justify-center bg-cta text-white font-bold">
                {item.step}
              </div>
              <h3 className="font-semibold mt-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Expertos preview */}
      <section className="bg-muted/50 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Expertos del Hub
            </h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/expertos">Ver todos</Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {experts.map((expert) => (
              <Link key={expert.user_id} href={`/expertos/${expert.user_id}`}>
                <Card className="h-full rounded-2xl shadow-sm hover:shadow-md transition-shadow hover:border-cta/30">
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
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Próximos eventos
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {events.map((ev) => (
            <Card key={ev.id} className="rounded-2xl shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar className="h-4 w-4" />
                  {new Date(ev.start_at).toLocaleDateString("es-CL", {
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
                  <Link href="/explorar?tab=eventos">Ver más</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Casos de uso */}
      <section className="bg-muted/50 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground">
            Casos de uso
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4 mt-10 max-w-2xl mx-auto">
            {[
              "Agenda una sesión con un experto para validar tu modelo de negocio.",
              "Encuentra un cofundador o socio complementario en la red de participantes.",
              "Accede a recursos y guías para tu pitch o búsqueda de inversión.",
              "Participa en eventos y workshops para seguir aprendiendo.",
            ].map((text) => (
              <li
                key={text}
                className="flex items-start gap-3 rounded-xl bg-card p-4 shadow-sm"
              >
                <BookOpen className="h-5 w-5 text-cta shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA final */}
      <section className="container mx-auto px-4 py-16 sm:py-24 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          ¿Listo para sumarte?
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          Únete al HUB Innovación y Emprendimiento y conecta con la red MBA UC.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button asChild size="lg" className="bg-cta text-white hover:bg-cta/90">
            <Link href="/auth/signin">Unirme al Hub</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/expertos">Explorar expertos</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
