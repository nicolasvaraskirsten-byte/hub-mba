"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { ExpertWithUser } from "@/lib/db/types";

const SLIDE_INTERVAL_MS = 5000;
const CARDS_PER_SLIDE = 3;

function ExpertCardSlide({ expert }: { expert: ExpertWithUser }) {
  return (
    <Link
      href={`/expertos/${expert.user_id}`}
      className="block h-full"
    >
      <Card className="h-full rounded-2xl shadow-md hover:shadow-lg transition-all border border-border/80 hover:border-hub-pink/20 bg-white">
        <CardHeader className="flex flex-row items-start gap-4">
          <Avatar className="h-14 w-14 rounded-xl shrink-0">
            <AvatarFallback className="rounded-xl bg-hub-pink/15 text-hub-pink">
              {(expert.user?.name ?? "E").slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{expert.user?.name}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {expert.profile?.headline ?? expert.expertise?.[0]}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {(expert.expertise ?? []).slice(0, 3).map((e) => (
                <Badge key={e} variant="secondary" className="text-xs">
                  {e}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

export function ExpertsCarousel({ experts }: { experts: ExpertWithUser[] }) {
  const slides: ExpertWithUser[][] = [];
  for (let i = 0; i < experts.length; i += CARDS_PER_SLIDE) {
    slides.push(experts.slice(i, i + CARDS_PER_SLIDE));
  }
  const [slideIndex, setSlideIndex] = useState(0);
  const count = Math.max(1, slides.length);

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % count);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [count]);

  if (experts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-muted/30 p-12 text-center mt-10">
        <p className="text-muted-foreground">No hay expertos para mostrar.</p>
      </div>
    );
  }

  return (
    <div className="mt-10 overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${slideIndex * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-hidden={i !== slideIndex}
          >
            {slide.map((expert) => (
              <ExpertCardSlide key={expert.user_id} expert={expert} />
            ))}
            {/* Rellenar huecos si el último slide tiene menos de 3 */}
            {slide.length < CARDS_PER_SLIDE &&
              Array.from({ length: CARDS_PER_SLIDE - slide.length }).map(
                (_, j) => <div key={`empty-${j}`} aria-hidden />
              )}
          </div>
        ))}
      </div>
      {count > 1 && (
        <div
          className="flex justify-center gap-2 mt-6"
          aria-label="Diapositivas del carrusel"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSlideIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === slideIndex
                  ? "w-6 bg-primary"
                  : "w-2 bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Ir a grupo ${i + 1}`}
              aria-current={i === slideIndex ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
