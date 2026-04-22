# 📝 Reminder App

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![Backend](https://img.shields.io/badge/backend-Node.js-green)
![Frontend](https://img.shields.io/badge/frontend-HTML%2FCSS%2FJS-blue)
![Database](https://img.shields.io/badge/database-in%20memory-lightgrey)
![License](https://img.shields.io/badge/license-MIT-brightgreen)

A task management system built on the **Eisenhower (Urgent–Important) Matrix**, designed to help users prioritize tasks effectively and manage deadlines efficiently.

---

## 📌 Overview

The Reminder App helps users:

- Organize tasks using priority-based classification
- Track deadlines with real-time status indicators
- Visualize productivity using a 4-quadrant matrix
- Manage task lifecycle (create → update → complete → delete)

---

## 🎯 Features

### ✅ Task Management

- Create tasks
- Update tasks
- Delete tasks
- View all tasks

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

- Optional deadlines per task
- Automatic calculation:
  - Days remaining
  - Due today
  - Overdue detection

**Status Colors:**

- 🔴 Overdue
- 🟠 Due today
- 🟡 Near deadline

---

### ✔ Completed Tasks

- Mark tasks as completed
- Separate completed section
- Stores completion timestamp

---

## 🧠 Tech Stack

| Layer    | Technology             |
| -------- | ---------------------- |
| Frontend | HTML, CSS, JavaScript  |
| Styling  | Bootstrap + Custom CSS |
| Backend  | Node.js, Express.js    |
| Database | In-memory (temporary)  |

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

- ➕ Create task → added to matrix
- ✏️ Update task → modifies details
- ✔ Complete task → moves to completed section
- ❌ Delete task → removed permanently

---

## 🖼️ Screenshots

> Add screenshots in `/screenshots` folder

### 🏠 Dashboard (Matrix View)

![Dashboard](screenshots/dashboard.png)

### ➕ Create Task Modal

![Create Task](screenshots/create-task.png)

### 📅 Deadline Tracking View

![Deadline View](screenshots/deadline.png)

### ✔ Completed Tasks Section

![Completed Tasks](screenshots/completed.png)

---

## 🚧 Current Limitations

- ❌ No database persistence
- ❌ No authentication
- ❌ No multi-user support
- ❌ Data resets on server restart

---

## 🚀 Roadmap

### 🔥 Phase 1

- PostgreSQL integration
- Persistent storage
- Schema design

### ⚡ Phase 2

- Task sorting & filtering
- Activity logs
- Deadline editing

### 🧠 Phase 3

- User authentication
- Multi-user system
- Role-based access

---

## 🐳 Docker Plan

Planned architecture:

- Frontend (Nginx / Static)
- Backend (Node.js API)
- Database (PostgreSQL)

### Concepts

- Docker Compose
- Container networking
- Volumes for persistence

---

## 📂 Project Structure

```
reminder-app/
│
├── backend/ # Express backend
├── frontend/ # UI layer
├── database/ # DB schema (future)
├── screenshots/ # UI images
├── docker-compose.yml
└── README.md
```

---

## 💡 Vision

This project aims to evolve into a **scalable productivity system** with:

- Persistent data storage
- Clean modular architecture
- Multi-user collaboration
- Containerized deployment

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and feel free to contribute!