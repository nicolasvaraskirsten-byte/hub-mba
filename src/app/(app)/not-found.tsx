import Link from "next/link";

/**
 * 404 dentro del layout (app): header y footer visibles.
 * Se usa cuando un recurso no existe (ej. experto inexistente).
 */
export default function AppNotFound() {
  return (
    <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-2xl font-bold">No encontrado</h1>
      <p className="text-center text-muted-foreground">
        El contenido que buscas no existe o ya no está disponible.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/expertos"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Ver expertos
        </Link>
        <Link
          href="/"
          className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          Inicio
        </Link>
      </div>
    </div>
  );
}
