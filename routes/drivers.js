const express = require("express");
const router = express.Router();

const drivers = require("../data/drivers");

router
    .route("/")
    .get((req, res) => {
        res.json(drivers);
    })
    .post((req, res) => {
        if (req.body.name && req.body.username & req.body.email) {
            if (drivers.find((d) => d.username = req.body.username)){
                res.json({ error: "Username Taken"});
                return;
            }

            const driver = {
                id: drivers[drivers.length -1].id + 1,
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
            };
            
            users.push(driver);
            res.json(drivers[drivers.length - 1]);
          } else res.json({ error: "Insufficient Data"});
        });

router
    .route("/:id")
    .get((req, res, next) =>  {
        const driver = drivers.find((d) => d.id == req.params.id);
        if (driver) res.json(driver);
        else  next();
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