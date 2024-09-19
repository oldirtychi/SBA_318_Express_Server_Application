const express = require("express");
const router = express.Router();

const stats = require("../data/stats");
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "stats/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ stats, links });
  })
  .post((req, res, next) => {
    if (req.body.hp && req.body.torque) {
      const stat = {
        id: stats[stats.length - 1].id + 1,
        hp: req.body.hp,
        torque: req.body.torque,
      };

      stats.push(stat);
      res.json(stats[stats.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const stat = stats.find((s) => s.id == req.params.id);

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

    if (stat) res.json({ stat, links });
    else next();
  })
  .patch((req, res, next) => {
    const stat = stats.find((s, i) => {
      if (s.id == req.params.id) {
        for (const key in req.body) {
          stats[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (stat) res.json(stat);
    else next();
  })
  .delete((req, res, next) => {
    const stat = stats.find((s, i) => {
      if (s.id == req.params.id) {
       stats.splice(i, 1);
        return true;
      }
    });

    if (stat) res.json(stat);
    else next();
  });

module.exports = router;
