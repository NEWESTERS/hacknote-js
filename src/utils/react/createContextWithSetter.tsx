import { createContext, type FC, type ReactNode, useContext } from "react";

export interface ContextWithSetter<T> {
  Provider: FC<ContextWithSetterProviderProps<T>>;
  useValue: () => T;
  useContext: () => { value: T; set: (value: T) => void };
  useSetter: () => (value: T) => void;
}

const None = Symbol("None");

export interface ContextWithSetterProviderProps<T> {
  value: T;
  onValueChange: (value: T) => void;
  children: ReactNode;
}

export function createContextWithSetter<T>(
  title: string
): ContextWithSetter<T> {
  const ValueContext = createContext<T | typeof None>(None);
  const SetterContext = createContext<((value: T) => void) | typeof None>(None);

  const useValue = () => {
    const value = useContext(ValueContext);

    if (value === None) {
      throw new Error(`Provider for context "${title}" not found`);
    }

    return value;
  };

  const useSetter = () => {
    const setter = useContext(SetterContext);

    if (setter === None) {
      throw new Error(`Provider for context "${title}" not found`);
    }

    return setter;
  };

  return {
    Provider: ({
      value,
      onValueChange,
      children,
    }: ContextWithSetterProviderProps<T>) => {
      return (
        <ValueContext.Provider value={value}>
          <SetterContext.Provider value={onValueChange}>
            {children}
          </SetterContext.Provider>
        </ValueContext.Provider>
      );
    },
    useValue,
    useSetter,
    useContext: () => ({
      value: useValue(),
      set: useSetter(),
    }),
  };
}
