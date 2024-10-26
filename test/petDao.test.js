import assert from "assert";
import Pet from "../src/daos/pet.dao.js";
import mongoose from "mongoose";

describe("Pet DAO Tests", function () {
  let petDao;
  let testPetId;

  before(function () {
    // Configura la conexión a MongoDB de prueba
    mongoose.connect("mongodb://localhost:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    petDao = new Pet();
  });

  after(function () {
    mongoose.connection.close(); // Cierra la conexión después de los tests
  });

  it("should save a new pet", async function () {
    const newPet = { name: "Fido", type: "dog", age: 3 };
    const savedPet = await petDao.save(newPet);
    assert(savedPet.name === "Fido");
    assert(savedPet.type === "dog");
    assert(savedPet.age === 3);
    testPetId = savedPet._id; // Guardamos el ID para futuros tests
  });

  it("should get a pet by params", async function () {
    const pets = await petDao.get({ name: "Fido" });
    assert(Array.isArray(pets));
    assert(pets.length > 0);
    assert(pets[0].name === "Fido");
  });

  it("should get a pet by specific param", async function () {
    const pet = await petDao.getBy({ name: "Fido" });
    assert(pet.name === "Fido");
  });

  it("should update a pet", async function () {
    const updatedPet = await petDao.update(testPetId, { age: 4 });
    assert(updatedPet.age === 4);
  });

  it("should delete a pet", async function () {
    const result = await petDao.delete(testPetId);
    assert(result._id.toString() === testPetId.toString());
  });

  it("should save many pets", async function () {
    const petsToSave = [
      { name: "Rex", type: "dog", age: 5 },
      { name: "Whiskers", type: "cat", age: 2 },
    ];
    const savedPets = await petDao.saveMany(petsToSave);
    assert(savedPets.length === 2);
    assert(savedPets[0].name === "Rex");
    assert(savedPets[1].name === "Whiskers");
  });
});
