import { SiteHeaderUC } from "@/components/SiteHeaderUC";
import { Footer } from "@/components/layout/Footer";
import { CTAStrip } from "@/components/layout/CTAStrip";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeaderUC />
      <main className="min-h-[calc(100vh-8rem)] w-full min-w-0">{children}</main>
      <CTAStrip />
      <Footer />
    </>
  );
}
