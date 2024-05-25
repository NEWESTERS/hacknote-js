import clsx from "clsx";
import type { ReactElement } from "react";

import Styles from "./Skeleton.module.css";

export interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps): ReactElement => {
  return <div className={clsx(Styles.Skeleton, className)} />;
};
