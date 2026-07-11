export type CanonicalJsonValue = null | boolean | number | string | CanonicalJsonValue[] | { [key: string]: CanonicalJsonValue };

function assertValidUnicodeScalarString(value: string): void {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = value.charCodeAt(index + 1);
      if (!(next >= 0xdc00 && next <= 0xdfff)) throw new Error('canonical_json_lone_surrogate');
      index += 1;
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      throw new Error('canonical_json_lone_surrogate');
    }
  }
}

export function canonicalizeJson(value: CanonicalJsonValue): string {
  if (value === null) return 'null';
  if (typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'string') {
    assertValidUnicodeScalarString(value);
    return JSON.stringify(value);
  }
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new Error('canonical_json_non_finite_number');
    return Object.is(value, -0) ? '0' : JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map(canonicalizeJson).join(',')}]`;

  const keys = Object.keys(value).sort();
  keys.forEach(assertValidUnicodeScalarString);
  return `{${keys.map((key) => `${JSON.stringify(key)}:${canonicalizeJson(value[key]!)}`).join(',')}}`;
}

export function canonicalJsonBytes(value: CanonicalJsonValue): Buffer {
  return Buffer.from(canonicalizeJson(value), 'utf8');
}
