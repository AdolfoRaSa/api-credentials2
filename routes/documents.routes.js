import { Router } from "express";
import {
  getAllDocuments,
  getDocumentById,
  getProceduresByProcessId,
  createNewDocument,
} from "../controllers/documents.controllers.js";

const router = Router();

router.get("/documents", getAllDocuments);
router.get("/documents/:document_id", getDocumentById);
router.get("/documents/procedures/:process_id", getProceduresByProcessId);
router.post("/documents", createNewDocument);

export default router;
