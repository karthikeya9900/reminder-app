const express = require("express");
const cors = require("cors");
const pool = require("./db.js");

const app = express();

app.use(cors());
app.use(express.json());

// 🔹 Helper to serialize dates (clean API response)
function serializeTask(task) {
  return {
    ...task,
    createdAt: task.createdAt?.toISOString(),
    completedAt: task.completedAt?.toISOString(),
    deadline: task.deadline?.toISOString(),
  };
}

// Temporary in-memory storage
// let tasks = [
//   {
//     id: Date.now(),
//     title: "Learn Docker",
//     urgent: true,
//     important: true,
//     completed: false,
//     completedAt: null,
//     createdAt: new Date(),
//     deadline: null, // ✅ added
//   },
//   {
//     id: Date.now() + 1,
//     title: "Build Reminder App",
//     urgent: false,
//     important: true,
//     completed: false,
//     completedAt: null,
//     createdAt: new Date(),
//     deadline: null, // ✅ added
//   },
// ];

// 🔹 GET all tasks
app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});
// 🔹 POST new task
app.post("/tasks", async (req, res) => {
  try {
    const { title, urgent, important, deadline } = req.body;

    const result = await pool.query(
      `INSERT INTO tasks (title, urgent, important, deadline)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, urgent ?? false, important ?? false, deadline || null],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// 🔹 UPDATE task
app.put("/tasks/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, urgent, important, completed, completedAt, deadline } =
      req.body;

    const result = await pool.query(
      `UPDATE tasks SET
        title = COALESCE($1, title),
        urgent = COALESCE($2, urgent),
        important = COALESCE($3, important),
        completed = COALESCE($4, completed),
        completed_at = $5,
        deadline = COALESCE($6, deadline)
       WHERE id = $7
       RETURNING *`,
      [
        title,
        urgent,
        important,
        completed,
        completed ? completedAt || new Date() : null,
        deadline,
        id,
      ],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// 🔹 DELETE task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// 🔹 Start server
app.listen(1000, () => {
  console.log("Server running on port 1000");
});
