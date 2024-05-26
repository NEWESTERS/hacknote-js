import type { LinkPreviewLoader } from './LinkPreviewLoader';
import { DefaultLinkPreviewLoader } from './DefaultLinkPreviewLoader';
import { WikiLinkPreviewLoader } from './WikiLinkPreviewLoader';
import { DevLinkPreviewLoader as DevelopmentLinkPreviewLoader } from './DevLinkPreviewLoader';
import type { HtmlParser } from './htmlParser';

const isBrowser = typeof document !== 'undefined';

const HtmlParser = isBrowser
  ? await import('./htmlParser/BrowserHtmlParser').then(
      ({ BrowserHtmlParser }) => BrowserHtmlParser
    )
  : await import('./htmlParser/NodeHtmlParser').then(
      ({ NodeHtmlParser }) => NodeHtmlParser
    );

const parser = new HtmlParser();

export function getLinkPreviewLoader(
  href: string | URL
): LinkPreviewLoader<unknown> {
  if (import.meta.env.DEV) {
    return new DevelopmentLinkPreviewLoader(href);
  }

  return WikiLinkPreviewLoader.wikiUrlRegExp.test(href.toString())
    ? new WikiLinkPreviewLoader(href)
    : new DefaultLinkPreviewLoader(href, parser);
}

export type { LinkPreviewData } from './LinkPreviewLoader';
