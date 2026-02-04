import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PolicyCarousel } from "@/components/PolicyCarousel";
import { InsurancePlans } from "@/components/InsurancePlans";
import { PremiumCalculator } from "@/components/PremiumCalculator";
import { About } from "@/components/About";
import { News } from "@/components/News";
import { Testimonials } from "@/components/Testimonials";
import { Gallery } from "@/components/Gallery";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <PolicyCarousel />
        <InsurancePlans />
        <PremiumCalculator />
        <About />
        <News />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
