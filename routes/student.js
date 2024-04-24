const express = require("express");
const router = express.Router();

const student = require("../data/student");
const error = require("../utilities/error");


//======GET ROUTE

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "student/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ student, links });
  })

  // =======POST ROUTE
  .post((req, res, next) => {
    if (req.body.studentname && req.body.email && req.body.password && req.body.address
       && req.body.address2 && req.body.city && req.body.state && req.body.zip) {
      if (student.find((u) => u.studentname == req.body.studentname)) {
        next(error(409, "Studentname Already Taken"));
      }

      const students = {
        id: student[student.length - 1].id + 1,
        studentname: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
      };

      student.push(students);
      res.json(student[student.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

  //=====GET ROUTE BY ID
router
  .route("/:id")
  .get((req, res, next) => {
    const students = student.find((u) => u.id == req.params.id);

    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];

    if (students) res.json({ students, links });
    else next();
  })

  //======PATCH ROUTES

  .patch((req, res, next) => {
    const students = student.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          student[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (students) res.json(students);
    else next();
  })

  //DELETE ROUTE

  .delete((req, res, next) => {
    const students = student.find((u, i) => {
      if (u.id == req.params.id) {
        student.splice(i, 1);
        return true;
      }
    });

    if (students) res.json(students);
    else next();
  });

module.exports = router;
