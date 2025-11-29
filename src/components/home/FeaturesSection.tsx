import { 
  Route, 
  MapPin, 
  BarChart3, 
  Bell, 
  Ambulance, 
  Camera,
  Zap,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay: number;
}

function FeatureCard({ icon, title, description, gradient, delay }: FeatureCardProps) {
  return (
    <div 
      className="glass-card rounded-2xl p-6 hover:shadow-elevated transition-all duration-500 group animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110",
        gradient
      )}>
        {icon}
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export function FeaturesSection() {
  const features: Omit<FeatureCardProps, "delay">[] = [
    {
      icon: <Route className="w-7 h-7 text-primary-foreground" />,
      title: "Smart Route Planning",
      description: "AI finds the cleanest, fastest, and safest routes based on real-time pollution and traffic data.",
      gradient: "bg-gradient-to-br from-primary to-primary/70",
    },
    {
      icon: <MapPin className="w-7 h-7 text-primary-foreground" />,
      title: "Healthcare Access Maps",
      description: "Identify underserved areas and find the nearest clinics with detailed resource information.",
      gradient: "bg-gradient-to-br from-health-safe to-health-safe/70",
    },
    {
      icon: <BarChart3 className="w-7 h-7 text-primary-foreground" />,
      title: "Health Risk Analytics",
      description: "Track daily health risk indices, pollution exposure graphs, and high-risk time alerts.",
      gradient: "bg-gradient-to-br from-accent to-accent/70",
    },
    {
      icon: <Bell className="w-7 h-7 text-primary-foreground" />,
      title: "Smart Notifications",
      description: "Receive alerts when air quality changes or when you're near high-risk zones.",
      gradient: "bg-gradient-to-br from-health-moderate to-health-moderate/70",
    },
    {
      icon: <Ambulance className="w-7 h-7 text-primary-foreground" />,
      title: "Emergency Services",
      description: "One-tap emergency calls with GPS tracking for ambulances to locate you instantly.",
      gradient: "bg-gradient-to-br from-health-danger to-health-danger/70",
    },
    {
      icon: <Camera className="w-7 h-7 text-primary-foreground" />,
      title: "Photo Upload",
      description: "Upload photos during emergencies to help operators understand your situation better.",
      gradient: "bg-gradient-to-br from-primary/80 to-primary/50",
    },
  ];

  return (
    <section className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powerful Features</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything You Need for
            <br />
            <span className="text-gradient">Healthier Urban Living</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform integrates multiple data sources to provide 
            comprehensive health and navigation insights for urban residents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 glass-card rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Routes Analyzed Daily" },
              { value: "99.2%", label: "Route Accuracy" },
              { value: "200+", label: "Clinics Mapped" },
              { value: "24/7", label: "Emergency Support" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
