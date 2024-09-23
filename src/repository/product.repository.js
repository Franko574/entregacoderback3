import { productService } from "../services/product.services";

class ProductRepository {
  constructor() {
    this.service = productService;
  }
  getAll = async (page, limit, name, sort) => {
    return await this.service.getAll(page, limit, name, sort);
  };
}

export const productRepository = new ProductRepository();
