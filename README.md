# Express.js API Example

This repository contains a simple Express.js application with API routes for managing student, staff, and admin data.

## Installation

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Install `npm install body-parser`
4. Install `npm install dotenv`
5. Install `npm install ejs`
6. Install `npm install express`
7. Install `npm install nodemon`

## Usage

1. Start the server: `npm start`.
2. Access the API endpoints:

   - **Student Routes**:
     - `GET /api/student`: Retrieve a list of students.
     - `POST /api/student`: Add a new student.
   - **Staff Routes**:
     - `GET /api/staff`: Retrieve a list of staff members.
   - **Admin Routes**:
     - `GET /api/admin`: Retrieve admin information.

## Configuration

- The server runs on port 3000 by default. You can change it by modifying the `port` variable in `index.js`.
- API keys are required for accessing certain routes.
- VALID KEYS INCLUDE//THIS IS IMPORTANT//: "dublinschools", "ds-district", and "data-for-schools".

## Middleware

- **Parsing Middleware**:
  - Parses URL-encoded and JSON data.
- **Logging Middleware**:
  - Logs incoming requests, including data if present.
- **API Key Middleware**:
  - Validates API keys and stores them in `req.key`.

## HATEOAS Links

- USE POSTMAN TO CHECK THESE ROUTES

- Root API endpoint: `/api`

  - Available links: FOR STUDENT

    - `GET:  http://localhost:3000/api/student/?api-key=dublinschools`: Retrieve student data.
    - `POST: http://localhost:3000/api/student/?api-key=ds-district`: Add a new student USING:
      id: 1,
      name: Carmen
      username: Carmen_3
      email: carmen_33@example.com
    - `PATCH: http://localhost:3000/api/student/1?api-key=ds-district`: Patch student data USING ID.
    - `DELETE: http://localhost:3000/api/student/1?api-key=ds-district`: Delete a student.

  - Available links: FOR STAFF

    - `GET:  http://localhost:3000/api/staff/?api-key=dublinschools`: Retrieve staff data.
    - `POST: http://localhost:3000/api/staff/?api-key=ds-district`: Add a new staff.
      staffid: 2,
      title: staff-345
      role: teacher
    - `PATCH: http://localhost:3000/api/staff/1?api-key=ds-district`: Patch staff data.
    - `DELETE: http://localhost:3000/api/staff/1?api-key=ds-district`: Delete a new staff.

    Available links: FOR ADMIN

    - `GET:  http://localhost:3000/api/admin/?api-key=dublinschools`: Retrieve admin data.
    - `POST: http://localhost:3000/api/admin/?api-key=ds-district`: Add a new admin.
      id: 3,
      adminId: staff-345
      access: teacher
    - `PATCH: http://localhost:3000/api/admin/1?api-key=ds-district`: Patch admin data.
    - `DELETE: http://localhost:3000/api/admin/1?api-key=ds-district`: Delete an admin.
