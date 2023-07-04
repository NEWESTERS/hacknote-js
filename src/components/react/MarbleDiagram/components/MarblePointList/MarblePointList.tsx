import clsx from "clsx";
import type { FC } from "react";

import { useMarblePointIds } from "../../contexts";
import { MarblePointListItem } from "../MarblePointListItem";
import Styles from "./MarblePointList.module.css";

export interface MarblePointListProps {
  className?: string;
}

export const MarblePointList: FC<MarblePointListProps> = ({ className }) => {
  const pointIds = useMarblePointIds();

  return (
    <div className={clsx(Styles.Layout, className)}>
      {pointIds.map((id) => (
        <MarblePointListItem key={id} id={id} />
      ))}
    </div>
  );
};
