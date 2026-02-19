import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getEventsList } from "@/lib/data/events";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CreateEventForm } from "./_components/CreateEventForm";

export default async function AdminEventosPage() {
  const events = await getEventsList(100);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        Volver al admin
      </Link>
      <h1 className="text-2xl font-bold">Eventos</h1>
      <p className="text-muted-foreground mt-1">
        Crear y listar eventos del Hub.
      </p>
      <div className="mt-8">
        <CreateEventForm />
      </div>
      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        {events.map((ev) => (
          <Card key={ev.id} className="rounded-2xl shadow-sm">
            <CardHeader>
              <h3 className="font-semibold">{ev.title}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(ev.start_at).toLocaleString("es-CL")}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {ev.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
