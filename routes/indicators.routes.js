import { Router } from "express";
import {
  getAllIndicators,
  createNewIndicator,
} from "../controllers/indicators.controllers.js";

const router = Router();

router.get("/indicators", getAllIndicators);
router.post("/indicators", createNewIndicator);

export default router;
