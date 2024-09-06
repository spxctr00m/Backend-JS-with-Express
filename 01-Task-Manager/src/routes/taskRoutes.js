const router = require("express").Router();
const { getAllTasks, createTask } = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);

router.get("/:taskid", (req, res) => {
  res.json({ msg: "get specific task" });
});

router.patch("/:taskid", (req, res) => {
  res.json({ msg: "edit task" });
});

router.delete("/:taskid", (req, res) => {
  res.json({ msg: "delete task" });
});

module.exports = router;
