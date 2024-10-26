import { fakerES_MX as faker } from "@faker-js/faker";
import { createHash } from "../utils/index.js";

export const generateUsersMock = async (qty) => {
  const users = [];
  for (let i = 0; i < qty; i++) {
    const user = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: await createHash("pass123"),
      role: faker.datatype.boolean(0.8) ? "user" : "admin",
      pets: [],
    };
    users.push(user);
  }

  return users;
};
