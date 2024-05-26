import { type FC, type ReactNode, useMemo } from 'react';

import {
  CurrentTimeProvider,
  MarbleDiagramProvider,
  PointSelectionProvider,
  TimeRangeProvider
} from './contexts';
import { MarbleDiagram, TimeRange } from './entities';

export interface MarbleConfigProviderProps {
  diagram: MarbleDiagram;
  children: ReactNode;
  startTime?: number;
  endTime?: number;
  initialTime?: number;
}

export const MarbleConfigProvider: FC<MarbleConfigProviderProps> = ({
  diagram,
  startTime = diagram.minTime,
  endTime = diagram.maxTime,
  initialTime = endTime,
  children
}) => {
  return (
    <MarbleDiagramProvider value={diagram}>
      <TimeRangeProvider
        value={useMemo(
          () => new TimeRange(startTime, endTime),
          [startTime, endTime]
        )}
      >
        <CurrentTimeProvider initialTime={initialTime}>
          <PointSelectionProvider>{children}</PointSelectionProvider>
        </CurrentTimeProvider>
      </TimeRangeProvider>
    </MarbleDiagramProvider>
  );
};
