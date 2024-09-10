const router = require("express").Router();
const {
  getAllTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
} = require("../controllers/tasks");
const auth = require("../middlewares/auth");

router.get("/tasks/test", (req, res) => {
  res.json({
    msg: "task routes are working",
    user: req.user,
  });
});

router.route("/tasks").get(getAllTasks).post(createTask);
router
  .route("/tasks/:taskId")
  .get(getTask)
  .patch(updateTask)
  .delete(deleteTask);

module.exports = router;
