# 📝 Reminder App

## 📌 Project Overview

The **Reminder App** is a task management system based on the **Urgent–Important Matrix (Eisenhower Matrix)**.

Users can:

- Create and manage tasks
- Classify tasks into 4 priority categories
- Track deadlines (optional)
- See remaining days dynamically
- Mark tasks as completed
- View completed tasks separately

---

## 🎯 Core Features

### ✅ Task Management

- Create task
- View tasks
- Update task
- Delete task

---

### ✅ Task Classification (Matrix)

Tasks are automatically grouped into:

| Category     | Condition                  |
| ------------ | -------------------------- |
| 🔥 Do Now    | Urgent + Important         |
| 📅 Plan      | Important, Not Urgent      |
| 🤝 Delegate  | Urgent, Not Important      |
| ❌ Eliminate | Not Urgent + Not Important |

---

### ✅ Task Properties

Each task contains:

- `id`
- `title`
- `urgent` (boolean)
- `important` (boolean)
- `deadline` (optional date)
- `createdAt`
- `completed` (boolean)
- `completedAt`

---

### ✅ Deadline Tracking (NEW ✨)

- User can optionally set a deadline
- App calculates:
  - 📅 Days left
  - ⏳ Due today
  - ⚠️ Overdue
- Visual indicators:
  - Red → Overdue
  - Orange → Due today
  - Yellow → Near deadline

---

### ✅ Completed Tasks

- Stored in same structure (for now)
- Moved to separate section in UI
- Includes completion timestamp

---

## 🧠 UI/UX Design

### 🔹 Layout

- 4 **equal-sized boxes (matrix layout)**
- Fixed height → minimal scrolling
- Scroll only inside each box

### 🔹 Design Principles

- Minimal spacing
- Compact task cards
- Clean typography
- Soft shadows + subtle colors

---

## 🧱 Current Tech Stack

### 🔹 Frontend

- HTML
- CSS (custom + Bootstrap)
- Vanilla JavaScript

### 🔹 Backend

- Node.js
- Express.js

### 🔹 Storage

- In-memory (temporary)

---

## 📡 API Endpoints

### Tasks

- `GET /tasks` → Fetch all tasks
- `POST /tasks` → Create task
- `PUT /tasks/:id` → Update task
- `DELETE /tasks/:id` → Delete task

---

## 🔄 Workflow Logic

### ✔ Create Task

- Stored in memory
- Appears in matrix instantly

### ✔ Update Task

- Updates title / priority / deadline

### ✔ Complete Task

- Marked as completed
- Moves to completed section

### ✔ Delete Task

- Removed from system

---

## 🧪 Current Limitations

- ❌ No database (data lost on restart)
- ❌ No authentication
- ❌ No persistent logs
- ❌ No multi-user support

---

## 🚀 Next Steps

### 🔥 High Priority

- Add **database (PostgreSQL)**
- Persist tasks
- Add proper schema

### ⚡ Medium Priority

- Activity logs
- Edit deadline support
- Sorting (by urgency / deadline)

### 🧠 Advanced

- Dockerize app
- Multi-container setup
- Add user system

---

## 🐳 Future Docker Plan

Containers:

- Backend (Node.js)
- Frontend (Static)
- Database (PostgreSQL)

Concepts to learn:

- Docker Compose
- Networking
- Volumes

---

## 📂 Project Structure (Planned)
```
reminder-app/
│
├── backend/
├── frontend/
├── database/
├── docker-compose.yml
└── README.md
```