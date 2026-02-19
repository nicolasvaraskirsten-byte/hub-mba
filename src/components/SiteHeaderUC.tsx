"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  Menu,
  User,
  LogOut,
  LayoutDashboard,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getTranslations } from "@/lib/i18n";

/** Logo institucional UC: escudo + texto "PONTIFICIA UNIVERSIDAD CATÓLICA DE CHILE" (lockup) */
const UC_LOGO_LOCKUP = "/uc/logo-uc-lockup.png";

const NAV_STRUCTURE: { key: "inicio" | "explorar"; href: string }[] = [
  { key: "inicio", href: "/" },
  { key: "explorar", href: "/explorar" },
];

function NavItem({
  item,
  onNavigate,
}: {
  item: { label: string; href: string };
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "rounded px-2 py-2 text-[15px] font-medium transition-colors",
        "text-[hsl(var(--primary))] hover:underline hover:opacity-90",
        isActive && "underline"
      )}
    >
      {item.label}
    </Link>
  );
}

function SearchDialog({
  open,
  onOpenChange,
  t,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  t: ReturnType<typeof getTranslations>["header"];
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t.search}</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 pt-2">
          <Input
            type="search"
            placeholder={t.searchPlaceholder}
            className="flex-1"
            autoFocus
            aria-label={t.search}
          />
          <Button asChild>
            <Link href="/buscar" onClick={() => onOpenChange(false)}>
              {t.go}
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SearchTrigger({
  onOpen,
  className,
  showLabel = true,
}: {
  onOpen: () => void;
  className?: string;
  showLabel?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "flex items-center gap-1 rounded px-2 py-2 text-[15px] font-medium text-[hsl(var(--primary))] hover:underline hover:opacity-90",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        !showLabel && "p-2",
        className
      )}
      aria-label="Abrir buscador"
    >
      <Search className="h-4 w-4" aria-hidden />
      {showLabel && "Buscador"}
    </button>
  );
}

