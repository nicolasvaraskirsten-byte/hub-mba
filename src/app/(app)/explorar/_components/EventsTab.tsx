import Link from "next/link";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getEventsList } from "@/lib/data/events";

export async function EventsTab() {
  const events = await getEventsList();
  const upcoming = events.filter(
    (e) => new Date(e.start_at) >= new Date()
  );
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {upcoming.length === 0 ? (
        <div className="col-span-full rounded-2xl border border-dashed bg-muted/30 p-12 text-center">
          <p className="text-muted-foreground">No hay próximos eventos.</p>
        </div>
      ) : (
        upcoming.map((ev) => (
          <Card key={ev.id} className="rounded-2xl shadow-sm overflow-hidden">
            <Link href={`/eventos/${ev.id}`} className="block">
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
            </Link>
            <CardContent className="flex flex-wrap items-center gap-2">
              <Button asChild size="sm" variant="outline">
                <Link href={`/eventos/${ev.id}`}>Ver más</Link>
              </Button>
              {ev.link && (
                <Button asChild size="sm" variant="ghost">
                  <a href={ev.link} target="_blank" rel="noopener noreferrer">
                    Ver enlace
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
