
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTestStore } from "@/hooks/useTestStore";

type Props = {
  question: string;
  id: string;
  total: number;
  index: number;
};

export default function QuestionCard({ question, id, total, index }: Props) {
  const { answers, setAnswer, goNext, goPrev } = useTestStore();
  const [score, setScore] = useState<number | null>(answers[id]?.score ?? null);
  const [text, setText] = useState(answers[id]?.text ?? "");

  const handleSubmit = () => {
    if (score !== null) {
      setAnswer({ questionId: id, score, text });
      goNext();
    }
  };

  useEffect(() => {
    setScore(answers[id]?.score ?? null);
    setText(answers[id]?.text ?? "");
  }, [id]);

  return (
    <div className="max-w-lg w-full bg-white dark:bg-zinc-900 border rounded-xl p-6 shadow-lg space-y-4">
      <div className="text-sm text-muted-foreground">
        Question {index + 1} / {total}
      </div>
      <h2 className="text-xl font-semibold">{question}</h2>

      <div className="grid grid-cols-6 gap-2">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Button
            key={n}
            variant={score === n ? "default" : "outline"}
            onClick={() => setScore(n)}
          >
            {n}
          </Button>
        ))}
      </div>

      <textarea
        className="w-full mt-4 p-2 text-sm border rounded resize-none dark:bg-zinc-800"
        rows={3}
        maxLength={300}
        placeholder="Tu veux t’exprimer un peu plus ? (optionnel)"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex justify-between mt-4">
        <Button variant="ghost" onClick={goPrev} disabled={index === 0}>
          Revenir
        </Button>
        <Button onClick={handleSubmit} disabled={score === null}>
          Suivant
        </Button>
      </div>
    </div>
  );
}
