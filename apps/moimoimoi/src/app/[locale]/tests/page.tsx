
// apps/moimoimoi/src/app/[locale]/tests/page.tsx
import { supabaseServer } from '../../../lib/supabase/supabase-server'
import { Link } from '@/i18n/navigation'
import type { JSX } from 'react'

export default async function TestsIndex(): Promise<JSX.Element> {
  const sb = await supabaseServer()
  const { data: tests } = await sb
    .from('tests')
    .select('test_id, title, description, lang, category, image_url, price, active, deleted')
    .eq('active', true)
    .eq('deleted', false)
    .order('created_at', { ascending: false })

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold mb-4">Tests</h1>
      {!tests?.length && <p>Aucun test actif pour le moment.</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(tests || []).map(t => (
          <Link key={t.test_id} href={`/tests/${t.test_id}`} className="block rounded-xl border p-4 hover:shadow-md">
            <div className="text-lg font-semibold">{t.title}</div>
            {t.description && <p className="text-sm opacity-80 line-clamp-3">{t.description}</p>}
            <div className="mt-2 text-xs opacity-60">{t.category} · {t.lang?.toUpperCase()}</div>
          </Link>
        ))}
      </div>
    </main>
  )
}
