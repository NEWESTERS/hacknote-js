import clsx from "clsx";
import type { FC } from "react";

import winnerSvg from "@components/icons/winner.svg";
import Styles from "./RaceResultView.module.css";
import { Icon } from "@components/react";

export interface RaceResult {
  startTime: number;
  finishes: Array<{
    title: string;
    time: number;
    isWinner: boolean;
  }>;
}

export interface RaceResultViewProps {
  className?: string;
  result: RaceResult;
}

export const RaceResultView: FC<RaceResultViewProps> = ({
  className,
  result,
}) => {
  const max = Math.max(...result.finishes.map((item) => item.time));

  return (
    <div
      className={clsx(Styles.Layout, className)}
      style={{
        "--max": max,
      }}
    >
      {result.finishes.map((item) => (
        <div
          key={item.title}
          className={Styles.Item}
          style={{
            "--value": item.time,
          }}
          data-winner={item.isWinner}
        >
          <div>{item.title}</div>

          <div className={Styles.ProgressBar}>
            <div className={Styles.ProgressBarFill} />
          </div>

          <Icon
            className={Styles.WinnerIcon}
            url={winnerSvg}
            color="var(--color_accent-yellow)"
            size={16}
          />
        </div>
      ))}
    </div>
  );
};
