import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { RouteInput } from "@/components/route-planner/RouteInput";
import { RouteResults } from "@/components/route-planner/RouteResults";
import { MalaysiaMap } from "@/components/route-planner/MapPlaceholder";
import { MapPin } from "lucide-react";

const RoutePlanner = () => {
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (start: string, end: string) => {
    // Simulate search
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Smart Route Planner</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Find Your Healthiest Route
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Our AI analyzes real-time air quality, traffic patterns, and accident data 
              to recommend the safest and cleanest path to your destination.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - Map */}
            <div className="order-2 lg:order-1">
              <MalaysiaMap />
            </div>

            {/* Right Side - Controls & Results */}
            <div className="order-1 lg:order-2 space-y-6">
              <RouteInput onSearch={handleSearch} />
              <RouteResults visible={showResults} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoutePlanner;
