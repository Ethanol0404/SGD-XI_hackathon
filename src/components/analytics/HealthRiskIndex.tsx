import { Activity, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface DayData {
  day: string;
  risk: number;
  trend: "up" | "down" | "stable";
}

const weekData: DayData[] = [
  { day: "Mon", risk: 42, trend: "stable" },
  { day: "Tue", risk: 58, trend: "up" },
  { day: "Wed", risk: 65, trend: "up" },
  { day: "Thu", risk: 52, trend: "down" },
  { day: "Fri", risk: 48, trend: "down" },
  { day: "Sat", risk: 35, trend: "down" },
  { day: "Sun", risk: 38, trend: "up" },
];

function getRiskLevel(risk: number) {
  if (risk <= 40) return { label: "Low", color: "bg-health-safe", textColor: "text-health-safe" };
  if (risk <= 60) return { label: "Moderate", color: "bg-health-moderate", textColor: "text-health-moderate" };
  return { label: "High", color: "bg-health-danger", textColor: "text-health-danger" };
}

export function HealthRiskIndex() {
  const todayRisk = weekData[weekData.length - 1];
  const riskInfo = getRiskLevel(todayRisk.risk);

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-foreground">
              Daily Health Risk Index
            </h3>
            <p className="text-sm text-muted-foreground">Past 7 days overview</p>
          </div>
        </div>
        <div className="text-right">
          <div className={cn("text-3xl font-display font-bold", riskInfo.textColor)}>
            {todayRisk.risk}
          </div>
          <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", riskInfo.color, "text-primary-foreground")}>
            {riskInfo.label} Risk
          </span>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end justify-between gap-2 h-40 mb-4">
        {weekData.map((data, index) => {
          const riskLevel = getRiskLevel(data.risk);
          const isToday = index === weekData.length - 1;
          return (
            <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
              <div className="relative w-full flex justify-center">
                {isToday && (
                  <div className="absolute -top-6 text-xs font-semibold text-primary">
                    Today
                  </div>
                )}
                <div
                  className={cn(
                    "w-full max-w-[40px] rounded-t-lg transition-all duration-500",
                    riskLevel.color,
                    isToday && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  )}
                  style={{ 
                    height: `${data.risk * 1.4}px`,
                    animationDelay: `${index * 100}ms`
                  }}
                />
              </div>
              <span className={cn(
                "text-xs",
                isToday ? "font-semibold text-foreground" : "text-muted-foreground"
              )}>
                {data.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded bg-health-safe" />
          <span className="text-muted-foreground">Low (0-40)</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded bg-health-moderate" />
          <span className="text-muted-foreground">Moderate (41-60)</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded bg-health-danger" />
          <span className="text-muted-foreground">High (61+)</span>
        </div>
      </div>
    </div>
  );
}
