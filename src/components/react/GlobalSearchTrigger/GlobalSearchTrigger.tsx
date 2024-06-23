import type { ButtonHTMLAttributes, FC } from "react";
import clsx from "clsx";

import { Icon } from "../Icon";
import searchIcon from "../../icons/search.svg";
import Styles from "./GlobalSearchTrigger.module.css";

export interface GlobalSearchTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {}

export const GlobalSearchTrigger: FC<GlobalSearchTriggerProps> = ({
  className,
  style,
  ...props
}) => {
  return (
    <div className={clsx(Styles.Layout, className)} style={style}>
      <button className={Styles.Button} {...props}>
        <Icon url={searchIcon.src} />

        <span className={Styles.Text}>Поиск</span>

        <span className={Styles.Shortcut}>/</span>
      </button>
    </div>
  );
};
