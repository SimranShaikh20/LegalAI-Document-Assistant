import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, UserCheck } from "lucide-react";

const DemoVideo = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              See How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch our platform in action and discover how AI-powered analysis 
              transforms legal document review
            </p>
          </div>

          {/* Video Container */}
          <Card className="overflow-hidden shadow-2xl">
            <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5">
              {/* Video Placeholder - Replace with actual video URL */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-glow hover:scale-110 transition-smooth cursor-pointer">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    Watch Demo Video
                  </p>
                  <p className="text-sm text-muted-foreground">
                    2:30 minutes • Learn the basics
                  </p>
                </div>
              </div>
              
              {/* Uncomment and add your video URL when available */}
              {/* 
              <iframe
                className="w-full h-full"
                src="YOUR_VIDEO_URL_HERE"
                title="Legal Document Analysis Platform Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              */}
            </div>
          </Card>

          {/* Expert Help CTA */}
          <Card className="mt-12 p-8 bg-background border-primary/20">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <UserCheck className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Need Expert Help?
              </h3>
              
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                For complex issues or detailed contract review, connect with our network 
                of qualified attorneys.
              </p>
              
              <Button 
                size="lg" 
                className="font-semibold px-8 py-4 shadow-elegant hover:shadow-glow transition-smooth"
                onClick={() => window.open('https://calendly.com/msusimran20/30min', '_blank')}
              >
                <UserCheck className="w-5 h-5 mr-2" />
                Consult Legal Expert
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DemoVideo;
