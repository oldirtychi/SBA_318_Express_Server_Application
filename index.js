const express = require("express");
const app = express();
const port = 3000;

const drivers = require("./data/drivers");
const vehicles = require("./data/vehicles");
const stats = require("./data/stats");

app.get("/api/drivers", (req, res) => {
    res.json(drivers);
});

app.get("/api/drivers/:id", (req, res) => {
    const driver = drivers.find((d) => d.id == req.params.id);
    if (driver) res.json(driver);
});

app.get("/api/vehicles", (req, res) => {
    res.json(vehicles);
});

app.get("/api/vehicles/:id", (req, res) => {
    const vehicle = vehicles.find((d) => d.id == req.params.id);
    if (vehicle) res.json(vehicle);
});

app.get("/api/stats", (req, res) => {
    res.json(stats);
});

app.get("/api/stats/:id", (req, res) => {
    const stat = stats.find((d) => d.id == req.params.id);
    if (stat) res.json(stat);
});

app.use((err, req, res, next) => {
    res.status(404);
    res.json({ error: "Resource Not Found"});
});

//error handler    
app.use((err, req, res, next) => {
    res.status(400).send('Something Broke!');
    
});


app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});