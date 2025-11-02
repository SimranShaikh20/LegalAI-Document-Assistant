import { FileText, Mic, Languages, Zap, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  const handleScheduleMeeting = () => {
    window.open('https://calendly.com/msusimran20', '_blank');
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 text-primary-foreground lg:py-32">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute left-0 top-0 -translate-x-1/2 translate-y-[-10%]">
          <div className="h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-[100px]" />
        </div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-[10%]">
          <div className="h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-[100px]" />
        </div>
      </div>
      
      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <Zap className="mr-2 h-4 w-4" />
              AI-POWERED LEGAL INTELLIGENCE
            </div>

            {/* Main heading */}
            <h1 className="animate-fade-in-up mb-6 bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text text-5xl font-bold leading-[1.1] tracking-tight text-transparent sm:text-6xl lg:text-7xl [text-wrap:balance]">
              Revolutionize Your
              <br />
              Legal Document Analysis
            </h1>

            {/* Subheading */}
            <p className="mb-8 text-lg text-primary-foreground/90 sm:text-xl">
              Transform complex legal documents into clear, actionable insights with AI-powered analysis, risk assessment, and expert guidance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="w-full bg-white text-primary shadow-lg transition-all hover:bg-white/90 hover:shadow-xl sm:w-auto"
              >
                Start Analysis
                <FileText className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:w-auto"
              >
                <a 
                  onClick={handleScheduleMeeting}
                  href="#"
                >
                  Schedule Demo
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="animate-fade-in-up mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-500/10 p-2">
                    <FileText className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white">50K+</span>
                    <span className="text-sm text-white/70">Documents Analyzed</span>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-yellow-500/10 p-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white">98%</span>
                    <span className="text-sm text-white/70">Accuracy Rate</span>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-purple-500/10 p-2">
                    <Languages className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white">Global</span>
                    <span className="text-sm text-white/70">Legal Teams Trust Us</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Demo visualization */}
          <div className="relative">
            <div className="animate-float rounded-xl border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Document Analysis</h3>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">Live Analysis</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-50 to-blue-50/50 p-4 transition-all hover:translate-x-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-100 p-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-800">Contract Terms</span>
                    </div>
                    <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white shadow-sm">Low Risk</span>
                  </div>
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-blue-100">
                    <div className="h-full w-1/3 animate-progress rounded-full bg-blue-500" />
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-amber-50 to-amber-50/50 p-4 transition-all hover:translate-x-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-amber-100 p-2">
                        <FileText className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="font-medium text-gray-800">Payment Clauses</span>
                    </div>
                    <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-medium text-white shadow-sm">Medium Risk</span>
                  </div>
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-amber-100">
                    <div className="h-full w-2/3 animate-progress rounded-full bg-amber-500" />
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-green-50 to-green-50/50 p-4 transition-all hover:translate-x-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-green-100 p-2">
                        <FileText className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="font-medium text-gray-800">Liability Terms</span>
                    </div>
                    <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white shadow-sm">Completed</span>
                  </div>
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-green-100">
                    <div className="h-full w-full animate-progress rounded-full bg-green-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2">
              <div className="animate-float-slow rounded-lg border border-white/20 bg-white/95 p-3 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-purple-100 p-1.5">
                    <Users className="h-3 w-3 text-purple-600" />
                  </div>
                  <span className="text-xs font-medium text-gray-800">AI Review</span>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 bottom-20">
              <div className="animate-float-delay rounded-lg border border-white/20 bg-white/95 p-3 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-100 p-1.5">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                  </div>
                  <span className="text-xs font-medium text-gray-800">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};
