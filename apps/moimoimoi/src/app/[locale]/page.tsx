
'use client'

import { useTranslations } from 'next-intl'
import { Button, Fade, Section, SectionTitle, SectionLead, DividerWavy } from '@oxymammoth/ui'

export default function Page() {
  const t = useTranslations()
  return (
    <main className="min-h-[70vh]">
      <Section className="relative">
        <Fade>
          <SectionTitle>{t('hero.title')}</SectionTitle>
          <SectionLead>
            {t('cta.getStarted')}
          </SectionLead>
          <div className="mt-4"><Button>{t('cta.getStarted')}</Button></div>
        </Fade>
        <div className="mt-10">
          <DividerWavy />
        </div>
      </Section>
    </main>
  )
}