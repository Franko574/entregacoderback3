import { faker } from "@faker-js/faker";
import { createHash } from "./hash.js";
import { mockscontroller } from "../controllers/mocks.controller.js";

/*   export function generateUser = async (user) => {
    try {
      const hashPassword = await createHash(user.password);
      user.password = hashPassword;
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  export function generatePet = async (pet) => {
    try {
      return pet;
    } catch (error) {
      console.log(error);
    }
  };

  export function createUserMock = async (numUsers) => {
    try {
      const newUsers = [];
      for (let i = 0; i < numUsers; i++) {
        const user = {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          age: faker.datatype.number(10),
          password: faker.internet.password(),
          role: "user",
        };
        newUsers.push(user);
      }
      return newUsers;
    } catch (error) {
      console.log(error);
    }
  };

  export function createPetMock = async (numPets) => {
    try {
      const newPets = [];
      for (let i = 0; i < numPets; i++) {
        const pet = {
          name: faker.name.firstName(),
          age: faker.datatype.number(30),
          owner: faker.name.firstName(),
          race: faker.name.firstName(),
        };
        newPets.push(pet);
      }
      return newPets;
    } catch (error) {
      console.log(error);
    }
  };
 */
export const generateUser = async (user) => {
  try {
    const hashPassword = await createHash(user.password);
    user.password = hashPassword;
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const generatePet = async (pet) => {
  try {
    return pet;
  } catch (error) {
    console.log(error);
  }
};

export const createUserMock = async (numUsers) => {
  try {
    const newUsers = [];
    for (let i = 0; i < numUsers; i++) {
      const user = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        age: faker.datatype.number({ min: 1, max: 100 }), // Ajusta el rango según lo necesario
        password: faker.internet.password(),
        role: "user",
      };
      newUsers.push(user);
    }
    return newUsers;
  } catch (error) {
    console.log(error);
  }
};

export const createPetMock = async (numPets) => {
  try {
    const newPets = [];
    for (let i = 0; i < numPets; i++) {
      const pet = {
        name: faker.animal.cat(), // Cambia para usar un nombre de mascota adecuado
        age: faker.datatype.number({ min: 1, max: 30 }), // Ajusta el rango según lo necesario
        owner: faker.name.firstName(),
        race: faker.animal.type(), // Cambia a un tipo adecuado
      };
      newPets.push(pet);
    }
    return newPets;
  } catch (error) {
    console.log(error);
  }
};
