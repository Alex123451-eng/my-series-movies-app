import { faker } from "@faker-js/faker";
import { Movie } from "../types/types";

const createRandomMovie = (): Movie => {
  return {
    id: faker.datatype.uuid(),
    title: faker.random.word(),
    description: faker.random.words(50),
    img: faker.image.image(175, 268, true),
    releaseYear: faker.date.birthdate({ min: 1950, max: 2022 }).getFullYear(),
    rating: 0,
  };
};

export default createRandomMovie;
