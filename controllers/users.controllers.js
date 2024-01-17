import { getConnection } from "../database/connection.js";
import { userQueries as queries } from "../database/queries.js";
import sql from "mssql";

export const getUsers = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllUsers);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewUser = async (req, res) => {
  const {
    user_id,
    user_name,
    user_lastname,
    user_email,
    user_role,
    user_password,
  } = req.body;

  if (
    user_id == null ||
    user_name == null ||
    user_lastname == null ||
    user_email == null ||
    user_role == null ||
    user_password == null
  ) {
    return res
      .status(400)
      .json({ message: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("user_name", sql.VarChar, user_name)
      .input("user_lastname", sql.VarChar, user_lastname)
      .input("user_email", sql.VarChar, user_email)
      .input("user_role", sql.Int, user_role)
      .input("user_password", sql.VarChar, user_password)
      .query(queries.addNewUser);

    res.json({
      user_id,
      user_name,
      user_lastname,
      user_email,
      user_role,
      user_password,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getUserById = async (req, res) => {
  const { user_id } = req.params;

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("user_id", sql.Int, user_id)
    .query(queries.getUserById);
  res.json(result.recordset[0]);
};

export const deleteUserById = async (req, res) => {
  const { user_id } = req.params;

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("user_id", sql.Int, user_id)
    .query(queries.deleteUserById);
  res.sendStatus(204);
};

export const updateUserById = async (req, res) => {
  const { user_name, user_lastname, user_email, user_role, user_password } =
    req.body;
  const { user_id } = req.params;

  if (
    user_name == null ||
    user_lastname == null ||
    user_email == null ||
    user_role == null ||
    user_password == null
  ) {
    return res
      .status(400)
      .json({ message: "Bad Request. Please fill all fields" });
  }

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("user_name", sql.VarChar, user_name)
    .input("user_lastname", sql.VarChar, user_lastname)
    .input("user_email", sql.VarChar, user_email)
    .input("user_role", sql.Int, user_role)
    .input("user_password", sql.VarChar, user_password)
    .input("user_id", sql.Int, user_id)
    .query(queries.updateUserById);

  res.json({
    user_name,
    user_lastname,
    user_email,
    user_role,
    user_password,
  });
};
