import { Router } from "express";
import {
  getAllRegisters,
  createNewRegister,
} from "../controllers/registers.controllers.js";

const router = Router();

router.get("/registers", getAllRegisters);
router.post("/registers", createNewRegister);

export default router;
