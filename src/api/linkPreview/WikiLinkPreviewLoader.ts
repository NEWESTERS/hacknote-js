import { LinkPreviewLoader } from './LinkPreviewLoader';

interface WikiArticleData {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
  };
}

export class WikiLinkPreviewLoader extends LinkPreviewLoader<WikiArticleData> {
  public wikiApiUrl: URL;

  public static wikiUrlRegExp: RegExp =
    /https:\/\/(.+)\.wikipedia\.org\/wiki\/(.+)/;

  public constructor(linkUrl: URL | string) {
    super(linkUrl);

    const wikipediaLinkMatch = this.url.href.match(
      WikiLinkPreviewLoader.wikiUrlRegExp
    );

    if (!wikipediaLinkMatch) {
      throw new Error(`"${this.url.href}" is not Wikipedia url`);
    }

    const [, lang, articleId] = wikipediaLinkMatch;

    this.wikiApiUrl = new URL(
      `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${articleId}`
    );
  }

  public fetchContent(): Promise<WikiArticleData> {
    return fetch(this.wikiApiUrl).then((response) => response.json());
  }

  public get title(): Promise<string> {
    return this.linkContent.then((data) => data.title);
  }

  public get description(): Promise<string | undefined> {
    return this.linkContent.then((data) => data.extract);
  }

  public get image(): Promise<string | undefined> {
    return this.linkContent.then((data) => data.thumbnail?.source);
  }

  public get favicon(): Promise<string | undefined> {
    return new Promise((resolve) =>
      resolve('https://ru.wikipedia.org/static/favicon/wikipedia.ico')
    );
  }
}
