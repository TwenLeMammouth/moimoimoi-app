
'use client'

import * as React from 'react'
import { ensureDeviceKeyWith } from '@oxymammoth/crypto'

export function useDeviceKey(){
  const [key, setKey] = React.useState<CryptoKey | null>(null)
  React.useEffect(() => { (async () => {
    try {
      const k = await ensureDeviceKeyWith(
        (n) => localStorage.getItem(n),
        (n, v) => localStorage.setItem(n, v)
      )
      setKey(k)
    } catch (e) { console.error(e) }
  })() }, [])
  return key
}