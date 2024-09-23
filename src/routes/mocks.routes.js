import { Router } from "express";
import { mockscontroller } from "../controllers/mocks.controller.js";

const router = Router();

router.get("/mockinguser", mockscontroller.createMockUsers);

router.post("/generateData/:numUsers/:petUsers", mockscontroller.generateData);

router.get("/users", mockscontroller.getUsers);

router.get("/pets", mockscontroller.getPets);

export default router;
