import clsx from "clsx";
import type { AnchorHTMLAttributes, FC } from "react";

import Styles from "./BaseLink.module.css";

export interface BaseLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export const BaseLink: FC<BaseLinkProps> = ({
  className,
  target = "_blank",
  rel = "noopener noreferrer",
  ...props
}) => {
  return (
    <a
      {...props}
      className={clsx(className, Styles.Link)}
      target={target}
      rel={rel}
    />
  );
};
