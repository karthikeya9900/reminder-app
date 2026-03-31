const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Temporary in-memory storage
let tasks = [
  {
    id: Date.now(),
    title: "Learn Docker",
    urgent: true,
    important: true,
    completed: false,
    createdAt: new Date(),
  },
  {
    id: Date.now() + 1,
    title: "Build Reminder App",
    urgent: false,
    important: true,
    completed: false,
    createdAt: new Date(),
  },
];

// 🔹 GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// 🔹 POST new task
app.post("/tasks", (req, res) => {
  const { title, urgent, important } = req.body;

  const newTask = {
    id: Date.now(),
    title,
    urgent: urgent ?? false,
    important: important ?? false,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 🔹 UPDATE task
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  // Update only if provided
  if (req.body.title !== undefined) {
    task.title = req.body.title;
  }

  if (req.body.completed !== undefined) {
    task.completed = req.body.completed;
  }

  if (req.body.urgent !== undefined) {
    task.urgent = req.body.urgent;
  }

  if (req.body.important !== undefined) {
    task.important = req.body.important;
  }

  res.json(task);
});

// 🔹 DELETE task
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const index = tasks.findIndex((t) => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(index, 1);

  res.json({ message: "Task deleted successfully" });
});

// 🔹 Start server
app.listen(1000, () => {
  console.log("Server running on port 1000");
});
