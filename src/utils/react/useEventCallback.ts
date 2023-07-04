import { useCallback, useEffect, useRef } from "react";

export function useEventCallback<A extends any[], R>(
  callback: (...args: A) => R
): (...args: A) => R {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback((...args) => callbackRef.current(...args), []);
}
