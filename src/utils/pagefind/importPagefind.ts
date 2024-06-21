import type { Pagefind } from './types';

const PAGEFIND_URL = '/hacknote-js/pagefind/pagefind.js';

export function importPagefind(): Promise<Pagefind> {
  return import(
    /* @vite-ignore */
    PAGEFIND_URL
  );
}
