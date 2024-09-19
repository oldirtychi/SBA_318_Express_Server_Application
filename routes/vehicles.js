const express = require("express");
const router = express.Router();

const vehicles = require("../data/vehicles");
const error = require("../utilities/error");


router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "vehicles/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ vehicles, links });
  })
  .post((req, res, next) => {
    if (req.body.make && req.body.model && req.body.year) {
      const vehicle = {
        id: vehicles[vehicles.length - 1].id + 1,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
      };

      vehicles.push(vehicle);
      res.json(vehicles[vehicles.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const vehicle = vehicles.find((v) => v.id == req.params.id);

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

    if (vehicle) res.json({ vehicle, links });
    else next();
  })
  .patch((req, res, next) => {
    const vehicle = vehicles.find((v, i) => {
      if (v.id == req.params.id) {
        for (const key in req.body) {
          vehicles[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (vehicle) res.json(vehicle);
    else next();
  })
  .delete((req, res, next) => {
    const vehicle = vehicless.find((v, i) => {
      if (v.id == req.params.id) {
        vehicles.splice(i, 1);
        return true;
      }
    });

    if (vehicle) res.json(vehicle);
    else next();
  });

module.exports = router;
