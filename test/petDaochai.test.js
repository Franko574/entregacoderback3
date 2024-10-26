import chai from "chai";
import Pet from "./Pet.js"; // Ajusta la ruta según tu estructura
import mongoose from "mongoose";

const expect = chai.expect;

// Función para ejecutar los tests
async function runTests() {
  let petDao;
  let testPetId;

  try {
    // Conectamos a MongoDB (ajusta la conexión si es necesario)
    await mongoose.connect("mongodb://localhost:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    petDao = new Pet();

    // Test: Guardar una nueva mascota
    console.log("Running test: should save a new pet");
    const newPet = { name: "Fido", type: "dog", age: 3 };
    const savedPet = await petDao.save(newPet);
    expect(savedPet).to.have.property("name", "Fido");
    expect(savedPet).to.have.property("type", "dog");
    expect(savedPet).to.have.property("age", 3);
    testPetId = savedPet._id; // Guardamos el ID para futuros tests
    console.log("Test passed: should save a new pet");

    // Test: Obtener mascotas por parámetro
    console.log("Running test: should get pets by params");
    const pets = await petDao.get({ name: "Fido" });
    expect(pets).to.be.an("array");
    expect(pets).to.have.length.above(0);
    expect(pets[0]).to.have.property("name", "Fido");
    console.log("Test passed: should get pets by params");

    // Test: Obtener una mascota por un parámetro específico
    console.log("Running test: should get a pet by specific param");
    const pet = await petDao.getBy({ name: "Fido" });
    expect(pet).to.be.an("object");
    expect(pet).to.have.property("name", "Fido");
    console.log("Test passed: should get a pet by specific param");

    // Test: Actualizar una mascota
    console.log("Running test: should update a pet");
    const updatedPet = await petDao.update(testPetId, { age: 4 });
    expect(updatedPet).to.have.property("age", 4);
    console.log("Test passed: should update a pet");

    // Test: Eliminar una mascota
    console.log("Running test: should delete a pet");
    const result = await petDao.delete(testPetId);
    expect(result._id.toString()).to.equal(testPetId.toString());
    console.log("Test passed: should delete a pet");

    // Test: Guardar varias mascotas
    console.log("Running test: should save many pets");
    const petsToSave = [
      { name: "Rex", type: "dog", age: 5 },
      { name: "Whiskers", type: "cat", age: 2 },
    ];
    const savedPets = await petDao.saveMany(petsToSave);
    expect(savedPets).to.be.an("array");
    expect(savedPets).to.have.length(2);
    expect(savedPets[0]).to.have.property("name", "Rex");
    expect(savedPets[1]).to.have.property("name", "Whiskers");
    console.log("Test passed: should save many pets");
  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    // Cerramos la conexión a MongoDB al final
    await mongoose.connection.close();
    console.log("Connection closed");
  }
}

// Ejecuta los tests
runTests();
