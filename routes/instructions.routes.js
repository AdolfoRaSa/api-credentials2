import { Router } from "express";
import {
  getAllInstructions,
  createNewInstruction,
} from "../controllers/instructions.controllers.js";

const router = Router();

router.get("/instructions", getAllInstructions);
router.post("/instructions", createNewInstruction);

export default router;
