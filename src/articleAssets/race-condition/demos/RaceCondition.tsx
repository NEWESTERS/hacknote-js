import { useEffect } from "react";

import { fetchData } from "../fetchData";
import { DemoForm, UseDemoData } from "../DemoForm";

const useRaceCondition: UseDemoData = ({ searchString, setData }) => {
  useEffect(() => {
    fetchData(searchString).then(setData);
  }, [searchString]);
};

export const RaceCondition = () => {
  return <DemoForm useDemoData={useRaceCondition} />;
};
