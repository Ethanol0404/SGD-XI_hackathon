import { Building2, MapPin, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Recommendation {
  location: string;
  reason: string;
  potentialServed: string;
  urgency: "Critical" | "High" | "Medium";
  coordinates: string;
}

const recommendations: Recommendation[] = [
  {
    location: "Industrial District North - Sector A",
    reason: "Highest pollution + longest travel time to existing clinics",
    potentialServed: "45,000",
    urgency: "Critical",
    coordinates: "12.9716° N, 77.5946° E",
  },
  {
    location: "Eastside Residential - Block 7",
    reason: "High population density with no nearby facilities",
    potentialServed: "32,000",
    urgency: "High",
    coordinates: "12.9352° N, 77.6245° E",
  },
  {
    location: "Riverside Community Center",
    reason: "Geographic isolation from main healthcare corridor",
    potentialServed: "28,500",
    urgency: "High",
    coordinates: "12.9182° N, 77.5714° E",
  },
];

function getUrgencyStyle(urgency: string) {
  switch (urgency) {
    case "Critical":
      return "bg-health-danger text-primary-foreground";
    case "High":
      return "bg-health-moderate text-primary-foreground";
    case "Medium":
      return "bg-health-safe text-primary-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function ClinicRecommendations() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Building2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">
            New Clinic Recommendations
          </h3>
          <p className="text-sm text-muted-foreground">
            AI-suggested locations for maximum impact
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="p-5 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-soft transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-foreground">{rec.location}</h4>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getUrgencyStyle(rec.urgency)}`}>
                {rec.urgency}
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {rec.reason}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm">
                  <Users className="w-4 h-4 text-health-safe" />
                  <span className="text-foreground font-medium">{rec.potentialServed}</span>
                  <span className="text-muted-foreground">to serve</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>

            <div className="mt-3 pt-3 border-t border-border/30">
              <span className="text-xs text-muted-foreground">
                📍 {rec.coordinates}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-foreground">
            Implementing these recommendations could improve healthcare coverage by{" "}
            <strong className="text-primary">23%</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
