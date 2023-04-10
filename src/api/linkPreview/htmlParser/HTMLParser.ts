export interface HtmlElementApi {
  getAttribute(name: string): string | undefined;
  getText(): string | undefined;
}

export interface HtmlDocumentApi {
  querySelector(selector: string): HtmlElementApi | undefined;
}

export interface HtmlParser {
  parse(html: string): HtmlDocumentApi;
}
