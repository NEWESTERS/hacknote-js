export class TimeRange {
  public readonly from: number;
  public readonly to: number;

  public constructor(from: number, to: number) {
    this.from = from;
    this.to = to;
  }

  public clamp(timeRange: TimeRange): TimeRange {
    return new TimeRange(
      Math.max(this.from, timeRange.from),
      Math.min(this.to, timeRange.to)
    );
  }

  public get duration(): number {
    return this.to - this.from;
  }

  public getProgress(currentTime: number): number {
    if (currentTime <= this.from) {
      return 0;
    }

    if (currentTime >= this.to) {
      return 1;
    }

    return (currentTime - this.from) / (this.to - this.from);
  }
}
