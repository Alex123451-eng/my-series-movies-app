import createRandomMovie from "./createRandomMovie";
import createRandomUser from "./createRandomUser";

import { Movie } from "../types/types";

const createMockData = (mockDataType: string): Movie[] => {
  const moviesData = [];

  const dataCreator =
    mockDataType === "moviesMockData" ? createRandomMovie : createRandomUser;

  for (let i = 0; i < 25; i++) {
    moviesData.push(dataCreator());
  }

  return moviesData;
};

export default createMockData;
