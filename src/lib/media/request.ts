export class MediaRequestError extends Error {
  constructor(public readonly code: string) {
    super(code);
    this.name = 'MediaRequestError';
  }
}

export function parseJsonObject(rawBody: string): Record<string, unknown> {
  let value: unknown;
  try {
    value = JSON.parse(rawBody);
  } catch {
    throw new MediaRequestError('invalid_json');
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new MediaRequestError('invalid_json');
  }
  return value as Record<string, unknown>;
}

export async function readJsonObject(request: Request): Promise<Record<string, unknown>> {
  return parseJsonObject(await request.text());
}
