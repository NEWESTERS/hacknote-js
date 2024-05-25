import {
  forwardRef,
  type ChangeEventHandler,
  type FC,
  type InputHTMLAttributes,
  type ReactNode,
  useRef,
} from "react";
import { clsx } from "clsx";

import Styles from "./Input.module.css";
import { useAutoFocus } from "./useAutoFocus";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: string) => void;
  left?: ReactNode;
  right?: ReactNode;
}

export const Input: FC<InputProps> = ({
  className,
  style,
  onValueChange,
  onChange,
  left,
  right,
  autoFocus = false,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useAutoFocus(ref, autoFocus);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event);
    onValueChange?.(event.target.value);
  };

  return (
    <div className={clsx(Styles.InputBox, className)} style={style}>
      {left}

      <input
        ref={ref}
        className={Styles.Input}
        type="text"
        onChange={handleChange}
        {...props}
      />

      {right}
    </div>
  );
};
