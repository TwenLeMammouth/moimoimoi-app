import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/supabase-server'// <- ton fichier supabase.ts classique

export async function GET() {
  const supabase = await supabaseServer();
  
  const { data, error } = await supabase
    .from('tests')
    .select('test_id, title, description, image_url, price, active')
    .eq('active', true)

  if (error) {
    console.error('[TESTS API]', error)
    return NextResponse.json({ error: 'Error fetching tests' }, { status: 500 })
  }

  return NextResponse.json(data)
}
