import type { HtmlDocumentApi, HtmlParser } from "./HTMLParser";

export class BrowserHtmlParser implements HtmlParser {
  private _domParser = new DOMParser();

  public parse(html: string): HtmlDocumentApi {
    const htmlDocument = this._domParser.parseFromString(html, "text/html");

    return {
      querySelector(selector) {
        const element = htmlDocument.querySelector(selector);

        if (!element) {
          return undefined;
        }

        return {
          getAttribute(name) {
            return element.getAttribute(name) ?? undefined;
          },
          getText() {
            return element.textContent ?? undefined;
          },
        };
      },
    };
  }
}
