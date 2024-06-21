import type { ReactNode } from 'react';

export class MarblePoint {
  public readonly id: string;
  public readonly time: number;
  public readonly content: ReactNode;
  public readonly title: string;

  public constructor(
    id: string,
    time: number,
    content: ReactNode,
    title: string
  ) {
    this.id = id;
    this.time = time;
    this.content = content;
    this.title = title;
  }
}
