import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import sessionRoutes from "./routes/sesion.routes.js";
import userRoutes from "./routes/user.routes.js";
import { authenticate } from "./middlewares/auth.middleware.js";
import routes from "./routes/index.js";
import { config } from "./config/config.js";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";
import { errorHandler } from "./middlewares/errorHandler.js";
import cartRouter from "./routes/cart.routes.js";
import productRouter from "./routes/products.routes.js";
import { initMongoDB } from "./db/database.js";
import mocksRouter from "./routes/mocks.routes.js";

const app = express();

/* const { PORT } = config; */

const PORT = 5001;

//Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(morgan("dev"));

//Passport config
initializePassport();
app.use(passport.initialize());

//Mongoose configuration
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("conectado a MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

//Router configuration
app.use("/api", routes);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/api/sesion", sessionRoutes);
app.use("/api/users", authenticate, userRoutes);
app.use("api/mocks", mocksRouter);
app.use(errorHandler);

initMongoDB();
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
