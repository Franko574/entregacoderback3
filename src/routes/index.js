import { Router } from "express";
import { authorizations } from "../middlewares/authorization.middleware.js";
import cartRoutes from "./cart.routes.js";
import productRoutes from "./products.routes.js";
import sessionRoutes from "./sesion.routes.js";

const router = Router();

router.use("/sesion", sessionRoutes);
router.use("/cart", authorizations(["user"]), cartRoutes);
router.use("/products", productRoutes);

export default router;
