"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

export function CreateResourceForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement)?.value ?? "";
    const title = get("title");
    const description = get("description");
    const url = get("url");
    const tagsStr = get("tags");
    const tags = tagsStr ? tagsStr.split(",").map((s) => s.trim()).filter(Boolean) : [];
    try {
      const res = await fetch("/api/admin/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description: description || null, url, tags }),
      });
      if (!res.ok) throw new Error("Error al crear");
      toast.success("Recurso creado");
      router.refresh();
      (form as HTMLFormElement).reset();
    } catch {
      toast.error("Error al crear recurso");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="rounded-2xl shadow-sm max-w-xl">
      <CardHeader>
        <h2 className="font-semibold">Nuevo recurso</h2>
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
          <div>
            <Label htmlFor="url">URL</Label>
            <Input id="url" name="url" type="url" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="tags">Tags (separados por coma)</Label>
            <Input id="tags" name="tags" placeholder="Pitch, Inversión" className="mt-1" />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear recurso"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
