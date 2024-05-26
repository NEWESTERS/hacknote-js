import type { ChangeEventHandler, FC, InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

import Styles from './Timeline.module.css';

export interface TimelineProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onValueChange?: (current: number) => void;
}

export const Timeline: FC<TimelineProps> = ({
  className,
  onValueChange,
  onChange,
  ...props
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event);
    onValueChange?.(event.target.valueAsNumber);
  };

  return (
    <div className={Styles.Layout}>
      <input
        type='range'
        className={clsx(Styles.Range, className)}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};
