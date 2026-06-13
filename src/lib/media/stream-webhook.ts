import { createHmac, timingSafeEqual } from 'crypto';

type ParsedSignature = { time: number; signatures: string[] };

function parseSignature(value: string): ParsedSignature | null {
  let time = 0;
  const signatures: string[] = [];
  for (const part of value.split(',')) {
    const [key, rawValue] = part.trim().split('=', 2);
    if (key === 'time') time = Number(rawValue);
    if (key === 'sig1' && rawValue) signatures.push(rawValue);
  }
  return Number.isFinite(time) && time > 0 && signatures.length > 0 ? { time, signatures } : null;
}

function safeHexEqual(expected: string, actual: string) {
  const expectedBuffer = Buffer.from(expected, 'utf8');
  const actualBuffer = Buffer.from(actual, 'utf8');
  return expectedBuffer.length === actualBuffer.length && timingSafeEqual(expectedBuffer, actualBuffer);
}

export function verifyStreamWebhookSignature(input: {
  rawBody: string;
  signature: string | null;
  secret: string;
  nowMs?: number;
  toleranceSeconds?: number;
}) {
  if (!input.signature || !input.secret) return false;
  const parsed = parseSignature(input.signature);
  if (!parsed) return false;
  const nowSeconds = Math.floor((input.nowMs ?? Date.now()) / 1000);
  if (Math.abs(nowSeconds - parsed.time) > (input.toleranceSeconds ?? 300)) return false;
  const expected = createHmac('sha256', input.secret)
    .update(`${parsed.time}.${input.rawBody}`, 'utf8')
    .digest('hex');
  return parsed.signatures.some((signature) => safeHexEqual(expected, signature));
}
