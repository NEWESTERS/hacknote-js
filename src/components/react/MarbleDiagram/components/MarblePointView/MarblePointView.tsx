import clsx from 'clsx';
import type { FC } from 'react';

import { useCurrentTime, useMarblePoint } from '../../contexts';
import { useSelectPoint } from '../../contexts/PointSelectionContext';
import Styles from './MarblePointView.module.css';

export interface MarblePointViewProps {
  className?: string;
  id: string;
}

export const MarblePointView: FC<MarblePointViewProps> = ({
  className,
  id
}) => {
  const currentTime = useCurrentTime();
  const { time, content, title } = useMarblePoint(id);
  const selectPoint = useSelectPoint();

  const handleMouseOver = (): void => {
    selectPoint(id);
  };

  const handleMouseOut = (): void => {
    selectPoint(undefined);
  };

  return (
    <div
      className={clsx(className)}
      title={title}
      style={{
        '--point-time': time
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className={Styles.MarblePoint} data-reached={currentTime >= time}>
        {content}
      </div>
    </div>
  );
};
