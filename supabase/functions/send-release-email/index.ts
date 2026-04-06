import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend'

type Lang = 'en' | 'tr' | 'es' | 'ko'

const emailTemplates: Record<Lang, { subject: (name: string) => string; heading: string; body: (name: string) => string; cta: string; footer: string }> = {
  en: {
    subject: (name) => `🎨 New Movement Unlocked: ${name}`,
    heading: 'New Movement Unlocked!',
    body: (name) => `<strong>${name}</strong> is now ready to explore!`,
    cta: 'Start Exploring →',
    footer: "If you don't want to receive these emails, you can update your notification preferences in the app.",
  },
  tr: {
    subject: (name) => `🎨 Yeni Dönem Açıldı: ${name}`,
    heading: 'Yeni Dönem Açıldı!',
    body: (name) => `<strong>${name}</strong> dönemi artık keşfedilmeye hazır!`,
    cta: 'Keşfetmeye Başla →',
    footer: 'Bu emaili almak istemiyorsanız, uygulama içinden bildirim tercihlerinizi güncelleyebilirsiniz.',
  },
  es: {
    subject: (name) => `🎨 Nuevo Movimiento Desbloqueado: ${name}`,
    heading: '¡Nuevo Movimiento Desbloqueado!',
    body: (name) => `<strong>${name}</strong> ya está listo para explorar.`,
    cta: 'Comenzar a Explorar →',
    footer: 'Si no deseas recibir estos correos, puedes actualizar tus preferencias de notificación en la app.',
  },
  ko: {
    subject: (name) => `🎨 새 사조 공개: ${name}`,
    heading: '새로운 사조가 공개되었습니다!',
    body: (name) => `<strong>${name}</strong> 사조를 탐험할 준비가 되었습니다!`,
    cta: '탐험 시작 →',
    footer: '이 이메일을 받고 싶지 않으시면, 앱 내에서 알림 설정을 변경하실 수 있습니다.',
  },
}

function buildHtml(lang: Lang, movementName: string, releaseDate?: string) {
  const t = emailTemplates[lang] || emailTemplates.en
  return `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #e0d5c1; padding: 40px; border-radius: 12px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 28px; color: #d4a853; margin: 0;">🎨 Monolith Studio</h1>
        <p style="font-size: 12px; color: #a09880; margin: 4px 0 0; letter-spacing: 2px; text-transform: uppercase;">Art Movements</p>
      </div>
      <div style="background: #16213e; border-radius: 8px; padding: 30px; border-left: 4px solid #d4a853;">
        <h2 style="color: #d4a853; margin-top: 0; font-size: 22px;">${t.heading}</h2>
        <p style="font-size: 18px; line-height: 1.6; color: #e0d5c1;">${t.body(movementName)}</p>
        ${releaseDate ? `<p style="font-size: 14px; color: #a09880;">📅 ${releaseDate}</p>` : ''}
        <a href="https://arthistory.lovable.app" 
           style="display: inline-block; background: #d4a853; color: #1a1a2e; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 16px;">
          ${t.cta}
        </a>
      </div>
      <p style="font-size: 12px; color: #666; text-align: center; margin-top: 30px;">${t.footer}</p>
    </div>
  `
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured')

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured')

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const { movement_name, release_date } = await req.json()
    if (!movement_name) {
      return new Response(JSON.stringify({ error: 'movement_name is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // Get users who opted in with their language preference
    const { data: prefs, error: prefsError } = await supabase
      .from('notification_preferences')
      .select('user_id, language')
      .eq('email_notifications', true)

    if (prefsError) throw prefsError

    if (!prefs || prefs.length === 0) {
      return new Response(JSON.stringify({ message: 'No users opted in', sent: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Get user emails
    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers({ perPage: 1000 })
    if (usersError) throw usersError

    const userMap = new Map(users.map(u => [u.id, u.email]))

    // Send emails per user in their language
    let sentCount = 0
    for (const pref of prefs) {
      const email = userMap.get(pref.user_id)
      if (!email) continue

      const lang = (pref.language as Lang) || 'en'
      const t = emailTemplates[lang] || emailTemplates.en

      const response = await fetch(`${GATEWAY_URL}/emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'X-Connection-Api-Key': RESEND_API_KEY,
        },
        body: JSON.stringify({
          from: 'Monolith Studio <noreply@arthistory.monolithstudio.com>',
          to: [email],
          subject: t.subject(movement_name),
          html: buildHtml(lang, movement_name, release_date),
        }),
      })

      if (response.ok) {
        sentCount++
      } else {
        const err = await response.text()
        console.error(`Failed to send to ${email}:`, err)
      }
    }

    return new Response(JSON.stringify({ message: 'Emails sent', sent: sentCount, total: prefs.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
