// Import express and set up app
const express = require("express");
const app = express();

// require the data file
const data = require("./data/data.json").projects;

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

app.get("/projects/:id", (req, res) => {
  res.render("project", {
    projectId: data[req.params.id].id,
    projectName: data[req.params.id].project_name
  });
});

// Error handles
app.use((req, res, next) => {
  const err = new Error("oh no!");
  err.status = 500;
  next(err);
});

app.use((req, res, next) => {
  // Log statement to indicate that this function is running
  console.log("Handling 404 error");

  const err = new Error(
    "Oops, page not found. Looks like that route does not exist."
  );
  err.status = 404;
  next(err);
});

// Turn on Express server
app.listen(3000, () => {
  console.log("The application is running on localhost:3000!");
});
