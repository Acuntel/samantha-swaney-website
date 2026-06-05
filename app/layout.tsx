import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import PageLoader from "@/components/PageLoader";
import { SAMANTHA } from "@/lib/samantha-data";
import {
  JsonLd,
  canonical,
  realEstateAgentSchema,
  webSiteSchema,
} from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://samantha-swaney-site.vercel.app",
  ),
  title: {
    default: `${SAMANTHA.name} | Real Estate Broker in ${SAMANTHA.market}`,
    template: `%s | ${SAMANTHA.name}`,
  },
  description:
    "Samantha Swaney is a real estate broker with GC Realty & Development, helping buyers, sellers, and investors across Elmhurst and the near-west Cook County suburbs. Local, honest, and hands-on from first showing to closing day.",
  alternates: { canonical: canonical("/") },
  robots: { index: true, follow: true },
  keywords: [
    "Samantha Swaney",
    "Elmhurst realtor",
    "Oak Park real estate agent",
    "near-west Cook County suburbs homes",
    "GC Realty Development",
    "Chicago suburbs real estate broker",
  ],
  openGraph: {
    title: `${SAMANTHA.name} | ${SAMANTHA.tagline}`,
    description:
      "Real estate broker with GC Realty & Development, serving Elmhurst and the near-west Cook County suburbs. Buyers, sellers, and investors welcome.",
    type: "website",
    images: [SAMANTHA.headshot],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SAMANTHA.name} | ${SAMANTHA.tagline}`,
    description:
      "Real estate broker serving Elmhurst and the near-west Cook County suburbs.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <JsonLd data={realEstateAgentSchema()} />
        <JsonLd data={webSiteSchema()} />
        <PageLoader />
        <Nav />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
