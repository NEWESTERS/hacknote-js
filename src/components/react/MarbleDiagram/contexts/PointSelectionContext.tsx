import { createContextWithSetter } from "@utils/react";
import { FC, ReactNode, useState } from "react";

const Context = createContextWithSetter<string | undefined>("PointSelection");

export const useSelectedPointId = Context.useValue;

export const useSelectPoint = Context.useSetter;

export interface PointSelectionProviderProps {
  children: ReactNode;
}

export const PointSelectionProvider: FC<PointSelectionProviderProps> = ({
  children,
}) => {
  const [selectedPointId, setSelectedPointId] = useState<string>();

  return (
    <Context.Provider
      value={selectedPointId}
      onValueChange={setSelectedPointId}
    >
      {children}
    </Context.Provider>
  );
};
