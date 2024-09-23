import { createUserMock, createPetMock } from "../utils/mock.utils.js";
import { mockservice } from "../services/mocks.services.js";
import * as service from "../services/mocks.services.js";

class MockController {
  constructor() {
    this.service = mockservice;
  }

  createMockUsers = async (req, res) => {
    try {
      const numUsers = req.query.numUsers || 50;

      if (isNaN(numUsers) || numUsers <= 0) {
        return res.status(400).json({
          message:
            "El parámetro numUsers debe ser un número válido y mayor a 0.",
        });
      }

      const userMock = await service.createUserMock(50);
      return res.status(200).json({
        message: "Usuarios ficticios generados exitosamente",
        data: userMock,
      });
    } catch (error) {
      console.error("Error al generar usuarios ficticios: ", error);
      return res.status(500).json({
        message: "Ocurrió un error al generar los usuarios ficticios",
        error: error.message,
      });
    }
  };

  generateData = async (req, res, next) => {
    try {
      const { numUsers, petUsers } = req.params;

      if (isNaN(numUsers) || isNaN(petUsers)) {
        throw new CustomError("Invalid parameters: must be numbers", 400);
      }

      const newUsers = await createUserMock(numUsers);
      const newPets = createPetMock(petUsers);

      const result = await mockservice.generateData(newUsers, newPets);

      res
        .status(200)
        .json({ message: "Datos generados correctamente!", data: result });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error("Error inesperado:", error);
        res.status(500).json({
          message: "Error interno del servidor",
          error: error.message,
        });
      }
    }
    // Clase de error personalizada
    class CustomError extends Error {
      constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
      }
    }
  };

  getUsers = async (req, res) => {
    try {
      const users = await mockservice.getUsers();

      if (!users || users.length === 0) {
        return res.status(404).json({
          message: "No se encontraron usuarios",
        });
      }

      res.status(200).json({
        message: "Consulta Exitosa!",
        data: users,
      });
    } catch (error) {
      console.error("Error en MockController -> getUsers, error: ", error);
      res.status(500).json({
        message: "Error interno del servidor al obtener usuarios",
        error: error.message,
      });
    }
  };

  getPets = async (req, res) => {
    try {
      const pets = await MockService.getPets();

      // Validar si se encontraron mascotas
      if (!pets || pets.length === 0) {
        return res.status(404).json({
          message: "No se encontraron mascotas",
        });
      }

      // Responder con éxito si hay mascotas
      res.status(200).json({
        message: "Consulta Exitosa!",
        data: pets,
      });
    } catch (error) {
      // Manejar error interno del servidor
      console.error("Error en MockController -> getPets, error: ", error);
      res.status(500).json({
        message: "Error interno del servidor al obtener mascotas",
        error: error.message,
      });
    }
  };
}

export const mockscontroller = new MockController();
