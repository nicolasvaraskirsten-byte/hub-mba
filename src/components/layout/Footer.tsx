import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p className="font-semibold text-foreground">
              MBA UC – HUB Innovación y Emprendimiento
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Escuela de Administración, Facultad de Economía y Administración
            </p>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm">
            <Link href="/explorar" className="text-muted-foreground hover:text-foreground">
              Explorar
            </Link>
            <Link href="/expertos" className="text-muted-foreground hover:text-foreground">
              Expertos
            </Link>
            <Link href="/auth/signin" className="text-muted-foreground hover:text-foreground">
              Acceso
            </Link>
          </nav>
        </div>
        <p className="text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()} Pontificia Universidad Católica de Chile. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
