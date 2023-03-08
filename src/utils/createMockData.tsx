import createRandomMovie from "./createRandomMovie";
import createRandomUser from "./createRandomUser";

import { IMovie } from "../types/types";

const createMockData = (mockDataType: string): IMovie[] => {
  const moviesData = [];

  const dataCreator =
    mockDataType === "moviesMockData" ? createRandomMovie : createRandomUser;

  for (let i = 0; i < 25; i++) {
    moviesData.push(dataCreator());
  }

  return moviesData;
};

export default createMockData;
