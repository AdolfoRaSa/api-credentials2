import { getConnection } from "../database/connection.js";
import { instructionsQueries as queries } from "../database/queries.js";
import sql from "mssql";

export const getAllInstructions = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllInstructions);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewInstruction = async (req, res) => {
  const {
    instruction_id,
    instruction_name,
    instruction_version,
    document_id,
    user_id,
    doctype_id,
  } = req.body;

  if (
    !instruction_id ||
    !instruction_name ||
    !instruction_version ||
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
      .input("instruction_id", sql.VarChar, instruction_id)
      .input("instruction_name", sql.VarChar, instruction_name)
      .input("instruction_version", sql.VarChar, instruction_version)
      .input("document_id", sql.VarChar, document_id)
      .input("user_id", sql.Int, user_id)
      .input("doctype_id", sql.Int, doctype_id)
      .query(queries.addNewInstruction);

    res.json({
      instruction_id,
      instruction_name,
      instruction_version,
      document_id,
      user_id,
      doctype_id,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
