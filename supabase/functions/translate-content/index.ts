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
    const { movementId, language, content } = await req.json();

    if (!movementId || !language || language === 'en' || !content) {
      return new Response(JSON.stringify({ error: 'movementId, language, and content are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const langName = LANGUAGE_NAMES[language];
    if (!langName) {
      return new Response(JSON.stringify({ error: 'Unsupported language' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Check cache first
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

    // Build the content to translate
    const toTranslate = {
      summary: content.summary,
      characteristics: content.characteristics,
      artists: content.artists?.map((a: any) => ({ name: a.name, years: a.years, description: a.description })),
      tattooTips: content.tattooTips ? {
        intro: content.tattooTips.intro,
        design: content.tattooTips.design,
        technical: content.tattooTips.technical,
        inspiration: content.tattooTips.inspiration,
      } : undefined,
      quiz: content.quiz?.map((q: any) => ({ question: q.question, options: q.options })),
      origin: content.origin ? { explanation: content.origin.explanation } : undefined,
      artworks: content.artworks?.map((a: any) => ({ title: a.title, description: a.description })),
    };

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured');

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a professional translator specializing in art history and tattoo culture. Translate the following JSON content to ${langName}. Keep the exact same JSON structure. Do NOT translate proper nouns like artist names, artwork titles that are commonly known in English, or city/museum names. Keep "years" fields as-is. For quiz questions, translate the question and ALL options but keep the same order. Return ONLY valid JSON, no markdown, no explanation.`,
          },
          {
            role: 'user',
            content: JSON.stringify(toTranslate),
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error('AI translation error:', aiResponse.status, errText);
      
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limited, please try again later' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`AI error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    let translatedText = aiData.choices?.[0]?.message?.content || '';
    
    // Clean markdown code blocks if present
    translatedText = translatedText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    let translated;
    try {
      translated = JSON.parse(translatedText);
    } catch {
      console.error('Failed to parse AI response:', translatedText.substring(0, 500));
      throw new Error('AI returned invalid JSON');
    }

    // Cache the result
    await supabase.from('content_translations').upsert({
      movement_id: movementId,
      language,
      field: 'full_content',
      translated_text: JSON.stringify(translated),
    }, { onConflict: 'movement_id,language,field' });

    return new Response(JSON.stringify({ translated }), {
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