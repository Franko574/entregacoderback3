import { Router } from "express";
import passport from "passport";
import { productController } from "../controllers/product.controllers.js";
import { productDto } from "../dtos/product.dto.js";
import { authorizations } from "../middlewares/authorization.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/", authorizations(["user"]), productController.getAll);

router.get("/:id", authorizations(["user"]), productController.getById);

router.post(
  "/",
  authorizations(["admin"]),
  validate(productDto),
  productController.create
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorizations(["admin"]),
  validate(productDto),
  productController.update
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorizations(["admin"]),
  validate(productDto),
  productController.remove
);

export default router;
