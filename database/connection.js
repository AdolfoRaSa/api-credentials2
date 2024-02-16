import sql from "mssql";
import config from "../config.js";

const dbSettings = {
  user: "adramirezsa",
  password: "gHvc$3.Sr!",
  server: "SCC-ISSEG",
  database: "sgc",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export async function getConnection() {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.log(error);
  }
}
