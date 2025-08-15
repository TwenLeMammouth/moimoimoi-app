export type Encrypted = { iv: string; ct: string }
export const DEVICE_KEY_NAME = 'mmm_device_key_b64'

function toB64(buf: ArrayBuffer | Uint8Array){
  const u8 = buf instanceof Uint8Array ? buf : new Uint8Array(buf)
  return btoa(String.fromCharCode(...u8))
}
function fromB64(b64: string){
  return new Uint8Array(atob(b64).split('').map(c => c.charCodeAt(0)))
}

export async function importKeyRaw(raw: ArrayBuffer){
  return crypto.subtle.importKey('raw', raw, { name: 'AES-GCM', length: 256 }, true, ['encrypt','decrypt'])
}
export async function generateKey(){
  const raw = crypto.getRandomValues(new Uint8Array(32))
  return importKeyRaw(raw.buffer)
}
export async function exportKeyB64(key: CryptoKey){
  const raw = await crypto.subtle.exportKey('raw', key)
  return toB64(new Uint8Array(raw))
}
export async function importKeyB64(b64: string){
  return importKeyRaw(fromB64(b64).buffer)
}

export async function encryptText(plain: string, key: CryptoKey): Promise<Encrypted> {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const data = new TextEncoder().encode(plain)
  const buf = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data)
  return { iv: toB64(iv), ct: toB64(new Uint8Array(buf)) }
}
export async function decryptText(enc: Encrypted, key: CryptoKey){
  const iv = fromB64(enc.iv)
  const ct = fromB64(enc.ct)
  const buf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct)
  return new TextDecoder().decode(buf)
}

// utilitaire générique : on injecte get/set pour éviter toute dépendance directe à window
export async function ensureDeviceKeyWith(
  getItem: (k: string) => string | null,
  setItem: (k: string, v: string) => void,
  name = DEVICE_KEY_NAME
){
  const existing = getItem(name)
  if (existing) return importKeyB64(existing)
  const key = await generateKey()
  const b64 = await exportKeyB64(key)
  setItem(name, b64)
  return key
}