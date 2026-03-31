# 📝 Reminder App – Day 1 Notes

## 🚀 What We Completed Today

### 🔹 1. Project Planning

* Finalized project idea: **Reminder App**
* Defined features:

  * Task creation
  * Urgent & Important classification
  * Deadline (planned)
  * Separate completed tasks
  * Activity logging

---

### 🔹 2. Folder Structure Setup

```bash
reminder-app/
│
├── backend/
├── frontend/
├── database/
├── docker/
│
├── docker-compose.yml
├── .env
└── README.md
```

---

### 🔹 3. Backend Initialization

* Installed Node.js
* Initialized project using:

```cmd
npm init -y
```

* Installed dependencies:

```cmd
npm install express cors
```

---

### 🔹 4. Fixed Environment Issues

* Resolved **PowerShell execution policy error**
* Learned:

  * Difference between PowerShell & CMD
  * Using `npm.cmd` as workaround

---

### 🔹 5. Basic Express Server

* Created `server.js`
* Started backend server successfully

---

### 🔹 6. Created First API

#### GET `/tasks`

* Returned dummy task data

---

### 🔹 7. Frontend Setup

* Created simple `index.html`
* Fetched data from backend using `fetch()`
* Displayed tasks in browser

---

### 🔹 8. Full Stack Connection

* Connected frontend ↔ backend
* Verified data rendering

---

### 🔹 9. Added POST API

#### POST `/tasks`

* Added new tasks from UI
* Used in-memory storage (temporary)

---

### 🔹 10. Frontend Interaction

* Created form:

  * Task title
  * Urgent checkbox
  * Important checkbox
* Successfully added tasks dynamically

---

## 🧠 Key Concepts Learned

* Express server setup
* REST APIs (GET, POST)
* Frontend-backend communication
* Fetch API usage
* JSON handling
* Debugging environment issues
* Basic project structuring

---

## ⚠️ Current Limitations

* Data stored in memory ❌
* Data lost on server restart ❌
* No database connection yet ❌

---

## 🎯 What We Will Do Next (Day 2 Plan)

### 🔹 1. PostgreSQL Setup

* Install PostgreSQL
* Create database:

```sql
CREATE DATABASE reminder_db;
```

---

### 🔹 2. Table Creation

```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title TEXT,
    urgent BOOLEAN,
    important BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 🔹 3. Backend → DB Connection

* Install:

```cmd
npm install pg
```

* Create DB config file

---

### 🔹 4. Replace In-Memory Data

* Fetch tasks from DB
* Insert tasks into DB

---

### 🔹 5. Test Persistence

* Add task → restart server → data should remain

---

### 🔹 6. Future Tasks (Planned)

* Update API (PUT)
* Delete API (DELETE)
* Completed tasks table
* Activity logs
* Deadline support
* Docker integration (multi-container setup)

---

## 🏁 Status

✅ Backend working
✅ Frontend working
✅ API integration working
❌ Database not connected yet

---

## 🔥 Progress Level

👉 You have built a **basic full-stack application from scratch**

---
