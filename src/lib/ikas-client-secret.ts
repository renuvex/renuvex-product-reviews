export class IkasClientSecretConfigurationError extends Error {
  readonly code = 'ikas_client_secret_not_configured';

  constructor() {
    super('Ikas client secret is not configured');
    this.name = 'IkasClientSecretConfigurationError';
  }
}

export function getRequiredIkasClientSecret(): string {
  const secret = process.env.CLIENT_SECRET;
  if (typeof secret !== 'string' || secret.trim().length === 0) {
    throw new IkasClientSecretConfigurationError();
  }
  return secret;
}
