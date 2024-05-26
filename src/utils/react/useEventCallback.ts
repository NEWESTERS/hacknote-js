import { useCallback, useEffect, useRef } from 'react';

export function useEventCallback<A extends unknown[], R>(
  callback: (...arguments_: A) => R
): (...arguments_: A) => R {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback((...arguments_) => callbackRef.current(...arguments_), []);
}
