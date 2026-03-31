const API_URL = "http://localhost:1000/tasks";

window.onload = () => {
  fetchTasks();

  // Add button event
  document.getElementById("addBtn").addEventListener("click", addTask);
};

// 🔹 Fetch tasks and render into 4 boxes
async function fetchTasks() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const uiBox = document.querySelector("#urgent-important .task-list");
    const iuBox = document.querySelector("#important-not-urgent .task-list");
    const uiNotBox = document.querySelector("#urgent-not-important .task-list");
    const noneBox = document.querySelector(
      "#not-urgent-not-important .task-list",
    );

    // Clear all boxes
    uiBox.innerHTML = "";
    iuBox.innerHTML = "";
    uiNotBox.innerHTML = "";
    noneBox.innerHTML = "";

    data.forEach((task) => {
      const taskElement = createTaskElement(task);

      if (task.urgent && task.important) {
        uiBox.appendChild(taskElement);
      } else if (!task.urgent && task.important) {
        iuBox.appendChild(taskElement);
      } else if (task.urgent && !task.important) {
        uiNotBox.appendChild(taskElement);
      } else {
        noneBox.appendChild(taskElement);
      }
    });
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
}

// 🔹 Create task UI
function createTaskElement(task) {
  const li = document.createElement("li");

  const leftDiv = document.createElement("div");

  const span = document.createElement("span");
  span.textContent = task.title;
  span.className = task.completed ? "completed" : "pending";

  leftDiv.appendChild(span);

  const rightDiv = document.createElement("div");

  // Toggle
  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "Toggle";
  toggleBtn.addEventListener("click", () => {
    toggleTask(task.id, task.completed);
  });

  // Delete
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    deleteTask(task.id);
  });

  // Edit
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => {
    enableEditMode(task, li, leftDiv, rightDiv);
  });

  rightDiv.appendChild(toggleBtn);
  rightDiv.appendChild(editBtn);
  rightDiv.appendChild(deleteBtn);

  li.appendChild(leftDiv);
  li.appendChild(rightDiv);

  return li;
}

// 🔹 Enable Edit Mode
function enableEditMode(task, li, leftDiv, rightDiv) {
  leftDiv.innerHTML = "";

  const input = document.createElement("input");
  input.value = task.title;

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";

  input.focus();

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveBtn.click();
    if (e.key === "Escape") cancelBtn.click();
  });

  leftDiv.appendChild(input);
  leftDiv.appendChild(saveBtn);
  leftDiv.appendChild(cancelBtn);

  // Save
  saveBtn.addEventListener("click", async () => {
    const newTitle = input.value.trim();
    if (!newTitle) return;

    await fetch(`${API_URL}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });

    fetchTasks();
  });

  // Cancel
  cancelBtn.addEventListener("click", () => {
    fetchTasks();
  });
}

// 🔹 Add Task
async function addTask() {
  const input = document.getElementById("taskInput");
  const urgent = document.getElementById("urgent").checked;
  const important = document.getElementById("important").checked;

  const title = input.value.trim();
  if (!title) return;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        urgent,
        important,
      }),
    });

    input.value = "";
    document.getElementById("urgent").checked = false;
    document.getElementById("important").checked = false;

    fetchTasks();
  } catch (err) {
    console.error("Error adding task:", err);
  }
}

// 🔹 Toggle Task
async function toggleTask(id, completed) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !completed,
      }),
    });

    fetchTasks();
  } catch (err) {
    console.error("Error updating task:", err);
  }
}

// 🔹 Delete Task
async function deleteTask(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    fetchTasks();
  } catch (err) {
    console.error("Error deleting task:", err);
  }
}
