const express = require("express");
const router = express.Router();

// require the data file
const { projects } = require("../data/data.json");

router.get("/", (req, res) => {
  res.render("index", { projects });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/project/:id", (req, res) => {
  const { id } = req.params;

  if (id > 5) {
    res.redirect("/");
  } else {
    res.render("project", {
      projectId: projects[req.params.id].id,
      projectName: projects[req.params.id].project_name,
      projectDescription: projects[req.params.id].description,
      projectTech: projects[req.params.id].technologies,
      projectLive: projects[req.params.id].live_link,
      projectGit: projects[req.params.id].github_link,
      projectImg: projects[req.params.id].image_urls
    });
  }
});

module.exports = router;
