import { useEffect, useState } from "react";

import { Button, Icon, Input } from "@components/react";
import { autofill } from "@utils/demo";
import { RepoCard } from "./RepoCard";
import playSvg from "@components/icons/play.svg";
import type { GithubApiResponse } from "./api";
import Styles from "./RepoSearch.module.css";

export const RepoSearch = () => {
  const [searchString, setSearchString] = useState("");

  const [data, setData] = useState<GithubApiResponse | undefined>(undefined);

  const [isAutoFilling, setIsAutoFilling] = useState(false);

  const handleDemo = () => {
    setIsAutoFilling(true);
  };

  useEffect(() => {
    if (isAutoFilling) {
      const abortController = new AbortController();

      autofill({
        onType: setSearchString,
        text: "hacknote-js",
        signal: abortController.signal,
      }).finally(() => {
        setIsAutoFilling(false);
      });

      return () => {
        abortController.abort();
      };
    }
  }, [isAutoFilling]);

  useEffect(() => {
    if (searchString === "") {
      setData(undefined);
      return;
    }

    const abortController = new AbortController();

    fetch(
      `https://api.github.com/search/repositories?${new URLSearchParams({
        q: searchString,
      })}`,
      { signal: abortController.signal }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then(setData);

    return () => {
      abortController.abort();
    };
  }, [searchString]);

  return (
    <div className={Styles.Layout}>
      <div className={Styles.Filters}>
        <Input
          className={Styles.Search}
          value={searchString}
          onValueChange={setSearchString}
        />

        <Button
          title="Демо"
          onClick={handleDemo}
          right={<Icon url={playSvg} color="var(--color_accent-green)" />}
          disabled={isAutoFilling}
        />
      </div>

      <div className={Styles.Scrollable}>
        {data ? (
          <ul className={Styles.List}>
            {data.items.map((item) => (
              <li key={item.id}>
                <RepoCard
                  name={item.name}
                  author={item.owner.login}
                  starCount={item.stargazers_count}
                  url={item.html_url}
                  topics={item.topics}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div>Введите поисковый запрос</div>
        )}
      </div>
    </div>
  );
};
