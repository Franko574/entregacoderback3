import { fakerES_MX as faker } from "@faker-js/faker";

export const generatePetsMock = (qty) => {
  const pets = [];
  for (let i = 0; i < qty; i++) {
    let specie = faker.animal.type();
    const pet = {
      name: faker.person.firstName(),
      specie: specie,
      birthDate: faker.date.between({ from: "2000-01-01", to: Date.now() }),
      adopted: false,
      image: faker.image.urlLoremFlickr({ category: specie }),
    };

    pets.push(pet);
  }

  return pets;
};
