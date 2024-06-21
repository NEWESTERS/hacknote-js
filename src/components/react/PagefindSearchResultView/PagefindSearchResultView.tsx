import type { MouseEventHandler, ReactElement } from 'react';
import clsx from 'clsx';

import type { PagefindSearchResult } from '@utils/pagefind';

import { PagefindSubResultView } from '../PagefindSubResultView';
import { usePageFindResultQuery } from './usePageFindResultQuery';
import { PagefindSearchResultSkeleton } from './PagefindSearchResultSkeleton';
import Styles from './PagefindSearchResultView.module.css';

export interface PagefindSearchResultViewProps {
  className?: string;
  data: PagefindSearchResult;
  onLinkClick?: MouseEventHandler<HTMLAnchorElement>;
  searchId: string;
}

export const PagefindSearchResultView = ({
  className,
  data,
  onLinkClick,
  searchId
}: PagefindSearchResultViewProps): ReactElement => {
  const itemQuery = usePageFindResultQuery(data, searchId);

  if (!itemQuery.data) {
    return <PagefindSearchResultSkeleton className={className} />;
  }

  return (
    <div className={clsx(Styles.Container, className)}>
      <div className={Styles.Left}>
        <a
          href={itemQuery.data.url}
          className={Styles.Title}
          onClick={onLinkClick}
        >
          {itemQuery.data.meta.title}
        </a>

        <ul className={Styles.SubResults}>
          {itemQuery.data.sub_results.map((subResult) => (
            <li key={subResult.url}>
              <PagefindSubResultView
                data={subResult}
                onLinkClick={onLinkClick}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className={Styles.Right}>
        <img src={itemQuery.data.meta.image} className={Styles.Image} />
      </div>
    </div>
  );
};
