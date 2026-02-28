import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import VersatilitySection from "@/components/VersatilitySection";
import HowItWorksSection from "@/components/HowItWorksSection";
import DashboardSection from "@/components/DashboardSection";
import PricingSection from "@/components/PricingSection";
import FooterCTA from "@/components/FooterCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="problema">
        <ProblemSolutionSection />
      </div>
      <div id="nichos">
        <VersatilitySection />
      </div>
      <div id="como-funciona">
        <HowItWorksSection />
      </div>
      <div id="dashboard">
        <DashboardSection />
      </div>
      <div id="precos">
        <PricingSection />
      </div>
      <div id="cta-final">
        <FooterCTA />
      </div>
    </div>
  );
};

export default Index;
