const API_URL = "http://localhost:1000/tasks";

window.onload = () => {
  fetchTasks();

  // Add button event
  document.getElementById("addBtn").addEventListener("click", addTask);
};

function addEmptyState(box) {
  if (!box.hasChildNodes()) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No tasks";
    box.appendChild(empty);
  }
}

// 🔹 Fetch tasks and render into 4 boxes
async function fetchTasks() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const uiBox = document.getElementById("urgent-important");
    const iuBox = document.getElementById("important-not-urgent");
    const uiNotBox = document.getElementById("urgent-not-important");
    const noneBox = document.getElementById("not-urgent-not-important");
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
    addEmptyState(uiBox);
    addEmptyState(iuBox);
    addEmptyState(uiNotBox);
    addEmptyState(noneBox);
    addEmptyState(completedList);
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
}

function getDeadlineText(deadline) {
  if (!deadline) return "";

  const today = new Date();
  const due = new Date(deadline);

  // Remove time part for accurate day diff
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "⏳ Due today";
  if (diffDays === 1) return "📅 1 day left";
  if (diffDays > 1) return `📅 ${diffDays} days left`;
  if (diffDays === -1) return "⚠️ Overdue by 1 day";

  return `⚠️ Overdue by ${Math.abs(diffDays)} days`;
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
  meta.style.color = "#999";
  meta.style.marginTop = "4px";
  let deadlineText = getDeadlineText(task.deadline);

  meta.textContent = `Urgent: ${task.urgent ? "Yes" : "No"}, Important: ${task.important ? "Yes" : "No"}`;

  if (deadlineText) {
    meta.textContent += ` | ${deadlineText}`;
  }
  if (task.completed && task.completedAt) {
    const completedTime = new Date(task.completedAt).toLocaleString();
    meta.textContent += ` | Completed At: ${completedTime}`;
  } else if (task.completed) {
    meta.textContent += ` | (timestamp unavailable)`;
  }

  leftDiv.appendChild(span);
  leftDiv.appendChild(meta);

  const rightDiv = document.createElement("div");
  rightDiv.className = "task-actions";

  // Buttons only for pending tasks
  if (!task.completed) {
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Complete";
    toggleBtn.className = "btn btn-success btn-sm";
    toggleBtn.addEventListener("click", () => {
      toggleTask(task.id, task.completed);
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "btn btn-info btn-sm";
    editBtn.addEventListener("click", () => {
      enableEditMode(task, li, leftDiv, rightDiv);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn btn-danger btn-sm";
    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });

    rightDiv.appendChild(toggleBtn);
    rightDiv.appendChild(editBtn);
    rightDiv.appendChild(deleteBtn);
  }

  if (task.deadline) {
    const today = new Date();
    const due = new Date(task.deadline);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      li.style.borderLeft = "4px solid #ef4444"; // red
    } else if (diffDays === 0) {
      li.style.borderLeft = "4px solid #f59e0b"; // orange
    } else if (diffDays <= 2) {
      li.style.borderLeft = "4px solid #eab308"; // yellow
    }
  }

  li.appendChild(leftDiv);
  li.appendChild(rightDiv);

  return li;
}

// 🔹 Enable Edit Mode
function enableEditMode(task, li, leftDiv, rightDiv) {
  leftDiv.innerHTML = "";
  rightDiv.innerHTML = "";

  const titleInput = document.createElement("input");
  titleInput.className = "form-control form-control-sm mb-2";
  titleInput.value = task.title;
  titleInput.placeholder = "Task title";

  const urgentLabel = document.createElement("label");
  urgentLabel.className = "form-check-label me-3";
  const urgentCheckbox = document.createElement("input");
  urgentCheckbox.type = "checkbox";
  urgentCheckbox.className = "form-check-input";
  urgentCheckbox.checked = task.urgent;
  urgentLabel.appendChild(urgentCheckbox);
  urgentLabel.appendChild(document.createTextNode(" Urgent"));

  const importantLabel = document.createElement("label");
  importantLabel.className = "form-check-label me-3";
  const importantCheckbox = document.createElement("input");
  importantCheckbox.type = "checkbox";
  importantCheckbox.className = "form-check-input";
  importantCheckbox.checked = task.important;
  importantLabel.appendChild(importantCheckbox);
  importantLabel.appendChild(document.createTextNode(" Important"));

  const checkboxDiv = document.createElement("div");
  checkboxDiv.className = "mb-2";
  checkboxDiv.appendChild(urgentLabel);
  checkboxDiv.appendChild(importantLabel);

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.className = "btn btn-success btn-sm";

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.className = "btn btn-secondary btn-sm ms-2";

  const buttonDiv = document.createElement("div");
  buttonDiv.className = "mt-2";
  buttonDiv.appendChild(saveBtn);
  buttonDiv.appendChild(cancelBtn);

  titleInput.focus();

  titleInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveBtn.click();
    if (e.key === "Escape") cancelBtn.click();
  });

  leftDiv.appendChild(titleInput);
  leftDiv.appendChild(checkboxDiv);
  leftDiv.appendChild(buttonDiv);

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
  const deadline = document.getElementById("deadline").value;

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
        deadline,
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
