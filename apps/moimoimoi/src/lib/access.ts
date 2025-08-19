import { supabaseServer } from '@/lib/supabase/supabase-server'

export async function hasAccessToTest(test_id: string): Promise<{ ok: boolean; reason?: string; mode?: 'free'|'purchase'|'subscription' }>{
  const sb = await supabaseServer()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) return { ok: false, reason: 'auth' }

  const { data: test } = await sb
    .from('tests')
    .select('price')
    .eq('test_id', test_id)
    .maybeSingle()
  if (!test) return { ok: false, reason: 'missing' }

  if (!test.price || test.price === 0) return { ok: true, mode: 'free' }

  // Abo actif ?
  const { data: sub } = await sb
    .from('subscriptions')
    .select('status, end_date')
    .eq('user_id', user.id)
    .order('start_date', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (sub && sub.status === 'active' && (!sub.end_date || sub.end_date > new Date().toISOString())) {
    return { ok: true, mode: 'subscription' }
  }

  // Achat unitaire ?
  const { data: pur } = await sb
    .from('purchases')
    .select('status')
    .eq('user_id', user.id)
    .eq('test_id', test_id)
    .order('created_at', { ascending: false })
  if (pur && pur.length && pur[0].status === 'paid') return { ok: true, mode: 'purchase' }

  return { ok: false, reason: 'payment' }
}