import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function to extract text from PDF
function extractTextFromPDF(uint8Array: Uint8Array): string {
  const text = new TextDecoder().decode(uint8Array);
  const textParts: string[] = [];
  
  // Method 1: Extract text from BT/ET blocks (most common)
  const btEtRegex = /BT\s*(.*?)\s*ET/gs;
  const btEtMatches = text.matchAll(btEtRegex);
  
  for (const match of btEtMatches) {
    const content = match[1];
    // Extract text within parentheses
    const textRegex = /\((.*?)\)/g;
    const textMatches = content.matchAll(textRegex);
    for (const textMatch of textMatches) {
      const cleanText = textMatch[1]
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '')
        .replace(/\\t/g, '\t')
        .replace(/\\\\/g, '\\');
      textParts.push(cleanText);
    }
  }
  
  // Method 2: Also look for Tj and TJ operators
  const tjRegex = /\((.*?)\)\s*Tj/g;
  const tjMatches = text.matchAll(tjRegex);
  for (const match of tjMatches) {
    textParts.push(match[1]);
  }
  
  return textParts.join(' ').trim();
}

// Helper function to extract text from DOCX
async function extractTextFromDOCX(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    // Import zipjs dynamically
    const { ZipReader, BlobReader, TextWriter } = await import('https://deno.land/x/zipjs@v2.7.34/index.js');
    
    const blob = new Blob([arrayBuffer]);
    const zipReader = new ZipReader(new BlobReader(blob));
    const entries = await zipReader.getEntries();
    
    // Find document.xml
    const documentEntry = entries.find((entry: any) => entry.filename === 'word/document.xml');
    
    if (!documentEntry || !documentEntry.getData) {
      await zipReader.close();
      throw new Error('Invalid DOCX structure: document.xml not found');
    }
    
    const writer = new TextWriter();
    const xmlContent = await documentEntry.getData(writer) as string;
    await zipReader.close();
    
    // Extract text from <w:t> tags - more robust regex
    const textParts: string[] = [];
    const textRegex = /<w:t(?:\s+[^>]*)?>([^<]*)<\/w:t>/g;
    let match;
    
    while ((match = textRegex.exec(xmlContent)) !== null) {
      if (match[1]) {
        textParts.push(match[1]);
      }
    }
    
    // Also check for simple text nodes
    if (textParts.length === 0) {
      const simpleTextRegex = /<t>([^<]+)<\/t>/g;
      while ((match = simpleTextRegex.exec(xmlContent)) !== null) {
        textParts.push(match[1]);
      }
    }
    
    return textParts.join(' ').trim();
  } catch (error) {
    console.error('DOCX extraction error:', error);
    throw new Error('Failed to extract text from DOCX file. The file may be corrupted or use an unsupported format.');
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      throw new Error('No file provided');
    }

    console.log('Processing file:', file.name, 'Type:', file.type, 'Size:', file.size);

    let extractedText = '';
    const fileType = file.type;
    const arrayBuffer = await file.arrayBuffer();

    if (fileType === 'application/pdf' || file.name.endsWith('.pdf')) {
      const uint8Array = new Uint8Array(arrayBuffer);
      extractedText = extractTextFromPDF(uint8Array);
      
      if (!extractedText || extractedText.length < 10) {
        throw new Error('Could not extract text from PDF. The PDF might be scanned, image-based, or encrypted.');
      }
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.name.endsWith('.docx')
    ) {
      extractedText = await extractTextFromDOCX(arrayBuffer);
      
      if (!extractedText || extractedText.length < 10) {
        throw new Error('Could not extract text from DOCX. The document might be empty or corrupted.');
      }
    } else if (fileType === 'text/plain' || file.name.endsWith('.txt')) {
      extractedText = new TextDecoder().decode(new Uint8Array(arrayBuffer));
    } else {
      throw new Error(`Unsupported file type: ${fileType}. Please upload TXT, PDF, or DOCX files.`);
    }

    console.log('Successfully extracted text, length:', extractedText.length);

    return new Response(
      JSON.stringify({ 
        text: extractedText,
        filename: file.name,
        size: file.size
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error parsing document:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to parse document';
    return new Response(
      JSON.stringify({ 
        error: errorMessage
      }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
