const express = require("express");
const router = express.Router();

const admin = require("../controllers/admin");

// Creating a GET route for the entire admin database.
router.get("/", (req, res) => {
    res.json(admin);
});

// Creating a simple GET route for individual admin,
// using a route parameter for the unique id.

// GET admin by ID
router.get("/:id", (req, res) => {
    const admin = admin.find((u) => u.id == req.params.id);
    if (admin) {
        res.json(admin);
    } else {
        res.status(404).json({ error: "Admin not found" });
    }
});


// POST create a new admin
router.post("/", (req, res) => {
    const { adminId, access } = req.body;
    const newAdmin = {
        id: admin.length + 1,
        adminId, access
    };
    admin.push(newAdmin);
    res.status(201).json(newAdmin);
});



// PATCH update admin by ID
router.patch("/:id", (req, res) => {
    const adminId = req.params.id;
    const adminIndex = admin.findIndex((u) => u.id == adminId);
    if (adminIndex !== -1) {
        admin[adminIndex] = { ...admin[adminIndex], ...req.body };
        res.json(admin[adminIndex]);
    } else {
        res.status(404).json({ error: "Admin not found" });
    }
});

// DELETE delete admin by ID
router.delete("/:id", (req, res) => {
    const adminId = req.params.id;
    const adminIndex = admin.findIndex((u) => u.id == adminId);
    if (adminIndex !== -1) {
        admin.splice(adminIndex, 1);
        res.json({ message: "Admin deleted successfully" });
    } else {
        res.status(404).json({ error: "Admin not found" });
    }
});



module.exports = router;