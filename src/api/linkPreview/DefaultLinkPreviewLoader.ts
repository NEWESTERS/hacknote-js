import { LinkPreviewLoader } from "./LinkPreviewLoader";
import type { HtmlDocumentApi, HtmlParser } from "./htmlParser";

export class DefaultLinkPreviewLoader extends LinkPreviewLoader<HtmlDocumentApi> {
  private _htmlParser: HtmlParser;

  public constructor(linkUrl: URL | string, htmlParser: HtmlParser) {
    super(linkUrl);

    this._htmlParser = htmlParser;
  }

  public fetchContent(): Promise<HtmlDocumentApi> {
    return fetch(this.url)
      .then((response) => response.text())
      .then((html) => this._htmlParser.parse(html));
  }

  public get title(): Promise<string | undefined> {
    return this.linkContent.then((htmlApi) => {
      let title = htmlApi
        .querySelector('meta[property="og:title"]')
        ?.getAttribute("content");

      if (!title) {
        title = htmlApi.querySelector("title")?.getText();
      }

      return title;
    });
  }

  public get description(): Promise<string | undefined> {
    return this.linkContent.then((htmlApi) => {
      return htmlApi
        .querySelector('meta[property="og:description"]')
        ?.getAttribute("content");
    });
  }

  public get image(): Promise<string | undefined> {
    return this.linkContent.then((htmlApi) => {
      return htmlApi
        .querySelector('meta[property="og:image"]')
        ?.getAttribute("content");
    });
  }

  public get favicon(): Promise<string | undefined> {
    return this.linkContent.then((htmlApi) => {
      let faviconUrl = htmlApi
        .querySelector('link[rel="alternate icon"]')
        ?.getAttribute("href");

      if (!faviconUrl) {
        faviconUrl = htmlApi
          .querySelector('link[rel="icon"]')
          ?.getAttribute("href");
      }

      if (!faviconUrl) {
        return undefined;
      }

      if (faviconUrl.startsWith("/")) {
        return this.baseUrl + faviconUrl;
      }

      return faviconUrl;
    });
  }
}
