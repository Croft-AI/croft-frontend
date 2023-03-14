import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  starWars,
} from "unique-names-generator";

const customConfig: Config = {
  dictionaries: [adjectives, colors, starWars],
  separator: "-",
  length: 3,
};

export const randomName = () => uniqueNamesGenerator(customConfig); // big_red_donkey
