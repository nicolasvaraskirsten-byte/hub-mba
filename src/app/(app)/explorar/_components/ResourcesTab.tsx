import { getResourcesList } from "@/lib/data/resources";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export async function ResourcesTab() {
  const resources = await getResourcesList();
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.length === 0 ? (
        <div className="col-span-full rounded-2xl border border-dashed bg-muted/30 p-12 text-center">
          <p className="text-muted-foreground">No hay recursos publicados.</p>
        </div>
      ) : (
        resources.map((r) => (
          <Card key={r.id} className="rounded-2xl shadow-sm">
            <CardHeader>
              <h3 className="font-semibold">{r.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {r.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {(r.tags ?? []).map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-cta hover:underline"
              >
                Abrir recurso
                <ExternalLink className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
