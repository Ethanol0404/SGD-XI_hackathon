import { Navbar } from "@/components/layout/Navbar";
import { Heart, Target, Users, Leaf, Globe, Shield } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">About UrbanCare</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Our Mission for
              <br />
              <span className="text-gradient">Healthier Cities</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe everyone deserves access to clean air and quality healthcare.
              UrbanCare is building the future of urban health navigation.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="glass-card rounded-3xl p-8 md:p-12 mb-12 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              UrbanCare is an AI-powered platform dedicated to transforming urban health navigation.
              We help residents find the healthiest and safest routes to healthcare facilities by
              analyzing real-time air quality, traffic congestion, and accident risk data.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our platform also empowers city planners and health authorities to identify underserved
              areas with poor healthcare access and high pollution exposure, enabling data-driven
              decisions for building healthier, more equitable cities.
            </p>
          </div>

          {/* Core Values */}
          <div className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
              What We Stand For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Leaf className="w-6 h-6" />,
                  title: "Environmental Health",
                  description: "We prioritize clean air and sustainable urban living, helping people minimize their pollution exposure daily.",
                  color: "bg-health-safe/10 text-health-safe",
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: "Healthcare Equity",
                  description: "Every community deserves accessible healthcare. We identify gaps and advocate for better coverage.",
                  color: "bg-primary/10 text-primary",
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "Safety First",
                  description: "From accident-prone roads to emergency response times, we help make every journey safer.",
                  color: "bg-accent/10 text-accent",
                },
              ].map((value, index) => (
                <div
                  key={value.title}
                  className="glass-card rounded-2xl p-6 text-center animate-slide-up"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className={`w-14 h-14 rounded-xl ${value.color} flex items-center justify-center mx-auto mb-4`}>
                    {value.icon}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* The Problem We Solve */}
          <div className="glass-card rounded-3xl p-8 md:p-12 mb-12 bg-gradient-to-br from-health-danger/5 via-background to-health-moderate/5 animate-slide-up" style={{ animationDelay: "500ms" }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
              The Problem We Are Solving
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "People unknowingly travel through high-pollution routes, increasing respiratory risks",
                "Traffic congestion delays emergency access to hospitals when every second counts",
                "Many communities are far from clinics and located in high-risk pollution zones",
                "City planners lack real-time, integrated insights for healthcare accessibility",
                "Lack of transparency on hospital capacity and ambulance availability reduces emergency care efficiency.",
              ].map((problem, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-background/50">
                  <div className="w-6 h-6 rounded-full bg-health-danger/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-health-danger font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-muted-foreground">{problem}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Vision */}
          <div className="text-center glass-card rounded-3xl p-8 md:p-12 animate-slide-up" style={{ animationDelay: "600ms" }}>
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Our Vision
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
              A world where every urban resident can move through their city safely, breathing cleaner air, avoiding hidden health risks, and reaching the right healthcare facility without delay.
            </p>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
              We imagine smart cities where real-time data on pollution, traffic, hospital capacity, and ambulance availability empowers both citizens and authorities to make faster, healthier, and more equitable decisions.
            </p>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our vision is a future where technology bridges healthcare gaps, protects vulnerable communities, and ensures that quality care is accessible for all—exactly when and where it is needed.
            </p>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
