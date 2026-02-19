import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/SessionProvider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased min-h-screen w-full overflow-x-hidden`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
