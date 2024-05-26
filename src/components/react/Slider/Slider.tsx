import clsx from 'clsx';
import { type FC, useEffect, useRef, useState } from 'react';

import { clamp } from '@utils/number';
import { useEventCallback } from '@utils/react';

import Styles from './Slider.module.css';
import { subscribeToSlider } from './subscribeToSlider';

export interface SliderProps {
  className?: string;
  value: number;
  min: number;
  max: number;
  onValueChange: (value: number) => void;
}

export const Slider: FC<SliderProps> = ({
  className,
  value,
  max,
  min,
  onValueChange
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  const handleValueChange = useEventCallback(onValueChange);

  useEffect(() => {
    const { current: element } = ref;

    if (!element) {
      return;
    }

    return subscribeToSlider(element, {
      onStart: () => setIsActive(true),
      onChange: ({ relativeValue }) =>
        handleValueChange(clamp((max - min) * relativeValue + min, min, max)),
      onEnd: () => setIsActive(false)
    });
  }, [handleValueChange, min, max]);

  return (
    <div
      ref={ref}
      className={clsx(Styles.Layout, className)}
      style={{
        '--progress': (value - min) / (max - min)
      }}
      data-active={isActive}
    >
      <div className={Styles.Track}>
        <div className={Styles.Filled} />
      </div>

      <div className={Styles.Thumb} />
    </div>
  );
};
