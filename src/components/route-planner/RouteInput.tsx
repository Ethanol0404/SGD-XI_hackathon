import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Search, Crosshair } from "lucide-react";

interface RouteInputProps {
  onSearch: (start: string, end: string) => void;
  isLoading?: boolean;
}

// Memoized quick destinations to prevent unnecessary re-renders
const QUICK_DESTINATIONS = ["General Hospital", "Community Clinic", "Emergency Room"];

export function RouteInput({ onSearch, isLoading = false }: RouteInputProps) {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");

  // Memoized handlers to prevent unnecessary re-renders
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (startLocation.trim() && endLocation.trim()) {
      onSearch(startLocation.trim(), endLocation.trim());
    }
  }, [startLocation, endLocation, onSearch]);

  const handleUseCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStartLocation("Current Location (GPS)");
        },
        (error) => {
          // Fallback to text if GPS fails
          setStartLocation("Current Location");
        }
      );
    } else {
      setStartLocation("Current Location");
    }
  }, []);

  const handleQuickDestination = useCallback((destination: string) => {
    setEndLocation(destination);
  }, []);

  const handleStartChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStartLocation(e.target.value);
  }, []);

  const handleEndChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEndLocation(e.target.value);
  }, []);

  // Memoized derived state
  const isFormValid = useMemo(() => 
    startLocation.trim().length > 0 && endLocation.trim().length > 0,
    [startLocation, endLocation]
  );

  const quickDestinations = useMemo(() => 
    QUICK_DESTINATIONS.map(dest => (
      <button
        key={dest}
        type="button"
        onClick={() => handleQuickDestination(dest)}
        className="text-xs px-3 py-1 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label={`Set destination to ${dest}`}
      >
        {dest}
      </button>
    )),
    [handleQuickDestination]
  );

  return (
    <form 
      onSubmit={handleSubmit} 
      className="glass-card rounded-2xl p-6"
      aria-label="Route planning form"
    >
      <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
        <Navigation className="w-5 h-5 text-primary" aria-hidden="true" />
        Plan Your Route
      </h3>

      <div className="space-y-4">
        {/* Start Location */}
        <div className="relative">
          <label htmlFor="start-location" className="sr-only">
            Start location
          </label>
          <div 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-health-safe"
            aria-hidden="true"
          />
          <input
            id="start-location"
            type="text"
            placeholder="Enter start location"
            value={startLocation}
            onChange={handleStartChange}
            className="w-full pl-10 pr-12 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            aria-required="true"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Use current location"
            title="Use current location"
          >
            <Crosshair className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Connector Line */}
        <div className="flex items-center pl-5 gap-3" aria-hidden="true">
          <div className="w-px h-8 bg-border" />
          <span className="text-xs text-muted-foreground">via healthiest route</span>
        </div>

        {/* End Location */}
        <div className="relative">
          <label htmlFor="end-location" className="sr-only">
            Destination
          </label>
          <div 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-health-danger"
            aria-hidden="true"
          />
          <input
            id="end-location"
            type="text"
            placeholder="Enter hospital or clinic"
            value={endLocation}
            onChange={handleEndChange}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            aria-required="true"
            autoComplete="off"
          />
        </div>

        {/* Quick Destinations */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Quick destinations:</span>
          {quickDestinations}
        </div>

        {/* Search Button */}
        <Button 
          type="submit" 
          variant="hero" 
          className="w-full relative" 
          size="lg"
          disabled={!isFormValid || isLoading}
          aria-label={isLoading ? "Searching for routes..." : "Find healthy routes"}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Finding Routes...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" aria-hidden="true" />
              Find Healthy Routes
            </>
          )}
        </Button>

        {/* Form validation feedback */}
        {!isFormValid && startLocation && endLocation && (
          <p className="text-xs text-health-warning text-center" role="alert">
            Please enter both start and destination locations
          </p>
        )}
      </div>
    </form>
  );
}