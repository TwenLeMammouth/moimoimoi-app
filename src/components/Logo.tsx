import Image from 'next/image'
import logo from '@/assets/logo.svg' // Si tu places ton fichier dans `public/assets/logo.svg`

export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <Image
      src="/assets/LogoMMMv1.svg"
      alt="Logo MoiMoiMoi"
      width={size}
      height={size}
    />
  )
}
