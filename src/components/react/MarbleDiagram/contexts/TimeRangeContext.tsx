import { createContextWithUtils } from "@utils/react";
import type { TimeRange } from "../entities";

export const { Provider: TimeRangeProvider, useContext: useTimeRange } =
  createContextWithUtils<TimeRange>("TimeRange");
