
"use client"

import { Button, TextInput, Checkbox, RadioButton, HexButton, LongTextInput, ScaleSelector } from '@/components/ui'
import { useState } from 'react'
import { useTheme } from '@/components/theme/ThemeWrapper'
import { Card, CardContent, CardFooter } from '@/components/ui/CardM'
import { QuestionCard, QuestionCardContent, QuestionCardFooter, QuestionCardHeader } from '@/components/ui/QuestionCard'

export default function PreviewPage() {

  const { setTheme } = useTheme()
  const [theme, setCurrent] = useState<'default' | 'intuition'>('default')

  const [text, setText] = useState('')
  const [checked, setChecked] = useState(false)
  const [selected, setSelected] = useState('a')
  const [note, setNote] = useState(0)

  const toggleTheme = () => {
    const next = theme === 'default' ? 'intuition' : 'default'
    setCurrent(next)
    setTheme(next)
  }

  return (
    <div className="p-6 space-y-6">
      <Button>Appuie-moi</Button>
      <TextInput value={text} onChange={setText} placeholder="Ton texte ici..." />
      <Checkbox checked={checked} onChange={setChecked} label="Je coche !" />
      <RadioButton
        value="a"
        current={selected}
        onChange={setSelected}
        name="test"
        label="Choix A"
      />
      <RadioButton
        value="b"
        current={selected}
        onChange={setSelected}
        name="test"
        label="Choix B"
      />

      <Button onClick={toggleTheme}>
        Changer le thème ({theme})
      </Button>

      <QuestionCard>
        <QuestionCardHeader image="/images/facettes/conscience.png">
          Quelle est la chose que tu apprécies le plus chez toi ?
        </QuestionCardHeader>

        <QuestionCardContent>
          <ScaleSelector
            value={note}
            onChange={setNote}
            labels={{ 1: "Pas du tout", 6: "Tout à fait" }}
            size={6}
          />
          <LongTextInput value={text} onChange={setText} placeholder="Ta réponse ici..." />
        </QuestionCardContent>

        <QuestionCardFooter>
          <Button>Suivant</Button>
        </QuestionCardFooter>
      </QuestionCard>

    </div>
  )
}
