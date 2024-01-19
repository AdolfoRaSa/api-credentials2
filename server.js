import express from "express";
import cors from "cors";
import config from "./config.js";
import usersRoutes from "./routes/users.routes.js";
import processesRoutes from "./routes/processes.routes.js";

const app = express();

app.use(cors());
app.set("port", config.port || 3000);

app.get("/", (req, res) => {
  const body = "testdata";

  res.append("Content-Type", "application/json");
  res.append("Access-Control-Allow-Origin", "*");
  res.append("connection", "keep-alive");
  res.status(200).send(body);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(usersRoutes);
app.use(processesRoutes);

app.listen(app.get("port"), () => {
  console.log("Server running on port " + app.get("port"));
});
