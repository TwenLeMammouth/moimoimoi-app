"use client";
import { useEffect } from "react";
import { useRive, useViewModel } from "@rive-app/react-webgl2";
// import { MMMask } from "../../public/assets/"

type Props = { colorHex: string; size?: number };

export default function MMMask({ colorHex, size = 450 }: Props) {
  const { rive, RiveComponent } = useRive({
    src: "/assets/mmmask.riv",
    autoplay: true,
  });

//   const viewModel = useViewModel(rive);
// console.log(viewModel?.properties);
// console.log(rive)

  useEffect(() => {
    if (!rive) return;
    // accès runtime/scene (non-typé officiellement, on cast)
    const r: any = rive;
    const artboard = r?.artboard;
    if (!artboard) return;

    // 1) trouver le shape "MaskBase"
    //    (tu peux aussi utiliser artboard.component('MaskBase') selon ta build)
    const maskBase = artboard.find?.((n: any) => n.name === "MaskBase")
                  || artboard.component?.("MaskBase");

    // 2) récupérer le premier fill (SolidColor)
    const solid = maskBase?.fills?.[0];
    if (!solid) return;

    // 3) setter la couleur (hex -> sRGB)
    // Plusieurs builds exposent un Color util ; sinon, parse à la main :
    const hex = colorHex.replace("#", "");
    const r8 = parseInt(hex.slice(0, 2), 16);
    const g8 = parseInt(hex.slice(2, 4), 16);
    const b8 = parseInt(hex.slice(4, 6), 16);
    const to01 = (v: number) => v / 255;

    // Certaines versions : solid.color = new rive.Color(r,g,b,a)
    // Pour être universel : essaye ces 2 lignes dans l’ordre :
    if (r?.Color) solid.color = new r.Color(to01(r8), to01(g8), to01(b8), 1);
    else if (solid.setColor) solid.setColor(to01(r8), to01(g8), to01(b8), 1);

    artboard?.markNeedsAdvance?.(); // force un redraw si dispo
  }, [rive, colorHex]);

  return (
    <div style={{ width: size, height: size }}>
      <RiveComponent />
    </div>
  );
}
