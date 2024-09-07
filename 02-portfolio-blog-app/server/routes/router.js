const express = require("express");
const router = express.Router();

//Routes
router.get("/home", (req, res) => {
  const locals = {
    title: "Node Js Blog",
    description: "Simple Blog created with NodeJs, Express & MongoDb",
  };

  res.render("index", { locals });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

module.exports = router;
