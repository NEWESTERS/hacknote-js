import clsx from 'clsx';
import type { FC } from 'react';

import { MarbleDiagramView } from '../MarbleDiagramView';
import { MarblePointList } from '../MarblePointList';
import { MarbleTimeline } from '../MarbleTimeline';
import Styles from './MarblePlayer.module.css';

export interface MarblePlayerProps {
  className?: string;
}

export const MarblePlayer: FC<MarblePlayerProps> = ({ className }) => {
  return (
    <div className={clsx(Styles.Layout, className)}>
      <MarbleDiagramView />

      <MarblePointList />

      <MarbleTimeline />
    </div>
  );
};
