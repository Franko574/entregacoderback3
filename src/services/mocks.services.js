import UserDaoMongoDB from "../daos/user.dao.js";
import PetDaoMongoDB from "../daos/pet.dao.js";
import { petDao } from "../daos/pet.dao.js";
import { userDao } from "../daos/user.dao.js";

/* const petDao = new PetDaoMongoDB();
const userDao = new UserDaoMongoDB(); */

class MockServiceClass {
  constructor() {
    this.petDao = new PetDaoMongoDB();
  }

  generateData = async (newUsers, newPets) => {
    try {
      if (!Array.isArray(users) || !Array.isArray(pets)) {
        throw new Error("Los parámetros deben ser arrays.");
      }
      const usersdb = await userDao.create(newUsers);
      const petsdb = await petDao.create(newPets);
      return { usersdb, petsdb };
    } catch (error) {
      console.error("Error en MockServiceClass -> generateData:", error);
      throw new Error("Error al generar datos.");
    }
  };

  getUsers = async () => {
    try {
      const usersdb = await userDao.getAll();
      return usersdb;
    } catch (error) {
      console.error("Error en MockServiceClass -> getUsers:", error);
      throw new Error("Error al obtener usuarios.");
    }
  };

  getPets = async () => {
    try {
      const petsdb = await petDao.getAll();
      return petsdb;
    } catch (error) {
      console.error("Error en MockServiceClass -> getPets:", error);
      throw new Error("Error al obtener mascotas.");
    }
  };

  /*   createUserMock = async (numUsers) => {
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

  createPetMock = async (numPets) => {
    try {
      const newPets = [];
      for (let i = 0; i < numPets; i++) {
        const pet = {
          name: faker.name.firstName(),
          age: faker.datatype.number(10),
          owner: faker.name.firstName(),
          race: faker.name.firstName(),
        };
        newPets.push(pet);
      }
      return newPets;
    } catch (error) {
      console.log(error);
    }
  }; */
}

export const mockservice = new MockServiceClass();
