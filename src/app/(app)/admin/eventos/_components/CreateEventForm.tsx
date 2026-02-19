"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

export function CreateEventForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement)?.value;
    const title = get("title") ?? "";
    const description = get("description") ?? "";
    const start_at = get("start_at") ?? "";
    const end_at = get("end_at") || null;
    const location = get("location") || null;
    const link = get("link") || null;
    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description: description || null,
          start_at: start_at ? new Date(start_at).toISOString() : null,
          end_at: end_at ? new Date(end_at).toISOString() : null,
          location,
          link,
        }),
      });
      if (!res.ok) throw new Error("Error al crear");
      toast.success("Evento creado");
      router.refresh();
      (form as HTMLFormElement).reset();
    } catch {
      toast.error("Error al crear evento");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="rounded-2xl shadow-sm max-w-xl">
      <CardHeader>
        <h2 className="font-semibold">Nuevo evento</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" name="title" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" name="description" className="mt-1" rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start_at">Inicio</Label>
              <Input id="start_at" name="start_at" type="datetime-local" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="end_at">Fin</Label>
              <Input id="end_at" name="end_at" type="datetime-local" className="mt-1" />
            </div>
          </div>
          <div>
            <Label htmlFor="location">Ubicación</Label>
            <Input id="location" name="location" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="link">Enlace</Label>
            <Input id="link" name="link" type="url" className="mt-1" />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear evento"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
