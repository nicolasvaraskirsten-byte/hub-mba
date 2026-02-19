import Link from "next/link";
import { getExpertsList } from "@/lib/data/experts";
import { ExpertCard } from "@/components/experts/ExpertCard";
import { ArrowLeft } from "lucide-react";

export default async function AdminExpertosPage() {
  const experts = await getExpertsList({});

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        Volver al admin
      </Link>
      <h1 className="text-2xl font-bold">Gestionar expertos</h1>
      <p className="text-muted-foreground mt-1">
        Los expertos se gestionan desde la base de datos (Supabase). Para agregar o editar, usa el SQL Editor o una herramienta de admin. Aquí puedes ver el listado actual.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {experts.map((expert) => (
          <ExpertCard key={expert.user_id} expert={expert} />
        ))}
      </div>
    </div>
  );
}
