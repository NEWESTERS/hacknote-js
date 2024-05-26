import type { MouseEventHandler, ReactElement, ReactNode } from "react";
import clsx from "clsx";

import {
  PagefindSearchResultView,
  PagefindSearchResultSkeleton,
} from "../PagefindSearchResultView";
import { PagefindNotFound } from "../PagefindNotFound";
import { usePageFindQuery } from "./usePageFindQuery";
import Styles from "./PagefindSearch.module.css";

export interface PagefindSearchProps {
  className?: string;
  searchString: string;
  onLinkClick?: MouseEventHandler<HTMLAnchorElement>;
}

export const PagefindSearch = ({
  className,
  searchString,
  onLinkClick,
}: PagefindSearchProps): ReactElement | null => {
  const pagefindQuery = usePageFindQuery(searchString);

  const renderContent = (): ReactNode => {
    if (!pagefindQuery.data) {
      return pagefindQuery.isFetching ? (
        <>
          <PagefindSearchResultSkeleton />
        </>
      ) : null;
    }

    if (pagefindQuery.data.results.length === 0) {
      return <PagefindNotFound searchString={searchString} />;
    }

    return pagefindQuery.data.results.map((result) => (
      <li key={result.id}>
        <PagefindSearchResultView
          data={result}
          onLinkClick={onLinkClick}
          searchId={searchString}
        />
      </li>
    ));
  };

  return (
    <div className={clsx(Styles.Container, className)}>
      <ul className={Styles.List}>{renderContent()}</ul>
    </div>
  );
};
