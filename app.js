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


