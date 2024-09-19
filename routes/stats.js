const express = require("express");
const router = express.Router();

const stats = require("../data/stats");

router
  .route("/")
  .get((req, res) => {
    res.json(stats);
  })
  .post((req, res) => {
    if (req.body.hp && req.body.torque) {
      const post = {
        id: stats[stats.length - 1].id + 1,
        hp: req.body.hp,
        torque: req.body.torque,
        
      };

      stats.push(stats);
      res.json(stats[stats.length - 1]);
    } else res.json({ error: "Insufficient Data" });
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const post = stats.find((s) => s.id == req.params.id);
    if (stats) res.json(stats);
    else next();
  })
  .patch((req, res, next) => {
    const post = stats.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          stats[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (stats) res.json(stats);
    else next();
  })
  .delete((req, res, next) => {
    const post = stats.find((p, i) => {
      if (p.id == req.params.id) {
        stats.splice(i, 1);
        return true;
      }
    });

    if (stats) res.json(stats);
    else next();
  });

module.exports = router;