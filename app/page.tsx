import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import FeaturedListings from "@/components/FeaturedListings";
import Neighborhoods from "@/components/Neighborhoods";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import { JsonLd, faqPageSchema } from "@/lib/seo";
import { FAQS } from "@/lib/samantha-data";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqPageSchema(FAQS)} />
      <Hero />
      <Stats />
      <Neighborhoods />
      <FeaturedListings />
      <BlogPreview />
      <Testimonials />
      <FAQ />
      <ContactSection />
    </>
  );
}
