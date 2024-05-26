import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import type {
  PagefindSearchFragment,
  PagefindSearchResult,
} from "@utils/pagefind";
import { queryClient } from "@utils/query";

export function usePageFindResultQuery(
  result: PagefindSearchResult,
  searchId: string
): UseQueryResult<PagefindSearchFragment> {
  return useQuery(
    {
      queryKey: ["pagefind", searchId, result.id],
      queryFn: () => result.data(),
    },
    queryClient
  );
}
