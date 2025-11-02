import { useState, useCallback } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { SAMPLE_DOCUMENTS } from "@/data/sample-documents";
import { supabase } from "@/integrations/supabase/client";

interface DocumentUploadProps {
  onDocumentSelect: (text: string, language: 'en' | 'hi' | 'gu') => void;
  isAnalyzing: boolean;
}

export const DocumentUpload = ({ onDocumentSelect, isAnalyzing }: DocumentUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const extractTextFromFile = async (file: File): Promise<string> => {
    const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');
    const isDocx = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
        file.name.endsWith('.docx');
    
    // For PDF and DOCX files, use Supabase function to parse
    if (isPdf || isDocx) {
      const formData = new FormData();
      formData.append('file', file);
      
      const { data, error } = await supabase.functions.invoke('parse-document', {
        body: formData
      });
      
      if (error) throw error;
      if (!data?.text) throw new Error('Failed to extract text from document');
      
      return data.text;
    }
    
    // For TXT files, read directly
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        resolve(text);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    await processFile(file);
  }, []);

  const processFile = async (file: File) => {
    // Support TXT, PDF, and DOCX files
    const isTxt = file.name.toLowerCase().endsWith('.txt') || file.type === 'text/plain';
    const isPdf = file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
    const isDocx = file.name.toLowerCase().endsWith('.docx') || 
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    
    if (!isTxt && !isPdf && !isDocx) {
      toast.error('Please upload a TXT, PDF, or DOCX file');
      return;
    }

    // Validate file size (20MB)
    if (file.size > 20 * 1024 * 1024) {
      toast.error('File size must be under 20MB');
      return;
    }

    try {
      toast.loading('Reading document...');
      const text = await extractTextFromFile(file);
      
      if (!text || text.trim().length < 100) {
        toast.error('Document appears to be empty or too short (minimum 100 characters)');
        return;
      }

      // Simple language detection based on script
      const hasHindi = /[\u0900-\u097F]/.test(text);
      const hasGujarati = /[\u0A80-\u0AFF]/.test(text);
      const detectedLang = hasHindi ? 'hi' : hasGujarati ? 'gu' : 'en';

      toast.success(`Document detected: ${detectedLang === 'hi' ? 'Hindi' : detectedLang === 'gu' ? 'Gujarati' : 'English'}`);
      onDocumentSelect(text, detectedLang);
    } catch (error: any) {
      console.error('Error reading file:', error);
      
      // Show user-friendly error message
      if (error.message && error.message.includes('not yet fully implemented')) {
        toast.error(error.message);
      } else {
        toast.error('Failed to read document. Please try again or use a TXT file.');
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleSampleDocument = (sampleId: string) => {
    const sample = SAMPLE_DOCUMENTS.find(doc => doc.id === sampleId);
    if (sample) {
      toast.success(`Loading ${sample.title}`);
      onDocumentSelect(sample.content, sample.language);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <Card
        className={`relative overflow-hidden transition-all ${
          isDragging ? 'border-primary bg-primary/5' : 'border-dashed'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          
          <h3 className="mb-2 text-xl font-semibold">Upload Your Document</h3>
          <p className="mb-6 text-sm text-muted-foreground">
            Drag & drop or click to upload TXT, PDF, or DOCX files (up to 20MB) or try our sample documents
          </p>

          <label htmlFor="file-upload">
            <Button asChild>
              <span className="cursor-pointer">
                <FileText className="mr-2 h-4 w-4" />
                Choose File
              </span>
            </Button>
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".txt,.pdf,.docx,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </Card>

      {/* Sample Documents */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Or Try a Sample Document</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_DOCUMENTS.map((sample) => (
            <Card
              key={sample.id}
              className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
              onClick={() => handleSampleDocument(sample.id)}
            >
              <div className="p-4">
                <div className="mb-2 text-2xl">{sample.title.split(' ')[0]}</div>
                <h4 className="mb-1 font-semibold">{sample.title.split(' ').slice(1).join(' ')}</h4>
                <p className="text-sm text-muted-foreground">{sample.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
