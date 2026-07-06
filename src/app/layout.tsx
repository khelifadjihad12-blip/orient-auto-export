import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SkipLink } from "@/components/site/skip-link";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const siteUrl = "https://www.orientautoexport.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Orient Auto Export — Brand-New Chinese Vehicle Export to Algeria & North Africa",
    template: "%s | Orient Auto Export",
  },
  description:
    "Hong Kong registered automobile trading company exporting brand-new Chinese electric, hybrid and petrol vehicles to Algeria and North Africa. Transparent quotations, documented Incoterms, secure payment and full export documentation.",
  keywords: [
    "Chinese vehicle export",
    "BYD export Algeria",
    "Geely import North Africa",
    "Hong Kong automobile trading company",
    "Chinese EV export",
    "Zeekr Hongqi Chery export",
    "vehicle import Algeria",
    "FOB CIF vehicle shipping China",
  ],
  authors: [{ name: "Orient Auto Export Limited" }],
  creator: "Orient Auto Export Limited",
  publisher: "Orient Auto Export Limited",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      fr: "/",
      ar: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en",
    alternateLocale: ["fr", "ar"],
    url: siteUrl,
    siteName: "Orient Auto Export",
    title: "Orient Auto Export — Brand-New Chinese Vehicle Export to North Africa",
    description:
      "Hong Kong registered automobile trading company. Sourcing, inspecting, shipping and documenting brand-new Chinese vehicles to Algeria and North Africa with full transparency.",
    images: [
      {
        url: "/images/og-cover.png",
        width: 1344,
        height: 768,
        alt: "Orient Auto Export — Brand-New Chinese Vehicle Export",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orient Auto Export — Brand-New Chinese Vehicle Export to North Africa",
    description:
      "Hong Kong registered automobile trading company exporting brand-new Chinese vehicles to Algeria and North Africa.",
    images: ["/images/og-cover.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "business",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Orient Auto Export Limited",
  alternateName: "Orient Auto Export",
  url: siteUrl,
  logo: `${siteUrl}/images/og-cover.png`,
  description:
    "Hong Kong registered automobile trading company exporting brand-new Chinese vehicles to Algeria and North Africa.",
  foundingDate: "2017",
  foundingLocation: {
    "@type": "Place",
    name: "Hong Kong",
  },
  areaServed: ["Algeria", "Morocco", "Tunisia", "North Africa", "Middle East"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Central",
    addressRegion: "Hong Kong",
    addressCountry: "HK",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "trade@orientautoexport.com",
    availableLanguage: ["English", "French", "Arabic"],
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <I18nProvider>
            <SkipLink />
            {children}
            <Toaster />
            <Sonner />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
