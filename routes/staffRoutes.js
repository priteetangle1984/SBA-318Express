const express = require("express");
const router = express.Router();

const staff = require("../controllers/staff.js");

// Creating a GET route for the entire staff database.

router.get("/", (req, res) => {
    res.json(staff);
});


module.exports = router;