import { Router } from "express";
import {
  getProcdocs,
  createNewProcdoc,
} from "../controllers/procdocs.controllers.js";

const router = Router();

router.get("/procdocs", getProcdocs);
router.post("/procdocs", createNewProcdoc);

export default router;
