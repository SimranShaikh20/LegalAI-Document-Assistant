import { Shield, AlertTriangle, FileCheck, Users, Globe, Zap, Scale, TrendingUp, Brain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const HowItWorks = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      badge: "Core Feature",
      description: "Advanced natural language processing identifies key clauses, risks, and opportunities in seconds.",
      color: "text-blue-500"
    },
    {
      icon: AlertTriangle,
      title: "Risk Assessment",
      badge: "Risk Management",
      description: "Intelligent risk scoring and prioritization helps you focus on what matters most.",
      color: "text-amber-500"
    },
    {
      icon: FileCheck,
      title: "Clause Extraction",
      badge: "Document Processing",
      description: "Automatically extract and categorize important clauses, terms, and obligations.",
      color: "text-green-500"
    },
    {
      icon: Shield,
      title: "Security First",
      badge: "Security",
      description: "Bank-level encryption and privacy compliance ensure your documents stay confidential.",
      color: "text-emerald-500"
    },
    {
      icon: Globe,
      title: "Multi-Language",
      badge: "Global",
      description: "Support for legal documents in multiple languages and jurisdictions.",
      color: "text-cyan-500"
    },
    {
      icon: Zap,
      title: "Instant Results",
      badge: "Speed",
      description: "Get comprehensive analysis results in under 2 minutes, not hours or days.",
      color: "text-yellow-500"
    },
    {
      icon: TrendingUp,
      title: "Continuous Learning",
      badge: "Innovation",
      description: "Our AI improves with every document, becoming more accurate over time.",
      color: "text-rose-500"
    },
    {
      icon: Scale,
      title: "Legal Compliance",
      badge: "Compliance",
      description: "Stay compliant with regulatory requirements and industry standards.",
      color: "text-indigo-500"
    },
    {
      icon: Users,
      title: "Human Expertise",
      badge: "Expert Network",
      description: "Connect with qualified lawyers through our verified professional network when needed.",
      color: "text-purple-500"
    }
  ];

  return (
    <section className="bg-muted/30 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-4 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border bg-background px-4 py-1.5 text-sm font-medium">
            ✓ COMPLETE SOLUTION
          </div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Everything You Need for
            <br />
            <span className="text-primary">Legal Document Analysis</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            From AI-powered risk assessment to expert legal guidance, our comprehensive platform provides all the tools you need to understand and act on legal documents with confidence.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 ${feature.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border bg-background px-2.5 py-0.5 text-xs font-medium">{feature.badge}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
