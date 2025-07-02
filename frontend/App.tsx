import React from "react";
import Header from "./components/Header";
import HeroSection from "./sections/HeroSection";
import ValuePropositionSection from "./sections/ValuePropositionSection";
import DemoSection from "./sections/DemoSection";
import SocialProofSection from "./sections/FAQSection";
import PricingSection from "./sections/PricingSection";
import LeadCaptureSection from "./sections/LeadCaptureSection";
import Footer from "./components/Footer";
import SecurityTrustSection from "./sections/SecurityTrustSection";

const App: React.FC = () => {
  return (
    <div className="bg-klyro-dark font-sans">
      <Header />
      <main>
        <HeroSection />
        <ValuePropositionSection />
        <DemoSection />
        <SocialProofSection />
        <SecurityTrustSection />
        <PricingSection />
        <LeadCaptureSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
