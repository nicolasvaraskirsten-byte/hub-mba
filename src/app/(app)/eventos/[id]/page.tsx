import { notFound } from "next/navigation";
import Link from "next/link";
import { getEventById } from "@/lib/data/events";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ExternalLink, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();

  const startDate = new Date(event.start_at);
  const endDate = event.end_at ? new Date(event.end_at) : null;
  const dateLocale = "es-CL";

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a inicio
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-7">
      <Card className="rounded-2xl shadow-sm overflow-hidden h-full">
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {startDate.toLocaleDateString(dateLocale, {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            {endDate && (
              <span>
                – {endDate.toLocaleDateString(dateLocale, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">{event.title}</h1>
          {(event.tags ?? []).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {event.description && (
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p className="whitespace-pre-wrap">{event.description}</p>
            </div>
          )}
          {event.location && (
            <p className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span>{event.location}</span>
            </p>
          )}
          {event.link && (
            <Button asChild size="lg" className="bg-hub-pink text-hub-pink-foreground hover:bg-hub-pink/90">
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Ver enlace del evento
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </CardContent>
      </Card>
        </div>
        {event.image_url && (
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl overflow-hidden border border-border/80 bg-muted/30 aspect-[4/3] lg:aspect-auto lg:min-h-[400px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.image_url}
                alt={event.title}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
