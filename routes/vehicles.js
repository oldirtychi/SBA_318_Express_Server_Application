const express = require("express");
const router = express.Router();

const vehicles = require("../data/vehicles");


router
  .route("/")
  .get((req, res) => {
    res.json(vehicles);
  })
  .post((req, res) => {
    if (req.body.userId && req.body.title && req.body.content) {
      const post = {
        id: vehicles[vehicles.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      };

      vehicles.push(post);
      res.json(vehicles[vehicles.length - 1]);
    } else res.json({ error: "Insufficient Data" });
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const post = vehicles.find((vehicles) => v.id == req.params.id);
    if (post) res.json(post);
    else next();
  })
  .patch((req, res, next) => {
    const post = vehicles.find((v, i) => {
      if (v.id == req.params.id) {
        for (const key in req.body) {
          vehicles[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  })
  .delete((req, res, next) => {
    const post = vehicles.find((v, i) => {
      if (v.id == req.params.id) {
        vehicles.splice(i, 1);
        return true;
      }
    });

    if (vehicles) res.json(vehicles);
    else next();
  });

module.exports = router;
