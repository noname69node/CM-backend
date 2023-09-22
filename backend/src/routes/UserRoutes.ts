import { Router } from "express";
import UserController from "../controllers/UserController";

import { auth } from "../middlewares/auth";

const router = Router();
const userController = new UserController();

router.param("id", userController.validateId);

router.get("/", userController.getAll);
router.get("/self/", userController.getSelf);
router.get("/:id", userController.getById);
router.post("/", userController.create);
router.patch("/self", userController.update);
router.patch("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
