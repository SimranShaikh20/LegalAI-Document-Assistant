import { Card } from "@/components/ui/card";

export const VideoDemo = () => {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            See <span className="text-gradient-primary">LegalPro AI</span> in Action
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Watch how easy it is to analyze legal documents and get instant insights
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <Card className="overflow-hidden border-2 shadow-xl">
            <div className="relative aspect-video">
              {/* Replace YOUR_VIDEO_ID with your actual video ID */}
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="LegalPro AI Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Card>

          {/* Quick highlights below video */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border bg-background p-4 text-center">
              <div className="mb-2 text-sm font-medium text-muted-foreground">Step 1</div>
              <div className="text-sm">Upload any legal document</div>
            </div>
            <div className="rounded-lg border bg-background p-4 text-center">
              <div className="mb-2 text-sm font-medium text-muted-foreground">Step 2</div>
              <div className="text-sm">Get AI analysis in 30 seconds</div>
            </div>
            <div className="rounded-lg border bg-background p-4 text-center">
              <div className="mb-2 text-sm font-medium text-muted-foreground">Step 3</div>
              <div className="text-sm">Ask questions with voice</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};