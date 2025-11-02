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
    const { documentText, detectedLanguage } = await req.json();
    
    if (!documentText) {
      throw new Error('Document text is required');
    }

    // Validate document text (check for binary/corrupted data)
    const hasBinaryData = /[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(documentText.substring(0, 1000));
    const hasControlChars = documentText.substring(0, 100).includes('PK\u0003\u0004'); // ZIP/DOCX header
    
    if (hasBinaryData || hasControlChars) {
      return new Response(
        JSON.stringify({ 
          error: 'The uploaded file appears to be in a binary format (PDF, DOCX, etc.). Please use a TXT file or try our sample documents.' 
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (documentText.length < 100) {
      return new Response(
        JSON.stringify({ 
          error: 'Document is too short (minimum 100 characters). Please upload a complete legal document.' 
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const GOOGLE_TRANSLATE_API_KEY = Deno.env.get('GOOGLE_TRANSLATE_API_KEY');
    
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }
    if (!GOOGLE_TRANSLATE_API_KEY) {
      throw new Error('GOOGLE_TRANSLATE_API_KEY is not configured');
    }

    console.log('Analyzing document...', { textLength: documentText.length, detectedLanguage });

    // Translate document if not in English
    let translatedText = documentText;
    let originalLanguage = detectedLanguage || 'en';
    
    if (detectedLanguage && detectedLanguage !== 'en') {
      console.log('Translating document to English...');
      const translateResponse = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: documentText,
            target: 'en',
            source: detectedLanguage,
            format: 'text'
          })
        }
      );

      if (translateResponse.ok) {
        const translateData = await translateResponse.json();
        translatedText = translateData.data.translations[0].translatedText;
        console.log('Translation successful');
      } else {
        console.warn('Translation failed, proceeding with original text');
      }
    }

    const prompt = `You are LegalAI Pro, an expert legal document analyst specializing in Indian legal documents. Your goal is to make complex legal language accessible to everyday people.

ANALYSIS TASK:
Thoroughly analyze the provided legal document and extract actionable insights that empower non-legal users to make informed decisions.

RESPONSE MUST BE VALID JSON ONLY. No markdown, no explanations, just pure JSON.

RESPONSE FORMAT:
{
  "summary": "string",
  "documentType": "rental_agreement|employment_contract|service_agreement|terms_of_service|loan_agreement|other",
  "detectedLanguage": "en|hi|gu",
  "riskScore": 0-100,
  "riskLevel": "low|medium|high",
  "clauses": [
    {
      "type": "string",
      "originalText": "string",
      "plainExplanation": "string",
      "riskLevel": "low|medium|high",
      "importance": "critical|important|standard",
      "category": "payment|termination|liability|confidentiality|ip_rights|other"
    }
  ],
  "risks": [
    {
      "category": "financial|legal|operational|hidden",
      "title": "string",
      "description": "string",
      "severity": "low|medium|high",
      "evidence": "string",
      "recommendation": "string"
    }
  ],
  "keyTakeaways": ["string array of 3-5 points"],
  "recommendations": ["string array of specific actions"],
  "partyInformation": {
    "parties": ["string array"],
    "yourRole": "string"
  },
  "importantDates": [
    {
      "type": "start_date|end_date|renewal_date|notice_deadline|payment_due",
      "date": "string",
      "description": "string"
    }
  ],
  "financialSummary": {
    "mainCosts": ["string array"],
    "penalties": ["string array"],
    "deposits": ["string array"]
  }
}

CRITICAL RULES:
1. Base analysis SOLELY on provided document text
2. Quote exact text when citing clauses
3. Be objective and factual
4. Use simple language (8th grade reading level)
5. Focus on actionable insights
6. Never invent information
7. Consider Indian legal context
8. Return ONLY valid JSON, no markdown formatting

Analyze this legal document:

${translatedText}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4000,
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    let analysisText = data.candidates[0].content.parts[0].text;
    
    // Clean up markdown formatting if present
    analysisText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    console.log('AI response received, parsing JSON...');
    
    try {
      const analysis = JSON.parse(analysisText);
      console.log('Analysis complete', { riskScore: analysis.riskScore });
      
      return new Response(
        JSON.stringify({ analysis }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Raw AI response:', analysisText.substring(0, 500));
      
      // Return a helpful error when AI doesn't return valid JSON
      return new Response(
        JSON.stringify({ 
          error: 'AI analysis failed to produce structured results. The document may be incomplete or in an unsupported format. Please try a different document or use our sample documents.',
          aiResponse: analysisText.substring(0, 200) // Include snippet for debugging
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

  } catch (error) {
    console.error('Error in analyze-document function:', error);
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
