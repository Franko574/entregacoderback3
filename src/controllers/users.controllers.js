import * as service from "../services/user.services.js";

class UserController {
  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await service.getByIdUser(id);
      if (!item) throw new Error("User not found!");

      res.json(item);
    } catch (error) {
      next(error);
    }
  };

  getByEmail = async (req, res, next) => {
    try {
      const { email } = req.params;
      const item = await service.getByEmailUser(email);
      if (!item) throw new Error("User not found!");
      res.json(item);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const { page, limit } = req.query;
      const response = await service.getAllUsers(page, limit);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const user = { ...req.body };
      const newUser = await service.createUser(user);
      if (!newUser) throw new Error("Validation Error!");
      else
        res.json({
          data: newUser,
        });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description, price, stock } = req.body;

      let item = await getByIdUser(id);

      if (!item) throw new Error("User not found!");

      const userUpdated = await service.updateUser(id, {
        name,
        description,
        price,
        stock,
      });

      res.json({
        msg: "User updated",
        data: userUpdated,
      });
    } catch (error) {
      next(error);
    }
  };

  remove = async (req, res, next) => {
    try {
      const { id } = req.params;

      await service.deleteUser(id);

      res.json({
        msg: "User deleted",
      });
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController();