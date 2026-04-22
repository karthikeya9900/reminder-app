# 📝 Reminder App

![Status](https://img.shields.io/badge/status-active-success)
![Backend](https://img.shields.io/badge/backend-Node.js-green)
![Frontend](https://img.shields.io/badge/frontend-HTML%2FCSS%2FJS-blue)
![Database](https://img.shields.io/badge/database-PostgreSQL-blue)
![License](https://img.shields.io/badge/license-MIT-brightgreen)

A task management system based on the **Eisenhower (Urgent–Important) Matrix**, helping users prioritize tasks and track deadlines efficiently.

---

## 📌 Overview

The Reminder App allows users to:

- Organize tasks using priority classification
- Track deadlines with real-time indicators
- Manage tasks (create, update, complete, delete)
- Visualize tasks in a 4-quadrant productivity matrix

---

## 🎯 Features

### ✅ Task Management

- ➕ Create tasks
- ✏️ Update tasks
- ✔ Mark tasks as completed
- ❌ Delete tasks

---

### 📊 Eisenhower Matrix

| Category     | Condition                  |
| ------------ | -------------------------- |
| 🔥 Do Now    | Urgent + Important         |
| 📅 Plan      | Important, Not Urgent      |
| 🤝 Delegate  | Urgent, Not Important      |
| ❌ Eliminate | Not Urgent + Not Important |

---

### ⏳ Deadline Tracking

- Optional deadlines
- Smart indicators:
  - ⏳ Due today
  - 📅 Days remaining
  - ⚠️ Overdue

**Visual Indicators:**

- 🔴 Overdue
- 🟠 Due today
- 🟡 Near deadline

---

### ✔ Completed Tasks

- Separate completed section
- Automatic timestamp on completion
- Tasks move dynamically after completion

---

## 🧠 Tech Stack

| Layer    | Technology             |
| -------- | ---------------------- |
| Frontend | HTML, CSS, JavaScript  |
| Styling  | Bootstrap + Custom CSS |
| Backend  | Node.js, Express.js    |
| Database | PostgreSQL             |
| DevOps   | Docker, Docker Compose |

---

## 📡 API Endpoints

| Method | Endpoint   | Description   |
| ------ | ---------- | ------------- |
| GET    | /tasks     | Get all tasks |
| POST   | /tasks     | Create task   |
| PUT    | /tasks/:id | Update task   |
| DELETE | /tasks/:id | Delete task   |

---

## 🔄 Workflow

- ➕ Create → Task appears in matrix
- ✏️ Update → Task details modified
- ✔ Complete → Moves to completed section
- ❌ Delete → Removed permanently

---

## 🐳 Docker Setup

The application runs using **Docker Compose** with 3 services:

- **Frontend** → Nginx (serves static files)
- **Backend** → Node.js API
- **Database** → PostgreSQL

### ▶ Run the app

```bash
docker-compose up --build
```

---

🌐 Access

- **Frontend** http://localhost:3000
- **Backtend** http://localhost:5000

---

📂 Project Structure

```
reminder-app/
│
├── backend/ # Express API
├── frontend/ # Static UI (HTML/CSS/JS)
├── screenshots/ # UI images
├── docker-compose.yml
└── README.md
```
