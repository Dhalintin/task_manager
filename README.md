# Task Manager API

## Overview

This is a Task Management API built using Node.js, Express, and MongoDB. It provides user authentication, task CRUD operations, filtering, searching, and sorting features.

## Features

- **User Authentication (JWT)**
  - User signup, login, and logout
  - Password hashing using bcrypt
  - JWT-based authentication
- **Task Management**
  - Create, Read, Update, and Delete (CRUD) tasks
  - Assign tasks to users
  - Task prioritization (Low, Medium, High)
  - Task status tracking (Pending, In Progress, Completed)
- **Filtering & Searching**
  - Filter tasks by status, priority, and date range
  - Search tasks by title
- **Pagination & Sorting**
- **Role-Based Access Control (RBAC)**
- **MongoDB as the database**

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **JWT for authentication**
- **bcrypt for password hashing**
- **Docker (optional)**

## Installation

### Prerequisites

- Node.js installed
- MongoDB instance (local or cloud)

### Steps

1. Clone the repository:
   ```sh
   git clone <repo-link>
   cd task-manager
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` by making a copy of the .env.example file and add the fill in the variables
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string.......
   ```
4. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and receive a JWT token
- `POST /api/auth/logout` - Logout user

### Task Management

#### BY USER

- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Retrieve all tasks with filtering and sorting
- `GET /api/tasks/:id` - Retrieve a specific task
- `PATCH /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

#### BY ADMIN

- `POST /api/admin/tasks` - Create a new task
- `GET /api/admin/tasks` - Retrieve all tasks with filtering and sorting
- `GET /api/admin/tasks/:id` - Retrieve a specific task
- `PUT /api/admin/tasks/:id` - Update a task
- `DELETE /api/admin/tasks/:id` - Delete a task

### Searching, Pagination and Sorting

- `GET /api/task/search/{queryString}` - Retrieve all tasks with title containing the query string
- `GET /api/task/?{queryParameter}` - Retrieve tasks in a specified order
- `Query Parameter` include
  ```sh
  page - an integer indicating page to be in
  sort - the field to be sorted by (title, status, createdAt, priority)
  order - asc (ascending) or desc (descending)
  limit - an integer indicating number of result per page
  ```

### Check collection title

`task manager.postman_collection`

for endpoint usage examples

## License

This project is licensed under the MIT License.
