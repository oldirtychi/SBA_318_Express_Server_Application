const express = require("express");
const router = express.Router();

const drivers = require("../data/drivers");
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "drivers/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ drivers, links });
  })
  .post((req, res, next) => {
    if (req.body.name && req.body.username && req.body.email) {
      if (drivers.find((d) => d.username == req.body.username)) {
        next(error(409, "Username Taken"));
      }

      const driver = {
        id: drivers[drivers.length - 1].id + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };

      drivers.push(driver);
      res.json(drivers[drivers.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const driver = drivers.find((d) => d.id == req.params.id);

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

    if (driver) res.json({ driver, links });
    else next();
  })
  .patch((req, res, next) => {
    const driver = drivers.find((d, i) => {
      if (d.id == req.params.id) {
        for (const key in req.body) {
          drivers[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (driver) res.json(driver);
    else next();
  })
  .delete((req, res, next) => {
    const driver = drivers.find((d, i) => {
      if (d.id == req.params.id) {
        drivers.splice(i, 1);
        return true;
      }
    });

    if (driver) res.json(driver);
    else next();
  });

module.exports = router;