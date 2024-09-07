const router = require("express").Router();
const {
  getAllTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:taskId").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
