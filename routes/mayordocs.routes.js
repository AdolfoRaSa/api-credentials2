import { Router } from "express";
import {
  getMayorDocs,
  createNewMayorDoc,
} from "../controllers/mayordocs.controllers.js";

const router = Router();

router.get("/documents", getMayorDocs);
router.post("/documents", createNewMayorDoc);

export default router;
