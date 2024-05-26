import { useEffect, type RefObject } from 'react';

export function useAutoFocus(
  ref: RefObject<HTMLInputElement>,
  isAutofocus: boolean = true
): void {
  useEffect(() => {
    if (ref.current && isAutofocus) {
      ref.current.focus();
    }
  }, [ref, isAutofocus]);
}
