"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function BookingForm({ expertUserId }: { expertUserId: string }) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!session?.user?.id) return;
    setLoading(true);
    const form = e.currentTarget;
    const startAt = form.start_at.value;
    const notes = form.notes?.value ?? "";
    if (!startAt) {
      toast.error("Elige una fecha y hora.");
      setLoading(false);
      return;
    }
    const start = new Date(startAt);
    const end = new Date(start.getTime() + 30 * 60 * 1000);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expert_user_id: expertUserId,
          start_at: start.toISOString(),
          end_at: end.toISOString(),
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al enviar");
      setSent(true);
      toast.success("Solicitud enviada. El experto te confirmará pronto.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al enviar");
    } finally {
      setLoading(false);
    }
  }

  if (status === "unauthenticated") {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Inicia sesión para agendar una sesión con este experto.
        </p>
        <Button asChild className="w-full bg-cta text-white hover:bg-cta/90">
          <Link href="/auth/signin">Unirme al Hub</Link>
        </Button>
      </div>
    );
  }

  if (sent) {
    return (
      <div className="rounded-lg bg-muted p-4 text-center text-sm text-muted-foreground">
        Solicitud enviada. Revisa tu <Link href="/agenda" className="text-cta underline">Agenda</Link> para el estado.
      </div>
    );
  }

  const now = new Date();
  const slots: string[] = [];
  for (let d = 0; d < 14; d++) {
    const date = new Date(now);
    date.setDate(date.getDate() + d);
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    for (const hour of [9, 10, 11, 14, 15, 16, 17]) {
      date.setHours(hour, 0, 0, 0);
      if (date > now) slots.push(date.toISOString().slice(0, 16));
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="start_at">Próximos slots (14 días)</Label>
        <select
          id="start_at"
          name="start_at"
          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          required
        >
          <option value="">Selecciona fecha y hora</option>
          {slots.slice(0, 30).map((s) => (
            <option key={s} value={s}>
              {new Date(s).toLocaleString("es-CL", {
                weekday: "short",
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="notes">Objetivo de la sesión (opcional)</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Ej: validar modelo de negocio, mentoría en pitch..."
          className="mt-1 min-h-[80px]"
          rows={3}
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-cta text-white hover:bg-cta/90"
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar solicitud"}
      </Button>
    </form>
  );
}
