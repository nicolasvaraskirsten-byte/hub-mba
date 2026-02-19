"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, User, LogOut, LayoutDashboard, Calendar } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 min-w-0">
        <Link href="/" className="flex items-center shrink-0 min-w-0">
          <span className="text-left text-[10px] sm:text-xs text-muted-foreground leading-tight max-w-[90px] sm:max-w-none line-clamp-2 sm:line-clamp-none">
            Escuela de Administración – Facultad de Economía y Administración
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 shrink-0">
          <Link href="/explorar">
            <Button variant="ghost" size="sm">
              Explorar
            </Button>
          </Link>
          <Link href="/expertos">
            <Button variant="ghost" size="sm">
              Expertos
            </Button>
          </Link>
          {session && (
            <>
              <Link href="/perfil">
                <Button variant="ghost" size="sm">
                  Mi perfil
                </Button>
              </Link>
              <Link href="/agenda">
                <Button variant="ghost" size="sm">
                  Agenda
                </Button>
              </Link>
              {session.user.role === "admin" && (
                <Link href="/admin">
                  <Button variant="ghost" size="sm">
                    Admin
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-2 min-w-0 shrink">
          <Link
            href="/"
            className="text-right font-semibold text-xs sm:text-sm text-foreground truncate max-w-[140px] sm:max-w-none"
            title="MBA UC / HUB Innovación y Emprendimiento"
          >
            <span className="hidden sm:inline">MBA UC / HUB Innovación y Emprendimiento</span>
            <span className="sm:hidden">HUB MBA UC</span>
          </Link>

          {status === "loading" ? (
            <div className="h-9 w-24 rounded-md bg-muted animate-pulse" />
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
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
                    Mi perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/agenda" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Agenda
                  </Link>
                </DropdownMenuItem>
                {session.user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Admin
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/signin">
              <Button size="sm" className="bg-cta text-cta-foreground hover:bg-cta/90">
                Unirme al Hub
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden min-h-[44px] min-w-[44px]"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menú"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-white"
          >
            <nav className="container mx-auto flex flex-col gap-1 px-4 py-3">
              <Link href="/explorar" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Explorar
                </Button>
              </Link>
              <Link href="/expertos" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Expertos
                </Button>
              </Link>
              {session && (
                <>
                  <Link href="/perfil" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Mi perfil
                    </Button>
                  </Link>
                  <Link href="/agenda" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Agenda
                    </Button>
                  </Link>
                  {session.user.role === "admin" && (
                    <Link href="/admin" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        Admin
                      </Button>
                    </Link>
                  )}
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
