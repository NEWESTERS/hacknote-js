import type { LinkPreviewLoader } from "./LinkPreviewLoader";
import { DefaultLinkPreviewLoader } from "./DefaultLinkPreviewLoader";
import { WikiLinkPreviewLoader } from "./WikiLinkPreviewLoader";
import { DevLinkPreviewLoader } from "./DevLinkPreviewLoader";
import type { HtmlParser } from "./htmlParser";

const isBrowser = typeof document !== "undefined";

const HtmlParser = isBrowser
  ? await import("./htmlParser/BrowserHtmlParser").then(
      ({ BrowserHtmlParser }) => BrowserHtmlParser
    )
  : await import("./htmlParser/NodeHtmlParser").then(
      ({ NodeHtmlParser }) => NodeHtmlParser
    );

const parser = new HtmlParser();

export function getLinkPreviewLoader(
  href: string | URL
): LinkPreviewLoader<any> {
  if (import.meta.env.DEV) {
    return new DevLinkPreviewLoader(href);
  }

  if (WikiLinkPreviewLoader.wikiUrlRegExp.test(href.toString())) {
    return new WikiLinkPreviewLoader(href);
  } else {
    return new DefaultLinkPreviewLoader(href, parser);
  }
}

export type { LinkPreviewData } from "./LinkPreviewLoader";
