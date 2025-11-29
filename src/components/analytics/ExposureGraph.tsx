import { Wind, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataPoint {
  hour: string;
  pm25: number;
  co2: number;
  no2: number;
}

const hourlyData: DataPoint[] = [
  { hour: "6am", pm25: 35, co2: 45, no2: 28 },
  { hour: "9am", pm25: 68, co2: 72, no2: 55 },
  { hour: "12pm", pm25: 82, co2: 85, no2: 70 },
  { hour: "3pm", pm25: 75, co2: 78, no2: 62 },
  { hour: "6pm", pm25: 90, co2: 88, no2: 75 },
  { hour: "9pm", pm25: 55, co2: 52, no2: 40 },
  { hour: "12am", pm25: 32, co2: 38, no2: 25 },
];

export function ExposureGraph() {
  const maxValue = 100;

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-health-moderate/10 flex items-center justify-center">
            <Wind className="w-6 h-6 text-health-moderate" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-foreground">
              Pollution Exposure Graph
            </h3>
            <p className="text-sm text-muted-foreground">24-hour pollutant levels</p>
          </div>
        </div>
      </div>

      {/* Graph Area */}
      <div className="relative h-52 mb-4">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-xs text-muted-foreground">
          <span>100</span>
          <span>75</span>
          <span>50</span>
          <span>25</span>
          <span>0</span>
        </div>

        {/* Graph content */}
        <div className="ml-10 h-full relative">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="border-t border-border/30" />
            ))}
          </div>

          {/* Data visualization */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {/* PM2.5 Line */}
            <polyline
              fill="none"
              stroke="hsl(var(--health-danger))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={hourlyData.map((d, i) => 
                `${(i / (hourlyData.length - 1)) * 100}%,${100 - d.pm25}%`
              ).join(' ')}
            />
            {/* CO2 Line */}
            <polyline
              fill="none"
              stroke="hsl(var(--health-moderate))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="5,5"
              points={hourlyData.map((d, i) => 
                `${(i / (hourlyData.length - 1)) * 100}%,${100 - d.co2}%`
              ).join(' ')}
            />
            {/* NO2 Line */}
            <polyline
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={hourlyData.map((d, i) => 
                `${(i / (hourlyData.length - 1)) * 100}%,${100 - d.no2}%`
              ).join(' ')}
            />
            {/* Data points */}
            {hourlyData.map((d, i) => (
              <g key={i}>
                <circle
                  cx={`${(i / (hourlyData.length - 1)) * 100}%`}
                  cy={`${100 - d.pm25}%`}
                  r="4"
                  fill="hsl(var(--health-danger))"
                />
                <circle
                  cx={`${(i / (hourlyData.length - 1)) * 100}%`}
                  cy={`${100 - d.no2}%`}
                  r="4"
                  fill="hsl(var(--primary))"
                />
              </g>
            ))}
          </svg>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between translate-y-full pt-2">
            {hourlyData.map((d) => (
              <span key={d.hour} className="text-xs text-muted-foreground">
                {d.hour}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-4 h-0.5 bg-health-danger rounded" />
          <span className="text-muted-foreground">PM2.5</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-4 h-0.5 bg-health-moderate rounded" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)' }} />
          <span className="text-muted-foreground">CO₂</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-4 h-0.5 bg-primary rounded" />
          <span className="text-muted-foreground">NO₂</span>
        </div>
      </div>

      {/* Peak Warning */}
      <div className="mt-4 p-3 rounded-xl bg-health-danger/10 border border-health-danger/20">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-health-danger mt-0.5" />
          <div className="text-sm">
            <span className="font-semibold text-health-danger">Peak hours: 6pm</span>
            <span className="text-muted-foreground"> - Consider limiting outdoor activities during evening rush hour.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
