import express from "express";
import cors from "cors";
import config from "./config.js";
import usersRoutes from "./routes/users.routes.js";
import processesRoutes from "./routes/processes.routes.js";
import documentsRoutes from "./routes/documents.routes.js";
import instructionsRoutes from "./routes/instructions.routes.js";
import registersRoutes from "./routes/registers.routes.js";
import indicatorsRoutes from "./routes/indicators.routes.js";
import risksRoutes from "./routes/risks.routes.js";
import uploadsRoutes from "./routes/uploads.routes.js";
import user_processRoutes from "./routes/user_process.routes.js";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.set("port", config.port || 4000);

app.get("/", (req, res) => {
  const body = "API to connect with SGC database";

  res.append("Content-Type", "application/json");
  res.append("Access-Control-Allow-Origin", "*");
  res.append("connection", "keep-alive");
  res.status(200).send(body);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(usersRoutes);
app.use(processesRoutes);
app.use(documentsRoutes);
app.use(instructionsRoutes);
app.use(registersRoutes);
app.use(indicatorsRoutes);
app.use(risksRoutes);
app.use(uploadsRoutes);
app.use(user_processRoutes);

app.listen(app.get("port"), () => {
  console.log("Server running on port " + app.get("port"));
});
