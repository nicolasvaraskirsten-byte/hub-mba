"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const INDUSTRIES = [
  "Retail",
  "Minería",
  "Energía",
  "Agro",
  "Fintech",
  "Salud",
  "Logística",
  "Tecnología",
];

export function ExpertsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const industry = searchParams.get("industry");

  function setIndustry(value: string | null) {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set("industry", value);
    else next.delete("industry");
    router.push(`/expertos?${next.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mt-6">
      <span className="text-sm text-muted-foreground">Industria:</span>
      {INDUSTRIES.map((ind) => (
        <Badge
          key={ind}
          variant={industry === ind ? "default" : "secondary"}
          className="cursor-pointer"
          onClick={() => setIndustry(industry === ind ? null : ind)}
        >
          {ind}
        </Badge>
      ))}
      {industry && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIndustry(null)}
          className="text-muted-foreground"
        >
          Limpiar
        </Button>
      )}
    </div>
  );
}
