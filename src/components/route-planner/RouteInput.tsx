import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Search, Crosshair } from "lucide-react";

interface RouteInputProps {
  onSearch: (start: string, end: string) => void;
}

export function RouteInput({ onSearch }: RouteInputProps) {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startLocation && endLocation) {
      onSearch(startLocation, endLocation);
    }
  };

  const handleUseCurrentLocation = () => {
    setStartLocation("Current Location (GPS)");
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6">
      <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
        <Navigation className="w-5 h-5 text-primary" />
        Plan Your Route
      </h3>

      <div className="space-y-4">
        {/* Start Location */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-health-safe" />
          <input
            type="text"
            placeholder="Enter start location"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            className="w-full pl-10 pr-12 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
            title="Use current location"
          >
            <Crosshair className="w-5 h-5" />
          </button>
        </div>

        {/* Connector Line */}
        <div className="flex items-center pl-5 gap-3">
          <div className="w-px h-8 bg-border" />
          <span className="text-xs text-muted-foreground">via healthiest route</span>
        </div>

        {/* End Location */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-health-danger" />
          <input
            type="text"
            placeholder="Enter hospital or clinic"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Quick Destinations */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Quick:</span>
          {["General Hospital", "Community Clinic", "Emergency Room"].map((dest) => (
            <button
              key={dest}
              type="button"
              onClick={() => setEndLocation(dest)}
              className="text-xs px-3 py-1 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
            >
              {dest}
            </button>
          ))}
        </div>

        {/* Search Button */}
        <Button type="submit" variant="hero" className="w-full" size="lg">
          <Search className="w-5 h-5" />
          Find Healthy Routes
        </Button>
      </div>
    </form>
  );
}
