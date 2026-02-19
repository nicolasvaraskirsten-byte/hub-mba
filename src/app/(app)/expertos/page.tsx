import { Suspense } from "react";
import { ExpertsList } from "./_components/ExpertsList";
import { ExpertsFilters } from "./_components/ExpertsFilters";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExpertosPage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string; q?: string }>;
}) {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
        Expertos
      </h1>
      <p className="text-muted-foreground mt-2">
        Conecta con mentores por industria, expertise y disponibilidad.
      </p>
      <Suspense fallback={<div className="h-10 mt-6" />}>
        <ExpertsFilters />
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
