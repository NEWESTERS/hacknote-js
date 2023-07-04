import type { TimeRange } from "./TimeRange";

export class MarbleSeries {
  public readonly id: string;
  public readonly title: string;
  public readonly timeRange: TimeRange;

  public constructor(id: string, timeRange: TimeRange, title: string) {
    this.id = id;
    this.timeRange = timeRange;
    this.title = title;
  }
}
