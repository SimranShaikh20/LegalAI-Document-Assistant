import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";

export const FeatureComparison = () => {
  const features = [
    {
      category: "Analysis Speed",
      traditional: "3-8 hours per document",
      legalAI: "Under 2 minutes",
      highlight: true
    },
    {
      category: "Cost per Analysis",
      traditional: "$200-500",
      legalAI: "$10-50",
      highlight: true
    },
    {
      category: "Risk Assessment",
      traditional: "Manual review",
      legalAI: "Automated 0-100 scoring",
      highlight: false
    },
    {
      category: "Consistency",
      traditional: "Varies by reviewer",
      legalAI: "Consistent AI analysis",
      highlight: false
    },
    {
      category: "Multi-language",
      traditional: "Limited",
      legalAI: "English, Hindi, Gujarati",
      highlight: false
    },
    {
      category: "Availability",
      traditional: "Business hours only",
      legalAI: "24/7 instant access",
      highlight: false
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Why Choose LegalAI Pro?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            See how our AI-powered platform compares to traditional legal document review
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="grid divide-y md:divide-y-0 md:divide-x">
            {/* Header Row */}
            <div className="grid grid-cols-3 bg-muted/50">
              <div className="p-4 font-semibold">Feature</div>
              <div className="p-4 text-center font-semibold">Traditional Review</div>
              <div className="bg-primary/5 p-4 text-center font-semibold text-primary">
                LegalAI Pro
              </div>
            </div>

            {/* Feature Rows */}
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-3 ${
                  feature.highlight ? 'bg-primary/5' : ''
                }`}
              >
                <div className="flex items-center p-4 font-medium">
                  {feature.category}
                </div>
                <div className="flex items-center justify-center border-l p-4 text-center text-sm text-muted-foreground">
                  {feature.traditional}
                </div>
                <div className="flex items-center justify-center border-l bg-primary/5 p-4 text-center text-sm font-medium text-primary">
                  {feature.legalAI}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <Card className="p-6 text-center">
            <div className="mb-2 text-4xl font-bold text-primary">80%</div>
            <div className="text-sm text-muted-foreground">
              Reduction in review time
            </div>
          </Card>
          <Card className="p-6 text-center">
            <div className="mb-2 text-4xl font-bold text-primary">98%</div>
            <div className="text-sm text-muted-foreground">
              Analysis accuracy rate
            </div>
          </Card>
          <Card className="p-6 text-center">
            <div className="mb-2 text-4xl font-bold text-primary">50K+</div>
            <div className="text-sm text-muted-foreground">
              Documents analyzed
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
