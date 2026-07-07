import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { BrandsStrip } from "@/components/sections/brands-strip";
import { VehicleExplorer } from "@/components/sections/vehicle-explorer";
import { RecentlyViewed } from "@/components/sections/recently-viewed";
import { BrandsShowcase } from "@/components/sections/brands-showcase";
import { About } from "@/components/sections/about";
import { TrustCompliance } from "@/components/sections/trust-compliance";
import { ImportJourney } from "@/components/sections/import-journey";
import { Shipping } from "@/components/sections/shipping";
import { QuotationWizard } from "@/components/sections/quotation-wizard";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Articles } from "@/components/sections/articles";
import { Contact } from "@/components/sections/contact";
import { Cta } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { StructuredData } from "@/components/seo/structured-data";
import {
  getBrands,
  getVehicles,
  getShippingRoutes,
  getTestimonials,
  getFaqs,
  getArticles,
  getPlatformStats,
} from "@/lib/data";

export const revalidate = 3600; // ISR: refresh catalog hourly

export default async function HomePage() {
  const [brands, vehicles, routes, testimonials, faqs, articles, stats] =
    await Promise.all([
      getBrands(),
      getVehicles(),
      getShippingRoutes(),
      getTestimonials(),
      getFaqs(),
      getArticles(),
      getPlatformStats(),
    ]);

  // Distinct destination ports for the quotation wizard dropdown
  const destinationPorts = Array.from(
    new Set(routes.map((r) => `${r.destinationPort} (${r.destinationCountry})`))
  ).sort();

  return (
    <div className="flex min-h-screen flex-col">
      <StructuredData vehicles={vehicles} faqs={faqs} articles={articles} />
      <Navbar brands={brands} />
      <main id="main-content" className="flex-1">
        <Hero stats={stats} />
        <BrandsStrip brands={brands} />
        <VehicleExplorer vehicles={vehicles} brands={brands} />
        <RecentlyViewed vehicles={vehicles} />
        <BrandsShowcase brands={brands} vehicles={vehicles} />
        <TrustCompliance stats={stats} />
        <About />
        <ImportJourney />
        <Shipping routes={routes} />
        <QuotationWizard
          vehicles={vehicles}
          brands={brands}
          destinationPorts={destinationPorts}
        />
        <Testimonials testimonials={testimonials} />
        <Faq faqs={faqs} />
        <Articles articles={articles} />
        <Contact />
        <Cta />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
