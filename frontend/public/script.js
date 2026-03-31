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
    const completedList = document.getElementById("completed-task-list");

    // Clear all boxes
    uiBox.innerHTML = "";
    iuBox.innerHTML = "";
    uiNotBox.innerHTML = "";
    noneBox.innerHTML = "";
    completedList.innerHTML = "";

    data.forEach((task) => {
      const taskElement = createTaskElement(task);

      if (task.completed) {
        completedList.appendChild(taskElement);
        return;
      }

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
  span.className = task.completed ? "completed" : "pending"; // completed task gets light opacity

  const meta = document.createElement("small");
  meta.style.display = "block";
  meta.style.fontSize = "0.78rem";
  meta.style.color = "#666";
  meta.textContent = `Urgent: ${task.urgent ? "Yes" : "No"}, Important: ${task.important ? "Yes" : "No"}`;

  leftDiv.appendChild(span);
  leftDiv.appendChild(meta);

  const rightDiv = document.createElement("div");

  // Buttons only for pending tasks
  if (!task.completed) {
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Complete";
    toggleBtn.addEventListener("click", () => {
      toggleTask(task.id, task.completed);
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      enableEditMode(task, li, leftDiv, rightDiv);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });

    rightDiv.appendChild(toggleBtn);
    rightDiv.appendChild(editBtn);
    rightDiv.appendChild(deleteBtn);
  }

  li.appendChild(leftDiv);
  li.appendChild(rightDiv);

  return li;
}

// 🔹 Enable Edit Mode
function enableEditMode(task, li, leftDiv, rightDiv) {
  leftDiv.innerHTML = "";
  rightDiv.innerHTML = "";
  const lineSpace = document.createElement("hr");
  const lineBreak = document.createElement("br");

  const titleInput = document.createElement("input");
  titleInput.value = task.title;

  const urgentCheckbox = document.createElement("input");
  urgentCheckbox.type = "checkbox";
  urgentCheckbox.checked = task.urgent;
  const urgentLabel = document.createElement("label");
  urgentLabel.textContent = "Urgent";
  urgentLabel.style.marginRight = "10px";

  const importantCheckbox = document.createElement("input");
  importantCheckbox.type = "checkbox";
  importantCheckbox.checked = task.important;
  const importantLabel = document.createElement("label");
  importantLabel.textContent = "Important";

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";

  titleInput.focus();

  titleInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveBtn.click();
    if (e.key === "Escape") cancelBtn.click();
  });

  leftDiv.appendChild(titleInput);
  leftDiv.appendChild(lineBreak);
  leftDiv.appendChild(urgentCheckbox);
  leftDiv.appendChild(urgentLabel);
  leftDiv.appendChild(lineBreak);
  leftDiv.appendChild(importantCheckbox);
  leftDiv.appendChild(importantLabel);
  leftDiv.appendChild(lineSpace);
  leftDiv.appendChild(saveBtn);
  leftDiv.appendChild(cancelBtn);

  // Save
  saveBtn.addEventListener("click", async () => {
    const newTitle = titleInput.value.trim();
    if (!newTitle) return;

    await fetch(`${API_URL}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        urgent: urgentCheckbox.checked,
        important: importantCheckbox.checked,
      }),
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

  if (!urgent && !important) {
    const confirmNoPriority = window.confirm(
      "You did not select Urgent or Important. Add as low priority?",
    );
    if (!confirmNoPriority) return;
  }

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
    if (!completed) {
      const confirmComplete = window.confirm("Mark this task as completed?");
      if (!confirmComplete) return;
    }

    const updatePayload = { completed: !completed };
    if (!completed) {
      updatePayload.completedAt = new Date().toISOString();
    } else {
      updatePayload.completedAt = null;
    }

    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePayload),
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
