const express = require("express");
const router = express.Router();

const students = require("../controllers/students.js");

// Creating a GET route for the entire students database.
router.get("/", (req, res) => {
    res.json(students);
});////////////GET all students


// POST create a new student
router.post("/", (req, res) => {
    const { studentName, email, password, address,
        address2, city, state, zip } = req.body;
    const newStudent = {
        id: students.length + 1,
        studentName,
        email,
        password,
        address,
        address2,
        city,
        state,
        zip
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});


// Creating a simple GET route for individual students,
// using a route parameter for the unique id.

// GET student by ID
router.get("/:id", (req, res) => {
    const student = students.find((stud) => stud.id == req.params.id);
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ error: "Student not found" });
    }
});



module.exports = router;