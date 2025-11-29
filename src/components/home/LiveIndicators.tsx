import { Wind, Car, Activity, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface IndicatorProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  status: "safe" | "moderate" | "danger";
  subtext: string;
}

function Indicator({ icon, label, value, status, subtext }: IndicatorProps) {
  const statusColors = {
    safe: "bg-health-safe/10 border-health-safe/30 text-health-safe",
    moderate: "bg-health-moderate/10 border-health-moderate/30 text-health-moderate",
    danger: "bg-health-danger/10 border-health-danger/30 text-health-danger",
  };

  const dotColors = {
    safe: "bg-health-safe",
    moderate: "bg-health-moderate",
    danger: "bg-health-danger",
  };

  return (
    <div className="glass-card rounded-2xl p-5 hover:shadow-elevated transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
          statusColors[status]
        )}>
          {icon}
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("w-2 h-2 rounded-full animate-pulse", dotColors[status])} />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Live</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-display font-bold text-foreground">{value}</p>
      <p className={cn("text-sm mt-1 font-medium", `text-health-${status}`)}>{subtext}</p>
    </div>
  );
}

export function LiveIndicators() {
  const indicators: IndicatorProps[] = [
    {
      icon: <Wind className="w-6 h-6" />,
      label: "Air Quality Index",
      value: "72 AQI",
      status: "moderate",
      subtext: "Moderate - Sensitive groups caution",
    },
    {
      icon: <Car className="w-6 h-6" />,
      label: "Traffic Congestion",
      value: "42%",
      status: "safe",
      subtext: "Light traffic - Good conditions",
    },
    {
      icon: <Activity className="w-6 h-6" />,
      label: "Health Risk Level",
      value: "Low-Med",
      status: "moderate",
      subtext: "Consider mask outdoors",
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      label: "Accident Risk",
      value: "Low",
      status: "safe",
      subtext: "Normal road conditions",
    },
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-3 rounded-full bg-health-safe animate-pulse" />
          <h2 className="font-display text-lg font-semibold text-foreground">
            Real-Time City Health Indicators
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {indicators.map((indicator, index) => (
            <div
              key={indicator.label}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Indicator {...indicator} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
