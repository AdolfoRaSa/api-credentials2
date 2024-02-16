import { getConnection } from "../database/connection.js";
import { processesQueries as queries } from "../database/queries.js";
import sql from "mssql";

export const getProcesses = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllProcesses);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewProcess = async (req, res) => {
  const { process_id, process_name, process_category } = req.body;

  if (!process_id || !process_name || !process_category) {
    return res
      .status(400)
      .json({ message: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("process_id", sql.VarChar, process_id)
      .input("process_name", sql.VarChar, process_name)
      .input("process_category", sql.VarChar, process_category)
      .query(queries.addNewProcess);

    res.json({
      process_id,
      process_name,
      process_category,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getProcessById = async (req, res) => {
  const { process_id } = req.params;

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("process_id", sql.VarChar, process_id)
    .query(queries.getProcessById);

  res.json(result.recordset[0]);
};

export const getLeaderByProcessId = async (req, res) => {
  const { process_id } = req.params;

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("process_id", sql.VarChar, process_id)
    .query(queries.getLeaderByProcessId);

  res.json(result.recordset[0]);
};

export const deleteProcessById = async (req, res) => {
  const { process_id } = req.params;

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("process_id", sql.VarChar, process_id)
    .query(queries.deleteProcessById);
  res.sendStatus(204);
};

export const updateProcessById = async (req, res) => {
  const { process_name, process_category } = req.body;
  const { process_id } = req.params;

  if (!process_name || !process_category) {
    return res
      .status(400)
      .json({ message: "Bad Request. Please fill all fields" });
  }

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("process_name", sql.VarChar, process_name)
    .input("process_category", sql.VarChar, process_category)
    .input("process_id", sql.VarChar, process_id)
    .query(queries.updateProcessById);

  res.json({
    process_name,
    process_category,
  });
};
