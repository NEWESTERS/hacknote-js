import {
  useEffect,
  useRef,
  type ReactElement,
  type ReactNode,
  type RefObject
} from 'react';
import clsx from 'clsx';

import { useEventCallback } from '@utils/react';

import Styles from './ModalDialog.module.css';

export interface ModalDialogProps {
  className?: string;
  open: boolean;
  children: ReactNode;
  onClickOutside?: () => void;
  onClose?: () => void;
}

function useToggleDialog(
  ref: RefObject<HTMLDialogElement>,
  open: boolean
): void {
  useEffect(() => {
    const dialog = ref.current;

    if (!dialog) {
      return;
    }

    if (open) {
      dialog.showModal();
      document.body.style.setProperty('overflow', 'hidden');
    }

    return () => {
      dialog.close();
      document.body.style.removeProperty('overflow');
    };
  }, [open, ref]);
}

export const ModalDialog = ({
  className,
  open,
  children,
  onClickOutside,
  onClose
}: ModalDialogProps): ReactElement => {
  const ref = useRef<HTMLDialogElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);

  useToggleDialog(ref, open);

  const handleClickOutside = useEventCallback(() => onClickOutside?.());

  useEffect(() => {
    const content = contentRef.current;

    if (!content || !open) {
      return;
    }

    const handleClick = (event: MouseEvent): void => {
      if (!content.contains(event.target as Node)) {
        handleClickOutside();
      }
    };

    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, [handleClickOutside, open]);

  return (
    <dialog
      ref={ref}
      className={clsx(Styles.ModalDialog, className)}
      onClose={onClose}
    >
      <div ref={contentRef} className={Styles.Content}>
        {children}
      </div>
    </dialog>
  );
};
