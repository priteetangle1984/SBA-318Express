const express = require("express");
const router = express.Router();

const admin = require("../data/admin");
const error = require("../utilities/error");


//======GET ROUTE

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "admin/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ admin, links });
  })

  // =======POST ROUTE
  .post((req, res, next) => {
    if (req.body.adminId && req.body.access) {
      if (admin.find((a) => a.adminId == req.body.adminId)) {
        next(error(409, "AdminId Already Taken"));
      }

      const admins = {
        id: admin[admin.length - 1].id + 1,
        name: req.body.name,
        adminId: req.body.adminId,
        email: req.body.email,
      };

      admin.push(admins);
      res.json(admin[admin.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

  //=====GET ROUTE BY ID
router
  .route("/:id")
  .get((req, res, next) => {
    const admins = admin.find((a) => a.id == req.params.id);

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

    if (admins) res.json({ admins, links });
    else next();
  })

  //======PATCH ROUTES

  .patch((req, res, next) => {
    const admins = admin.find((a, i) => {
      if (a.id == req.params.id) {
        for (const key in req.body) {
          admin[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (admins) res.json(admins);
    else next();
  })

  //DELETE ROUTE
  
  .delete((req, res, next) => {
    const admins = admin.find((a, i) => {
      if (a.id == req.params.id) {
        admin.splice(i, 1);
        return true;
      }
    });

    if (admins) res.json(admins);
    else next();
  });

module.exports = router;
