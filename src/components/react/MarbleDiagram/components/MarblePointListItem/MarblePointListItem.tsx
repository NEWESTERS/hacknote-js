import clsx from 'clsx';
import type { FC } from 'react';

import { formatTime } from '@utils/number';

import {
  useCurrentTime,
  useMarblePoint,
  useSelectedPointId,
  useSetCurrentTime
} from '../../contexts';
import Styles from './MarblePointListItem.module.css';

export interface MarblePointListItemProps {
  className?: string;
  id: string;
}

export const MarblePointListItem: FC<MarblePointListItemProps> = ({
  className,
  id
}) => {
  const point = useMarblePoint(id);
  const currentTime = useCurrentTime();
  const setCurrentTime = useSetCurrentTime();

  const isReached = currentTime >= point.time;

  const isSelected = useSelectedPointId() === id;

  const handleClick = (): void => {
    setCurrentTime(point.time);
  };

  return (
    <div
      className={clsx(Styles.Layout, className)}
      data-reached={isReached}
      data-selected={isSelected}
      onClick={handleClick}
    >
      <div className={Styles.ShortInfo}>
        {point.content}

        <span className={Styles.Time}>({formatTime(point.time)})</span>
      </div>

      <span className={Styles.Title}>{point.title}</span>
    </div>
  );
};
