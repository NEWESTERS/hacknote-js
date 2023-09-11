import { type FC, useEffect, useState } from "react";

import { Slider } from "../../../Slider";
import {
  useCurrentTime,
  useSetCurrentTime,
  useTimeRange,
} from "../../contexts";
import {
  PlaybackControls,
  type PlaybackState,
} from "../../../PlaybackControls";
import Styles from "./MarbleTimeline.module.css";
import { play } from "./play";

export interface MarbleTimelineProps {
  className?: string;
}

export const MarbleTimeline: FC<MarbleTimelineProps> = ({ className }) => {
  const currentTime = useCurrentTime();
  const setTime = useSetCurrentTime();
  const timeRange = useTimeRange();

  const isFinished = currentTime === timeRange.to;

  const [playbackState, setPlaybackState] = useState<PlaybackState>("paused");

  useEffect(() => {
    if (playbackState === "playing") {
      return play({
        onIncrement: setTime,
        targetValue: timeRange.to,
        startValue: currentTime,
        speed: 1,
      });
    }
  }, [playbackState, setTime, timeRange]);

  useEffect(() => {
    if (isFinished) {
      setPlaybackState("finished");
    }
  }, [isFinished]);

  const handlePlay = () => {
    setPlaybackState("playing");
  };

  const handlePause = () => {
    setPlaybackState("paused");
  };

  const handleReset = () => {
    setTime(timeRange.from);
    setPlaybackState("playing");
  };

  const handleSkip = () => {
    setTime(timeRange.to);
  };

  const handleManualChange = (value: number) => {
    setTime(value);
    setPlaybackState("paused");
  };

  return (
    <div className={Styles.Layout}>
      <Slider
        className={className}
        value={currentTime}
        onValueChange={handleManualChange}
        min={timeRange.from}
        max={timeRange.to}
      />

      <PlaybackControls
        state={playbackState}
        onPlay={handlePlay}
        onPause={handlePause}
        onReset={handleReset}
        onSkip={handleSkip}
      />
    </div>
  );
};
