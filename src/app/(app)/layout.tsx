import { SiteHeaderUC } from "@/components/SiteHeaderUC";
import { Footer } from "@/components/layout/Footer";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeaderUC />
      <main className="min-h-[calc(100vh-8rem)] w-full min-w-0 overflow-x-hidden">{children}</main>
      <Footer />
    </>
  );
}
