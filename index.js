import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/users", (req, res) => {
  res.send("Obteniendo usuarios");
});

app.get("/users/:id", (req, res) => {
  res.send(`Obteniendo usuario ${req.params.id}`);
});

app.post("/users", (req, res) => {
  res.send("Creando usuario");
});

app.put("/users/:id", (req, res) => {
  res.send(`Actualizando usuario ${req.params.id}`);
});

app.delete("/users/:id", (req, res) => {
  res.send(`Eliminando usuario ${req.params.id}`);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
