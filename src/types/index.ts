export type Language = 'en' | 'hi' | 'gu';

export type RiskLevel = 'low' | 'medium' | 'high';

export type ClauseCategory = 
  | 'payment' 
  | 'termination' 
  | 'liability' 
  | 'confidentiality' 
  | 'ip_rights' 
  | 'other';

export type RiskCategory = 'financial' | 'legal' | 'operational' | 'hidden';

export interface Clause {
  type: string;
  originalText: string;
  plainExplanation: string;
  riskLevel: RiskLevel;
  importance: 'critical' | 'important' | 'standard';
  category: ClauseCategory;
}

export interface Risk {
  category: RiskCategory;
  title: string;
  description: string;
  severity: RiskLevel;
  evidence: string;
  recommendation: string;
}

export interface ImportantDate {
  type: 'start_date' | 'end_date' | 'renewal_date' | 'notice_deadline' | 'payment_due';
  date: string;
  description: string;
}

export interface FinancialSummary {
  mainCosts: string[];
  penalties: string[];
  deposits: string[];
}

export interface DocumentAnalysis {
  summary: string;
  documentType: string;
  detectedLanguage: Language;
  riskScore: number;
  riskLevel: RiskLevel;
  clauses: Clause[];
  risks: Risk[];
  keyTakeaways: string[];
  recommendations: string[];
  partyInformation?: {
    parties: string[];
    yourRole: string;
  };
  importantDates?: ImportantDate[];
  financialSummary?: FinancialSummary;
}

export interface VoiceResponse {
  spokenResponse: string;
  displayText: string;
  suggestedFollowUps: string[];
  citedSection?: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface AnalysisProgress {
  stage: string;
  progress: number;
  status: 'uploading' | 'extracting' | 'analyzing' | 'complete' | 'error';
}
