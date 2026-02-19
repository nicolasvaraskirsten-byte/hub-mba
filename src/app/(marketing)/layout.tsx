import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAStrip } from "@/components/layout/CTAStrip";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-8rem)]">{children}</main>
      <CTAStrip />
      <Footer />
    </>
  );
}
