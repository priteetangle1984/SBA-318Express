# SBA-318Express

# Node.js CRUD Application README

This Node.js application implements CRUD (Create, Read, Update, Delete) operations using Express.js framework.

## Installation

1. Install dependencies:

New GitBash Terminal

- npm install
- npm npm init -y
- npm i nodemon --save-dev
- npm install express`: Web framework for Node.js.

## Usage

1. Run the application:

New GitBash Terminal

- npm start
- node app.js

2. Open your web browser and navigate to `http://localhost:3000`.

## Folder Structure

- **controller**: Contains data for admin, staff, and students.
- **routes**: Contains route handlers for different API endpoints.
- **styles**: Contains CSS files for styling.
- **views**: Contains EJS templates for rendering HTML pages.

## Endpoints

- `GET /`: Renders the home page.
- `POST /submit`: Handles form submission.
- `PATCH /api/students/:id`: Updates student data by ID.
- `DELETE /api/students/:id`: Deletes student data by ID.
- `GET /api/admin/*`: Admin API endpoints.
- `GET /api/staff/*`: Staff API endpoints.
- `GET /api/students/*`: Student API endpoints.

## Custom Middleware

- `logReq`: Logs incoming requests.
- Custom 404 middleware: Handles resource not found errors.
- Error-handling middleware: Handles server errors.

## CRUD Operations

- **Create**: Form submission handled by `POST /submit`.
- **Read**: Data retrieval handled by various API endpoints.
- **Update**: Update user data handled by `PATCH /api/students/:id`.
- **Delete**: Delete user data handled by `DELETE /api/students/:id`.
