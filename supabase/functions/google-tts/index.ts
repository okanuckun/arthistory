import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, languageCode = "tr-TR" } = await req.json();

    if (!text || typeof text !== "string") {
      return new Response(JSON.stringify({ error: "text is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("GOOGLE_CLOUD_TTS_API_KEY");
    if (!apiKey) {
      throw new Error("GOOGLE_CLOUD_TTS_API_KEY is not configured");
    }

    // Google Cloud TTS has a 5000 byte limit per request
    // Split text into chunks if needed
    const maxChunkSize = 4500;
    const chunks: string[] = [];
    
    if (text.length <= maxChunkSize) {
      chunks.push(text);
    } else {
      // Split by sentences
      const sentences = text.split(/(?<=[.!?])\s+/);
      let current = "";
      for (const sentence of sentences) {
        if ((current + " " + sentence).length > maxChunkSize && current) {
          chunks.push(current.trim());
          current = sentence;
        } else {
          current = current ? current + " " + sentence : sentence;
        }
      }
      if (current.trim()) chunks.push(current.trim());
    }

    const audioBuffers: Uint8Array[] = [];

    for (const chunk of chunks) {
      const response = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: { text: chunk },
            voice: {
              languageCode,
              name: languageCode === "tr-TR" ? "tr-TR-Wavenet-E" : "en-US-Wavenet-F",
              ssmlGender: "FEMALE",
            },
            audioConfig: {
              audioEncoding: "MP3",
              speakingRate: 0.95,
              pitch: 0,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Google TTS error:", response.status, errorText);
        throw new Error(`Google TTS API error: ${response.status}`);
      }

      const data = await response.json();
      const binaryString = atob(data.audioContent);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      audioBuffers.push(bytes);
    }

    // Combine all audio buffers
    const totalLength = audioBuffers.reduce((sum, buf) => sum + buf.length, 0);
    const combined = new Uint8Array(totalLength);
    let offset = 0;
    for (const buf of audioBuffers) {
      combined.set(buf, offset);
      offset += buf.length;
    }

    return new Response(combined, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.error("TTS error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
