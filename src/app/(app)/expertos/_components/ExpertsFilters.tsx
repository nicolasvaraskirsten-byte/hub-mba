"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ExpertsFilters({
  expertiseOptions,
}: {
  expertiseOptions: string[];
}) {
  const searchParams = useSearchParams();
  const expertise = searchParams.get("expertise");

  return (
    <div className="flex flex-wrap items-center gap-2 mt-6">
      <span className="text-sm text-muted-foreground">Etiquetas:</span>
      {expertiseOptions.length === 0 ? (
        <span className="text-sm text-muted-foreground">Sin etiquetas cargadas.</span>
      ) : (
        expertiseOptions.map((tag) => {
          const isActive = expertise === tag;
          return (
            <Link
              key={tag}
              href={isActive ? "/expertos" : `/expertos?expertise=${encodeURIComponent(tag)}`}
              scroll={false}
            >
              <Badge
                variant={isActive ? "default" : "secondary"}
                className="cursor-pointer hover:opacity-90 transition-opacity"
              >
                {tag}
              </Badge>
            </Link>
          );
        })
      )}
      {expertise && (
        <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
          <Link href="/expertos">Limpiar</Link>
        </Button>
      )}
    </div>
  );
}
