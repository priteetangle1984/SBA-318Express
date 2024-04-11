const express = require("express");
const router = express.Router();

const staff = require("../data/staff");
const error = require("../utilities/error");


// =======GET ROUTE

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "staff/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ staff, links });
  })

  // ======POST ROUTE
  .post((req, res, next) => {
    if (req.body.staffId && req.body.title && req.body.role) {
      const post = {
        id: staff[staff.length - 1].id + 1,
        userId: req.body.staffId,
        title: req.body.title,
        content: req.body.role,
      };

      staff.push(post);
      res.json(staff[staff.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

  //=====GET ROUTE BY ID
router
  .route("/:id")
  .get((req, res, next) => {
    const post = staff.find((p) => p.id == req.params.id);

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

    if (post) res.json({ post, links });
    else next();
  })

  // ======PATCH ROUTE

  .patch((req, res, next) => {
    const post = staff.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          staff[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  })
  // DELETE ROUTE
  
  .delete((req, res, next) => {
    const post = staff.find((p, i) => {
      if (p.id == req.params.id) {
        staff.splice(i, 1);
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  });

module.exports = router;


