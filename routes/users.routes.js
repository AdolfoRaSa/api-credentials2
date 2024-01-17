import { Router } from "express";
import {
  getUsers,
  createNewUser,
  getUserById,
  deleteUserById,
  updateUserById,
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/users", getUsers);
router.post("/users", createNewUser);
router.get("/users/:user_id", getUserById);
router.delete("/users/:user_id", deleteUserById);
router.put("/users/:user_id", updateUserById);

export default router;
