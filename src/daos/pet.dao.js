import { petModel } from "./models/pet.model.js";

export default class PetDaoMongoDB {
  async getAll() {
    try {
      return await petModel.find({});
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      return await petModel.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  async create(obj) {
    try {
      return await petModel.create(obj);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, obj) {
    try {
      return await petModel.findByIdAndUpdate(id, obj, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      return await petModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }
}

export const petDao = new PetDaoMongoDB();
