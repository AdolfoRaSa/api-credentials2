import { getConnection } from "../database/connection.js";
import { uploadsQueries as queries } from "../database/queries.js";
import sql from "mssql";

export const getAllUploads = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllUploads);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewUpload = async (req, res) => {
  const {
    upload_name,
    upload_newname,
    document_id,
    carpeta_proceso,
    carpeta_doc,
    filetype_id,
  } = req.body;

  if (
    !upload_name ||
    !upload_newname ||
    !document_id ||
    !filetype_id ||
    !carpeta_doc
  ) {
    return res
      .status(400)
      .json({ message: "Bad Request. Please fill all fields" });
  }

  let carpeta_tipo_doc = "hola";

  if (carpeta_doc === 1) {
    carpeta_tipo_doc = "Procesos";
  } else if (carpeta_doc === 2) {
    carpeta_tipo_doc = "Procedimientos";
  } else if (carpeta_doc === 3) {
    carpeta_tipo_doc = "Lineamientos";
  } else if (carpeta_doc === 4) {
    carpeta_tipo_doc = "Guías";
  } else if (carpeta_doc === 5) {
    carpeta_tipo_doc = "Instructivos";
  } else if (carpeta_doc === 6) {
    carpeta_tipo_doc = "Registros";
  } else if (carpeta_doc === 7) {
    carpeta_tipo_doc = "Diagramas de Flujo";
  } else {
    carpeta_tipo_doc = "adiós";
  }

  const upload_path = `C:/DocsSGC/${carpeta_proceso}/${carpeta_tipo_doc}/${upload_newname}`;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("upload_name", sql.VarChar, upload_name)
      .input("upload_newname", sql.VarChar, upload_newname)
      .input("upload_path", sql.VarChar, upload_path)
      .input("document_id", sql.VarChar, document_id)
      .input("filetype_id", sql.Int, filetype_id)
      .query(queries.addNewUpload);

    res.json({
      upload_name,
      upload_newname,
      upload_path,
      document_id,
      filetype_id,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
