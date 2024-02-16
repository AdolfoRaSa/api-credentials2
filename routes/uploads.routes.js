import { Router } from "express";
import {
  getAllUploads,
  createNewUpload,
} from "../controllers/uploads.controllers.js";

const router = Router();

router.get("/uploads", getAllUploads);
router.post("/uploads", createNewUpload);

export default router;
