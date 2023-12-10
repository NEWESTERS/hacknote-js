export function normalizeUrl(url: string | URL): string {
  return url.toString().replaceAll(/(\/$)|(^\/)/g, "");
}
