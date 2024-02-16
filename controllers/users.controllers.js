import { getConnection } from "../database/connection.js";
import { usersQueries as queries } from "../database/queries.js";
import sql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    user_position,
    user_roleSystem,
    user_email,
    user_password,
    user_status,
  } = req.body;

  if (
    user_id == null ||
    user_name == null ||
    user_lastname == null ||
    user_position == null ||
    user_roleSystem == null ||
    user_email == null ||
    user_password == null ||
    user_status == null
  ) {
    return res
      .status(400)
      .json({ message: "Bad Request. Please fill all fields" });
  }

  let hashedPassword = await bcrypt.hash(user_password, 10);

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("user_name", sql.VarChar, user_name)
      .input("user_lastname", sql.VarChar, user_lastname)
      .input("user_position", sql.VarChar, user_position)
      .input("user_roleSystem", sql.VarChar, user_roleSystem)
      .input("user_email", sql.VarChar, user_email)
      .input("user_password", sql.VarChar, hashedPassword)
      .input("user_status", sql.Bit, user_status)
      .query(queries.addNewUser);

    res.json({
      user_id,
      user_name,
      user_lastname,
      user_position,
      user_roleSystem,
      user_email,
      hashedPassword,
      user_status,
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

export const getUserByEmail = async (req, res) => {
  const user_email = req;

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("user_email", sql.VarChar, user_email)
    .query(queries.getUserByEmail);

  const user = result.recordset[0];
  return user;
};

export const getUserRole = async (req, res) => {
  const user_id = req;

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("user_id", sql.Int, user_id)
    .query(queries.getUserRole);

  const role = result.recordset[0].role_id;
  return role;
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

export const deactiveUserById = async (req, res) => {
  const { user_id } = req.params;

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("user_id", sql.Int, user_id)
    .query(queries.deactiveUserById);
  res.sendStatus(204);
};

export const updateUserById = async (req, res) => {
  const {
    user_name,
    user_lastname,
    user_position,
    user_roleSystem,
    user_email,
    user_password,
    user_status,
  } = req.body;
  const { user_id } = req.params;

  if (
    user_name == null ||
    user_lastname == null ||
    user_position == null ||
    user_roleSystem == null ||
    user_email == null ||
    user_password == null ||
    user_status == null
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
    .input("user_position", sql.VarChar, user_position)
    .input("user_roleSystem", sql.VarChar, user_roleSystem)
    .input("user_email", sql.VarChar, user_email)
    .input("user_password", sql.VarChar, user_password)
    .input("user_id", sql.Int, user_id)
    .input("user_status", sql.Bit, user_status)
    .query(queries.updateUserById);

  res.json({
    user_name,
    user_lastname,
    user_position,
    user_roleSystem,
    user_email,
    user_password,
    user_status,
  });
};

export const loginUser = async (req, res) => {
  const { user_email, user_password } = req.body;

  if (!user_email || !user_password) {
    return res.send({ message: "Bad Request. Please fill all fields" });
  }

  const user = await getUserByEmail(user_email);

  if (!user || user.user_status == 0) {
    return res.status(404).send({ message: "User not found or Inactive" });
  }

  const validPassword = await bcrypt.compare(user_password, user.user_password);
  if (!validPassword) {
    return res.status(401).send({ message: "Invalid password" });
  }

  // const role = await getUserRole(user.user_id);

  const token = jwt.sign(
    {
      id: user.user_id,
      email: user.user_email,
      name: user.user_name,
      lastname: user.user_lastname,
      position: user.user_position,
      roleSystem: user.user_roleSystem,
      // role: role,
    },
    "QsdjqhUzErrM6Gzk9S31gSjggCJ2nHv+lU6IFpo57yk="
  );

  res.json(token);
};

export const getUserRoleForProcess = async (req, res) => {
  const { user_id, process_id } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("process_id", sql.VarChar, process_id)
      .query(queries.getUserRoleForProcess);

    const role = result.recordset[0].role_id;
    res.json(role);
    return role;
  } catch (error) {
    res.json({ msg: error });
  }
};
