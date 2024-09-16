const Task = require("../models/taskModel");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      owner: req.user._id,
    });
    res.status(200).json({
      tasks,
      count: tasks.length,
      message: "Tasks fetched successfully",
    });
  } catch (error) {
    res.status(500).send({ error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });
    await task.save();
    res.status(201).json({ task, message: "Task created successfully" });
  } catch (error) {
    res.status(400).send({ error });
  }
};

const getTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findOne({
      _id: taskId,
      owner: req.user._id,
    });
    if (!task)
      return res.status(404).json({ msg: `No task with id: ${taskId}` });
    res.status(200).send(task);
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    // List of fields that are allowed to be updated
    const allowedUpdates = ["description", "completed"];
    const updates = {};

    // Check if the request body contains any fields that are not allowed
    const requestFields = Object.keys(req.body);
    requestFields.forEach((field) => {
      if (!allowedUpdates.includes(field)) {
        throw new Error(`Invalid update: ${field} is not allowed`);
      }
      // If the field is allowed, add it to the updates object
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Update the task based on the allowed fields
    const task = await Task.findOneAndUpdate(
      { _id: taskId, owner: req.user._id }, // Ensure the owner is the same user
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    // If no task is found, return 404
    if (!task)
      return res.status(404).json({ msg: `No task with id: ${taskId}` });

    // Send the updated task
    res.status(200).json({ task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findOneAndDelete({
      _id: taskId,
      owner: req.user._id,
    });
    if (!task)
      return res.status(404).json({ msg: `No task with id: ${taskId}` });
    res.status(200).json({ task, msg: `Task deleted successfully.` });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
