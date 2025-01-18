const Task = require("../models/task");
const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");

const createTask = (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required." });
  }
  const newTask = Task.createTask(title, description);
  res.status(201).json(newTask);
};

const getAllTasks = (req, res) => {
  const tasks = Task.getAllTasks();
  res.status(200).json(tasks);
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const updatedTask = Task.updateTaskById(parseInt(id), title, description);
  if (updatedTask) {
    res.status(200).json(updatedTask);
  } else {
    res.status(404).json({ message: "Task not found." });
  }
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  const taskDeleted = Task.deleteTaskById(parseInt(id));
  if (taskDeleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Task not found." });
  }
};

const markTaskAsComplete = (req, res) => {
  const { id } = req.params;
  const task = Task.markTaskAsComplete(parseInt(id));
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).json({ message: "Task not found or already completed." });
  }
};

const importTasks = (req, res) => {
  const filePath = path.join(__dirname, "../../uploads", req.file.filename);
  const tasks = [];
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (row) => {
      const { title, description } = row;
      tasks.push({ title, description });
    })
    .on("end", () => {
      Task.importTasksFromCSV(tasks);
      res.status(200).json({ message: `${tasks.length} tasks imported successfully.` });
    });
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  markTaskAsComplete,
  importTasks,
};
