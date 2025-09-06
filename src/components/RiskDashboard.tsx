import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  FileText, 
  Shield,
  ExternalLink,
  Download,
  Share,
  BookOpen
} from "lucide-react";

interface RiskItem {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  category: string;
  section: string;
  recommendation: string;
}

const RiskDashboard = () => {
  const { toast } = useToast();
  
  const analysisData = {
    overallRisk: 'medium',
    confidence: 94,
    processingTime: '1.2 minutes',
    totalIssues: 7
  };

  const riskItems: RiskItem[] = [
    {
      id: '1',
      title: 'Liability Cap Missing',
      description: 'No limitation of liability clause found in the contract.',
      severity: 'high',
      category: 'Liability',
      section: 'Section 8',
      recommendation: 'Add a liability limitation clause to protect against unlimited damages.'
    },
    {
      id: '2',
      title: 'Termination Notice Period',
      description: 'Termination notice period heavily favors the counterparty.',
      severity: 'medium',
      category: 'Termination',
      section: 'Section 12',
      recommendation: 'Negotiate for mutual termination notice periods.'
    },
    {
      id: '3',
      title: 'Payment Terms',
      description: 'Payment terms are standard and well-defined.',
      severity: 'low',
      category: 'Financial',
      section: 'Section 4',
      recommendation: 'Terms are acceptable as written.'
    },
    {
      id: '4',
      title: 'Intellectual Property Rights',
      description: 'IP ownership transfer is unclear and may lead to disputes.',
      severity: 'high',
      category: 'IP Rights',
      section: 'Section 15',
      recommendation: 'Clarify IP ownership and licensing terms explicitly.'
    },
    {
      id: '5',
      title: 'Confidentiality Clause',
      description: 'Confidentiality obligations are mutual and balanced.',
      severity: 'low',
      category: 'Confidentiality',
      section: 'Section 9',
      recommendation: 'No changes required.'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return {
          bg: 'bg-high-risk-light',
          text: 'text-high-risk',
          badge: 'bg-high-risk text-high-risk-foreground',
          icon: AlertTriangle
        };
      case 'medium':
        return {
          bg: 'bg-warning-light',
          text: 'text-warning',
          badge: 'bg-warning text-warning-foreground',
          icon: Clock
        };
      case 'low':
        return {
          bg: 'bg-success-light',
          text: 'text-success',
          badge: 'bg-success text-success-foreground',
          icon: CheckCircle
        };
      default:
        return {
          bg: 'bg-muted',
          text: 'text-muted-foreground',
          badge: 'bg-muted text-muted-foreground',
          icon: AlertTriangle
        };
    }
  };

  const getOverallRiskColor = () => {
    switch (analysisData.overallRisk) {
      case 'high':
        return 'text-high-risk';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const handleDownloadSummary = () => {
    // Create a summary document content
    const summaryContent = `LEGAL DOCUMENT ANALYSIS SUMMARY
========================================

Overall Risk Assessment: ${analysisData.overallRisk.toUpperCase()}
Confidence Score: ${analysisData.confidence}%
Processing Time: ${analysisData.processingTime}
Total Issues Found: ${analysisData.totalIssues}

DETAILED FINDINGS:
${riskItems.map((item, index) => `
${index + 1}. ${item.title} (${item.severity.toUpperCase()} RISK)
   Section: ${item.section}
   Category: ${item.category}
   Description: ${item.description}
   Recommendation: ${item.recommendation}
`).join('')}

DISCLAIMER:
This analysis provides guidance only and does not constitute legal advice. 
For legal decisions, please consult with a qualified attorney.

Generated on: ${new Date().toLocaleDateString()}
`;

    const blob = new Blob([summaryContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `legal-analysis-summary-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Summary Downloaded",
      description: "Your legal analysis summary has been downloaded successfully.",
    });
  };

  const handleShareAnalysis = () => {
    const shareText = `Legal Document Analysis Results:
Overall Risk: ${analysisData.overallRisk.toUpperCase()}
Confidence: ${analysisData.confidence}%
Issues Found: ${analysisData.totalIssues}

View full analysis for detailed insights and recommendations.`;

    if (navigator.share) {
      navigator.share({
        title: 'Legal Document Analysis',
        text: shareText,
        url: window.location.href
      }).catch(() => {
        fallbackShare(shareText);
      });
    } else {
      fallbackShare(shareText);
    }
  };

  const fallbackShare = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Analysis Copied",
        description: "Analysis summary copied to clipboard. You can now share it!",
      });
    }).catch(() => {
      toast({
        title: "Share Analysis",
        description: "Use your browser's share function to share this analysis.",
        variant: "destructive",
      });
    });
  };

  const handleSaveToLibrary = () => {
    // Simulate saving to library
    const savedAnalysis = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      overallRisk: analysisData.overallRisk,
      confidence: analysisData.confidence,
      totalIssues: analysisData.totalIssues,
      riskItems: riskItems
    };

    // Save to localStorage as a simple implementation
    const savedAnalyses = JSON.parse(localStorage.getItem('savedAnalyses') || '[]');
    savedAnalyses.push(savedAnalysis);
    localStorage.setItem('savedAnalyses', JSON.stringify(savedAnalyses));

    toast({
      title: "Saved to Library",
      description: "This analysis has been saved to your personal library for future reference.",
    });
  };

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 text-primary mb-4">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-wide uppercase">Analysis Complete</span>
            </div>
            
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Risk Assessment Dashboard
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive analysis of your legal document with actionable insights and recommendations
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 text-center">
              <div className="space-y-2">
                <div className={`text-3xl font-bold ${getOverallRiskColor()}`}>
                  {analysisData.overallRisk.toUpperCase()}
                </div>
                <p className="text-sm text-muted-foreground">Overall Risk</p>
              </div>
            </Card>

            <Card className="p-6 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">
                  {analysisData.confidence}%
                </div>
                <p className="text-sm text-muted-foreground">Confidence Score</p>
              </div>
            </Card>

            <Card className="p-6 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-success">
                  {analysisData.processingTime}
                </div>
                <p className="text-sm text-muted-foreground">Processing Time</p>
              </div>
            </Card>

            <Card className="p-6 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-foreground">
                  {analysisData.totalIssues}
                </div>
                <p className="text-sm text-muted-foreground">Issues Found</p>
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Risk Items */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">Risk Analysis</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {riskItems.map((item) => {
                  const colors = getSeverityColor(item.severity);
                  const IconComponent = colors.icon;
                  
                  return (
                    <Card key={item.id} className="p-6 hover:shadow-md transition-smooth">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${colors.bg}`}>
                              <IconComponent className={`w-5 h-5 ${colors.text}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-semibold text-foreground">{item.title}</h4>
                                <Badge className={`text-xs ${colors.badge}`}>
                                  {item.severity.toUpperCase()}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {item.description}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <span>Category: {item.category}</span>
                                <span>•</span>
                                <span>Found in: {item.section}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`p-3 rounded-lg ${colors.bg} border-l-4 border-l-current`}>
                          <p className="text-sm font-medium text-foreground mb-1">Recommendation:</p>
                          <p className="text-sm text-muted-foreground">{item.recommendation}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Action Panel */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Need Expert Help?</h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    For complex issues or detailed contract review, connect with our network of qualified attorneys.
                  </p>
                  
                  <Button variant="default" className="w-full hover:shadow-lg transition-smooth font-medium">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Consult Legal Expert
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-success" />
                    <h3 className="font-semibold text-foreground">Document Actions</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start hover:bg-primary hover:text-white transition-smooth"
                      onClick={handleDownloadSummary}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Summary
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start hover:bg-primary hover:text-white transition-smooth"
                      onClick={handleShareAnalysis}
                    >
                      <Share className="w-4 h-4 mr-2" />
                      Share Analysis
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start hover:bg-primary hover:text-white transition-smooth"
                      onClick={handleSaveToLibrary}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Save to Library
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-warning-light border-warning/20">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    <h3 className="font-semibold text-warning">Important Notice</h3>
                  </div>
                  
                  <p className="text-sm text-warning/80">
                    This analysis provides guidance only and does not constitute legal advice. 
                    For legal decisions, please consult with a qualified attorney.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskDashboard;