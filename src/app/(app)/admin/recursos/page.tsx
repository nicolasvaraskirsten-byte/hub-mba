import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getResourcesList } from "@/lib/data/resources";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CreateResourceForm } from "./_components/CreateResourceForm";

export default async function AdminRecursosPage() {
  const resources = await getResourcesList(100);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        Volver al admin
      </Link>
      <h1 className="text-2xl font-bold">Recursos</h1>
      <p className="text-muted-foreground mt-1">
        Crear y listar recursos del Hub.
      </p>
      <div className="mt-8">
        <CreateResourceForm />
      </div>
      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        {resources.map((r) => (
          <Card key={r.id} className="rounded-2xl shadow-sm">
            <CardHeader>
              <h3 className="font-semibold">{r.title}</h3>
            </CardHeader>
            <CardContent>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-sm text-cta hover:underline">
                {r.url}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
