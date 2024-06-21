import type { HtmlDocumentApi, HtmlParser } from './HTMLParser';

export class BrowserHtmlParser implements HtmlParser {
  private _domParser: DOMParser = new DOMParser();

  public parse(html: string): HtmlDocumentApi {
    const htmlDocument = this._domParser.parseFromString(html, 'text/html');

    return {
      querySelector(selector: string) {
        const element = htmlDocument.querySelector(selector);

        if (!element) {
          return;
        }

        return {
          getAttribute(name: string) {
            return element.getAttribute(name) ?? undefined;
          },
          getText() {
            return element.textContent ?? undefined;
          }
        };
      }
    };
  }
}
