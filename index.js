const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello world!");
    // console.log('GET Request');
});

app.route("/vehicles")
    .get((req, res) => {
        res.send("Load a random vehicle");
    })
    .post((req ,res) => {
        res.send("Add a vehicle");
    })
    .put((req, res) => {
        res.send("update a vehicles infomation");
    });

//error handler    
app.use((err, req, res, next) => {
    res.status(400).send('Something Broke!');
});
