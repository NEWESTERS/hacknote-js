import { Icon } from "@components/react";
import clsx from "clsx";
import type { FC } from "react";

import starSvg from "@components/icons/star.svg";
import Styles from "./RepoCard.module.css";

export interface RepoCardProps {
  className?: string;
  author: string;
  name: string;
  starCount: number;
  url: string;
  topics: string[];
}

export const RepoCard: FC<RepoCardProps> = ({
  className,
  author,
  name,
  starCount,
  url,
  topics,
}) => {
  return (
    <a
      className={clsx(Styles.Card, className)}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={Styles.Main}>
        <div className={Styles.Author}>{author}</div>

        <div className={Styles.Title}>{name}</div>
      </div>

      <div className={Styles.TopicList}>
        {topics.slice(0, 3).map((topic, index) => (
          <div key={index} className={Styles.Topic}>
            {topic}
          </div>
        ))}
      </div>

      <div className={Styles.StarsCount}>
        <Icon url={starSvg.src} color="var(--color_accent-yellow)" />

        <span className={Styles.Count}>{starCount}</span>
      </div>
    </a>
  );
};
