import { Navbar } from "@/components/layout/Navbar";
import { HealthRiskIndex } from "@/components/analytics/HealthRiskIndex";
import { ExposureGraph } from "@/components/analytics/ExposureGraph";
import { TimeAlerts } from "@/components/analytics/TimeAlerts";
import { Activity, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const HealthAnalytics = () => {
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
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Health Risk Analytics</span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  Your Health Dashboard
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                  Track daily health risk indices, monitor pollution exposure patterns, 
                  and receive personalized alerts for safer outdoor activities.
                </p>
              </div>
              <Button variant="outline" className="gap-2 self-start">
                <RefreshCw className="w-4 h-4" />
                Refresh Data
              </Button>
            </div>
          </div>

          {/* Current Status Banner */}
          <div className="glass-card rounded-2xl p-6 mb-8 bg-gradient-to-r from-health-safe/10 via-background to-health-moderate/10 animate-slide-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-semibold text-xl text-foreground mb-1">
                  Current Air Quality Status
                </h2>
                <p className="text-muted-foreground">
                  Last updated: Today at 2:45 PM
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-display font-bold text-health-moderate">72</div>
                  <div className="text-xs text-muted-foreground">AQI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-display font-bold text-health-safe">38</div>
                  <div className="text-xs text-muted-foreground">Risk Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-display font-bold text-foreground">22°C</div>
                  <div className="text-xs text-muted-foreground">Temperature</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <HealthRiskIndex />
            <ExposureGraph />
          </div>

          {/* Time Alerts */}
          <TimeAlerts />

          {/* Health Tips */}
          <div className="mt-8 glass-card rounded-2xl p-6">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">
              Today's Health Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  emoji: "😷",
                  title: "Wear a Mask",
                  desc: "Consider N95 mask during peak traffic hours",
                },
                {
                  emoji: "🏃",
                  title: "Morning Exercise",
                  desc: "Best time for outdoor activities: 5-8 AM",
                },
                {
                  emoji: "🚗",
                  title: "Choose Wisely",
                  desc: "Use our route planner to minimize exposure",
                },
              ].map((tip, index) => (
                <div
                  key={tip.title}
                  className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <span className="text-2xl mb-2 block">{tip.emoji}</span>
                  <h4 className="font-semibold text-foreground mb-1">{tip.title}</h4>
                  <p className="text-sm text-muted-foreground">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HealthAnalytics;
