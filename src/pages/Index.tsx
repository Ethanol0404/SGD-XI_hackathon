import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { LiveIndicators } from "@/components/home/LiveIndicators";
import { ProblemSection } from "@/components/home/ProblemSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import {
  Navigation
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <LiveIndicators />
        <ProblemSection />
        <FeaturesSection />

        {/* Footer */}
        <footer className="py-12 border-t border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
                    <Navigation className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                <span className="font-display font-semibold text-foreground">
                  UrbanCare
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2025 UrbanCare. AI-powered urban health navigation.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
