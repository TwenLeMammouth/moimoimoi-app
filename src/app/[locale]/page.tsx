'use client'

import { useTranslations } from 'next-intl'
import { Button, Fade } from '@oxymammoth/ui'

export default function Page() {
  const t = useTranslations('')
  return (
    <main className="mx-auto max-w-3xl p-6">
      <Fade>
        <h1 className="text-3xl font-bold mb-4">{t('hero.title')}</h1>
        <Button>{t('cta.getStarted')}</Button>
      </Fade>
    </main>
  )
}