import { useEffect } from "react";

import { fetchData } from "../fetchData";
import { DemoForm, type UseDemoData } from "../DemoForm";

const useRaceConditionFixed: UseDemoData = ({ searchString, setData }) => {
  useEffect(() => {
    const abortController = new AbortController();

    fetchData(searchString).then((data) => {
      if (!abortController.signal.aborted) {
        setData(data);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [searchString]);
};

export const RaceConditionFixed = () => {
  return <DemoForm useDemoData={useRaceConditionFixed} />;
};
