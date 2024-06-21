import { normalizeUrl } from './normalizeUrl';

export function isUrlMatch(
  currentUrl: string | URL,
  url: string | URL,
  exact: boolean = false
): boolean {
  if (exact) {
    return normalizeUrl(currentUrl) === normalizeUrl(url);
  }

  return normalizeUrl(currentUrl).startsWith(normalizeUrl(url));
}
