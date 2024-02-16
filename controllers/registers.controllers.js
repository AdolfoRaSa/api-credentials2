import { getConnection } from "../database/connection.js";
import { registersQueries as queries } from "../database/queries.js";
import sql from "mssql";

export const getAllRegisters = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllRegisters);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewRegister = async (req, res) => {
  const {
    register_id,
    register_name,
    register_version,
    register_responsible,
    register_retentionTime,
    register_disposition,
    document_id,
    user_id,
    doctype_id,
  } = req.body;

  if (
    !register_id ||
    !register_name ||
    !register_version ||
    !register_responsible ||
    !register_retentionTime ||
    !register_disposition ||
    !document_id ||
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
      .input("register_id", sql.VarChar, register_id)
      .input("register_name", sql.VarChar, register_name)
      .input("register_version", sql.VarChar, register_version)
      .input("register_responsible", sql.VarChar, register_responsible)
      .input("register_retentionTime", sql.VarChar, register_retentionTime)
      .input("register_disposition", sql.VarChar, register_disposition)
      .input("document_id", sql.VarChar, document_id)
      .input("user_id", sql.Int, user_id)
      .input("doctype_id", sql.Int, doctype_id)
      .query(queries.addNewRegister);

    res.json({
      register_id,
      register_name,
      register_version,
      register_responsible,
      register_retentionTime,
      register_disposition,
      document_id,
      user_id,
      doctype_id,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
