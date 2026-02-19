import { getExpertsList } from "@/lib/data/experts";
import { ExpertCard } from "@/components/experts/ExpertCard";

export async function ExpertsList({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string; q?: string }>;
}) {
  const params = await searchParams;
  const experts = await getExpertsList({
    industry: params.industry ?? undefined,
  });

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {experts.length === 0 ? (
        <div className="col-span-full rounded-2xl border border-dashed bg-muted/30 p-12 text-center">
          <p className="text-muted-foreground">
            No hay expertos que coincidan con los filtros.
          </p>
        </div>
      ) : (
        experts.map((expert) => (
          <ExpertCard key={expert.user_id} expert={expert} />
        ))
      )}
    </div>
  );
}
