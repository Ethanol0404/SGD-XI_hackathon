import { Clock, AlertTriangle, CheckCircle, Sun, Moon, Sunrise, Sunset } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeSlot {
  period: string;
  time: string;
  risk: "Low" | "Moderate" | "High";
  recommendation: string;
  icon: React.ReactNode;
}

const timeSlots: TimeSlot[] = [
  {
    period: "Early Morning",
    time: "5:00 - 8:00",
    risk: "Low",
    recommendation: "Best time for outdoor exercise and commute",
    icon: <Sunrise className="w-5 h-5" />,
  },
  {
    period: "Morning Rush",
    time: "8:00 - 10:00",
    risk: "Moderate",
    recommendation: "Consider mask if cycling or walking",
    icon: <Sun className="w-5 h-5" />,
  },
  {
    period: "Midday",
    time: "10:00 - 14:00",
    risk: "High",
    recommendation: "Avoid prolonged outdoor activities",
    icon: <Sun className="w-5 h-5" />,
  },
  {
    period: "Afternoon",
    time: "14:00 - 17:00",
    risk: "Moderate",
    recommendation: "Short outdoor activities are acceptable",
    icon: <Sun className="w-5 h-5" />,
  },
  {
    period: "Evening Rush",
    time: "17:00 - 20:00",
    risk: "High",
    recommendation: "Peak pollution - Use cleanest routes",
    icon: <Sunset className="w-5 h-5" />,
  },
  {
    period: "Night",
    time: "20:00 - 5:00",
    risk: "Low",
    recommendation: "Good air quality for evening walks",
    icon: <Moon className="w-5 h-5" />,
  },
];

function getRiskStyle(risk: string) {
  switch (risk) {
    case "Low":
      return {
        bg: "bg-health-safe/10",
        border: "border-health-safe/30",
        text: "text-health-safe",
        icon: <CheckCircle className="w-4 h-4" />,
      };
    case "Moderate":
      return {
        bg: "bg-health-moderate/10",
        border: "border-health-moderate/30",
        text: "text-health-moderate",
        icon: <AlertTriangle className="w-4 h-4" />,
      };
    case "High":
      return {
        bg: "bg-health-danger/10",
        border: "border-health-danger/30",
        text: "text-health-danger",
        icon: <AlertTriangle className="w-4 h-4" />,
      };
    default:
      return {
        bg: "bg-muted",
        border: "border-border",
        text: "text-muted-foreground",
        icon: null,
      };
  }
}

export function TimeAlerts() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
          <Clock className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">
            High-Risk Time Alerts
          </h3>
          <p className="text-sm text-muted-foreground">Today's outdoor activity guide</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {timeSlots.map((slot, index) => {
          const style = getRiskStyle(slot.risk);
          return (
            <div
              key={slot.period}
              className={cn(
                "p-4 rounded-xl border transition-all duration-300 hover:shadow-soft animate-slide-up",
                style.bg,
                style.border
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={cn("p-1.5 rounded-lg", style.bg)}>
                  <span className={style.text}>{slot.icon}</span>
                </div>
                <div className={cn("flex items-center gap-1 text-xs font-semibold", style.text)}>
                  {style.icon}
                  {slot.risk}
                </div>
              </div>
              <h4 className="font-semibold text-foreground text-sm">{slot.period}</h4>
              <p className="text-xs text-muted-foreground mb-2">{slot.time}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {slot.recommendation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
