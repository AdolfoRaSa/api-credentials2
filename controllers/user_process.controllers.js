import { getConnection } from "../database/connection.js";
import { userProcessQueries as queries } from "../database/queries.js";
import sql from "mssql";

export const getUserProcess = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllUserProcess);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getProcessByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .query(queries.getProcessByUserId);

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewUserProcess = async (req, res) => {
  const { user_id, process_id, role_id } = req.body;

  if (!user_id || !process_id || !role_id) {
    return res
      .status(400)
      .json({ message: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("process_id", sql.VarChar, process_id)
      .input("role_id", sql.Int, role_id)
      .query(queries.addNewUserProcess);

    res.json({
      user_id,
      process_id,
      role_id,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getUserProcessById = async (req, res) => {
  const { user_process_id } = req.params;

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("user_process_id", sql.Int, user__process_id)
    .query(queries.getUserProcessById);
  res.json(result.recordset[0]);
};

export const deleteUserProcessById = async (req, res) => {
  const { user_process_id } = req.params;

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("user_process_id", sql.Int, user_process_id)
    .query(queries.deleteUserProcessById);
  res.sendStatus(204);
};

export const updateUserProcessById = async (req, res) => {
  const { user_id, process_id, role_id } = req.body;
  const { user_process_id } = req.params;

  if (!user_id || !process_id || !role_id) {
    return res
      .status(400)
      .json({ message: "Bad Request. Please fill all fields" });
  }

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("user_id", sql.Int, user_id)
    .input("process_id", sql.VarChar, process_id)
    .input("role_id", sql.Int, role_id)
    .query(queries.updateUserProcessById);

  res.json({
    user_id,
    process_id,
    role_id,
  });
};
