import ProductDaoMongoDB from "../daos/product.dao.js";
import { productDao } from "../daos/product.dao.js";

class ProductService {
  constructor() {
    this.productDao = new ProductDaoMongoDB();
  }
  getAll = async (page, limit, name, sort) => {
    try {
      return await productDao.getAll(page, limit, name, sort);
    } catch (error) {
      console.log(error);
    }
  };

  getById = async (id) => {
    try {
      const prod = await productDao.getById(id);
      if (!prod) return false;
      else return prod;
    } catch (error) {
      console.log(error);
    }
  };

  create = async (obj) => {
    try {
      const newProd = await productDao.create(obj);
      if (!newProd) return false;
      else return newProd;
    } catch (error) {
      console.log(error);
    }
  };

  update = async (id, obj) => {
    try {
      const prodUpd = await productDao.update(id, obj);
      if (!prodUpd) return false;
      else return prodUpd;
    } catch (error) {
      console.log(error);
    }
  };

  remove = async (id) => {
    try {
      const prodDel = await productDao.delete(id);
      if (!prodDel) return false;
      else return prodDel;
    } catch (error) {
      console.log(error);
    }
  };
}

export const productService = new ProductService();
