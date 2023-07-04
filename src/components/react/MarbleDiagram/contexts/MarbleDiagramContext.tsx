import { createContextWithUtils } from "@utils/react";
import { useMemo } from "react";

import type { MarbleDiagram, MarblePoint, MarbleSeries } from "../entities";

export const { Provider: MarbleDiagramProvider, useContext: useMarbleDiagram } =
  createContextWithUtils<MarbleDiagram>("MarbleDiagram");

export function useMarblePoint(pointId: string): MarblePoint {
  const diagram = useMarbleDiagram();

  const pointData = diagram.getPoint(pointId);

  if (!pointData) {
    throw new Error(`Marble point with id ${pointId} not found`);
  }

  return pointData;
}

export function useMarbleSeries(seriesId: string): MarbleSeries {
  const diagram = useMarbleDiagram();

  const pointData = diagram.getSeries(seriesId);

  if (!pointData) {
    throw new Error(`Marble series with id ${seriesId} not found`);
  }

  return pointData;
}

export function useMarbleSeriesIds(): string[] {
  const diagram = useMarbleDiagram();

  return diagram.seriesIds;
}

export function useMarbleSeriesPointIds(seriesId: string): string[] {
  const diagram = useMarbleDiagram();

  const pointIds = diagram.getSeriesPointIds(seriesId);

  if (!pointIds) {
    throw new Error(`Marble series with id ${seriesId} not found`);
  }

  return pointIds;
}

export function useMarblePointIds(): string[] {
  const diagram = useMarbleDiagram();

  return useMemo(() => diagram.pointIds, [diagram]);
}
