import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend'

type Lang = 'en' | 'tr' | 'es' | 'ko'

const emailTemplates: Record<Lang, {
  subject: string
  heading: string
  intro: string
  whatIs: string
  whatIsBody: string
  features: string[]
  cta: string
  closing: string
}> = {
  en: {
    subject: '🎨 Welcome to Art Movements by Monolith Studio!',
    heading: 'Welcome to Art Movements!',
    intro: "We're thrilled to have you join our community of art enthusiasts. Here's what awaits you:",
    whatIs: 'What is Art Movements?',
    whatIsBody: 'Art Movements is an interactive learning platform that takes you on a journey through the greatest art movements in history — from Renaissance to Contemporary Art.',
    features: [
      '📚 Deep dives into major art movements with rich visual content',
      '🖼️ Curated galleries of masterpieces from each era',
      '🧠 Interactive quizzes to test your knowledge',
      '🏆 Leaderboard to compete with fellow art lovers',
      '🌍 Available in English, Turkish, Spanish & Korean',
    ],
    cta: 'Start Exploring →',
    closing: 'Happy learning!',
  },
  tr: {
    subject: '🎨 Monolith Studio Art Movements\'a Hoş Geldiniz!',
    heading: 'Art Movements\'a Hoş Geldiniz!',
    intro: 'Sanat meraklıları topluluğumuza katıldığınız için çok mutluyuz. İşte sizi neler bekliyor:',
    whatIs: 'Art Movements Nedir?',
    whatIsBody: 'Art Movements, sizi Rönesans\'tan Çağdaş Sanat\'a kadar tarihin en büyük sanat akımlarında bir yolculuğa çıkaran interaktif bir öğrenme platformudur.',
    features: [
      '📚 Zengin görsel içeriklerle büyük sanat akımlarına derinlemesine bakış',
      '🖼️ Her dönemden seçilmiş başyapıt galerileri',
      '🧠 Bilginizi test edecek interaktif quizler',
      '🏆 Diğer sanat severlerle yarışabileceğiniz liderlik tablosu',
      '🌍 İngilizce, Türkçe, İspanyolca ve Korece dil desteği',
    ],
    cta: 'Keşfetmeye Başla →',
    closing: 'İyi öğrenmeler!',
  },
  es: {
    subject: '🎨 ¡Bienvenido a Art Movements de Monolith Studio!',
    heading: '¡Bienvenido a Art Movements!',
    intro: 'Estamos encantados de que te unas a nuestra comunidad de entusiastas del arte. Esto es lo que te espera:',
    whatIs: '¿Qué es Art Movements?',
    whatIsBody: 'Art Movements es una plataforma de aprendizaje interactivo que te lleva a un viaje a través de los grandes movimientos artísticos de la historia — desde el Renacimiento hasta el Arte Contemporáneo.',
    features: [
      '📚 Inmersiones profundas en los grandes movimientos artísticos con contenido visual rico',
      '🖼️ Galerías curadas de obras maestras de cada época',
      '🧠 Quizzes interactivos para poner a prueba tus conocimientos',
      '🏆 Tabla de clasificación para competir con otros amantes del arte',
      '🌍 Disponible en inglés, turco, español y coreano',
    ],
    cta: 'Comenzar a Explorar →',
    closing: '¡Feliz aprendizaje!',
  },
  ko: {
    subject: '🎨 Monolith Studio Art Movements에 오신 것을 환영합니다!',
    heading: 'Art Movements에 오신 것을 환영합니다!',
    intro: '예술 애호가 커뮤니티에 참여해 주셔서 감사합니다. 다음과 같은 것들이 기다리고 있습니다:',
    whatIs: 'Art Movements란?',
    whatIsBody: 'Art Movements는 르네상스부터 현대 미술까지, 역사상 가장 위대한 예술 사조를 여행하는 인터랙티브 학습 플랫폼입니다.',
    features: [
      '📚 풍부한 시각 콘텐츠와 함께하는 주요 예술 사조 심층 탐구',
      '🖼️ 각 시대의 걸작을 엄선한 갤러리',
      '🧠 지식을 테스트할 수 있는 인터랙티브 퀴즈',
      '🏆 예술 애호가들과 경쟁할 수 있는 리더보드',
      '🌍 영어, 터키어, 스페인어, 한국어 지원',
    ],
    cta: '탐험 시작 →',
    closing: '즐거운 학습 되세요!',
  },
}

