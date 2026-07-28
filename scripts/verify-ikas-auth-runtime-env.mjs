const clientSecret = process.env.CLIENT_SECRET;

if (typeof clientSecret !== 'string' || clientSecret.trim().length === 0) {
  console.error('ikas_auth_runtime_env_invalid');
  process.exitCode = 1;
} else {
  console.log('ikas_auth_runtime_env_valid');
}
