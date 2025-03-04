# MERN Stack Backend - User Authentication & Task Management API

## Overview
This is a MERN stack backend API for user authentication and task management. It uses JWT-based authentication with access tokens for enhanced security. Users can sign up, log in, and perform CRUD operations on tasks.

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **JWT (JSON Web Token)**
- **Bcrypt for Password Hashing**
- **Express Validator for Input Validation**

## Features

### 1. Authentication Mechanism
- **User Signup** (Name, Email, Password)
- **User Login** (Email, Password)
- **The API uses JWT for authentication.On login, the API responds with an access token in the JSON response. For authorized requests, pass the access token in the Authorization header as a Bearer Token.**
- **Password hashing using bcrypt**

### 2. Task Management
- CRUD operations for tasks (Create, Read, Update, Delete)
- Each task has:
  - `title` (string)
  - `description` (string)
  - `status` (enum: "pending", "in-progress", "completed")
  - `createdAt` (timestamp)
  - `updatedAt` (timestamp)

### 3. API Routes
| Method | Endpoint | Description |
|--------|-------------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Authenticate and receive a JWT token (stored in HTTP cookies) |
| POST | `/api/tasks` | Create a new task (Requires authentication) |
| GET | `/api/tasks` | Fetch all tasks for the authenticated user |
| PUT | `/api/tasks/:id` | Update a task (Requires authentication) |
| DELETE | `/api/tasks/:id` | Delete a task (Requires authentication) |

## Security & Best Practices
- **JWT token for security**
- **Hashed passwords using bcrypt before storing in the database**
- **Basic input validation using Express Validator**

## Setup Instructions
### Prerequisites
- Node.js installed
- MongoDB instance (local or cloud)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/AKRJB/User-Authentication-and-Task-Management-API.git
   cd your-repo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_jwt_secret
   ACCESS_TOKEN_EXPIRY=1h
   ```
4. Start the server:
   ```sh
   npm start
   ```
5. run the dev server:
   ```sh
   npm run dev
   ```

## Deployment
server deployed on render
base_url:
```sh
https://user-authentication-and-task-management.onrender.com
```

## Postman Collection
A Postman collection is available to test the API endpoints. Import the collection and set the **Authorization** header with the Bearer Token before making authorized requests and link:
```sh
https://www.postman.com/alakhkaler/move-mern-stack-backend-user-authentication-task-management-api/request/t82c8pj/mern-stack-backend-user-authentication-task-management-api?action=share&creator=42812859&ctx=documentation
```


---
**Author:** Alakh Kaler


