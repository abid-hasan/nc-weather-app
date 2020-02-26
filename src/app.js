const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

// Define paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    author: "Abid Hasan Snigdho"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    author: "Abid Hasan Snigdho"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    author: "Abid Hasan Snigdho",
    message: "How may we help you?"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address."
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: data,
        location
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    author: "Abid Hasan Snigdho",
    errorMessage: "Help article not found."
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    author: "Abid Hasan Snigdho",
    errorMessage: "Page not found."
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});