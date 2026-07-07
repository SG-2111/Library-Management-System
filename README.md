# Library-Management-System

## Objective: 

To design a full-stack Library Management System using **React**, **Express.js**, and **PostgreSQL**. The application must have two views - **Librarian**, and **Student** (User). 

## Features

### Student
- Register and log in securely
- View the book catalog
- Borrow available books
- Return borrowed books
- View borrowing history

### Librarian
- Log in securely
- View book catalog
- Add new books
- Edit existing book details
- Remove books from the catalog
- View all borrowing history

### Note 
- Role-based authorization
- Password hashing using bcrypt
- RESTful API
- PostgreSQL relational database


## Tech Stack

- Frontend => React
- Backend => Express.js (Node.js)
- Database => PostgreSQL
- Password Hashing => bcrypt
- API => REST
- Version Control => Git and GitHub

## System Architecture

```
React
  |
  |   via HTTP requests
  |
Express.js
  |
  |   SQL 
  |
PostgreSQL Database

```

## File Structure 

(To be updated.)

## Workflow Design

## Student 

<img width="631" height="364" alt="image" src="https://github.com/user-attachments/assets/9ef3bb99-b27f-4303-8557-3ba322813524" />

## Librarian

<img width="578" height="276" alt="image" src="https://github.com/user-attachments/assets/b053e04b-a797-489d-894c-95b59d524df4" />

 
## Database Design

- **Users**
  - Highlights two roles separately - (Student & Librarian)
  - Stores user information

- **Books**
  - Stores book details
  - Count of available copies

- **Borrow Records**
  - A table linking students to books, with borrow date, due date, return date, and status
 
## API Overview

<img width="640" height="219" alt="image" src="https://github.com/user-attachments/assets/ce03f2cf-693e-45ef-b8c1-f7ffbfe9044e" />

## Installation steps

### Clone the repository

```bash
git clone <repo-name>

cd library-management-system
```

### Backend

```bash
cd backend

npm install
```

### Frontend

```bash
cd frontend

npm install
```

---

## Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000

DB_HOST=localhost
DB_PORT=your_port (usually 5432)
DB_NAME=your_db_name
DB_USER=postgres
DB_PASSWORD=your_password

```

---

## Running the Application

### Start Backend

```bash
cd backend

npm start
npm run dev

```

### Start Frontend

```bash
cd frontend

npm start
npm run dev

```

---


## Future Enhancements

- Reservation system
- Email notifications
- Dashboard analytics
- Barcode integration

