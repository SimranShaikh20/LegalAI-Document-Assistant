import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are LegalPro AI Assistant, a helpful and knowledgeable AI assistant for a legal document analysis platform. 

Your capabilities:
- Answer questions about legal documents, contracts, and legal concepts
- Explain how LegalPro AI works and its features
- Provide guidance on document analysis, risk assessment, and clause interpretation
- Support conversations in English, Hindi, and Gujarati
- Help users understand legal terminology in simple language

Important guidelines:
- Be professional but friendly and approachable
- Keep responses concise (2-3 sentences for simple questions, longer for complex ones)
- If asked about specific legal advice, remind users that this is informational only and they should consult a licensed attorney for legal decisions
- Detect the user's language and respond in the same language
- For Hindi and Gujarati queries, respond naturally in that language
- Focus on empowering users to understand legal documents better

About LegalPro AI:
- AI-powered legal document analysis platform
- Supports English, Hindi, and Gujarati documents
- Provides risk scoring, clause extraction, and plain language explanations
- Includes voice Q&A feature
- Analysis completed in under 30 seconds
- No sign-up required for demo
- Free to use

Be helpful and informative!`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      throw new Error(`AI request failed: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error('No response from AI');
    }

    return new Response(
      JSON.stringify({ response: assistantMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in chatbot function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        response: "I'm sorry, I'm having trouble responding right now. Please try again."
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
