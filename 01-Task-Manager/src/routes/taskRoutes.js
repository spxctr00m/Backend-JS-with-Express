const router = require("express").Router();
const {
  getAllTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
} = require("../controllers/tasks");

router.route("/tasks").get(getAllTasks).post(createTask);
router
  .route("/tasks/:taskId")
  .get(getTask)
  .patch(updateTask)
  .delete(deleteTask);

module.exports = router;
