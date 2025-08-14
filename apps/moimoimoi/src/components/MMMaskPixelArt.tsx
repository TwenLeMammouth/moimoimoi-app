// src/components/MMMaskPixelArt.tsx
'use client'

export default function MMMaskPixelArt() {
  const width = 32
  const height = 32

  // Simple exemple d’un masque très basique en forme de cœur
  const pixels: boolean[] = new Array(width * height).fill(false)

  // On peut manuellement activer certains pixels pour tester
  const draw = (x: number, y: number) => {
    if (x >= 0 && x < width && y >= 0 && y < height) {
      pixels[y * width + x] = true
    }
  }

  // 💡 Ajoute ton motif ici (exemple cœur simplifié)
  const motif = [
    [14, 10], [15, 10], [16, 10], [17, 10],
    [13, 11], [18, 11],
    [12, 12], [19, 12],
    [11, 13], [20, 13],
    [10, 14], [21, 14],
    [11, 15], [20, 15],
    [12, 16], [19, 16],
    [13, 17], [18, 17],
    [14, 18], [15, 18], [16, 18], [17, 18],
  ]

  motif.forEach(([x, y]) => draw(x, y))

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${width}, 16px)`,
        gridTemplateRows: `repeat(${height}, 16px)`,
        gap: '1px',
        backgroundColor: 'transparent',
      }}
    >
      {pixels.map((on, i) => (
        <div
          key={i}
          className={`transition-all duration-300 ${on ? 'bg-indigo-600' : 'bg-transparent'}`}
          style={{
            width: '16px',
            height: '16px',
            borderRadius: '3px',
          }}
        />
      ))}
    </div>
  )
}