function LanguageSelector({
  locale,
  setLocale,
  t,
  inSheet,
}: {
  locale: "es" | "en";
  setLocale: (locale: "es" | "en") => void;
  t: ReturnType<typeof getTranslations>["header"];
  inSheet?: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-1 rounded px-2 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            inSheet && "w-full justify-between"
          )}
          aria-label={t.selectLanguage}
        >
          <span className="uppercase">{locale === "es" ? "ES" : "EN"}</span>
          <ChevronDown className="h-4 w-4" aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={inSheet ? "start" : "end"}>
        <DropdownMenuItem onClick={() => setLocale("es")} className="cursor-pointer">
          {t.spanish} {locale === "es" && "✓"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale("en")} className="cursor-pointer">
          {t.english} {locale === "en" && "✓"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SiteHeaderUC() {
  const { locale, setLocale } = useLocale();
  const t = getTranslations(locale).header;
  const navItems = NAV_STRUCTURE.map(({ key, href }) => ({
    label: key === "inicio" ? t.navInicio : t.navExplorar,
    href,
  }));
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const onScroll = useCallback(() => {
    setScrolled(typeof window !== "undefined" ? window.scrollY > 4 : false);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white transition-shadow duration-200",
        scrolled && "shadow-md"
      )}
    >
      {/* Fila superior: marca + título + search/idioma */}
      <div className="border-b border-slate-200/90">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3">
          {/* Izquierda: logo institucional UC (escudo + texto en lockup) */}
          <Link
            href="https://www.uc.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center shrink-0"
            aria-label="Pontificia Universidad Católica de Chile"
          >
            <Image
              src={UC_LOGO_LOCKUP}
              alt="Pontificia Universidad Católica de Chile"
              width={220}
              height={72}
              className="h-12 w-auto sm:h-14 object-contain object-left"
              unoptimized
            />
          </Link>

          {/* Centro: Escuela de Administración + subtítulo */}
          <div className="order-last sm:order-none w-full sm:w-auto sm:flex-1 sm:min-w-0 flex justify-center sm:justify-start">
            <div className="text-center sm:text-left">
              <Link
                href="/"
                className="text-lg sm:text-xl font-semibold tracking-tight text-[hsl(var(--primary))] hover:opacity-90 block"
              >
                {t.schoolOfManagement}
              </Link>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 hidden sm:block">
                {t.schoolSubtitle}
              </p>
            </div>
          </div>

          {/* Derecha: búsqueda + idioma (desktop) */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <SearchTrigger
              onOpen={() => setSearchOpen(true)}
              showLabel={false}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-full"
            />
            <LanguageSelector locale={locale} setLocale={setLocale} t={t} />
          </div>

          {/* Mobile: solo menú hamburguesa aquí; search/idioma van al sheet */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 min-h-[44px] min-w-[44px]"
                  aria-label="Abrir menú de navegación"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm flex flex-col">
                <SheetHeader className="sr-only">
                  <SheetTitle>Menú</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 pt-6 overflow-y-auto">
                  <div className="flex items-center gap-2">
                    <Image
                      src={UC_LOGO_LOCKUP}
                      alt="UC"
                      width={160}
                      height={52}
                      className="h-10 w-auto object-contain object-left"
                      unoptimized
                    />
                    <span className="text-sm font-semibold text-[hsl(var(--primary))]">
                      {t.escAdministracion}
                    </span>
                  </div>
                  <nav className="flex flex-col gap-1" aria-label="Navegación principal">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobile}
                        className="block rounded px-3 py-2 text-[15px] font-medium text-[hsl(var(--primary))] hover:bg-slate-100"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="border-t border-slate-200 pt-4 flex flex-col gap-2">
                    <span className="text-xs text-slate-500">Buscador e idioma</span>
                    <SearchTrigger
                      onOpen={() => {
                        setSearchOpen(true);
                        closeMobile();
                      }}
                    />
                    <LanguageSelector locale={locale} setLocale={setLocale} t={t} inSheet />
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <Link
                      href="/"
                      onClick={closeMobile}
                      className="text-sm text-slate-500 hover:text-[hsl(var(--primary))]"
                    >
                      MBA UC / {t.hubLink}
                    </Link>
                  </div>
                  {status === "loading" ? (
                    <div className="h-10 w-24 rounded bg-slate-100 animate-pulse" />
                  ) : session ? (
                    <div className="flex flex-col gap-1">
                      <Link href="/perfil" onClick={closeMobile} className="flex items-center gap-2 py-2">
                        <User className="h-4 w-4" />
                        {t.myProfile}
                      </Link>
                      <Link href="/agenda" onClick={closeMobile} className="flex items-center gap-2 py-2">
                        <Calendar className="h-4 w-4" />
                        {t.agenda}
                      </Link>
                      {session.user?.role === "admin" && (
                        <Link href="/admin" onClick={closeMobile} className="flex items-center gap-2 py-2">
                          <LayoutDashboard className="h-4 w-4" />
                          {t.admin}
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          signOut({ callbackUrl: "/" });
                          closeMobile();
                        }}
                        className="flex items-center gap-2 py-2 text-left text-destructive"
                      >
                        <LogOut className="h-4 w-4" />
                        {t.signOut}
                      </button>
                    </div>
                  ) : (
                    <Link href="/auth/signin" onClick={closeMobile}>
                      <Button size="sm" className="w-full bg-cta text-cta-foreground hover:bg-cta/90">
                        {t.joinHub}
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Fila inferior: menú horizontal + HUB + usuario */}
      <div className="border-b border-slate-200/90">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 px-4 py-2">
          <nav
            className="hidden md:flex items-center gap-0 flex-wrap"
            aria-label="Navegación principal"
          >
            {navItems.map((item, i) => (
              <span key={item.href} className="flex items-center gap-0">
                {i > 0 && (
                  <span
                    className="h-4 w-px bg-slate-300 mx-0.5 shrink-0"
                    aria-hidden
                  />
                )}
                <NavItem item={item} />
              </span>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2 shrink-0 ml-auto">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-[hsl(var(--primary))] hover:underline whitespace-nowrap"
              title="MBA UC / HUB Innovación y Emprendimiento"
            >
              MBA UC / {t.hubLink}
            </Link>
            {status === "loading" ? (
              <div className="h-9 w-24 rounded-md bg-slate-100 animate-pulse" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={session.user?.image ?? undefined} />
                      <AvatarFallback>
                        {(session.user?.name ?? session.user?.email ?? "U")
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/perfil" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {t.myProfile}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/agenda" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {t.agenda}
                    </Link>
                  </DropdownMenuItem>
                  {session.user?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        {t.admin}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-destructive focus:text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    {t.signOut}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/signin">
                <Button size="sm" className="bg-cta text-cta-foreground hover:bg-cta/90">
                  {t.joinHub}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} t={t} />
    </header>
  );
}
