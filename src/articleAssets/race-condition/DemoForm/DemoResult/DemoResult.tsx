import clsx from 'clsx';
import type { FC } from 'react';

import { Button, Icon } from '@components/react';
import resetSvg from '@components/icons/delete.svg';

import Styles from './DemoResult.module.css';

export interface DemoResultProps {
  className?: string;
  data: string | undefined;
  onReset: () => void;
}

export const DemoResult: FC<DemoResultProps> = ({
  className,
  data,
  onReset
}) => {
  if (!data) {
    return null;
  }

  return (
    <div className={clsx(Styles.Layout, className)}>
      <div className={Styles.ContentLayout}>
        <div className={Styles.Title}>Результат</div>

        <div className={Styles.Data}>{data}</div>
      </div>

      <Button
        title='Сбросить'
        right={<Icon url={resetSvg.src} color='var(--color_accent-red)' />}
        onClick={onReset}
      />
    </div>
  );
};
