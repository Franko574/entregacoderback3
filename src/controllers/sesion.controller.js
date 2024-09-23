import { userModel } from "../daos/models/user.model.js";
import { comparePassword } from "../utils/hash.js";
import { generateToken, verifyToken } from "../utils/jwt.js";

class SesionController {
  login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Falta el email o la contraseña" });
    }

    try {
      const user = await userModel.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const isPasswordCorrect = await comparePassword(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      const token = generateToken({ email: user.email, role: user.role });

      res.cookie("currentUser", token, { maxAge: 100000 });

      res.status(200).json({ message: "Sesión iniciada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al iniciar sesión", details: error.message });
    }
  };

  current = async (req, res) => {
    const token = req.cookies.currentUser;

    if (!token) {
      return res.status(401).json({ error: "No autorizado" });
    }

    try {
      const user = verifyToken(token);

      const userDB = await userModel.findOne({ email: user.email });

      if (!userDB) {
        return res.status(404).json({ error: "No se encontró el usuario" });
      }

      res.status(200).json(userDB);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener el usuario", details: error.message });
    }
  };

  register = async (req, res) => {
    try {
      console.log(req.user);

      res.status(201).json({
        message: "Usuario registrado",
        user: req.user,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al registrar usuario", details: error.message });
    }
  };
}

export const sessioncontroller = new SesionController();
