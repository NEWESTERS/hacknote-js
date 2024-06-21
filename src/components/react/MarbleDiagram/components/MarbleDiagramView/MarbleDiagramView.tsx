import type { FC } from 'react';
import clsx from 'clsx';

import { useMarbleSeriesIds } from '../../contexts';
import { MarbleSeriesView } from '../MarbleSeriesView';
import Styles from './MarbleDiagramView.module.css';

export interface MarbleDiagramViewProps {
  className?: string;
}

export const MarbleDiagramView: FC<MarbleDiagramViewProps> = ({
  className
}) => {
  const seriesIds = useMarbleSeriesIds();

  return (
    <div className={clsx(Styles.Layout, className)}>
      {seriesIds.map((seriesId) => (
        <MarbleSeriesView key={seriesId} id={seriesId} />
      ))}
    </div>
  );
};
