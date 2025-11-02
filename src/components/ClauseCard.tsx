import { useState } from "react";
import { ChevronDown, ChevronUp, AlertCircle, Info, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clause } from "@/types";

interface ClauseCardProps {
  clause: Clause;
}

export const ClauseCard = ({ clause }: ClauseCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRiskColor = () => {
    if (clause.riskLevel === 'low') return 'bg-success/10 text-success border-success/20';
    if (clause.riskLevel === 'medium') return 'bg-warning/10 text-warning border-warning/20';
    return 'bg-destructive/10 text-destructive border-destructive/20';
  };

  const getRiskIcon = () => {
    if (clause.riskLevel === 'low') return <CheckCircle className="h-4 w-4" />;
    if (clause.riskLevel === 'medium') return <Info className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  const getImportanceBadge = () => {
    if (clause.importance === 'critical') return 'destructive';
    if (clause.importance === 'important') return 'default';
    return 'secondary';
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div
        className="cursor-pointer p-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant={getImportanceBadge()} className="capitalize">
                {clause.importance}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {clause.category.replace('_', ' ')}
              </Badge>
              <div className={`flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium ${getRiskColor()}`}>
                {getRiskIcon()}
                <span className="capitalize">{clause.riskLevel} Risk</span>
              </div>
            </div>
            <h4 className="font-semibold">{clause.type}</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              {clause.plainExplanation}
            </p>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
          )}
        </div>

        {isExpanded && (
          <div className="mt-4 border-t pt-4">
            <h5 className="mb-2 text-sm font-semibold">Original Text:</h5>
            <div className="rounded-md bg-muted/50 p-3 text-sm italic">
              "{clause.originalText}"
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
