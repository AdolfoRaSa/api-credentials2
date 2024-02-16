import { getConnection } from "../database/connection.js";
import { documentsQueries as queries } from "../database/queries.js";
import sql from "mssql";

export const getAllDocuments = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllDocuments);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getDocumentById = async (req, res) => {
  const { document_id } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("document_id", sql.VarChar, document_id)
      .query(queries.getDocumentById);

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getProceduresByProcessId = async (req, res) => {
  const { process_id } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("process_id", sql.VarChar, process_id)
      .query(queries.getProceduresByProcessId);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewDocument = async (req, res) => {
  const {
    document_id,
    document_name,
    document_version,
    process_id,
    user_id,
    doctype_id,
  } = req.body;

  if (
    !document_id ||
    !document_name ||
    !document_version ||
    !process_id ||
    !user_id ||
    !doctype_id
  ) {
    return res
      .status(400)
      .json({ message: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("document_id", sql.VarChar, document_id)
      .input("document_name", sql.VarChar, document_name)
      .input("document_version", sql.VarChar, document_version)
      .input("process_id", sql.VarChar, process_id)
      .input("user_id", sql.Int, user_id)
      .input("doctype_id", sql.Int, doctype_id)
      .query(queries.addNewDocument);

    res.json({
      document_id,
      document_name,
      document_version,
      process_id,
      user_id,
      doctype_id,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
