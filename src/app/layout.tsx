import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/SessionProvider";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import type { Locale } from "@/lib/i18n";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "HUB Innovación y Emprendimiento | MBA UC",
  description:
    "El espacio del MBA UC que articula experiencia ejecutiva, transición emprendedora y trayectoria empresarial para activar innovación y emprendimiento con impacto.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let locale: Locale = "es";
  try {
    const cookieStore = await cookies();
    const value = cookieStore.get("NEXT_LOCALE")?.value;
    if (value === "en" || value === "es") {
      locale = value as Locale;
    }
  } catch {
    locale = "es";
  }

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased min-h-screen w-full overflow-x-hidden`}>
        <Providers>
          <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
          <WhatsAppFloat />
        </Providers>
      </body>
    </html>
  );
}
