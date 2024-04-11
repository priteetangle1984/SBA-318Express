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
    if (req.body.name && req.body.username && req.body.email) {
      if (student.find((u) => u.username == req.body.username)) {
        next(error(409, "Username Already Taken"));
      }

      const user = {
        id: student[student.length - 1].id + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };

      student.push(user);
      res.json(student[student.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

  //=====GET ROUTE BY ID
router
  .route("/:id")
  .get((req, res, next) => {
    const user = student.find((u) => u.id == req.params.id);

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

    if (user) res.json({ user, links });
    else next();
  })

  //======PATCH ROUTES

  .patch((req, res, next) => {
    const user = student.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          student[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  })

  //DELETE ROUTE
  
  .delete((req, res, next) => {
    const user = student.find((u, i) => {
      if (u.id == req.params.id) {
        student.splice(i, 1);
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  });

module.exports = router;
