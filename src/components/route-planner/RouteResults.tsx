import { cn } from "@/lib/utils";
import { Clock, Wind, AlertTriangle, Leaf, Zap, Scale, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Route {
  id: string;
  name: string;
  type: "cleanest" | "fastest" | "balanced";
  duration: string;
  distance: string;
  pollutionExposure: number;
  accidentRisk: "Low" | "Medium" | "High";
  healthScore: number;
  icon: React.ReactNode;
  recommended?: boolean;
}

const routes: Route[] = [
  {
    id: "cleanest",
    name: "Cleanest Route",
    type: "cleanest",
    duration: "18 min",
    distance: "4.2 km",
    pollutionExposure: 28,
    accidentRisk: "Low",
    healthScore: 92,
    icon: <Leaf className="w-5 h-5" />,
    recommended: true,
  },
  {
    id: "fastest",
    name: "Fastest Route",
    type: "fastest",
    duration: "12 min",
    distance: "3.8 km",
    pollutionExposure: 65,
    accidentRisk: "Medium",
    healthScore: 58,
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: "balanced",
    name: "Balanced Route",
    type: "balanced",
    duration: "15 min",
    distance: "4.0 km",
    pollutionExposure: 42,
    accidentRisk: "Low",
    healthScore: 78,
    icon: <Scale className="w-5 h-5" />,
  },
];

function getRiskColor(risk: string) {
  switch (risk) {
    case "Low":
      return "text-health-safe bg-health-safe/10";
    case "Medium":
      return "text-health-moderate bg-health-moderate/10";
    case "High":
      return "text-health-danger bg-health-danger/10";
    default:
      return "text-muted-foreground bg-muted";
  }
}

function getScoreColor(score: number) {
  if (score >= 80) return "text-health-safe";
  if (score >= 50) return "text-health-moderate";
  return "text-health-danger";
}

function getPollutionColor(exposure: number) {
  if (exposure <= 35) return "bg-health-safe";
  if (exposure <= 55) return "bg-health-moderate";
  return "bg-health-danger";
}

interface RouteResultsProps {
  visible: boolean;
}

export function RouteResults({ visible }: RouteResultsProps) {
  if (!visible) return null;

  return (
    <div className="space-y-4 animate-slide-up">
      <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
        <Check className="w-5 h-5 text-health-safe" />
        AI Route Recommendations
      </h3>

      <div className="space-y-3">
        {routes.map((route, index) => (
          <div
            key={route.id}
            className={cn(
              "glass-card rounded-2xl p-5 transition-all duration-300 hover:shadow-elevated cursor-pointer",
              route.recommended && "ring-2 ring-primary/50 bg-primary/5"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {route.recommended && (
              <div className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full mb-3">
                <Leaf className="w-3 h-3" />
                Recommended
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  route.type === "cleanest" && "bg-health-safe/20 text-health-safe",
                  route.type === "fastest" && "bg-accent/20 text-accent",
                  route.type === "balanced" && "bg-primary/20 text-primary",
                )}>
                  {route.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{route.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {route.distance} • {route.duration}
                  </p>
                </div>
              </div>
              <div className={cn("text-2xl font-display font-bold", getScoreColor(route.healthScore))}>
                {route.healthScore}
                <span className="text-xs font-normal text-muted-foreground ml-1">pts</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-muted/50 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  Time
                </div>
                <div className="font-semibold text-foreground">{route.duration}</div>
              </div>
              <div className="bg-muted/50 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
                  <Wind className="w-3.5 h-3.5" />
                  Pollution
                </div>
                <div className="font-semibold text-foreground">{route.pollutionExposure}%</div>
              </div>
              <div className="bg-muted/50 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Risk
                </div>
                <div className={cn("font-semibold text-sm px-2 py-0.5 rounded-full inline-block", getRiskColor(route.accidentRisk))}>
                  {route.accidentRisk}
                </div>
              </div>
            </div>

            {/* Pollution Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Pollution Exposure</span>
                <span>{route.pollutionExposure}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", getPollutionColor(route.pollutionExposure))}
                  style={{ width: `${route.pollutionExposure}%` }}
                />
              </div>
            </div>

            <Button
              variant={route.recommended ? "hero" : "outline"}
              className="w-full"
            >
              Select This Route
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
