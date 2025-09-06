import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Shield, 
  Clock, 
  Users, 
  FileSearch, 
  AlertTriangle, 
  Scale, 
  Globe,
  TrendingUp,
  CheckCircle
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced natural language processing identifies key clauses, risks, and opportunities in seconds.",
      badge: "Core Feature",
      color: "primary"
    },
    {
      icon: AlertTriangle,
      title: "Risk Assessment",
      description: "Intelligent risk scoring and prioritization helps you focus on what matters most.",
      badge: "Risk Management",
      color: "warning"
    },
    {
      icon: FileSearch,
      title: "Clause Extraction",
      description: "Automatically extract and categorize important clauses, terms, and obligations.",
      badge: "Document Processing",
      color: "success"
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Bank-level encryption and privacy compliance ensure your documents stay confidential.",
      badge: "Security",
      color: "success"
    },
    {
      icon: Users,
      title: "Expert Network",
      description: "Connect with qualified lawyers through our verified professional network when needed.",
      badge: "Human Expertise",
      color: "primary"
    },
    {
      icon: Globe,
      title: "Multi-Language",
      description: "Support for legal documents in multiple languages and jurisdictions.",
      badge: "Global",
      color: "primary"
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "Get comprehensive analysis results in under 2 minutes, not hours or days.",
      badge: "Speed",
      color: "success"
    },
    {
      icon: TrendingUp,
      title: "Continuous Learning",
      description: "Our AI improves with every document, becoming more accurate over time.",
      badge: "Innovation",
      color: "primary"
    },
    {
      icon: Scale,
      title: "Legal Compliance",
      description: "Stay compliant with regulatory requirements and industry standards.",
      badge: "Compliance",
      color: "warning"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          icon: 'text-primary',
          badge: 'bg-primary/10 text-primary border-primary/20'
        };
      case 'success':
        return {
          icon: 'text-success',
          badge: 'bg-success/10 text-success border-success/20'
        };
      case 'warning':
        return {
          icon: 'text-warning',
          badge: 'bg-warning/10 text-warning border-warning/20'
        };
      default:
        return {
          icon: 'text-primary',
          badge: 'bg-primary/10 text-primary border-primary/20'
        };
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide uppercase">Complete Solution</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need for
            <span className="block text-primary">Legal Document Analysis</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From AI-powered risk assessment to expert legal guidance, our comprehensive platform 
            provides all the tools you need to understand and act on legal documents with confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const colorClasses = getColorClasses(feature.color);
            const Icon = feature.icon;
            
            return (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-smooth group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-lg bg-${feature.color}/10 flex items-center justify-center group-hover:scale-110 transition-bounce`}>
                      <Icon className={`w-6 h-6 ${colorClasses.icon}`} />
                    </div>
                    <Badge variant="outline" className={`text-xs ${colorClasses.badge}`}>
                      {feature.badge}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Card className="p-8 bg-gradient-subtle border-primary/20">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Transform Your Legal Workflow?
              </h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of legal professionals who trust our AI-powered platform 
                for faster, more accurate document analysis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="font-semibold px-8 py-4 hover:bg-primary hover:text-white transition-smooth"
                  onClick={() => window.open('https://calendly.com/msusimran20/30min', '_blank')}
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;