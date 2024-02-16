import { Router } from "express";
import {
  getProcedures,
  createNewProcedure,
} from "../controllers/procedures.controllers.js";

const router = Router();

router.get("/procedures", getProcedures);
router.post("/procedures", createNewProcedure);

export default router;
