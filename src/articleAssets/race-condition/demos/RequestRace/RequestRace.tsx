import { FC, useState } from "react";

import { Button, Icon } from "@components/react";
import playSvg from "@components/icons/play.svg";
import Styles from "./RequestRace.module.css";
import clsx from "clsx";
import { RaceResult, RaceResultView } from "./RaceResultView";

export const RequestRace: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [results, setResults] = useState<RaceResult[]>([]);

  const start = () => {
    setIsLoading(true);

    const startTime = performance.now();

    let winner: string | undefined;

    Promise.all([
      fetch("https://pokeapi.co/api/v2/pokemon/pikachu").then(() => {
        console.log("1");

        if (!winner) {
          winner = "1";
        }

        return performance.now();
      }),
      fetch("https://pokeapi.co/api/v2/pokemon/pikachu").then(() => {
        console.log("2");

        if (!winner) {
          winner = "2";
        }

        return performance.now();
      }),
    ]).then(([endTime1, endTime2]) => {
      setResults((results) => [
        {
          startTime,
          finishes: [
            {
              title: "1",
              time: endTime1 - startTime,
              isWinner: winner === "1",
            },
            {
              title: "2",
              time: endTime2 - startTime,
              isWinner: winner === "2",
            },
          ],
        },
        ...results,
      ]);
      setIsLoading(false);
    });
  };

  return (
    <div className={Styles.Layout}>
      <Button
        onClick={start}
        title="Демо"
        right={<Icon url={playSvg} color="var(--color_accent-green)" />}
        disabled={isLoading}
      />

      <ul className={clsx(Styles.List)}>
        {results.map((result) => (
          <li className={Styles.ResultListItem} key={result.startTime}>
            <RaceResultView result={result} />
          </li>
        ))}
      </ul>
    </div>
  );
};
