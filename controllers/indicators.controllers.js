import { getConnection } from "../database/connection.js";
import { indicatorsQueries as queries } from "../database/queries.js";
import sql from "mssql";

export const getAllIndicators = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllIndicators);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewIndicator = async (req, res) => {
  const {
    indicator_activity,
    indicator_name,
    indicator_goal,
    indicator_measureMode,
    indicator_charControl,
    indicator_frequency,
    indicator_document,
    indicator_responsible,
    document_id,
    user_id,
  } = req.body;

  if (
    !indicator_activity ||
    !indicator_name ||
    !indicator_goal ||
    !indicator_measureMode ||
    !indicator_charControl ||
    !indicator_frequency ||
    !indicator_document ||
    !indicator_responsible ||
    !document_id ||
    !user_id
  ) {
    return res
      .status(400)
      .json({ message: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("indicator_activity", sql.VarChar, indicator_activity)
      .input("indicator_name", sql.VarChar, indicator_name)
      .input("indicator_goal", sql.VarChar, indicator_goal)
      .input("indicator_measureMode", sql.VarChar, indicator_measureMode)
      .input("indicator_charControl", sql.VarChar, indicator_charControl)
      .input("indicator_frequency", sql.VarChar, indicator_frequency)
      .input("indicator_document", sql.VarChar, indicator_document)
      .input("indicator_responsible", sql.VarChar, indicator_responsible)
      .input("document_id", sql.VarChar, document_id)
      .input("user_id", sql.Int, user_id)
      .query(queries.addNewIndicator);

    res.json({
      message: "Indicator created successfully",
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
