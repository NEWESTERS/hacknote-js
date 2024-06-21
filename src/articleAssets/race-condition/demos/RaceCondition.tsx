import { useEffect, type FC } from 'react';

import { fetchData } from '../fetchData';
import { DemoForm, type UseDemoData } from '../DemoForm';

const useRaceCondition: UseDemoData = ({ searchString, setData }) => {
  useEffect(() => {
    fetchData(searchString).then(setData);
  }, [searchString, setData]);
};

export const RaceCondition: FC = () => {
  return <DemoForm useDemoData={useRaceCondition} />;
};
