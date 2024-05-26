import { type FC, type ReactNode, useState } from "react";

import { createContextWithSetter } from "@utils/react";

const Context = createContextWithSetter<number>("PointSelection");

export const useCurrentTime = Context.useValue;

export const useSetCurrentTime = Context.useSetter;

export interface CurrentTimeProviderProps {
  initialTime: number;
  children: ReactNode;
}

export const CurrentTimeProvider: FC<CurrentTimeProviderProps> = ({
  initialTime,
  children,
}) => {
  const [currentTime, setTime] = useState(initialTime);

  return (
    <Context.Provider value={currentTime} onValueChange={setTime}>
      {children}
    </Context.Provider>
  );
};
