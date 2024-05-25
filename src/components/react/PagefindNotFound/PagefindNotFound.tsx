import type { ReactElement } from "react";
import clsx from "clsx";

import { Icon } from "../Icon";
import sadIcon from "../../icons/sad.svg";
import Styles from "./PagefindNotFound.module.css";

export interface PagefindNotFoundProps {
  className?: string;
  searchString: string;
}

export const PagefindNotFound = ({
  className,
  searchString,
}: PagefindNotFoundProps): ReactElement => {
  return (
    <div className={clsx(Styles.Container, className)}>
      <Icon url={sadIcon.src} color="var(--color_accent-yellow)" size={128} />

      <p className={Styles.Text}>
        По запросу "{searchString}" ничего не найдено, но вы можете задать
        интересующий вас вопрос{" "}
        <a className={Styles.Link} href="https://t.me/+HGU6KdORQTc5YTEy">
          в Telegram-чате
        </a>
        .
      </p>
    </div>
  );
};
