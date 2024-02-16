import { getConnection } from "../database/connection.js";
import { mayorDocsQueries as queries } from "../database/queries.js";
import sql from "mssql";

export const getMayorDocs = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllMayorDocs);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewMayorDoc = async (req, res) => {
  const {
    mayordoc_clave,
    mayordoc_name,
    mayordoc_version,
    mayordoc_url,
    mayordoc_flowchart_url,
  } = req.body;

  if (!mayordoc_clave || !mayordoc_name || !mayordoc_version || !mayordoc_url) {
    return res
      .status(400)
      .json({ message: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("mayordoc_clave", sql.VarChar, mayordoc_clave)
      .input("mayordoc_name", sql.VarChar, mayordoc_name)
      .input("mayordoc_version", sql.VarChar, mayordoc_version)
      .input("mayordoc_url", sql.VarChar, mayordoc_url)
      .input("mayordoc_flowchart_url", sql.VarChar, mayordoc_flowchart_url)
      .query(queries.addNewMayorDoc);

    res.json({
      mayordoc_clave,
      mayordoc_name,
      mayordoc_version,
      mayordoc_url,
      mayordoc_flowchart_url,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
