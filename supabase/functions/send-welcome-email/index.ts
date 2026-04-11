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
  installTitle: string
  installAndroid: string
  installIos: string
  installDesktop: string
}> = {
  en: {
    subject: '🎨 Welcome to Art Movements by Monolith Studio!',
    heading: 'Welcome to Art Movements!',
    intro: "We're thrilled to have you join our community of tattoo artists and art enthusiasts. Art Movements is designed specifically for tattoo artists who want to deepen their understanding of art history — and bring that knowledge into their work.",
    whatIs: 'Why Art History Matters for Tattoo Artists',
    whatIsBody: 'Every tattoo style has roots in art history. Whether you\'re into realism, neo-traditional, or blackwork — understanding the movements behind these styles will elevate your designs and set you apart.',
    features: [
      '🎨 Learn how art movements like Baroque, Romanticism & Art Nouveau shaped modern tattoo styles',
      '📐 Understand composition, contrast & technique through the lens of the old masters',
      '🖼️ Curated galleries of masterpieces that inspire tattoo design',
      '🧠 Interactive quizzes to test and sharpen your art knowledge',
      '🏆 Leaderboard to compete with fellow artists worldwide',
      '🌍 Available in English, Turkish, Spanish & Korean',
    ],
    cta: 'Start Exploring →',
    closing: 'Elevate your art, elevate your ink.',
    installTitle: '📱 Install the App on Your Device',
    installAndroid: '<strong>Android:</strong> Open the link in Chrome → tap the <strong>"Install"</strong> button or the ⋮ menu → "Add to Home Screen"',
    installIos: '<strong>iPhone/iPad:</strong> Open the link in Safari → tap the <strong>Share button (⬆)</strong> → "Add to Home Screen"',
    installDesktop: '<strong>Desktop:</strong> Open in Chrome/Edge → click the <strong>install icon</strong> (⊕) in the address bar',
  },
  tr: {
    subject: '🎨 Monolith Studio Art Movements\'a Hoş Geldiniz!',
    heading: 'Art Movements\'a Hoş Geldiniz!',
    intro: 'Dövme sanatçıları ve sanat meraklıları topluluğumuza katıldığınız için çok mutluyuz. Art Movements, sanat tarihini derinlemesine anlamak ve bu bilgiyi işlerinize yansıtmak isteyen dövme sanatçıları için tasarlandı.',
    whatIs: 'Sanat Tarihi Dövme Sanatçıları İçin Neden Önemli?',
    whatIsBody: 'Her dövme stilinin kökleri sanat tarihinde yatar. Realizm, neo-traditional ya da blackwork — bu stillerin arkasındaki akımları anlamak, tasarımlarınızı bir üst seviyeye taşıyacaktır.',
    features: [
      '🎨 Barok, Romantizm ve Art Nouveau gibi akımların modern dövme stillerini nasıl şekillendirdiğini öğrenin',
      '📐 Eski ustaların gözünden kompozisyon, kontrast ve teknik anlayışı',
      '🖼️ Dövme tasarımına ilham verecek seçilmiş başyapıt galerileri',
      '🧠 Sanat bilginizi test edecek interaktif quizler',
      '🏆 Dünya genelinde diğer sanatçılarla yarışabileceğiniz liderlik tablosu',
      '🌍 İngilizce, Türkçe, İspanyolca ve Korece dil desteği',
    ],
    cta: 'Keşfetmeye Başla →',
    closing: 'Sanatını yükselt, mürekkebini yükselt.',
    installTitle: '📱 Uygulamayı Cihazınıza Yükleyin',
    installAndroid: '<strong>Android:</strong> Linki Chrome\'da açın → <strong>"Yükle"</strong> butonuna veya ⋮ menüsüne tıklayın → "Ana Ekrana Ekle"',
    installIos: '<strong>iPhone/iPad:</strong> Linki Safari\'de açın → <strong>Paylaş butonuna (⬆)</strong> dokunun → "Ana Ekrana Ekle"',
    installDesktop: '<strong>Masaüstü:</strong> Chrome/Edge\'de açın → adres çubuğundaki <strong>yükle simgesine (⊕)</strong> tıklayın',
  },
  es: {
    subject: '🎨 ¡Bienvenido a Art Movements de Monolith Studio!',
    heading: '¡Bienvenido a Art Movements!',
    intro: 'Estamos encantados de que te unas a nuestra comunidad de tatuadores y entusiastas del arte. Art Movements está diseñado especialmente para tatuadores que quieren profundizar en la historia del arte y llevar ese conocimiento a su trabajo.',
    whatIs: 'Por Qué la Historia del Arte Importa para los Tatuadores',
    whatIsBody: 'Cada estilo de tatuaje tiene raíces en la historia del arte. Ya sea realismo, neo-tradicional o blackwork — entender los movimientos detrás de estos estilos elevará tus diseños.',
    features: [
      '🎨 Aprende cómo movimientos como Barroco, Romanticismo y Art Nouveau dieron forma a los estilos modernos de tatuaje',
      '📐 Comprende composición, contraste y técnica a través de los viejos maestros',
      '🖼️ Galerías curadas de obras maestras que inspiran diseños de tatuaje',
      '🧠 Quizzes interactivos para poner a prueba tus conocimientos',
      '🏆 Tabla de clasificación para competir con artistas de todo el mundo',
      '🌍 Disponible en inglés, turco, español y coreano',
    ],
    cta: 'Comenzar a Explorar →',
    closing: 'Eleva tu arte, eleva tu tinta.',
    installTitle: '📱 Instala la App en Tu Dispositivo',
    installAndroid: '<strong>Android:</strong> Abre el enlace en Chrome → toca el botón <strong>"Instalar"</strong> o el menú ⋮ → "Añadir a pantalla de inicio"',
    installIos: '<strong>iPhone/iPad:</strong> Abre el enlace en Safari → toca el <strong>botón Compartir (⬆)</strong> → "Añadir a pantalla de inicio"',
    installDesktop: '<strong>Escritorio:</strong> Abre en Chrome/Edge → haz clic en el <strong>icono de instalación (⊕)</strong> en la barra de direcciones',
  },
  ko: {
    subject: '🎨 Monolith Studio Art Movements에 오신 것을 환영합니다!',
    heading: 'Art Movements에 오신 것을 환영합니다!',
    intro: '타투 아티스트와 예술 애호가 커뮤니티에 참여해 주셔서 감사합니다. Art Movements는 미술사를 깊이 이해하고 그 지식을 작업에 반영하고자 하는 타투 아티스트를 위해 설계되었습니다.',
    whatIs: '미술사가 타투 아티스트에게 중요한 이유',
    whatIsBody: '모든 타투 스타일은 미술사에 뿌리를 두고 있습니다. 리얼리즘, 네오 트래디셔널, 블랙워크 등 — 이러한 스타일 뒤에 있는 예술 사조를 이해하면 디자인이 한 단계 높아집니다.',
    features: [
      '🎨 바로크, 낭만주의, 아르누보 등이 현대 타투 스타일을 어떻게 형성했는지 학습',
      '📐 거장들의 시선으로 구도, 대비, 기법 이해',
      '🖼️ 타투 디자인에 영감을 주는 엄선된 걸작 갤러리',
      '🧠 지식을 테스트할 수 있는 인터랙티브 퀴즈',
      '🏆 전 세계 아티스트들과 경쟁하는 리더보드',
      '🌍 영어, 터키어, 스페인어, 한국어 지원',
    ],
    cta: '탐험 시작 →',
    closing: '예술을 높이고, 잉크를 높이세요.',
    installTitle: '📱 기기에 앱 설치하기',
    installAndroid: '<strong>Android:</strong> Chrome에서 링크를 열고 → <strong>"설치"</strong> 버튼 또는 ⋮ 메뉴 → "홈 화면에 추가"를 탭하세요',
    installIos: '<strong>iPhone/iPad:</strong> Safari에서 링크를 열고 → <strong>공유 버튼(⬆)</strong> → "홈 화면에 추가"를 탭하세요',
    installDesktop: '<strong>데스크톱:</strong> Chrome/Edge에서 열고 → 주소 표시줄의 <strong>설치 아이콘(⊕)</strong>을 클릭하세요',
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
      
      <div style="background: #16213e; border-radius: 8px; padding: 24px; margin-top: 16px; border-left: 4px solid #a09880;">
        <h3 style="color: #d4a853; margin-top: 0; font-size: 16px;">${t.installTitle}</h3>
        <p style="font-size: 13px; line-height: 1.8; color: #e0d5c1; margin: 0;">${t.installAndroid}</p>
        <p style="font-size: 13px; line-height: 1.8; color: #e0d5c1; margin: 8px 0 0;">${t.installIos}</p>
        <p style="font-size: 13px; line-height: 1.8; color: #e0d5c1; margin: 8px 0 0;">${t.installDesktop}</p>
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
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
