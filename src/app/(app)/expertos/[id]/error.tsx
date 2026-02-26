"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ExpertPageError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Expert page error:", error);
  }, [error]);

  return (
    <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-xl font-bold">No se pudo cargar el perfil</h1>
      <p className="text-center text-sm text-muted-foreground">
        Hubo un problema al cargar este experto. Revisa que la base de datos tenga la columna <code className="rounded bg-muted px-1">calendly_url</code> en la tabla <code className="rounded bg-muted px-1">experts</code> si aplicaste la integración con Calendly.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          Reintentar
        </button>
        <Link
          href="/expertos"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Ver todos los expertos
        </Link>
      </div>
    </div>
  );
}
