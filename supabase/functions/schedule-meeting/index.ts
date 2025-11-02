import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message } = await req.json();

    if (!name || !email) {
      throw new Error('Name and email are required');
    }

    const calendlyApiKey = Deno.env.get('CALENDLY_API_KEY');
    if (!calendlyApiKey) {
      throw new Error('Calendly API key not configured');
    }

    console.log('Scheduling meeting for:', email);
    console.log('Using API key (first 10 chars):', calendlyApiKey.substring(0, 10));

    // Get the current user from Calendly with proper error handling
    const userResponse = await fetch('https://api.calendly.com/users/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${calendlyApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Calendly API response status:', userResponse.status);

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error('Calendly API error response:', errorText);
      console.error('Response status:', userResponse.status);
      
      if (userResponse.status === 404) {
        throw new Error('Calendly API endpoint not found. Please verify your API key is correct and active.');
      } else if (userResponse.status === 401) {
        throw new Error('Calendly API key is invalid or expired. Please generate a new API key from https://calendly.com/integrations/api_webhooks');
      } else {
        throw new Error(`Calendly API error (${userResponse.status}): ${errorText}`);
      }
    }

    const userData = await userResponse.json();
    console.log('Calendly user data received:', JSON.stringify(userData, null, 2));
    
    const schedulingUrl = userData.resource?.scheduling_url;
    
    if (!schedulingUrl) {
      console.error('No scheduling URL found in response:', userData);
      throw new Error('Could not retrieve scheduling URL from Calendly');
    }

    console.log('Scheduling URL:', schedulingUrl);

    // Log notification for msusimran20@gmail.com
    const notificationMessage = `
New meeting request:
Name: ${name}
Email: ${email}
Message: ${message || 'No message provided'}
Calendly Link: ${schedulingUrl}
    `;

    console.log('Meeting request received:', notificationMessage);

    // Send email notification
    try {
      const emailApiKey = 're_2yDapv7H_ENqdeZ1ngoXeiX2BJoEMQtBq';
      const emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${emailApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ 
              email: 'msusimran20@gmail.com',
              name: 'Simran'
            }],
            subject: 'New Calendar Meeting Request - Vidhi Vaani',
          }],
          from: { 
            email: 'notifications@vidhivaani.com', 
            name: 'Vidhi Vaani Scheduling' 
          },
          content: [{
            type: 'text/html',
            value: `
              <h2>New Meeting Request Details</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong> ${message || 'No message provided'}</p>
              <p><strong>Calendly Link:</strong> <a href="${schedulingUrl}">${schedulingUrl}</a></p>
              <br>
              <p>This is an automated notification from Vidhi Vaani.</p>
            `
          }]
        })
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.text();
        throw new Error(`Failed to send email: ${errorData}`);
      }

      console.log('Email notification sent successfully to msusimran20@gmail.com');
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't throw the error - we still want to return the scheduling URL
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        schedulingUrl: schedulingUrl,
        message: 'Meeting request received. You will receive a confirmation email shortly.'
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error scheduling meeting:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to schedule meeting';
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
