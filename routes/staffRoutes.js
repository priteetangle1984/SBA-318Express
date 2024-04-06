const express = require("express");
const router = express.Router();

const staff = require("../controllers/staff.js");

// Creating a GET route for the entire staff database.

router.get("/", (req, res) => {
    res.json(staff);
});

// Creating a simple GET route for individual staff,
// using a route parameter for the unique id.


// POST create a new staff
router.post("/", (req, res) => {
    const { staffId, adminId, role } = req.body;
    const newStaff = {
        id: staff.length + 1,
        staffId,
        adminId,
        role
    };
    staff.push(newStaff);
    res.status(201).json(newStaff);
});


module.exports = router;