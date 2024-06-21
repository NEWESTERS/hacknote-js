import { useState, type MouseEventHandler, type ReactElement } from 'react';
import clsx from 'clsx';

import { useDebouncedValue } from '@utils/react';

import { Input } from '../Input';
import { PagefindSearch } from '../PagefindSearch';
import { Icon } from '../Icon';
import searchIcon from '../../icons/search.svg';
import Styles from './PagefindSearchField.module.css';

export interface PagefindSearchFieldProps {
  className?: string;
  onLinkClick?: MouseEventHandler<HTMLAnchorElement>;
}

export const PagefindSearchField = ({
  className,
  onLinkClick
}: PagefindSearchFieldProps): ReactElement => {
  const [searchString, setSearchString] = useState('');

  const debouncedSearchString = useDebouncedValue(searchString, 300);

  return (
    <div className={clsx(Styles.Container, className)}>
      <Input
        className={Styles.Field}
        value={searchString}
        onValueChange={setSearchString}
        left={<Icon url={searchIcon.src} />}
      />

      {debouncedSearchString !== '' && (
        <PagefindSearch
          className={Styles.Results}
          searchString={debouncedSearchString}
          onLinkClick={onLinkClick}
        />
      )}
    </div>
  );
};
