type Props = {
  /** couleur de remplissage des courbes (ex: "oklch(96% 0.06 290)") */
  fill?: string;
  /** dégradé de la ligne centrale */
  from?: string;
  to?: string;
  className?: string;
  height?: number; // px
};

export default function DoubleCurveDivider({
  fill = "oklch(96% 0.06 290)",
  from = "oklch(78% 0.18 210)", // Aqua
  to = "oklch(74% 0.18 270)",
  className = "",
  height = 160,
}: Props) {
  return (
    <svg
      viewBox="0 0 1440 160"
      width="100%"
      height={height}
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="hairline" x1="0" x2="1" y1="0.5" y2="0.5">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>

      {/* Courbe du haut */}
      <path
        d="M0,72 C240,80 360,40 600,48 C840,56 1080,76 1440,60 L1440,80 L0,80 Z"
        fill={fill}
      />
      {/* Courbe inversée (horizontale + verticale) */}
      <path
        d="M0,72 C240,80 360,40 600,48 C840,56 1080,76 1440,60 L1440,80 L0,80 Z"
        transform="translate(1440,160) scale(-1,-1)"
        fill={fill}
      />
      {/* Ligne centrale dégradée */}
      <rect x="0" y="79" width="1440" height="2" fill="url(#hairline)" />
    </svg>
  );
}
