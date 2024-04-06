const express = require("express");
const app = express();
const port = 3000;
require('dotenv').config();
const fs = require("fs");

var path = require("path");

// Importing the data from database files.===========
const adminRoutes = require("./routes/adminRoutes");
const staffRoutes = require("./routes/staffRoutes");
const studentsRoutes = require("./routes/studentRoutes");

// Custom logging requests middleware.==============
const logReq = function (req, res, next) {
    console.log("Request Received");
    next();
};


app.use(express.urlencoded({ extended: true })); 


app.use(logReq);


// rendering views with ejs==============
// app.set('views', './views');
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "styles")));

// Use our Routes===========
app.use("/api/admin", adminRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/students", studentsRoutes)




//////////////GET ROUTE TO RENDER THE FORM ===========
app.get("/", (req, res) => {
    res.render("index");
});

// app.get("/submit", (req, res) => {
//     res.render("submit"); 
// });


// POST ROUTE TO HANDLE THE FORM SUBMISSION============

app.post("/submit", (req, res) => {
    const {  studentname, email, password, address,
        address2, city, state, zip } = req.body;
    // Do something with the form data, e.g., save it to a database
    console.log("Received form data:", { studentname, email, password, address,
        address2, city, state, zip  });
    res.send("Form submitted successfully!");
});

//// PATCH route to update user data==============
app.patch("/api/students/:id", (req, res) => {
    const studentId = req.params.id;
    // Update user data based on studentId
    res.send(`Updated students with id ${studentId}`);
});

///// DELETE route to delete user data==============
app.delete("/api/students/:id", (req, res) => {
    const studentId = req.params.id;
    // Delete user data based on studentId
    res.send(`Deleted students with id ${studentId}`);
});

// Custom 404 (not found) middleware=========
app.use((req, res) => {
    res.status(404);
    res.json({ error: "Resource Not Found" });
});

// Error-handling middleware.=============
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
});

