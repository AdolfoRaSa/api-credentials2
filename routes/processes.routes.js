import { Router } from "express";
import {
  getProcesses,
  createNewProcess,
  getProcessById,
  getLeaderByProcessId,
  deleteProcessById,
  updateProcessById,
} from "../controllers/processes.controllers.js";

const router = Router();

router.get("/processes", getProcesses);
router.post("/processes", createNewProcess);
router.get("/processes/:process_id", getProcessById);
router.get("/processes/leader/:process_id", getLeaderByProcessId);
router.delete("/processes/:process_id", deleteProcessById);
router.put("/processes/:process_id", updateProcessById);

export default router;
