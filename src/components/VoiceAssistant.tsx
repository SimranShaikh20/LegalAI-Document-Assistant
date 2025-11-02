import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { VoiceResponse, Language } from "@/types";

interface VoiceAssistantProps {
  documentText: string;
  analysisContext?: string;
  language: Language;
}

interface ConversationItem {
  type: 'question' | 'answer';
  text: string;
  suggestedFollowUps?: string[];
}

export const VoiceAssistant = ({
  documentText,
  analysisContext,
  language
}: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversation, setConversation] = useState<ConversationItem[]>([]);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      
      const langMap = {
        'en': 'en-IN',
        'hi': 'hi-IN',
        'gu': 'gu-IN'
      };
      recognitionRef.current.lang = langMap[language];

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);

        if (event.results[current].isFinal) {
          handleVoiceQuestion(transcriptText);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast.error('Voice recognition error. Please try again.');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language]);

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript('');
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      toast.error('Voice recognition is not supported in this browser');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleVoiceQuestion = async (question: string) => {
    if (!question.trim()) return;

    setIsProcessing(true);
    setConversation(prev => [...prev, { type: 'question', text: question }]);

    try {
      const { data, error } = await supabase.functions.invoke('voice-qa', {
        body: {
          question,
          documentContext: documentText,
          analysisContext,
          language
        }
      });

      if (error) throw error;

      const response: VoiceResponse = data.response;
      
      setConversation(prev => [
        ...prev,
        {
          type: 'answer',
          text: response.displayText || response.spokenResponse,
          suggestedFollowUps: response.suggestedFollowUps
        }
      ]);

      // Speak the response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(response.spokenResponse);
        const langMap = {
          'en': 'en-IN',
          'hi': 'hi-IN',
          'gu': 'gu-IN'
        };
        utterance.lang = langMap[language];
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }

    } catch (error) {
      console.error('Voice Q&A error:', error);
      toast.error('Failed to process question. Please try again.');
      setConversation(prev => prev.slice(0, -1)); // Remove the question
    } finally {
      setIsProcessing(false);
      setTranscript('');
    }
  };

  const askSuggestedQuestion = (question: string) => {
    handleVoiceQuestion(question);
  };

  const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  if (!isSupported) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          Voice assistant is not supported in this browser. Please try Chrome, Edge, or Safari.
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">Voice Q&A Assistant</h3>
        <p className="mb-6 text-sm text-muted-foreground">
          Click the microphone and ask questions about your document in your preferred language
        </p>

        <div className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            variant={isListening ? 'destructive' : 'default'}
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing}
            className="h-20 w-20 rounded-full"
          >
            {isProcessing ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : isListening ? (
              <MicOff className="h-8 w-8" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
          </Button>

          {transcript && (
            <div className="w-full rounded-lg bg-muted/50 p-4 text-center">
              <div className="text-sm text-muted-foreground">You said:</div>
              <div className="mt-1 font-medium">{transcript}</div>
            </div>
          )}

          {isListening && (
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
              <span className="text-sm text-destructive">Listening...</span>
            </div>
          )}
        </div>
      </Card>

      {conversation.length > 0 && (
        <Card className="p-6">
          <h4 className="mb-4 font-semibold">Conversation</h4>
          <div className="space-y-4">
            {conversation.map((item, idx) => (
              <div key={idx}>
                <div
                  className={`rounded-lg p-4 ${
                    item.type === 'question'
                      ? 'bg-primary/10 ml-auto max-w-[80%]'
                      : 'bg-muted/50 mr-auto max-w-[80%]'
                  }`}
                >
                  <div className="mb-1 text-xs font-medium text-muted-foreground">
                    {item.type === 'question' ? 'You' : 'AI Assistant'}
                  </div>
                  <div className="text-sm">{item.text}</div>
                </div>

                {item.type === 'answer' && item.suggestedFollowUps && item.suggestedFollowUps.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2 pl-4">
                    {item.suggestedFollowUps.map((followUp, fidx) => (
                      <Button
                        key={fidx}
                        variant="outline"
                        size="sm"
                        onClick={() => askSuggestedQuestion(followUp)}
                        disabled={isProcessing || isListening}
                        className="text-xs"
                      >
                        {followUp}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
