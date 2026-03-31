# 📝 Reminder App Project Notes

## 📌 Project Overview

The **Reminder App** is a task management system where users can:

* Create and manage tasks
* Classify tasks based on urgency and importance
* Track deadlines
* Separate pending and completed tasks
* Maintain logs for all actions

---

## 🎯 Project Goals

* Build a **full-stack application**
* Understand **CRUD operations**
* Learn **database design**
* Gain hands-on experience with **Docker**
* Understand **multi-container architecture**

---

## 🧠 Core Features

### ✅ Task Management

* Create task
* View tasks
* Update task
* Delete task

---

### ✅ Task Properties

Each task contains:

* `id`
* `title`
* `description`
* `urgent` (boolean)
* `important` (boolean)
* `deadline` (optional)
* `created_at`
* `updated_at`

---

### ✅ Task Status Handling

* Only **pending tasks** are shown in main view
* Completed tasks are stored separately

---

### ✅ Completed Tasks

* Stored in a separate table
* Include:

  * all task fields
  * `completed_at`

---

### ✅ Activity Logging

Every action is logged:

* Task creation
* Task update
* Task deletion
* Task completion

---

## 🧱 Database Design

### 🔹 `tasks` (Active Tasks)

* id
* title
* description
* urgent
* important
* deadline
* created_at
* updated_at

---

### 🔹 `completed_tasks`

* id
* title
* description
* urgent
* important
* deadline
* created_at
* updated_at
* completed_at

---

### 🔹 `activity_logs`

* id
* action (CREATE / UPDATE / DELETE / COMPLETE)
* task_id
* timestamp

---

## 🔄 Workflow Logic

### ✔ Creating Task

* Insert into `tasks`
* Add entry in `activity_logs`

### ✔ Updating Task

* Update `tasks`
* Update `updated_at`
* Add log entry

### ✔ Completing Task

* Move data from `tasks` → `completed_tasks`
* Add `completed_at`
* Insert log entry

### ✔ Deleting Task

* Remove from `tasks`
* Add log entry

---

## 🧱 Project Structure

```
reminder-app/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── services/
│   │   ├── middlewares/
│   │   └── utils/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── js/
│   │   ├── css/
│   │   └── assets/
│   └── Dockerfile
│
├── database/
│   ├── init.sql
│   └── seed.sql
│
├── docker/
├── docker-compose.yml
├── .env
└── README.md
```

---

## 🧪 Development Approach (Hybrid)

### Step 1: Backend (Basic API)

* Create simple API with dummy data

### Step 2: Frontend

* Fetch and display data from backend

### Step 3: Backend Expansion

* Add database
* Replace dummy data with real data

---

## 🐳 Docker Plan

### Containers:

* Backend (Node.js)
* Frontend (Static files)
* Database (PostgreSQL)

---

### Key Concepts:

* Container networking
* Environment variables
* Volume management
* Multi-container setup using Docker Compose

---

## 📡 API Design (Planned)

### Tasks

* `GET /tasks`
* `POST /tasks`
* `PUT /tasks/:id`
* `DELETE /tasks/:id`

---

### Completion

* `POST /tasks/:id/complete`

---

### Completed Tasks

* `GET /completed-tasks`

---

### Logs

* `GET /logs`

---

### System Info (Docker Learning)

* `GET /system-info`

---

## 🧠 Key Learnings from This Project

* Backend architecture design
* Database normalization
* API development
* Frontend-backend integration
* Docker containerization
* Debugging real-world issues

---

## 🚀 Current Progress

* Project idea finalized ✅
* Folder structure created ✅
* Backend initialization started ✅
* First API (dummy data) planned ✅
* Frontend integration planned ✅

---

## 📌 Next Steps

* Fix backend execution issue
* Run basic server
* Create `/tasks` API
* Build frontend to display tasks
* Connect backend to database# 📝 Reminder App Project Notes

## 📌 Project Overview

The **Reminder App** is a task management system where users can:

* Create and manage tasks
* Classify tasks based on urgency and importance
* Track deadlines
* Separate pending and completed tasks
* Maintain logs for all actions

---

# BREAK
---

# 🗂️ Reminder App – ER Diagram

## 📌 Entities

### 1. Task (Active Tasks)

* id (PK)
* title
* description
* urgent (boolean)
* important (boolean)
* deadline (timestamp)
* created_at (timestamp)
* updated_at (timestamp)

---

### 2. Completed_Task

* id (PK)
* title
* description
* urgent (boolean)
* important (boolean)
* deadline (timestamp)
* created_at (timestamp)
* updated_at (timestamp)
* completed_at (timestamp)

---

### 3. Activity_Log

* id (PK)
* action (CREATE / UPDATE / DELETE / COMPLETE)
* task_id (FK)
* timestamp

---

## 🔗 Relationships

### Task → Activity_Log

* One Task can have many logs
* Relationship: **1 : N**

---

### Completed_Task → Activity_Log

* One Completed Task can have many logs
* Relationship: **1 : N**

---

## 🧠 ER Diagram (Text Representation)

```id="p7r3g2"
        +----------------+
        |     Task       |
        +----------------+
        | id (PK)        |
        | title          |
        | description    |
        | urgent         |
        | important      |
        | deadline       |
        | created_at     |
        | updated_at     |
        +----------------+
               |
               | 1
               |
               |------< (N)
               |
        +-------------------+
        |   Activity_Log    |
        +-------------------+
        | id (PK)           |
        | action            |
        | task_id (FK)      |
        | timestamp         |
        +-------------------+

               ^
               |
               |
               | 1
               |
               |------< (N)
               |
        +----------------------+
        |   Completed_Task     |
        +----------------------+
        | id (PK)              |
        | title                |
        | description          |
        | urgent               |
        | important            |
        | deadline             |
        | created_at           |
        | updated_at           |
        | completed_at         |
        +----------------------+
```

---

## ⚡ Important Design Notes

### 🔹 1. Task vs Completed_Task

* Separated for clarity and performance
* Keeps active tasks table clean

---

### 🔹 2. Activity Logs

* Tracks all actions
* Helps in debugging and auditing

---

### 🔹 3. task_id in logs

* Refers to task (or completed task)
* Can be improved later with:

  * `entity_type` (advanced)

---

## 🚀 Future Improvements (Optional)

* Add `user` table (multi-user system)
* Add `priority_score`
* Add `status` instead of separate tables (alternative design)

---
