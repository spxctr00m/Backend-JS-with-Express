const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ msg: "hello get" });
});

router.post("/", (req, res) => {
  res.json({ msg: "hello post" });
});
module.exports = router;
