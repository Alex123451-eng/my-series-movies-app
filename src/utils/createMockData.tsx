import createRandomMovie from "./createRandomMovie"
import createRandomUser from "./createRandomUser"
// import fs from 'fs/promises'

import { Movie } from "../types/types";

const createMockData = (mockDataType: string): Movie[] => {
  const moviesData = [];

  const dataCreator = mockDataType === 'moviesMockData' ? createRandomMovie : createRandomUser;

  for (let i = 0; i < 25; i++) {
    moviesData.push(dataCreator())
  }
  
  console.log('moviesData ', moviesData)

  return moviesData;

  // await fs.writeFile(`./src/mockData/${mockDataType}.json`,
  // JSON.stringify(moviesData, null, '\t'))
}

export default createMockData;