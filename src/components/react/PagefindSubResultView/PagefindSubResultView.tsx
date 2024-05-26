import type { MouseEventHandler, ReactElement } from 'react';
import clsx from 'clsx';

import type { PagefindSubResult } from '@utils/pagefind';

import Styles from './PagefindSubResultView.module.css';

export interface PagefindSubResultViewProps {
  className?: string;
  data: PagefindSubResult;
  onLinkClick?: MouseEventHandler<HTMLAnchorElement>;
}

export const PagefindSubResultView = ({
  className,
  data,
  onLinkClick
}: PagefindSubResultViewProps): ReactElement => {
  return (
    <div className={clsx(Styles.Container, className)}>
      <a href={data.url} className={Styles.Title} onClick={onLinkClick}>
        {data.title}
      </a>

      <p
        dangerouslySetInnerHTML={{ __html: `...${data.excerpt}...` }}
        className={Styles.Excerpt}
      />
    </div>
  );
};
