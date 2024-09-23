import { Router } from "express";
import passport from "passport";
import { sessioncontroller } from "../controllers/sesion.controller.js";
import { authDto } from "../dtos/auth.dto.js";
import { userDto } from "../dtos/user.dto.js";
import { validate } from "../middlewares/validation.middleware.js";
import { authorizations } from "../middlewares/authorization.middleware.js";

const router = Router();

router.post(
  "/login",
  validate(authDto),
  passport.authenticate("login"),
  sessioncontroller.login
);

router.get(
  "/current",
  passport.authenticate("jwt"),
  authorizations(["user"]),
  sessioncontroller.current
);

router.get("/logout", (req, res) => {
  res.clearCookie("currentUser");
  res.status(200).json({ message: "Sesión cerrada" });
});

router.post(
  "/register",
  validate(userDto),
  passport.authenticate("register"),
  sessioncontroller.register
);

export default router;
