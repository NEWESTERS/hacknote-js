import clsx from "clsx";
import { type FC, type HTMLAttributes, memo } from "react";

import Styles from "./Icon.module.css";

export interface IconProps extends HTMLAttributes<HTMLElement> {
  size?: number;
  url: string;
  color?: string;
}

export const Icon: FC<IconProps> = memo(
  ({
    className,
    style,
    size = 24,
    url,
    color = "var(--color_text-white)",
    ...props
  }) => {
    return (
      <div
        className={clsx(Styles.Icon, className)}
        style={{
          "--size": `${size}px`,
          "--color": color,
          maskImage: `url(${url})`,
          WebkitMaskImage: `url(${url})`,
          ...style,
        }}
        {...props}
      />
    );
  }
);
