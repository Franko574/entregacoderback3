import { Router } from "express";
import passport from "passport";
import { cartcontroller } from "../controllers/cart.controllers.js";
import { cartDto } from "../dtos/cart.dto.js";
import { authorizations } from "../middlewares/authorization.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/", cartcontroller.getAll);

router.get("/:id", cartcontroller.getById);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validate(cartDto),
  cartcontroller.create
);

router.put("/:id", cartcontroller.update);

router.delete("/:id", cartcontroller.remove);

router.post(
  "/:idCart/products/:idProd",
  passport.authenticate("jwt", { session: false }),
  authorizations(["user"]),
  cartcontroller.addProdToCart
);

router.delete(
  "/:idCart/products/:idProd",
  passport.authenticate("jwt", { session: false }),
  authorizations(["admin"]),
  cartcontroller.removeProdToCart
);

router.put(
  "/:idCart/products/:idProd/:quantity",
  passport.authenticate("jwt", { session: false }),
  authorizations(["user"]),
  cartcontroller.updateProdQuantityToCart
);

router.delete(
  "/clear/:idCart",
  passport.authenticate("jwt", { session: false }),
  authorizations(["admin"]),
  cartcontroller.clearCart
);

router.post(
  "/:id/purchase",
  passport.authenticate("jwt", { session: false }),
  authorizations(["user"]),
  cartcontroller.finalizarCompra
);

export default router;
