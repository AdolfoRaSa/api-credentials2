import { getConnection } from "../database/connection.js";
import { risksQueries as queries } from "../database/queries.js";
import sql from "mssql";

export const getAllRisks = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllRisks);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getAllRisksByProcedureId = async (req, res) => {
  const { document_id } = req.params;

  if (!document_id) {
    return res
      .status(400)
      .json({ message: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("document_id", sql.VarChar, document_id)
      .query(queries.getAllRisksByProcedureId);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewRisk = async (req, res) => {
  const {
    risk_code,
    risk_activity,
    risk_description,
    risk_type,
    risk_factor,
    risk_consequence,
    risk_probability,
    risk_impact,
    risk_quadrant,
    risk_administration,
    risk_controls,
    risk_controlType,
    risk_controlActivity,
    risk_responsible,
    risk_startDate,
    risk_finishDate,
    document_id,
    user_id,
  } = req.body;

  if (
    !risk_code ||
    !risk_activity ||
    !risk_description ||
    !risk_type ||
    !risk_factor ||
    !risk_consequence ||
    !risk_probability ||
    !risk_impact ||
    !risk_quadrant ||
    !risk_administration ||
    !risk_controls ||
    !risk_controlType ||
    !risk_controlActivity ||
    !risk_responsible ||
    !risk_startDate ||
    !risk_finishDate ||
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
      .input("risk_code", sql.VarChar, risk_code)
      .input("risk_activity", sql.VarChar, risk_activity)
      .input("risk_description", sql.VarChar, risk_description)
      .input("risk_type", sql.VarChar, risk_type)
      .input("risk_factor", sql.VarChar, risk_factor)
      .input("risk_consequence", sql.VarChar, risk_consequence)
      .input("risk_probability", sql.VarChar, risk_probability)
      .input("risk_impact", sql.VarChar, risk_impact)
      .input("risk_quadrant", sql.VarChar, risk_quadrant)
      .input("risk_administration", sql.VarChar, risk_administration)
      .input("risk_controls", sql.VarChar, risk_controls)
      .input("risk_controlType", sql.VarChar, risk_controlType)
      .input("risk_controlActivity", sql.VarChar, risk_controlActivity)
      .input("risk_responsible", sql.VarChar, risk_responsible)
      .input("risk_startDate", sql.VarChar, risk_startDate)
      .input("risk_finishDate", sql.VarChar, risk_finishDate)
      .input("document_id", sql.VarChar, document_id)
      .input("user_id", sql.Int, user_id)
      .query(queries.addNewRisk);

    res.json({
      message: "Risk created successfully",
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
