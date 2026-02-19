import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-sm sm:text-base">
              MBA UC – HUB Innovación y Emprendimiento
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Escuela de Administración, Facultad de Economía y Administración
            </p>
          </div>
          <nav className="flex flex-wrap gap-4 sm:gap-6 text-sm">
            <Link href="/explorar" className="text-muted-foreground hover:text-foreground py-2 -my-2 min-h-[44px] flex items-center">
              Explorar
            </Link>
            <Link href="/expertos" className="text-muted-foreground hover:text-foreground py-2 -my-2 min-h-[44px] flex items-center">
              Expertos
            </Link>
            <Link href="/auth/signin" className="text-muted-foreground hover:text-foreground py-2 -my-2 min-h-[44px] flex items-center">
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
