import { MapPin, Navigation, Hospital, Wind, AlertTriangle } from "lucide-react";

export function MapPlaceholder() {
  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 via-muted to-accent/5 border border-border/50">
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      {/* Decorative roads */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
        <path
          d="M50 350 Q 150 300 200 200 T 380 50"
          stroke="hsl(var(--primary) / 0.3)"
          strokeWidth="4"
          fill="none"
          strokeDasharray="10 5"
        />
        <path
          d="M20 200 Q 100 180 200 200 T 380 180"
          stroke="hsl(var(--health-safe) / 0.5)"
          strokeWidth="6"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M80 380 Q 180 280 250 180 T 350 20"
          stroke="hsl(var(--muted-foreground) / 0.2)"
          strokeWidth="3"
          fill="none"
        />
      </svg>

      {/* Markers */}
      <div className="absolute top-[30%] left-[20%] animate-pulse">
        <div className="relative">
          <div className="absolute inset-0 w-10 h-10 bg-health-safe/30 rounded-full animate-ping" />
          <div className="relative w-10 h-10 bg-health-safe rounded-full flex items-center justify-center shadow-lg">
            <Navigation className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-foreground bg-card px-2 py-0.5 rounded whitespace-nowrap">
            Start
          </div>
        </div>
      </div>

      <div className="absolute top-[25%] right-[25%]">
        <div className="relative">
          <div className="w-10 h-10 bg-health-danger rounded-full flex items-center justify-center shadow-lg">
            <Hospital className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-foreground bg-card px-2 py-0.5 rounded whitespace-nowrap">
            Hospital
          </div>
        </div>
      </div>

      {/* Air Quality Zones */}
      <div className="absolute top-[50%] left-[40%] w-24 h-24 bg-health-moderate/20 rounded-full blur-xl" />
      <div className="absolute top-[60%] right-[30%] w-20 h-20 bg-health-danger/20 rounded-full blur-xl" />
      <div className="absolute top-[35%] left-[55%] w-16 h-16 bg-health-safe/20 rounded-full blur-xl" />

      {/* Info overlays */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
        <div className="glass-card rounded-lg px-3 py-2 flex items-center gap-2 text-xs">
          <Wind className="w-4 h-4 text-health-moderate" />
          <span className="text-muted-foreground">AQI: 72</span>
        </div>
        <div className="glass-card rounded-lg px-3 py-2 flex items-center gap-2 text-xs">
          <AlertTriangle className="w-4 h-4 text-health-safe" />
          <span className="text-muted-foreground">Low Risk</span>
        </div>
      </div>

      {/* Zoom controls placeholder */}
      <div className="absolute top-4 right-4 flex flex-col gap-1">
        <button className="w-8 h-8 glass-card rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          +
        </button>
        <button className="w-8 h-8 glass-card rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          −
        </button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 glass-card rounded-xl p-3">
        <div className="text-xs font-semibold text-foreground mb-2">Air Quality</div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-health-safe" />
            <span className="text-muted-foreground">Good</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-health-moderate" />
            <span className="text-muted-foreground">Moderate</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-health-danger" />
            <span className="text-muted-foreground">Poor</span>
          </div>
        </div>
      </div>
    </div>
  );
}
