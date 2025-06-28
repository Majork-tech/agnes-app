import { serve } from "https://deno.land/std@0.203.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { jwtVerify } from "https://deno.land/x/jose@v4.14.4/index.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // --- AUTHENTICATION CHECK ---
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
  }
  const jwt = authHeader.replace("Bearer ", "");

  const jwtSecret = Deno.env.get('JWT_SECRET');
  console.log('JWT received:', jwt);
  console.log('JWT_SECRET:', jwtSecret);
  let payload;
  try {
    const { payload: verifiedPayload } = await jwtVerify(
      jwt,
      new TextEncoder().encode(jwtSecret)
    );
    payload = verifiedPayload;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401, headers: corsHeaders });
  }

  // Optionally, check for admin role
  if (payload.role !== "admin") {
    return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: corsHeaders });
  }

  try {
    const { parent, learner, requestId } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    )

    const generatePassword = () => Math.random().toString(36).slice(-10)

    const parentPassword = generatePassword()
    const learnerPassword = generatePassword()

    const { data: parentUser, error: parentError } = await supabase.auth.admin.createUser({
      email: parent.email,
      password: parentPassword,
      email_confirm: true,
      user_metadata: { role: 'parent' }
    })
    if (parentError) {
      return new Response(JSON.stringify({ error: parentError.message }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const { data: learnerUser, error: learnerError } = await supabase.auth.admin.createUser({
      email: learner.email,
      password: learnerPassword,
      email_confirm: true,
      user_metadata: { role: 'student' }
    })
    if (learnerError) {
      return new Response(JSON.stringify({ error: learnerError.message }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    await supabase.from('profiles').insert([
      { id: parentUser.user.id, email: parent.email, role: 'parent', name: parent.name },
      { id: learnerUser.user.id, email: learner.email, role: 'student', name: learner.name }
    ])

    await supabase.from('parent_signup_requests').update({ status: 'approved' }).eq('id', requestId)

    return new Response(JSON.stringify({
      parentPassword,
      learnerPassword
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || 'Internal error' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
}) 