function buildHtml(lang: Lang) {
  const t = emailTemplates[lang] || emailTemplates.en
  const featuresList = t.features.map(f => `<li style="margin-bottom: 8px; color: #e0d5c1;">${f}</li>`).join('')

  return `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #e0d5c1; padding: 40px; border-radius: 12px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 28px; color: #d4a853; margin: 0;">🎨 Monolith Studio</h1>
        <p style="font-size: 12px; color: #a09880; margin: 4px 0 0; letter-spacing: 2px; text-transform: uppercase;">Art Movements</p>
      </div>
      <div style="background: #16213e; border-radius: 8px; padding: 30px; border-left: 4px solid #d4a853;">
        <h2 style="color: #d4a853; margin-top: 0; font-size: 24px;">${t.heading}</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #e0d5c1;">${t.intro}</p>
        
        <h3 style="color: #d4a853; font-size: 18px; margin-top: 24px;">${t.whatIs}</h3>
        <p style="font-size: 15px; line-height: 1.6; color: #e0d5c1;">${t.whatIsBody}</p>
        
        <ul style="list-style: none; padding: 0; margin: 20px 0; font-size: 15px; line-height: 1.8;">
          ${featuresList}
        </ul>
        
        <div style="text-align: center; margin-top: 24px;">
          <a href="https://arthistory.monolithstudio.com" 
             style="display: inline-block; background: #d4a853; color: #1a1a2e; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">
            ${t.cta}
          </a>
        </div>
      </div>
      <p style="font-size: 14px; color: #a09880; text-align: center; margin-top: 24px;">${t.closing}<br/>— Monolith Studio Team</p>
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

    const body = await req.json().catch(() => ({}))
    const mode = body.mode || 'bulk' // 'bulk' = all users, 'single' = one user
    const singleUserId = body.user_id

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    let targetUsers: { user_id: string; language: string }[] = []

    if (mode === 'single' && singleUserId) {
      // Single user (triggered on signup)
      const { data: pref } = await supabase
        .from('notification_preferences')
        .select('user_id, language')
        .eq('user_id', singleUserId)
        .single()

      if (pref) {
        targetUsers = [pref]
      } else {
        targetUsers = [{ user_id: singleUserId, language: 'en' }]
      }
    } else {
      // Bulk: all users with notifications enabled
      const { data: prefs, error: prefsError } = await supabase
        .from('notification_preferences')
        .select('user_id, language')
        .eq('email_notifications', true)

      if (prefsError) throw prefsError
      targetUsers = prefs || []
    }

    if (targetUsers.length === 0) {
      return new Response(JSON.stringify({ message: 'No users to send to', sent: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Get user emails
    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers({ perPage: 1000 })
    if (usersError) throw usersError

    const userMap = new Map(users.map(u => [u.id, u.email]))

    let sentCount = 0
    for (const target of targetUsers) {
      const email = userMap.get(target.user_id)
      if (!email) continue

      const lang = (target.language as Lang) || 'en'
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
          subject: t.subject,
          html: buildHtml(lang),
        }),
      })

      if (response.ok) {
        sentCount++
      } else {
        const err = await response.text()
        console.error(`Failed to send to ${email}:`, err)
      }
    }

    return new Response(JSON.stringify({ message: 'Welcome emails sent', sent: sentCount, total: targetUsers.length }), {
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
