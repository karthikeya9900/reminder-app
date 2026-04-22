const db = require("../db");

// 🔹 GET all tasks
exports.getTasks = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tasks ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🔹 CREATE task
exports.createTask = async (req, res) => {
  try {
    const { title, deadline, urgent, important } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }

    const cleanDeadline = deadline && deadline.trim() !== "" ? deadline : null;

    // ✅ Deadline validation
    if (cleanDeadline) {
      const today = new Date();
      const selected = new Date(cleanDeadline);
      today.setHours(0, 0, 0, 0);
      selected.setHours(0, 0, 0, 0);

      if (selected < today) {
        return res.status(400).json({ error: "Invalid deadline" });
      }
    }

    const result = await db.query(
      `INSERT INTO tasks (title, urgent, important, deadline)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, urgent, important, cleanDeadline],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🔹 UPDATE task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, urgent, important, completed } = req.body;

    await db.query(
      `UPDATE tasks SET
        title = COALESCE($1, title),
        urgent = COALESCE($2, urgent),
        important = COALESCE($3, important),
        completed = COALESCE($4, completed),
        completedAt = CASE
          WHEN $4 = true THEN NOW()
          WHEN $4 = false THEN NULL
          ELSE completedAt
        END
      WHERE id = $5`,
      [title, urgent, important, completed, id],
    );

    res.json({ message: "updated" });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🔹 DELETE task
exports.deleteTask = async (req, res) => {
  try {
    await db.query("DELETE FROM tasks WHERE id=$1", [req.params.id]);
    res.json({ message: "deleted" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
