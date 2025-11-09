import type { CSSProperties, FC } from "react";
import clsx from "clsx";

import Styles from "./LinkPreview.module.css";

export interface LinkPreviewProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  title: string;
  description: string;
  sourceUrl?: string;
  thumbnailUrl?: string;
}

export const LinkPreview: FC<LinkPreviewProps> = ({
  id,
  className,
  style,
  title,
  description,
  sourceUrl,
  thumbnailUrl,
}) => {
  return (
    <article id={id} className={clsx(Styles.Layout, className)} style={style}>
      <div className={Styles.Content}>
        <h4 className={Styles.Title}>{title}</h4>
        <p className={Styles.Description}>{description}</p>
        {sourceUrl && (
          <a className={Styles.Source} href={new URL(sourceUrl).host}></a>
        )}
      </div>

      {thumbnailUrl && <img className={Styles.Thumbnail} src={thumbnailUrl} />}
    </article>
  );
};
