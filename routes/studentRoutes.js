const express = require("express");
const router = express.Router();

const students = require("../controllers/students.js");

// Creating a GET route for the entire students database.
router.get("/", (req, res) => {
    res.json(students);
});////////////GET all students



module.exports = router;