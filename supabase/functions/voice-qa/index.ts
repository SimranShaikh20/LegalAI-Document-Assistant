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
    const { question, documentContext, analysisContext, language } = await req.json();
    
    if (!question || !documentContext) {
      throw new Error('Question and document context are required');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Processing voice Q&A...', { questionLength: question.length, language });

    const systemPrompt = `You are LegalAI Pro's voice assistant. Answer questions about the legal document in a conversational, helpful manner optimized for spoken responses.

RESPONSE LANGUAGE: ${language || 'en'}

RESPONSE GUIDELINES:
1. Keep answers concise (2-3 sentences max for voice)
2. Speak naturally - use conversational language
3. Be precise and accurate - cite specific sections when relevant
4. If answer requires detail, give brief answer + offer more info
5. For yes/no questions, answer directly then explain briefly
6. Always ground response in actual document text
7. If information not in document, say so clearly
8. End with suggestion for follow-up if appropriate

RESPONSE MUST BE VALID JSON ONLY:
{
  "spokenResponse": "string (what to speak aloud)",
  "displayText": "string (formatted text to show on screen)",
  "suggestedFollowUps": ["string array of 2-3 related questions"],
  "citedSection": "string (section/clause referenced, if any)",
  "confidence": "high|medium|low"
}

If confidence is low, acknowledge: "I'm not entirely certain, but based on the document..."
If answer not in document: "That specific information isn't mentioned in this document."`;

    const userPrompt = `DOCUMENT CONTEXT:
${documentContext}

${analysisContext ? `PREVIOUS ANALYSIS:\n${analysisContext}\n\n` : ''}USER QUESTION:
${question}`;

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
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429 || response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Service temporarily unavailable. Please try again.' }),
          { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI API returned ${response.status}`);
    }

    const data = await response.json();
    let responseText = data.choices[0].message.content;
    
    // Clean up markdown
    responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    try {
      const voiceResponse = JSON.parse(responseText);
      console.log('Voice Q&A complete', { confidence: voiceResponse.confidence });
      
      return new Response(
        JSON.stringify({ response: voiceResponse }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // Fallback response if JSON parsing fails
      return new Response(
        JSON.stringify({ 
          response: {
            spokenResponse: responseText,
            displayText: responseText,
            suggestedFollowUps: [],
            confidence: 'medium'
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

  } catch (error) {
    console.error('Error in voice-qa function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
