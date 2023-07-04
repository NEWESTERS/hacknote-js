import type { ReactNode } from "react";

import { MarblePoint } from "./MarblePoint";
import { MarbleSeries } from "./MarbleSeries";
import { TimeRange } from "./TimeRange";

export interface MarbleDiagramData {
  series: Array<{
    title: string;
    startTime: number;
    endTime: number;
    points?: Array<{
      title: string;
      content: ReactNode;
      time: number;
    }>;
  }>;
}

export class MarbleDiagram {
  public constructor(
    private readonly _series: Record<string, MarbleSeries>,
    public readonly seriesIds: string[],
    private readonly _points: Record<string, MarblePoint>,
    private readonly _seriesPointIds: Record<string, string[]>
  ) {}

  public getSeries(seriesId: string): MarbleSeries | undefined {
    return this._series[seriesId];
  }

  public getPoint(pointId: string): MarblePoint | undefined {
    return this._points[pointId];
  }

  public getSeriesPointIds(seriesId: string): string[] | undefined {
    return this._seriesPointIds[seriesId];
  }

  public static from(data: MarbleDiagramData): MarbleDiagram {
    const points: Record<string, MarblePoint> = {};
    const series: Record<string, MarbleSeries> = {};
    const seriesIds: string[] = [];
    const seriesPointIds: Record<string, string[]> = {};

    let pointCounter = 0;
    const getPointId = (): string => `point-${++pointCounter}`;
    let seriesCounter = 0;
    const getSeriesId = (): string => `series-${++seriesCounter}`;

    data.series.forEach((seriesData) => {
      const currentSeries = new MarbleSeries(
        getSeriesId(),
        new TimeRange(seriesData.startTime, seriesData.endTime),
        seriesData.title
      );

      series[currentSeries.id] = currentSeries;

      seriesIds.push(currentSeries.id);

      seriesPointIds[currentSeries.id] = [];

      seriesData.points &&
        seriesData.points.forEach((pointData) => {
          const currentPoint = new MarblePoint(
            getPointId(),
            pointData.time,
            pointData.content,
            pointData.title
          );

          points[currentPoint.id] = currentPoint;

          seriesPointIds[currentSeries.id].push(currentPoint.id);
        });
    });

    return new MarbleDiagram(series, seriesIds, points, seriesPointIds);
  }

  public get minTime(): number {
    let minTime = 0;

    Object.values(this._series).forEach(({ timeRange }) => {
      minTime = Math.min(minTime, timeRange.from);
    });

    return minTime;
  }

  public get maxTime(): number {
    let maxTime = 0;

    Object.values(this._series).forEach(({ timeRange }) => {
      maxTime = Math.max(maxTime, timeRange.to);
    });

    return maxTime;
  }

  public get pointIds(): string[] {
    return Object.values(this._points)
      .sort((a, b) => (a.time < b.time ? -1 : 1))
      .map(({ id }) => id);
  }
}
