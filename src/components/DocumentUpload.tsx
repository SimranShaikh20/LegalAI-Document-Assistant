import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, X, Shield, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  file: File;
}

const DocumentUpload = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    files.forEach((file) => {
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload PDF or Word documents only.",
          variant: "destructive",
        });
        return;
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File Too Large",
          description: "File size must be less than 10MB.",
          variant: "destructive",
        });
        return;
      }

      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
        file: file,
      };

      setUploadedFiles(prev => [...prev, newFile]);
      
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    });
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const startAnalysis = async () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please upload at least one document to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Process each file
      for (const fileData of uploadedFiles) {
        // Read file content
        const text = await readFileAsText(fileData.file);
        
        // Call edge function for analysis
        const { data, error } = await supabase.functions.invoke('analyze-document', {
          body: { 
            documentText: text,
            fileName: fileData.name,
            language: selectedLanguage
          }
        });

        if (error) {
          console.error('Analysis error:', error);
          toast({
            title: "Analysis Failed",
            description: `Failed to analyze ${fileData.name}: ${error.message}`,
            variant: "destructive",
          });
        } else {
          console.log('Analysis result:', data);
          toast({
            title: "Analysis Complete",
            description: `${fileData.name} analyzed successfully. Risk Score: ${data.overallRiskScore}/100`,
          });
        }
      }
    } catch (error) {
      console.error('Error during analysis:', error);
      toast({
        title: "Error",
        description: "An error occurred during analysis.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          resolve(result);
        } else {
          reject(new Error('Failed to read file as text'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Upload Your Legal Documents
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Securely upload your contracts, agreements, and legal documents for instant AI-powered analysis
            </p>
          </div>

          {/* Security Notice */}
          <Card className="p-6 mb-8 bg-success-light border-success/20">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-success mt-1" />
              <div>
                <h3 className="font-semibold text-success mb-2">Bank-Level Security</h3>
                <p className="text-sm text-success/80">
                  All documents are encrypted end-to-end and automatically deleted after analysis. 
                  We never store or share your sensitive legal information.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Zone */}
            <div>
              <Card className="p-8">
                <div
                  className={`upload-zone ${isDragOver ? 'dragover' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Drop files here or click to browse
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Supports PDF, DOC, DOCX up to 10MB
                      </p>
                      
                      {/* Language Selector */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Document Language
                        </label>
                        <select
                          value={selectedLanguage}
                          onChange={(e) => setSelectedLanguage(e.target.value)}
                          className="w-full max-w-xs mx-auto px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="en">English</option>
                          <option value="hi">हिंदी (Hindi)</option>
                          <option value="gu">ગુજરાતી (Gujarati)</option>
                        </select>
                      </div>
                    </div>

                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileSelect}
                    />
                    
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById('file-upload')?.click()}
                      className="hover:bg-primary hover:text-white transition-smooth font-medium px-6"
                    >
                      Choose Files
                    </Button>
                  </div>
                </div>

                {/* Analysis Button */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-6 text-center">
                    <Button 
                      onClick={startAnalysis} 
                      disabled={isAnalyzing}
                      variant="default"
                      size="lg"
                      className="w-full font-semibold py-4 text-lg hover:shadow-xl transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAnalyzing ? (
                        <>
                          <Clock className="w-5 h-5 mr-2 animate-spin" />
                          Analyzing Documents...
                        </>
                      ) : (
                        <>
                          <FileText className="w-5 h-5 mr-2" />
                          Start AI Analysis
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </Card>
            </div>

            {/* Uploaded Files */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Uploaded Documents ({uploadedFiles.length})
              </h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {uploadedFiles.length === 0 ? (
                  <Card className="p-6 text-center">
                    <div className="text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No documents uploaded yet</p>
                    </div>
                  </Card>
                ) : (
                  uploadedFiles.map((file) => (
                    <Card key={file.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <div className="flex-shrink-0">
                            <FileText className="w-8 h-8 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)} • {file.uploadedAt.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          className="flex-shrink-0 ml-2"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>

              {/* Legal Disclaimer */}
              <Card className="mt-6 p-4 bg-warning-light border-warning/20">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-warning/80">
                    <p className="font-medium mb-1">Important Legal Notice</p>
                    <p>
                      This AI analysis provides guidance only and is not a substitute for professional legal advice. 
                      For complex legal matters, consult with a qualified attorney.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentUpload;