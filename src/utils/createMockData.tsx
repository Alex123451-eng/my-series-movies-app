import { createRandomMovie } from "./createRandomMovie";

import { IMovie } from "../types/types";

export const createMockData = (): IMovie[] => {
  const moviesData = [];

  for (let i = 0; i < 25; i++) {
    moviesData.push(createRandomMovie());
  }

  return moviesData;
};
