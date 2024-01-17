import express from "express";
import cors from "cors";
import config from "./config.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();

app.use(cors());
app.set("port", config.port || 3000);

app.get("/", (req, res) => {
  res.send("API is running on port " + app.get("port"));
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(usersRoutes);

app.listen(app.get("port"), () => {
  console.log("Server running on port " + app.get("port"));
});
