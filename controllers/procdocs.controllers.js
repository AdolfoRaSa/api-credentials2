import { getConnection } from "../database/connection.js";
import { procdocsQueries as queries } from "../database/queries.js";
import sql from "mssql";

export const getProcdocs = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllProcdocs);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewProcdoc = async (req, res) => {
  const { procdoc_id, procdoc_name, procdoc_version } = req.body;

  if (!procdoc_id || !procdoc_name || !procdoc_version) {
    return res
      .status(400)
      .json({ message: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("procdoc_id", sql.VarChar, procdoc_id)
      .input("procdoc_name", sql.VarChar, procdoc_name)
      .input("procdoc_version", sql.VarChar, procdoc_version)
      .query(queries.addNewProcdoc);

    res.json({
      procdoc_id,
      procdoc_name,
      procdoc_version,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
