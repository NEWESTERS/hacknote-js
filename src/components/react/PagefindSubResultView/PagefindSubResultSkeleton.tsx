import clsx from 'clsx';
import type { ReactElement } from 'react';

import { Skeleton } from '../Skeleton';
import Styles from './PagefindSubResultView.module.css';

export interface PagefindSubResultSkeletonProps {
  className?: string;
}

export const PagefindSubResultSkeleton = ({
  className
}: PagefindSubResultSkeletonProps): ReactElement => {
  return (
    <Skeleton className={clsx(Styles.Container, Styles.Skeleton, className)} />
  );
};
