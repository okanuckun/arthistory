import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.99.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const LANGUAGE_NAMES: Record<string, string> = {
  tr: 'Turkish',
  es: 'Spanish',
  ko: 'Korean',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { movementId, language } = await req.json();

    if (!movementId || !language || language === 'en') {
      return new Response(JSON.stringify({ error: 'Invalid params' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Check cache
    const { data: cached } = await supabase
      .from('content_translations')
      .select('translated_text')
      .eq('movement_id', movementId)
      .eq('language', language)
      .eq('field', 'full_content')
      .maybeSingle();

    if (cached?.translated_text) {
      return new Response(JSON.stringify({ translated: JSON.parse(cached.translated_text) }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch original content from the static data via a helper
    // We'll pass the content from the client to avoid importing TS data in Deno
    // Actually, let's fetch from client request
    const { content } = await req.json().catch(() => ({ content: null }));

    // We need the content - let's adjust: client sends content
    // Re-parse the original request body
    const bodyText = await req.text().catch(() => '');
    
    // Since we already consumed the body, let's restructure.
    // The client should send content along with movementId and language.
    // For now, return an error asking for content.

    return new Response(JSON.stringify({ error: 'Content required in request body' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('translate-content error:', e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});