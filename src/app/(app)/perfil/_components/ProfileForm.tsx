"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

const GOALS_OPTIONS = [
  "mentoría",
  "cofounder",
  "clientes",
  "inversión",
];

export function ProfileForm({
  initialData,
}: {
  userId?: string;
  initialData: {
    headline: string;
    bio: string;
    linkedin_url: string;
    company: string;
    industry: string;
    location: string;
    interests: string[];
    goals: string[];
    public: boolean;
  };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState<string[]>(initialData.goals);
  const [interestsStr, setInterestsStr] = useState(
    initialData.interests.join(", ")
  );

  function toggleGoal(g: string) {
    setGoals((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement)?.value ?? "";
    const getCheck = (name: string) => (form.elements.namedItem(name) as HTMLInputElement)?.checked ?? false;
    const interests = interestsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          headline: get("headline"),
          bio: get("bio"),
          linkedin_url: get("linkedin_url") || null,
          company: get("company") || null,
          industry: get("industry") || null,
          location: get("location") || null,
          interests,
          goals,
          public: getCheck("public"),
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Error al guardar");
      }
      toast.success("Perfil actualizado");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <h2 className="font-semibold">Datos públicos</h2>
          <p className="text-sm text-muted-foreground">
            Aparecerán en el directorio de participantes si activas &quot;Perfil público&quot;.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="headline">Título / Headline</Label>
            <Input
              id="headline"
              name="headline"
              defaultValue={initialData.headline}
              placeholder="Ej: Gerente Comercial, Founder..."
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              defaultValue={initialData.bio}
              placeholder="Breve descripción profesional"
              className="mt-1 min-h-[100px]"
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="linkedin_url">LinkedIn</Label>
            <Input
              id="linkedin_url"
              name="linkedin_url"
              type="url"
              defaultValue={initialData.linkedin_url}
              placeholder="https://linkedin.com/in/..."
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="company">Empresa</Label>
            <Input
              id="company"
              name="company"
              defaultValue={initialData.company}
              placeholder="Empresa actual"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="industry">Industria</Label>
            <Input
              id="industry"
              name="industry"
              defaultValue={initialData.industry}
              placeholder="Ej: Retail, Tecnología, Salud..."
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="location">Ubicación</Label>
            <Input
              id="location"
              name="location"
              defaultValue={initialData.location}
              placeholder="Ciudad o región"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Intereses (separados por coma)</Label>
            <Input
              value={interestsStr}
              onChange={(e) => setInterestsStr(e.target.value)}
              placeholder="Retail, Fintech, Mentoría..."
              className="mt-1"
            />
          </div>
          <div>
            <Label className="mb-2 block">Busco</Label>
            <div className="flex flex-wrap gap-2">
              {GOALS_OPTIONS.map((g) => (
                <Button
                  key={g}
                  type="button"
                  variant={goals.includes(g) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleGoal(g)}
                >
                  {g}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="public"
              name="public"
              defaultChecked={initialData.public}
              className="rounded border-input"
            />
            <Label htmlFor="public">Perfil público en el directorio de participantes</Label>
          </div>
          <Button type="submit" className="bg-cta text-white hover:bg-cta/90" disabled={loading}>
            {loading ? "Guardando..." : "Guardar perfil"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
