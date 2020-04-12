// Import express and set up app
const express = require("express");
const app = express();

const data = require("data.json");

// View Engine Setup
app.set("view engine", "pug");

// Add static middleware
app.use("/static", express.static("public"));

// Import Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/projects", (req, res) => {
  res.render("project");
});

app.listen(3000, () => {
  console.log("The application is running on localhost:3000!");
});
