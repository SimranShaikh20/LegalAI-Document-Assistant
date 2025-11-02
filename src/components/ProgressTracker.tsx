import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface Stage {
  name: string;
  duration: number;
  targetProgress: number;
}

const ANALYSIS_STAGES: Stage[] = [
  { name: 'Extracting text from document...', duration: 2000, targetProgress: 15 },
  { name: 'Detecting language...', duration: 1000, targetProgress: 25 },
  { name: 'Analyzing document structure...', duration: 3000, targetProgress: 40 },
  { name: 'Identifying key clauses...', duration: 5000, targetProgress: 60 },
  { name: 'Assessing risks and liabilities...', duration: 4000, targetProgress: 80 },
  { name: 'Generating insights...', duration: 3000, targetProgress: 95 },
  { name: 'Finalizing report...', duration: 1000, targetProgress: 100 },
];

interface ProgressTrackerProps {
  onComplete?: () => void;
}

export const ProgressTracker = ({ onComplete }: ProgressTrackerProps) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStage >= ANALYSIS_STAGES.length) {
      if (onComplete) onComplete();
      return;
    }

    const stage = ANALYSIS_STAGES[currentStage];
    const startProgress = currentStage > 0 ? ANALYSIS_STAGES[currentStage - 1].targetProgress : 0;
    const progressIncrement = (stage.targetProgress - startProgress) / (stage.duration / 50);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + progressIncrement, stage.targetProgress);
        if (newProgress >= stage.targetProgress) {
          clearInterval(interval);
          setTimeout(() => {
            setCurrentStage((cs) => cs + 1);
          }, 100);
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentStage, onComplete]);

  const stage = ANALYSIS_STAGES[Math.min(currentStage, ANALYSIS_STAGES.length - 1)];

  return (
    <Card className="p-8">
      <div className="flex flex-col items-center space-y-6">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        
        <div className="w-full max-w-md space-y-3">
          <div className="text-center">
            <div className="text-lg font-semibold">{stage.name}</div>
            <div className="mt-1 text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </div>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Stage {Math.min(currentStage + 1, ANALYSIS_STAGES.length)} of {ANALYSIS_STAGES.length}</span>
            <span>Est. time remaining: {Math.max(0, 30 - Math.round(progress * 0.3))}s</span>
          </div>
        </div>

        <p className="max-w-md text-center text-sm text-muted-foreground">
          Our AI is analyzing your document in real-time. This typically takes under 30 seconds.
        </p>
      </div>
    </Card>
  );
};
