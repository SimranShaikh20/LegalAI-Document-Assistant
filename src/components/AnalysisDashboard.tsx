import { DocumentAnalysis } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiskMeter } from "./RiskMeter";
import { ClauseCard } from "./ClauseCard";
import { ExportActions } from "./ExportActions";
import { 
  AlertTriangle, 
  Calendar, 
  DollarSign, 
  Users, 
  FileText,
  Lightbulb,
  CheckCircle
} from "lucide-react";

interface AnalysisDashboardProps {
  analysis: DocumentAnalysis;
  documentText: string;
}

export const AnalysisDashboard = ({ analysis, documentText }: AnalysisDashboardProps) => {
  return (
    <div className="space-y-8">
      {/* Export Actions */}
      <ExportActions analysis={analysis} documentText={documentText} />
      
      {/* Summary Section */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-bold">Document Summary</h2>
              <Badge variant="outline" className="capitalize">
                {analysis.documentType.replace('_', ' ')}
              </Badge>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {analysis.summary}
            </p>
          </div>
        </div>
      </Card>

      {/* Risk Score */}
      <Card className="p-8">
        <h3 className="mb-6 text-center text-xl font-semibold">Overall Risk Assessment</h3>
        <div className="flex justify-center">
          <RiskMeter score={analysis.riskScore} level={analysis.riskLevel} />
        </div>
      </Card>

      {/* Key Takeaways */}
      <Card className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">Key Takeaways</h3>
        </div>
        <ul className="space-y-3">
          {analysis.keyTakeaways.map((takeaway, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
              <span className="text-muted-foreground">{takeaway}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Clauses */}
      <div>
        <h3 className="mb-4 text-xl font-semibold">Key Clauses Identified</h3>
        <div className="space-y-4">
          {analysis.clauses.map((clause, idx) => (
            <ClauseCard key={idx} clause={clause} />
          ))}
        </div>
      </div>

      {/* Risks */}
      {analysis.risks.length > 0 && (
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <h3 className="text-xl font-semibold">Identified Risks</h3>
          </div>
          <div className="space-y-4">
            {analysis.risks.map((risk, idx) => (
              <div key={idx} className="rounded-lg border p-4">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {risk.category}
                      </Badge>
                      <Badge
                        variant={
                          risk.severity === 'high'
                            ? 'destructive'
                            : risk.severity === 'medium'
                            ? 'default'
                            : 'secondary'
                        }
                        className="capitalize"
                      >
                        {risk.severity} severity
                      </Badge>
                    </div>
                    <h4 className="font-semibold">{risk.title}</h4>
                  </div>
                </div>
                <p className="mb-3 text-sm text-muted-foreground">{risk.description}</p>
                <div className="mb-3 rounded-md bg-muted/50 p-3 text-sm italic">
                  <strong>Evidence:</strong> "{risk.evidence}"
                </div>
                <div className="rounded-md bg-primary/5 p-3 text-sm">
                  <strong className="text-primary">Recommendation:</strong>{' '}
                  {risk.recommendation}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Additional Information Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Party Information */}
        {analysis.partyInformation && (
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Parties Involved</h3>
            </div>
            <div className="space-y-2">
              {analysis.partyInformation.parties.map((party, idx) => (
                <div key={idx} className="text-sm text-muted-foreground">
                  • {party}
                </div>
              ))}
              {analysis.partyInformation.yourRole && (
                <div className="mt-3 rounded-md bg-primary/5 p-3 text-sm">
                  <strong>Your Role:</strong> {analysis.partyInformation.yourRole}
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Financial Summary */}
        {analysis.financialSummary && (
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Financial Summary</h3>
            </div>
            <div className="space-y-4">
              {analysis.financialSummary.mainCosts.length > 0 && (
                <div>
                  <div className="mb-2 text-sm font-medium">Main Costs:</div>
                  {analysis.financialSummary.mainCosts.map((cost, idx) => (
                    <div key={idx} className="text-sm text-muted-foreground">
                      • {cost}
                    </div>
                  ))}
                </div>
              )}
              {analysis.financialSummary.deposits.length > 0 && (
                <div>
                  <div className="mb-2 text-sm font-medium">Deposits:</div>
                  {analysis.financialSummary.deposits.map((deposit, idx) => (
                    <div key={idx} className="text-sm text-muted-foreground">
                      • {deposit}
                    </div>
                  ))}
                </div>
              )}
              {analysis.financialSummary.penalties.length > 0 && (
                <div>
                  <div className="mb-2 text-sm font-medium text-destructive">
                    Penalties:
                  </div>
                  {analysis.financialSummary.penalties.map((penalty, idx) => (
                    <div key={idx} className="text-sm text-muted-foreground">
                      • {penalty}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Important Dates */}
        {analysis.importantDates && analysis.importantDates.length > 0 && (
          <Card className="p-6 md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Important Dates</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {analysis.importantDates.map((date, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border p-4"
                >
                  <div className="mb-1 text-xs font-medium uppercase text-muted-foreground">
                    {date.type.replace('_', ' ')}
                  </div>
                  <div className="mb-2 text-lg font-semibold">{date.date}</div>
                  <div className="text-sm text-muted-foreground">{date.description}</div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Recommendations */}
      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">Recommendations</h3>
        <ul className="space-y-3">
          {analysis.recommendations.map((recommendation, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {idx + 1}
              </div>
              <span className="text-muted-foreground">{recommendation}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Disclaimer */}
      <Card className="border-warning/20 bg-warning/5 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 text-warning" />
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground">Legal Disclaimer:</strong> This tool
            provides AI-powered guidance for informational purposes only and is not a
            substitute for professional legal counsel. Results are based on the document
            text provided. Always consult a licensed attorney for legal decisions.
          </div>
        </div>
      </Card>
    </div>
  );
};
