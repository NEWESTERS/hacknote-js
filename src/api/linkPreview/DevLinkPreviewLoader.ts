import { LinkPreviewLoader } from "./LinkPreviewLoader";

export class DevLinkPreviewLoader extends LinkPreviewLoader<void> {
  public fetchContent(): Promise<void> {
    return Promise.resolve();
  }

  public title: Promise<string | undefined> = Promise.resolve("Hacknote.js");

  public description: Promise<string | undefined> = Promise.resolve(
    "Lorem ipsum dolor sit amet"
  );

  public image: Promise<string | undefined> = Promise.resolve(
    "/hacknote-js/images/logo.png"
  );

  public get favicon(): Promise<string | undefined> {
    throw new Error("Method not implemented.");
  }
}
