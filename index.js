const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = 3000;



//route imports
const drivers = require("./routes/drivers");
const vehicles = require("./routes/vehicles");
const stats = require("./routes/stats");
// const form = require("./public/script");

//parsing middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ extended: true }));
app.use(express.static('public')); 

app.set('view engine', 'ejs');

app.use("/api/drivers", drivers);
app.use("/api/vehicles", vehicles);
app.use("/api/stats", stats);
// app.use("/api/submit", form);

app.get('/', (req, res) => {
  res.render('form');
});

app.get("/", (req, res) => {
    res.json({
      links: [
        {
          href: "/api",
          rel: "api",
          type: "GET",
        },
      ],
    });
  });
  

  app.get("/api", (req, res) => {
    res.json({
      links: [
        {
          href: "api/drivers",
          rel: "drivers",
          type: "GET",
        },
        {
          href: "api/drivers",
          rel: "drivers",
          type: "POST",
        },
        {
          href: "api/stats",
          rel: "stats",
          type: "GET",
        },
        {
          href: "api/stats",
          rel: "stats",
          type: "POST",
        },
        {
            href: "api/vehicles",
            rel: "vehicles",
            type: "GET",
          },
          {
            href: "api/vehicles",
            rel: "vehicles",
            type: "POST",
          },
      ],
    });
  });
  



app.post('/api/submit', (req, res) => {
  const { name, username, email } = req.body;
  console.log(`Received data: Name - ${name}, Username - ${username} Email - ${email}`);
  res.json({ message: 'Data received successfully' });
});

//error handler    
app.use((err, req, res, next) => {
    res.status(404);
    res.json({ error: "Resource Not Found" });
});


app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
