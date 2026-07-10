export function isSensitiveReviewRequestPath(pathname: string): boolean {
  return pathname === '/request' || pathname === '/request/';
}
