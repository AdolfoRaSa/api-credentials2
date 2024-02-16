import { Router } from "express";
import {
  getAllRisks,
  getAllRisksByProcedureId,
  createNewRisk,
} from "../controllers/risks.controllers.js";

const router = Router();

router.get("/risks", getAllRisks);
router.get("/risks/:document_id", getAllRisksByProcedureId);
router.post("/risks", createNewRisk);

export default router;
