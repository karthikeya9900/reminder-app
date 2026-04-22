const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// GET all tasks
app.get("/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
  res.json(result.rows);
});

// CREATE task
app.post("/tasks", async (req, res) => {
  const { title, urgent, important, deadline } = req.body;

  const result = await pool.query(
    "INSERT INTO tasks (title, urgent, important, deadline, completed) VALUES ($1,$2,$3,$4,false) RETURNING *",
    [title, urgent, important, deadline],
  );

  res.json(result.rows[0]);
});

// UPDATE task
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, urgent, important, completed, completedAt } = req.body;

  await pool.query(
    `UPDATE tasks
     SET title=$1, urgent=$2, important=$3, completed=$4, completedAt=$5
     WHERE id=$6`,
    [title, urgent, important, completed, completedAt, id],
  );

  res.json({ message: "updated" });
});

// DELETE task
app.delete("/tasks/:id", async (req, res) => {
  await pool.query("DELETE FROM tasks WHERE id=$1", [req.params.id]);
  res.json({ message: "deleted" });
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Backend running on 5000");
});
