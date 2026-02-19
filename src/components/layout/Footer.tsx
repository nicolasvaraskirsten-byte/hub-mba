"use client";

import {
  Phone,
  ExternalLink,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getTranslations, getFooterColumns } from "@/lib/i18n";

const NAVY = "#071A3A";
const AZUL_UC = "#0B73D9";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const REDES = [
  { name: "X (Twitter)", href: "https://twitter.com/EscuelaAdmUC", icon: XIcon },
  { name: "Instagram", href: "https://www.instagram.com/mbauniversidadcatolica/", icon: Instagram },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/mbauniversidadcatolica/", icon: Linkedin },
  { name: "YouTube", href: "https://www.youtube.com/c/EscueladeAdministracionUCChile", icon: Youtube },
];

export function Footer() {
  const { locale } = useLocale();
  const t = getTranslations(locale).footer;
  const columnas = getFooterColumns(locale);

  return (
    <footer className="w-full">
      {/* Sección superior - Navy */}
      <div
        className="py-14"
        style={{ backgroundColor: NAVY }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="min-w-0">
              <p className="text-white font-semibold text-lg sm:text-xl">
                {t.universityName}
              </p>
              <p className="text-white/80 text-sm mt-1">
                {t.schoolMba}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white text-sm font-medium">{t.followUs}</p>
              <div className="flex flex-wrap gap-4">
                {REDES.map((red) => (
                  <a
                    key={red.name}
                    href={red.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={red.name}
                    className="text-white hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
                  >
                    <red.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección inferior - Azul UC */}
      <div
        className="py-16"
        style={{ backgroundColor: AZUL_UC }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {columnas.map((col) => (
              <div key={col.titulo} className="min-w-0">
                <h3 className="text-sm font-semibold tracking-[0.18em] uppercase text-white mb-3">
                  {col.titulo}
                </h3>
                <p className="text-sm leading-relaxed text-white/90 opacity-90 mb-4">
                  {col.descripcion}
                </p>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      {item.tipo === "tel" ? (
                        <a
                          href={item.href}
                          className="inline-flex items-center gap-2 text-sm text-white/95 hover:underline focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
                          aria-label={`Llamar a ${item.label}`}
                        >
                          <Phone className="h-4 w-4 shrink-0" aria-hidden />
                          <span>{item.label}</span>
                        </a>
                      ) : (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-white/95 hover:underline focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
                          aria-label={`${item.label} (abre en nueva pestaña)`}
                        >
                          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                          <span>{item.label}</span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
