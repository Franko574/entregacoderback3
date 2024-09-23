import * as service from "../services/cart.services.js";
import { cartservice } from "../services/cart.services.js";

class CartController {
  constructor() {
    this.service = cartservice;
  }

  getAll = async (req, res, next) => {
    try {
      const response = await service.getAll();
      res.status(200).json(response);
    } catch (error) {
      next(error.message);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await service.getById(id);
      if (!response) res.status(404).json({ msg: "Cart Not found!" });
      else res.status(200).json(response);
    } catch (error) {
      next(error.message);
    }
  };

  create = async (req, res, next) => {
    try {
      const newCart = await service.create();
      if (!newCart) res.status(404).json({ msg: "Error create cart!" });
      else res.status(200).json(newCart);
    } catch (error) {
      next(error.message);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const cartUpd = await service.update(id, req.body);
      if (!cartUpd) res.status(404).json({ msg: "Error update cart!" });
      else res.status(200).json(cartUpd);
    } catch (error) {
      next(error.message);
    }
  };

  remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const cartDel = await service.remove(id);
      if (!cartDel) res.status(404).json({ msg: "Error delete cart!" });
      else res.status(200).json({ msg: `Cart id: ${id} deleted` });
    } catch (error) {
      next(error.message);
    }
  };

  addProdToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const newProdToUserCart = await service.addProdToCart(idCart, idProd);
      if (!newProdToUserCart) res.json({ msg: "Error add product to cart" });
      else res.json(newProdToUserCart);
    } catch (error) {
      next(error.message);
    }
  };

  removeProdToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const delProdToUserCart = await service.removeProdToCart(idCart, idProd);
      if (!delProdToUserCart) res.json({ msg: "Error remove product to cart" });
      else res.json({ msg: `product ${idProd} deleted to cart` });
    } catch (error) {
      next(error.message);
    }
  };

  updateProdQuantityToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const { quantity } = req.body;
      const updateProdQuantity = await service.updateProdQuantityToCart(
        idCart,
        idProd,
        quantity
      );
      if (!updateProdQuantity)
        res.json({ msg: "Error update product quantity to cart" });
      else res.json(updateProdQuantity);
    } catch (error) {
      next(error.message);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const clearCart = await service.clearCart(idCart);
      if (!clearCart) res.json({ msg: "Error clear cart" });
      else res.json(clearCart);
    } catch (error) {
      next(error.message);
    }
  };

  finalizarCompra = async (req, res, next) => {
    try {
      const { id } = req.params;

      const cart = await cartModel.findById(id).populate("products.product");

      if (!cart) {
        return res.status(404).json({
          error: "No se encontró el carrito",
        });
      }

      // Validar que la cantidad de productos dentro del carrito sea menor o igual al stock del producto
      const productsWithoutStock = [];

      // cart.products.filter((p) => {
      //   if (product.stock <= p.quantity) {
      //     productsWithoutStock.push(p);
      //   }
      //   return product.stock <= p.quantity;
      // });

      cart.products.forEach((p) => {
        if (product.stock <= p.quantity) {
          productsWithoutStock.push(p); /* probamos ---------------------- */
          throw new Error(
            `El producto ${product.name} no tiene stock suficiente`
          );
        }
      });

      const ticket = await ticketModel.create({
        code: uuid(),
        purchase_datetime: new Date(),
        amount: cart.products.reduce(
          (acc, curr) => acc + curr.quantity * curr.product.price,
          0
        ),
        purchaser: req.user._id,
      });

      res.status(200).json({
        message: "Compra finalizada",
        ticket,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error al finalizar la compra",
        details: error.message,
      });
    }
  };
}

export const cartcontroller = new CartController();
