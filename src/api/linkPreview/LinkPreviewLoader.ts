export interface LinkPreviewData {
  title: string;
  description: string;
  image?: string;
}

export abstract class LinkPreviewLoader<C> {
  public url: URL;

  public constructor(linkUrl: URL | string) {
    this.url = new URL(linkUrl);
  }

  public abstract fetchContent(): Promise<C>;

  public abstract title: Promise<string | undefined>;

  public abstract description: Promise<string | undefined>;

  public abstract image: Promise<string | undefined>;

  public abstract favicon: Promise<string | undefined>;

  private _linkContent: Promise<C> | undefined;

  public get baseUrl(): string {
    return `${this.url.protocol}//${this.url.host}`;
  }

  public get linkContent(): Promise<C> {
    if (!this._linkContent) {
      this._linkContent = this.fetchContent();
    }

    return this._linkContent;
  }

  public get linkPreviewData(): Promise<LinkPreviewData | undefined> {
    return Promise.all([this.title, this.description, this.image])
      .then(([title, description, image]) => {
        if (description && title) {
          return {
            title,
            description,
            image,
          };
        }
      })
      .catch(() => undefined);
  }
}
