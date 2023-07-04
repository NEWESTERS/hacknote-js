import { FC, useState } from "react";

import { autofill } from "@utils/demo";
import { Button, Icon, Input } from "@components/react";
import playSvg from "@components/icons/play.svg";
import Styles from "./DemoForm.module.css";
import { DemoResult } from "./DemoResult";

export interface UseDemoData {
  (props: { searchString: string; setData: (data: string) => void }): void;
}

export interface DemoFormProps {
  useDemoData: UseDemoData;
}

export const DemoForm: FC<DemoFormProps> = ({ useDemoData }) => {
  const [searchString, setSearchString] = useState("");
  const [data, setData] = useState<string>();
  const [isAutoFilling, setIsAutoFilling] = useState(false);

  useDemoData({ searchString, setData });

  const handleAutofill = () => {
    setIsAutoFilling(true);
    autofill({
      text: "Состояние гонки",
      onType: setSearchString,
    }).finally(() => setIsAutoFilling(false));
  };

  const handleReset = () => {
    setData(undefined);
  };

  return (
    <div className={Styles.Demo}>
      <div className={Styles.Form}>
        <Input
          className={Styles.Input}
          readOnly={isAutoFilling}
          value={searchString}
          onValueChange={setSearchString}
          placeholder="Поиск"
        />

        <Button
          title="Демо"
          disabled={isAutoFilling}
          onClick={handleAutofill}
          right={<Icon url={playSvg} color="var(--color_accent-green)" />}
        />
      </div>

      <DemoResult data={data} onReset={handleReset} />
    </div>
  );
};
