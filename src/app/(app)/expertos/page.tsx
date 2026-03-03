import { Suspense } from "react";
import { ExpertsList } from "./_components/ExpertsList";
import { ExpertsFilters } from "./_components/ExpertsFilters";
import { getUniqueExpertise } from "@/lib/data/experts";
import { Skeleton } from "@/components/ui/skeleton";

/** Filtros usan searchParams; la página debe ser dinámica para que apliquen. */
export const dynamic = "force-dynamic";

export default async function ExpertosPage({
  searchParams,
}: {
  searchParams: Promise<{ expertise?: string; q?: string }>;
}) {
  const expertiseOptions = await getUniqueExpertise();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
        Expertos
      </h1>
      <p className="text-muted-foreground mt-2">
        Conecta con mentores por etiquetas de expertise y disponibilidad.
      </p>
      <Suspense fallback={<div className="h-10 mt-6" />}>
        <ExpertsFilters expertiseOptions={expertiseOptions} />
      </Suspense>
      <Suspense
        fallback={
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-40 rounded-2xl" />
            ))}
          </div>
        }
      >
        <ExpertsList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
