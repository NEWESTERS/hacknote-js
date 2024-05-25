import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, timeout: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, timeout]);

  return debouncedValue;
}
