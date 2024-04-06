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


// GET staff by ID
router.get("/:id", (req, res) => {
    const staff = staff.find((staff) => staff.id == req.params.id);
    if (staff) {
        res.json(staff);
    } else {
        res.status(404).json({ error: "Staff not found" });
    }
});


// PATCH update staff by ID
router.patch("/:id", (req, res) => {
    const staffId = req.params.id;
    const staffIndex = staff.findIndex((staff) => staff.id == staffId);
    if (staffIndex !== -1) {
        staff[staffIndex] = { ...staff[staffIndex], ...req.body };
        res.json(staff[staffIndex]);
    } else {
        res.status(404).json({ error: "Staff not found" });
    }
});

// DELETE delete staff by ID
router.delete("/:id", (req, res) => {
    const staffId = req.params.id;
    const staffIndex = staff.findIndex((staff) => staff.id == staffId);
    if (staffIndex !== -1) {
        staff.splice(staffIndex, 1);
        res.json({ message: "Staff deleted successfully" });
    } else {
        res.status(404).json({ error: "Staff not found" });
    }
});


module.exports = router;