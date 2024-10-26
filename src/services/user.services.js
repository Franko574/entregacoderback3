import UserDaoMongoDB from "../daos/user.dao.js";
const userDao = new UserDaoMongoDB();

export class UserServices {
  constructor() {
    this.userDao = new UserDaoMongoDB();
  }

  getByIdUser = async (id) => {
    try {
      const user = await userDao.getById(id);
      if (!user) return false;
      else return user;
    } catch (error) {
      console.log(error);
    }
  };

  getByEmailUser = async (email) => {
    try {
      const user = await userDao.getByEmail(email);
      if (!user) return false;
      else return user;
    } catch (error) {
      console.log(error);
    }
  };

  createUser = async (obj) => {
    try {
      const newUser = await userDao.create(obj);
      if (!newUser) throw new Error("Validation Error!");
      else return newUser;
    } catch (error) {
      console.log(error);
    }
  };

  updateUser = async (id, obj) => {
    try {
      let item = await userDao.getById(id);
      if (!item) {
        throw new Error("User not found!");
      } else {
        const userUpdated = await userDao.update(id, obj);
        return userUpdated;
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteUser = async (id) => {
    try {
      const userDeleted = await userDao.delete(id);
      return userDeleted;
    } catch (error) {
      console.log(error);
    }
  };
}

export const userService = new UserServices();
