export type Encrypted = { iv: string; ct: string }

export async function genDeviceKey() {
  const raw = crypto.getRandomValues(new Uint8Array(32))
  return crypto.subtle.importKey('raw', raw, { name: 'AES-GCM', length: 256 }, true, ['encrypt','decrypt'])
}

export async function encrypt(plain: string, key: CryptoKey): Promise<Encrypted> {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const data = new TextEncoder().encode(plain)
  const buf = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data)
  return { iv: btoa(String.fromCharCode(...iv)), ct: btoa(String.fromCharCode(...new Uint8Array(buf))) }
}

export async function decrypt(payload: Encrypted, key: CryptoKey): Promise<string> {
  const iv = Uint8Array.from(atob(payload.iv), c => c.charCodeAt(0))
  const ct = Uint8Array.from(atob(payload.ct), c => c.charCodeAt(0))
  const buf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct)
  return new TextDecoder().decode(buf)
}
