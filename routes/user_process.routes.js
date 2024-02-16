import { Router } from "express";
import {
  getUserProcess,
  getProcessByUserId,
  createNewUserProcess,
  getUserProcessById,
  deleteUserProcessById,
  updateUserProcessById,
} from "../controllers/user_process.controllers.js";

const router = Router();

router.get("/user_process", getUserProcess);
router.get("/user_process/:user_id", getProcessByUserId);
router.post("/user_process", createNewUserProcess);
router.get("/user_process/:user_process_id", getUserProcessById);
router.delete("/user_process/:user_process_id", deleteUserProcessById);
router.put("/user_process/:user_process_id", updateUserProcessById);

export default router;
