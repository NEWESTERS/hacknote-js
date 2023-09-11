import { Icon } from "@components/react/Icon";
import clsx from "clsx";
import type { FC } from "react";

import playSvg from "../../icons/play.svg";
import pauseSvg from "../../icons/pause.svg";
import resetSvg from "../../icons/reset.svg";
import playSkipForwardSvg from "../../icons/play-skip-forward.svg";
import Styles from "./PlaybackControls.module.css";

export type PlaybackState = "playing" | "paused" | "finished";

const playButtonIconUrl: Record<PlaybackState, string> = {
  playing: pauseSvg.src,
  paused: playSvg.src,
  finished: resetSvg.src,
};

export interface PlaybackControlsProps {
  className?: string;
  state: PlaybackState;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export const PlaybackControls: FC<PlaybackControlsProps> = ({
  className,
  state,
  onPlay,
  onPause,
  onReset,
  onSkip,
}) => {
  const handleMainAction = () => {
    switch (state) {
      case "paused":
        onPlay();
        break;

      case "playing":
        onPause();
        break;

      case "finished":
        onReset();
        break;
    }
  };

  return (
    <div className={clsx(Styles.Layout, className)}>
      <button className={Styles.Button} onClick={handleMainAction}>
        <Icon
          color="var(--color_text-white)"
          url={playButtonIconUrl[state]}
          size={32}
        />
      </button>

      <button className={Styles.Button} onClick={onSkip}>
        <Icon color="var(--color_text-white)" url={playSkipForwardSvg.src} />
      </button>
    </div>
  );
};
