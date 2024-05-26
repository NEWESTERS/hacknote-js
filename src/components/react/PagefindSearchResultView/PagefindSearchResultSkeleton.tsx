import clsx from 'clsx';
import type { ReactElement } from 'react';

import { Skeleton } from '../Skeleton';
import { PagefindSubResultSkeleton } from '../PagefindSubResultView';
import Styles from './PagefindSearchResultView.module.css';

interface PagefindSearchResultSkeletonProps {
  className?: string;
}

export const PagefindSearchResultSkeleton = ({
  className
}: PagefindSearchResultSkeletonProps): ReactElement => {
  return (
    <div className={clsx(Styles.Container, Styles.Skeleton, className)}>
      <div className={Styles.Left}>
        <Skeleton className={Styles.Title} />

        <ul className={Styles.SubResults}>
          <li>
            <PagefindSubResultSkeleton />
          </li>

          <li>
            <PagefindSubResultSkeleton />
          </li>
        </ul>
      </div>

      <div className={Styles.Right}>
        <Skeleton className={Styles.Image} />
      </div>
    </div>
  );
};
