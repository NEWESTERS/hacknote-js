import { createContext, type FC, type ProviderProps, useContext } from 'react';

export interface ContextWithUtils<T> {
  Provider: FC<ProviderProps<T>>;
  useContext: () => T;
}

const None = Symbol('None');

export function createContextWithUtils<T>(title: string): ContextWithUtils<T> {
  const Context = createContext<T | typeof None>(None);

  return {
    Provider: Context.Provider as FC<ProviderProps<T>>,
    useContext: () => {
      const context = useContext(Context);

      if (context === None) {
        throw new Error(`Provider for context "${title}" not found`);
      }

      return context;
    }
  };
}
