import ProductDaoMongoDB from "../daos/product.dao.js";
import CartDaoMongoDB from "../daos/cart.dao.js";
import { cartModel } from "../daos/models/cart.model.js";
import { ticketDao } from "../daos/ticket.dao.js"; /* revisar el import ticket porque me trae la clase */

const prodDao = new ProductDaoMongoDB();
const cartDao = new CartDaoMongoDB();

class CartService {
  getAll = async () => {
    try {
      return await cartDao.getAll();
    } catch (error) {
      console.log(error);
    }
  };

  getById = async (id) => {
    try {
      return await cartDao.getById(id);
    } catch (error) {
      console.log(error);
    }
  };

  create = async () => {
    try {
      const newcart = await cartDao.create();
      if (!newcart) return false;
      else return newcart;
    } catch (error) {
      console.log(error);
    }
  };

  update = async (id, obj) => {
    try {
      return await cartDao.update(id, obj);
    } catch (error) {
      console.log(error);
    }
  };

  remove = async (id) => {
    try {
      const cartDel = await cartDao.delete(id);
      if (!cartDel) return false;
      else return cartDel;
    } catch (error) {
      console.log(error);
    }
  };

  addProdToCart = async (cartId, prodId) => {
    try {
      const existCart = await getById(cartId);
      if (!existCart) return null;

      const existProd = await prodDao.getById(prodId);
      if (!existProd) return null;

      return await cartDao.addProdToCart(cartId, prodId);
    } catch (error) {
      console.log(error);
    }
  };

  removeProdToCart = async (cartId, prodId) => {
    try {
      const existCart = await getById(cartId);
      // console.log(existCart)
      if (!existCart) return null;
      const existProdInCart = await cartDao.existProdInCart(cartId, prodId);
      // console.log(existProdInCart)
      if (!existProdInCart) return null;
      return await cartDao.removeProdToCart(cartId, prodId);
    } catch (error) {
      console.log(error);
    }
  };

  updateProdQuantityToCart = async (cartId, prodId, quantity) => {
    try {
      const existCart = await getById(cartId);
      if (!existCart) return null;
      const existProdInCart = await cartDao.existProdInCart(cartId, prodId);
      if (!existProdInCart) return null;
      return await cartDao.updateProdQuantityToCart(cartId, prodId, quantity);
    } catch (error) {
      console.log(error);
    }
  };

  clearCart = async (cartId) => {
    try {
      const existCart = await getById(cartId);
      if (!existCart) return null;
      return await cartDao.clearCart(cartId);
    } catch (error) {
      console.log(error);
    }
  };

  finalizarCompra = async (cartId, user) => {
    try {
      if (!user || !user._id) {
        throw new Error("Usuario no válido o no autenticado");
      }

      const cart = await cartModel
        .findById(cartId)
        .populate("products.product");

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      const productosNoComprados = [];

      for (let item of cart.products) {
        const { product, quantity } = item;

        if (!product || !product._id) {
          throw new Error(`Producto no encontrado en el carrito`);
        }

        if (product.stock == null || isNaN(product.stock)) {
          throw new Error(
            `El producto ${
              product.name || "desconocido"
            } tiene un valor de stock inválido`
          );
        }

        if (product.stock < quantity) {
          productosNoComprados.push(item);
          continue;
        }

        const newStock = product.stock - quantity;
        await prodDao.update(product._id, { stock: newStock });
      }

      const ticket = await ticketDao({
        code: uuidv4(),
        purchase_datetime: new Date(),
        amount: cart.products.reduce(
          (acc, curr) => acc + curr.quantity * curr.product.price,
          0
        ),
        purchaser: user._id,
      });

      cart.products = productosNoComprados;
      await cart.save();

      return ticket;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export const cartservice = new CartService();
