"use client";

import {
  createContext,
  useCallback,
  useContext,
  useTransition,
} from "react";
import type { Locale } from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isPending: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const [isPending, startTransition] = useTransition();

  const setLocale = useCallback(
    (newLocale: Locale) => {
      startTransition(async () => {
        const res = await fetch("/api/locale", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ locale: newLocale }),
          credentials: "same-origin",
        });
        if (res.ok) {
          // Recarga completa para que el servidor reciba la cookie en la siguiente petición
          window.location.reload();
        }
      });
    },
    []
  );

  return (
    <LocaleContext.Provider
      value={{ locale: initialLocale, setLocale, isPending }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
