const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/tasks");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/tasks", taskRoutes);

// health check
app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(5000, "0.0.0.0", () => {
  console.log("🚀 Server running on port 5000");
});
