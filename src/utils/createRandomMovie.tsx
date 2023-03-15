import { faker } from "@faker-js/faker";

import { IMovie } from "../types/types";

export const createRandomMovie = (): IMovie => {
  const fakeWord = faker.random.word();

  return {
    id: faker.datatype.uuid(),
    title: `${fakeWord[0].toUpperCase()}${fakeWord.slice(1)}`,
    description: faker.random.words(50),
    img: faker.image.image(175, 268, true),
    releaseYear: faker.date.birthdate({ min: 1950, max: 2022 }).getFullYear(),
    rating: 0,
    currUserRating: 0,
  };
};
