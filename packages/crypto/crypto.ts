export async function encrypt(plain: string, key: CryptoKey) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = new TextEncoder().encode(plain);
  const buf = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);
  return { iv: Buffer.from(iv).toString('base64'), ct: Buffer.from(buf).toString('base64') };
}
export async function decrypt(payload: { iv: string; ct: string }, key: CryptoKey) {
  const iv = Uint8Array.from(Buffer.from(payload.iv, 'base64'));
  const ct = Buffer.from(payload.ct, 'base64');
  const buf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
  return new TextDecoder().decode(buf);
}
