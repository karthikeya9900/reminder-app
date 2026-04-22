const express = require("express");
const cors = require("cors");

const { Pool } = require("pg");

const db = new Pool({
  host: process.env.DB_HOST, // db (from docker-compose)
  user: process.env.DB_USER, // postgres
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, // 5432
});

const app = express();
app.use(cors());
app.use(express.json());

// GET all tasks
app.get("/tasks", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tasks ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// CREATE task
app.post("/tasks", async (req, res) => {
  try {
    const { title, deadline, urgent, important } = req.body;

    const cleanDeadline = deadline && deadline.trim() !== "" ? deadline : null;

    if (deadline && new Date(deadline) < new Date().setHours(0, 0, 0, 0)) {
      return res.status(400).json({ error: "Invalid deadline" });
    }

    const result = await db.query(
      "INSERT INTO tasks (title, urgent, important, deadline) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, urgent, important, cleanDeadline],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE task
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, urgent, important, completed, completedAt } = req.body;

    await db.query(
      `UPDATE tasks SET
        title = COALESCE($1, title),
        urgent = COALESCE($2, urgent),
        important = COALESCE($3, important),
        completed = COALESCE($4, completed),
        completedAt = COALESCE($5, completedAt)
      WHERE id = $6`,
      [title, urgent, important, completed, completedAt, id],
    );

    res.json({ message: "updated" });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE task
app.delete("/tasks/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM tasks WHERE id=$1", [req.params.id]);
    res.json({ message: "deleted" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Backend running on 5000");
});
