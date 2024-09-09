// const { response } = require("express");

const taskForm = document.querySelector(".task-form");
const taskInput = document.querySelector(".task-input");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/v1/tasks")
    .then((res) => res.json())
    .then((data) => {
      const { tasks } = data;
      tasks.forEach((task) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${task.name} - ${
          task.completed ? "Completed" : "Pending"
        }`;
        taskList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });
});

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const task = taskInput.value;

  if (task) {
    const taskData = {
      name: task,
      completed: false,
    };

    fetch("/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })
      .then((res) => res.json())
      .then((data) => {
        taskInput.value = "";
        const { name, completed, _id } = data.task;

        const listItem = document.createElement("li");
        listItem.textContent = `${name} - ${
          completed ? "Completed" : "Pending"
        }`;
        taskList.appendChild(listItem);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
