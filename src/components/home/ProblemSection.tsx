import { AlertCircle, Clock, MapPinOff, FileQuestion } from "lucide-react";

const problems = [
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: "Unknowing Pollution Exposure",
    description: "People travel through high-pollution routes daily, increasing respiratory risks without awareness.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Emergency Access Delays",
    description: "Traffic congestion delays critical emergency access to hospitals when every second counts.",
  },
  {
    icon: <MapPinOff className="w-6 h-6" />,
    title: "Healthcare Deserts",
    description: "Many communities are far from clinics and located in high-risk pollution zones.",
  },
  {
    icon: <FileQuestion className="w-6 h-6" />,
    title: "Lack of Integrated Insights",
    description: "City planners lack real-time, integrated data for healthcare accessibility planning.",
  },
];

export function ProblemSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-block text-health-danger font-semibold text-sm uppercase tracking-wider mb-4">
            The Challenge
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Urban Health Challenges
            <br />
            <span className="text-muted-foreground">We're Solving</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className="flex gap-4 p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-health-danger/30 hover:bg-health-danger/5 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-health-danger/10 flex items-center justify-center text-health-danger">
                {problem.icon}
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
