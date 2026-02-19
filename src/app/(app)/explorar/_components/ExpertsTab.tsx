import Link from "next/link";
import { ExpertCard } from "@/components/experts/ExpertCard";
import { getExpertsList } from "@/lib/data/experts";

export async function ExpertsTab() {
  const experts = await getExpertsList();
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {experts.length === 0 ? (
        <div className="col-span-full rounded-2xl border border-dashed bg-muted/30 p-12 text-center">
          <p className="text-muted-foreground">Aún no hay expertos publicados.</p>
          <Link
            href="/expertos"
            className="text-cta font-medium mt-2 inline-block"
          >
            Ver directorio de expertos
          </Link>
        </div>
      ) : (
        experts.map((expert) => (
          <ExpertCard key={expert.user_id} expert={expert} />
        ))
      )}
    </div>
  );
}
