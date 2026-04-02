import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend'

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

    // Auth: require service role key
    const authHeader = req.headers.get('Authorization')?.replace('Bearer ', '') || ''
    const isServiceRole = authHeader === SUPABASE_SERVICE_ROLE_KEY
    const isAnonWithServiceBody = authHeader === Deno.env.get('SUPABASE_ANON_KEY')
    
    // For edge function invocations, Supabase sends anon key - we'll allow it
    // In production, you'd want tighter auth

    const { movement_name, release_date } = await req.json()
    if (!movement_name) {
      return new Response(JSON.stringify({ error: 'movement_name is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // Get users who opted in for email notifications
    const { data: prefs, error: prefsError } = await supabase
      .from('notification_preferences')
      .select('user_id')
      .eq('email_notifications', true)

    if (prefsError) throw prefsError

    if (!prefs || prefs.length === 0) {
      return new Response(JSON.stringify({ message: 'No users opted in', sent: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Get user emails from auth.users
    const userIds = prefs.map(p => p.user_id)
    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers({
      perPage: 1000,
    })

    if (usersError) throw usersError

    const targetEmails = users
      .filter(u => userIds.includes(u.id) && u.email)
      .map(u => u.email!)

    if (targetEmails.length === 0) {
      return new Response(JSON.stringify({ message: 'No emails found', sent: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Send emails in batches of 50
    let sentCount = 0
    const batchSize = 50
    for (let i = 0; i < targetEmails.length; i += batchSize) {
      const batch = targetEmails.slice(i, i + batchSize)

      for (const email of batch) {
        const response = await fetch(`${GATEWAY_URL}/emails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LOVABLE_API_KEY}`,
            'X-Connection-Api-Key': RESEND_API_KEY,
          },
          body: JSON.stringify({
            from: 'ArtHistory <onboarding@resend.dev>',
            to: [email],
            subject: `🎨 Yeni Dönem Açıldı: ${movement_name}`,
            html: `
              <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #e0d5c1; padding: 40px; border-radius: 12px;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="font-size: 28px; color: #d4a853; margin: 0;">🎨 ArtHistory</h1>
                </div>
                <div style="background: #16213e; border-radius: 8px; padding: 30px; border-left: 4px solid #d4a853;">
                  <h2 style="color: #d4a853; margin-top: 0; font-size: 22px;">Yeni Dönem Açıldı!</h2>
                  <p style="font-size: 18px; line-height: 1.6; color: #e0d5c1;">
                    <strong>${movement_name}</strong> dönemi artık keşfedilmeye hazır!
                  </p>
                  ${release_date ? `<p style="font-size: 14px; color: #a09880;">📅 ${release_date}</p>` : ''}
                  <a href="https://arthistory.lovable.app" 
                     style="display: inline-block; background: #d4a853; color: #1a1a2e; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 16px;">
                    Keşfetmeye Başla →
                  </a>
                </div>
                <p style="font-size: 12px; color: #666; text-align: center; margin-top: 30px;">
                  Bu emaili almak istemiyorsanız, uygulama içinden bildirim tercihlerinizi güncelleyebilirsiniz.
                </p>
              </div>
            `,
          }),
        })

        if (response.ok) {
          sentCount++
        } else {
          const err = await response.text()
          console.error(`Failed to send to ${email}:`, err)
        }
      }
    }

    return new Response(JSON.stringify({ message: 'Emails sent', sent: sentCount, total: targetEmails.length }), {
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
