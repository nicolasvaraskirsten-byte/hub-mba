"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "lucide-react";
import type { BookingWithParties } from "@/lib/data/bookings";

const STATUS_LABELS: Record<string, string> = {
  requested: "Pendiente",
  accepted: "Confirmada",
  rejected: "Rechazada",
  cancelled: "Cancelada",
  completed: "Completada",
};

export function AgendaList({
  bookings,
  currentUserId,
}: {
  bookings: BookingWithParties[];
  currentUserId: string;
}) {
  if (bookings.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-dashed bg-muted/30 p-12 text-center">
        <p className="text-muted-foreground">Aún no tienes solicitudes ni sesiones.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/expertos">Explorar expertos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {bookings.map((b) => {
        const isRequester = b.requester_user_id === currentUserId;
        const other = isRequester ? b.expert : b.requester;
        return (
          <Card key={b.id} className="rounded-2xl shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">
                    {isRequester ? "Sesión con " : "Solicitud de "}
                    {other?.name ?? "—"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(b.start_at).toLocaleString("es-CL", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <Badge
                variant={
                  b.status === "accepted"
                    ? "default"
                    : b.status === "rejected" || b.status === "cancelled"
                    ? "destructive"
                    : "secondary"
                }
              >
                {STATUS_LABELS[b.status] ?? b.status}
              </Badge>
            </CardHeader>
            {b.notes && (
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{b.notes}</p>
              </CardContent>
            )}
            {b.meet_link && b.status === "accepted" && (
              <CardContent className="pt-0">
                <a
                  href={b.meet_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cta hover:underline"
                >
                  Unirse a la reunión
                </a>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}
