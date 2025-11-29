import { Hospital, Users, AlertTriangle } from "lucide-react";

export function HeatmapPlaceholder() {
  return (
    <div className="relative w-full h-full min-h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-muted via-background to-muted border border-border/50">
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px"
        }}
      />

      {/* Heatmap zones */}
      <div className="absolute top-[15%] left-[20%] w-32 h-32 bg-health-danger/40 rounded-full blur-3xl" />
      <div className="absolute top-[30%] right-[15%] w-28 h-28 bg-health-danger/30 rounded-full blur-3xl" />
      <div className="absolute bottom-[25%] left-[35%] w-36 h-36 bg-health-moderate/40 rounded-full blur-3xl" />
      <div className="absolute top-[55%] left-[15%] w-24 h-24 bg-health-moderate/30 rounded-full blur-3xl" />
      <div className="absolute bottom-[35%] right-[25%] w-20 h-20 bg-health-safe/30 rounded-full blur-3xl" />
      <div className="absolute top-[45%] right-[40%] w-28 h-28 bg-health-safe/40 rounded-full blur-3xl" />

      {/* Hospital markers */}
      {[
        { top: "25%", left: "45%", name: "General Hospital" },
        { top: "60%", left: "25%", name: "Community Clinic" },
        { top: "40%", left: "70%", name: "Medical Center" },
      ].map((hospital, index) => (
        <div
          key={index}
          className="absolute group cursor-pointer"
          style={{ top: hospital.top, left: hospital.left }}
        >
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Hospital className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <div className="bg-card px-2 py-1 rounded text-xs font-medium text-foreground shadow-lg">
              {hospital.name}
            </div>
          </div>
        </div>
      ))}

      {/* Underserved area markers */}
      {[
        { top: "20%", left: "22%", severity: "high" },
        { top: "35%", right: "18%", severity: "high" },
        { top: "65%", left: "40%", severity: "medium" },
      ].map((area, index) => (
        <div
          key={index}
          className="absolute"
          style={{ top: area.top, left: area.left, right: (area as any).right }}
        >
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
            area.severity === "high" ? "bg-health-danger/20 text-health-danger" : "bg-health-moderate/20 text-health-moderate"
          }`}>
            <AlertTriangle className="w-3 h-3" />
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass-card rounded-xl p-4">
        <div className="text-xs font-semibold text-foreground mb-3">Healthcare Gap Index</div>
        <div className="flex items-center gap-1 mb-2">
          <div className="w-12 h-3 bg-gradient-to-r from-health-safe via-health-moderate to-health-danger rounded" />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Low</span>
          <span>High</span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <Hospital className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Healthcare Facility</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <AlertTriangle className="w-4 h-4 text-health-danger" />
            <span className="text-muted-foreground">Underserved Area</span>
          </div>
        </div>
      </div>

      {/* Stats overlay */}
      <div className="absolute top-4 right-4 glass-card rounded-xl p-4 w-48">
        <div className="text-xs font-semibold text-foreground mb-3">Quick Stats</div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Total Clinics</span>
            <span className="text-sm font-semibold text-foreground">42</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Gap Areas</span>
            <span className="text-sm font-semibold text-health-danger">8</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Coverage</span>
            <span className="text-sm font-semibold text-health-safe">76%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
