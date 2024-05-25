import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { importPagefind, type PagefindSearchResults } from "@utils/pagefind";
import { queryClient } from "@utils/query";

function fetchSearchResults(
  searchString: string
): Promise<PagefindSearchResults> {
  return importPagefind().then((pagefind) => {
    return pagefind
      .options({ excerptLength: 12 })
      .then(() => pagefind.search(searchString));
  });
}

export function usePageFindQuery(
  searchString: string
): UseQueryResult<PagefindSearchResults> {
  return useQuery(
    {
      queryKey: ["pagefind", searchString],
      queryFn: () => fetchSearchResults(searchString),
    },
    queryClient
  );
}
