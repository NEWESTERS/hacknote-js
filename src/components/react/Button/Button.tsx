import clsx from "clsx";
import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

import Styles from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  left?: ReactNode;
  right?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  title,
  left,
  right,
  type = "button",
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={clsx(Styles.Button, className)}
      title={title}
    >
      {children ?? (
        <>
          {left}
          {title}
          {right}
        </>
      )}
    </button>
  );
};
