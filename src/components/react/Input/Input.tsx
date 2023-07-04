import type {
  ChangeEventHandler,
  FC,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { clsx } from "clsx";

import Styles from "./Input.module.css";

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
  ...props
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event);
    onValueChange?.(event.target.value);
  };

  return (
    <div className={clsx(Styles.InputBox, className)} style={style}>
      {left}

      <input
        className={Styles.Input}
        type="text"
        onChange={handleChange}
        {...props}
      />

      {right}
    </div>
  );
};
