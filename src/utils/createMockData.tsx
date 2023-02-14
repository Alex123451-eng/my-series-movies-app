import createRandomMovie from "./createRandomMovie"
import createRandomUser from "./createRandomUser"
import fse from 'fs-extra'

const createMockData = async (mockDataType: string) => {
  const moviesData = [];

  const dataCreator = mockDataType === 'mockMoviesData' ? createRandomMovie : createRandomUser;

  for (let i = 0; i < 25; i++) {
    moviesData.push(dataCreator())
  }
  
  console.log('moviesData ', moviesData)

  await fse.writeFile(`./src/mockData/${mockDataType}.json`,
  JSON.stringify(moviesData, null, '\t'))
}

export default createMockData;