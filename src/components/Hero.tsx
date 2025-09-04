import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, FileText, Scale, Users } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary-light">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-semibold tracking-wide uppercase">AI-Powered Legal Intelligence</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                Simplify
                <span className="block text-primary-light">Legal Documents</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl">
                Transform complex legal documents into clear, actionable insights with AI-powered analysis, 
                risk assessment, and expert guidance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" className="group font-semibold px-8 py-4 text-lg">
                Start Analysis
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white font-semibold px-8 py-4 text-lg">
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-8 text-white/80">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span className="text-sm">50,000+ Documents Analyzed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Scale className="w-5 h-5" />
                <span className="text-sm">95% Accuracy Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="text-sm">Trusted by Legal Teams</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <Card className="p-8 shadow-professional bg-white/95 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">Document Analysis</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">Processing</span>
                  </div>
                </div>

                {/* Mock Analysis Results */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-success-light rounded-lg">
                    <span className="text-sm font-medium">Contract Terms</span>
                    <span className="px-2 py-1 bg-success text-success-foreground text-xs rounded-full">Low Risk</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-warning-light rounded-lg">
                    <span className="text-sm font-medium">Payment Clauses</span>
                    <span className="px-2 py-1 bg-warning text-warning-foreground text-xs rounded-full">Medium Risk</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <span className="text-sm font-medium">Liability Terms</span>
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">Reviewed</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Analysis Progress</span>
                    <span className="text-primary font-medium">87%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="gradient-primary h-2 rounded-full transition-all duration-1000" style={{ width: '87%' }}></div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary-light/20 rounded-full backdrop-blur-sm"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;