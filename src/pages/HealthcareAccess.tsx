import { Navbar } from "@/components/layout/Navbar";
import { HeatmapPlaceholder } from "@/components/healthcare/HeatmapPlaceholder";
import { HighRiskZones } from "@/components/healthcare/HighRiskZones";
import { ClinicRecommendations } from "@/components/healthcare/ClinicRecommendations";
import { BarChart3, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const HealthcareAccess = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 animate-slide-up">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Smart Healthcare Access</span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  Healthcare Gap Analysis
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                  Identify underserved areas, analyze healthcare accessibility, and discover 
                  AI-recommended locations for new medical facilities.
                </p>
              </div>
              <Button variant="outline" className="gap-2 self-start">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Heatmap - Takes 2 columns */}
            <div className="xl:col-span-2">
              <HeatmapPlaceholder />
            </div>

            {/* High Risk Zones */}
            <div className="xl:col-span-1">
              <HighRiskZones />
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="mt-8">
            <ClinicRecommendations />
          </div>

          {/* Summary Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Population Analyzed", value: "2.4M", change: "+12%" },
              { label: "Healthcare Facilities", value: "42", change: "+3" },
              { label: "Average Access Time", value: "18 min", change: "-2 min" },
              { label: "Coverage Score", value: "76%", change: "+5%" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-5 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-display font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-sm font-medium text-health-safe mb-0.5">
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HealthcareAccess;
