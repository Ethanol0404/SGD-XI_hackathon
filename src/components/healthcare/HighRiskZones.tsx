import { AlertTriangle, Users, Wind, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Zone {
  rank: number;
  name: string;
  population: string;
  pollutionLevel: "High" | "Very High" | "Moderate";
  travelTime: string;
  accidentFreq: "High" | "Medium" | "Low";
  riskScore: number;
}

const zones: Zone[] = [
  {
    rank: 1,
    name: "Industrial District North",
    population: "45,000",
    pollutionLevel: "Very High",
    travelTime: "28 min",
    accidentFreq: "High",
    riskScore: 94,
  },
  {
    rank: 2,
    name: "Eastside Residential",
    population: "32,000",
    pollutionLevel: "High",
    travelTime: "22 min",
    accidentFreq: "Medium",
    riskScore: 82,
  },
  {
    rank: 3,
    name: "Riverside Community",
    population: "28,500",
    pollutionLevel: "Moderate",
    travelTime: "35 min",
    accidentFreq: "Low",
    riskScore: 75,
  },
  {
    rank: 4,
    name: "Old Town Center",
    population: "18,200",
    pollutionLevel: "High",
    travelTime: "18 min",
    accidentFreq: "High",
    riskScore: 71,
  },
  {
    rank: 5,
    name: "Southern Markets",
    population: "52,000",
    pollutionLevel: "Moderate",
    travelTime: "25 min",
    accidentFreq: "Medium",
    riskScore: 68,
  },
];

function getPollutionColor(level: string) {
  switch (level) {
    case "Very High":
      return "text-health-danger bg-health-danger/10";
    case "High":
      return "text-health-danger/80 bg-health-danger/10";
    case "Moderate":
      return "text-health-moderate bg-health-moderate/10";
    default:
      return "text-muted-foreground bg-muted";
  }
}

function getAccidentColor(freq: string) {
  switch (freq) {
    case "High":
      return "text-health-danger";
    case "Medium":
      return "text-health-moderate";
    case "Low":
      return "text-health-safe";
    default:
      return "text-muted-foreground";
  }
}

function getRiskColor(score: number) {
  if (score >= 80) return "text-health-danger";
  if (score >= 60) return "text-health-moderate";
  return "text-health-safe";
}

export function HighRiskZones() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-health-danger/10 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-health-danger" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">
            Top 5 High-Risk Zones
          </h3>
          <p className="text-sm text-muted-foreground">
            Areas needing immediate healthcare intervention
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {zones.map((zone, index) => (
          <div
            key={zone.rank}
            className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm",
                  zone.rank <= 2 ? "bg-health-danger/20 text-health-danger" : "bg-health-moderate/20 text-health-moderate"
                )}>
                  #{zone.rank}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{zone.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    {zone.population} residents
                  </div>
                </div>
              </div>
              <div className={cn("text-2xl font-display font-bold", getRiskColor(zone.riskScore))}>
                {zone.riskScore}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className={cn("px-2 py-1.5 rounded-lg text-xs font-medium", getPollutionColor(zone.pollutionLevel))}>
                <Wind className="w-3 h-3 inline mr-1" />
                {zone.pollutionLevel}
              </div>
              <div className="px-2 py-1.5 rounded-lg bg-muted text-xs text-muted-foreground">
                <Clock className="w-3 h-3 inline mr-1" />
                {zone.travelTime}
              </div>
              <div className={cn("px-2 py-1.5 rounded-lg bg-muted/50 text-xs font-medium", getAccidentColor(zone.accidentFreq))}>
                <AlertTriangle className="w-3 h-3 inline mr-1" />
                {zone.accidentFreq}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
