const express = require("express");
const router = express.Router();

const admin = require("../controllers/admin");

// Creating a GET route for the entire admin database.
router.get("/", (req, res) => {
    res.json(admin);
});

// Creating a simple GET route for individual admin,
// using a route parameter for the unique id.



module.exports = router;