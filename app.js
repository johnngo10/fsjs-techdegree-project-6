// Import express and set up app
const express = require("express");
const path = require("path");

// Init app
const app = express();

// require the data file
const { projects } = require("./data/data.json");

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Add static middleware
app.use("/static", express.static("public"));

// Import Routes
app.get("/", (req, res) => {
  res.render("index", { projects });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/project/:id", (req, res) => {
  res.render("project", {
    projectId: projects[req.params.id].id,
    projectName: projects[req.params.id].project_name,
    projectDescription: projects[req.params.id].description,
    projectTech: projects[req.params.id].technologies,
    projectLive: projects[req.params.id].live_link,
    projectGit: projects[req.params.id].github_link,
    projectImg: projects[req.params.id].image_urls
  });
});

// Error handles

app.use((req, res, next) => {
  // Log statement to indicate that this function is running
  console.log("Handling 404 error");

  // Create new error to handle non-existent route
  const err = new Error("err");
  err.status = 404;
  err.message = "Oops, page not found. Looks like that route does not exist.";

  // Pass error to global error handler below
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error");
});

// Turn on Express server
app.listen(3000, () => {
  console.log("The application is running on localhost:3000!");
});
