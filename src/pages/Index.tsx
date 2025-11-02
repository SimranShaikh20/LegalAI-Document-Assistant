import { useState } from "react";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { VideoDemo } from "@/components/VideoDemo";
import { FeatureComparison } from "@/components/FeatureComparison";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { DocumentUpload } from "@/components/DocumentUpload";
import { ProgressTracker } from "@/components/ProgressTracker";
import { AnalysisDashboard } from "@/components/AnalysisDashboard";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { DocumentAnalysis, Language } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type ViewState = 'hero' | 'upload' | 'analyzing' | 'results';

const Index = () => {
  const [viewState, setViewState] = useState<ViewState>('hero');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [documentText, setDocumentText] = useState('');

  const handleGetStarted = () => {
    setViewState('upload');
  };

  const handleDocumentSelect = async (text: string, detectedLang: Language) => {
    setDocumentText(text);
    setCurrentLanguage(detectedLang);
    setViewState('analyzing');

    try {
      const { data, error } = await supabase.functions.invoke('analyze-document', {
        body: {
          documentText: text,
          detectedLanguage: detectedLang
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (data?.error) {
        // Handle errors returned in the data object
        console.error('Analysis error from API:', data.error);
        toast.error(data.error);
        setViewState('upload');
        return;
      }

      if (!data?.analysis) {
        throw new Error('No analysis data received');
      }

      setAnalysis(data.analysis);
      setViewState('results');
      toast.success('Analysis complete!');
    } catch (error) {
      console.error('Analysis error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to analyze document. Please try again.';
      toast.error(errorMessage);
      setViewState('upload');
    }
  };

  const handleReset = () => {
    setViewState('upload');
    setAnalysis(null);
    setDocumentText('');
  };

  const handleBackToHero = () => {
    setViewState('hero');
    setAnalysis(null);
    setDocumentText('');
  };

  return (
    <div className="min-h-screen">
      {/* Chatbot Widget - Always visible */}
      <ChatbotWidget />

      {/* Header */}
      {viewState !== 'hero' && (
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Button variant="ghost" onClick={handleBackToHero}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Button>

            {viewState === 'results' && (
              <div className="flex items-center gap-4">
                <LanguageSelector
                  currentLanguage={currentLanguage}
                  onLanguageChange={setCurrentLanguage}
                />
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            )}
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {viewState === 'hero' && (
          <>
            <Hero onGetStarted={handleGetStarted} />
            <FeatureComparison />
            <HowItWorks />
            <VideoDemo />
          </>
        )}

        {viewState === 'upload' && (
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-3xl font-bold">Upload Your Document</h2>
              <p className="text-muted-foreground">
                Supporting TXT, PDF, and DOCX files in English, Hindi, and Gujarati - or try our sample documents
              </p>
            </div>
            <DocumentUpload
              onDocumentSelect={handleDocumentSelect}
              isAnalyzing={false}
            />
          </div>
        )}

        {viewState === 'analyzing' && (
          <div className="mx-auto max-w-2xl">
            <ProgressTracker />
          </div>
        )}

        {viewState === 'results' && analysis && (
          <div className="space-y-12">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Analysis Results</h2>
                <p className="text-muted-foreground">
                  AI-powered insights for your document
                </p>
              </div>
              <Button onClick={handleReset}>
                Analyze New Document
              </Button>
            </div>

            <AnalysisDashboard analysis={analysis} documentText={documentText} />

            <div className="border-t pt-12">
              <h3 className="mb-6 text-2xl font-bold">Ask Questions</h3>
              <VoiceAssistant
                documentText={documentText}
                analysisContext={JSON.stringify(analysis)}
                language={currentLanguage}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            LegalPro AI - Empowering everyone to understand legal documents
          </p>
          <p className="mt-2">
            This tool provides guidance for informational purposes only and is not a
            substitute for legal counsel.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
