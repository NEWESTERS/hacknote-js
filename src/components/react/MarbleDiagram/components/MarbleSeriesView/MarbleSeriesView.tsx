import clsx from 'clsx';
import type { FC } from 'react';

import {
  useCurrentTime,
  useMarbleSeries,
  useMarbleSeriesPointIds,
  useTimeRange
} from '../../contexts';
import { MarblePointView } from '../MarblePointView';
import Styles from './MarbleSeriesView.module.css';

export interface MarbleSeriesViewProps {
  className?: string;
  id: string;
}

export const MarbleSeriesView: FC<MarbleSeriesViewProps> = ({
  className,
  id
}) => {
  const diagramTimeRange = useTimeRange();
  const currentTime = useCurrentTime();
  const series = useMarbleSeries(id);
  const pointIds = useMarbleSeriesPointIds(id);

  const timeRange = series.timeRange.clamp(diagramTimeRange);

  const diagramDuration = diagramTimeRange.duration;
  const seriesDuration = timeRange.duration;

  const isStarted = currentTime >= timeRange.from;

  return (
    <div
      className={clsx(Styles.Layout, className)}
      style={{
        '--diagram-duration': diagramDuration,
        '--series-duration': seriesDuration,
        '--series-start': timeRange.from,
        '--series-progress': timeRange.getProgress(currentTime)
      }}
      data-started={isStarted}
    >
      <div className={Styles.Title}>{series.title}</div>

      <div className={Styles.Timeline}>
        <div className={Styles.Series}>
          <div className={Styles.Fill} />
        </div>

        {pointIds.map((pointId) => (
          <MarblePointView
            key={pointId}
            id={pointId}
            className={Styles.Point}
          />
        ))}
      </div>
    </div>
  );
};
