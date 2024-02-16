import { getConnection } from "../database/connection.js";
import { proceduresQueries as queries } from "../database/queries.js";
import sql from "mssql";

export const getProcedures = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllProcedures);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewProcedure = async (req, res) => {
  const { procedure_id, procedure_name, procedure_version } = req.body;

  if (!procedure_id || !procedure_name || !procedure_version) {
    return res
      .status(400)
      .json({ message: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("procedure_id", sql.VarChar, procedure_id)
      .input("procedure_name", sql.VarChar, procedure_name)
      .input("procedure_version", sql.VarChar, procedure_version)
      .query(queries.addNewProcedure);

    res.json({
      procedure_id,
      procedure_name,
      procedure_version,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
