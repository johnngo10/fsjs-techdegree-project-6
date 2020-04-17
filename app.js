// Import express and set up app
const express = require("express");
const path = require("path");

// Init app
const app = express();

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Add static middleware
app.use("/static", express.static("public"));

// Import Routes
const indexRoutes = require("./routes");

app.use(indexRoutes);

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

// Render error template
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error");
});

// Turn on Express server
app.listen(3000, () => {
  console.log("The application is running on localhost:3000!");
});
