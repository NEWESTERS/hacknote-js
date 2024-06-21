import { load as loadHtml } from 'cheerio';

import type { HtmlDocumentApi, HtmlParser } from './HTMLParser';

export class NodeHtmlParser implements HtmlParser {
  public parse(html: string): HtmlDocumentApi {
    const cheerio = loadHtml(html);

    return {
      querySelector(selector: string) {
        const element = cheerio(selector);

        return {
          getAttribute(name: string) {
            return element.attr(name);
          },
          getText() {
            return element.text();
          }
        };
      }
    };
  }
}
