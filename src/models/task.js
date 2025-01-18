let tasks = [];
let currentId = 1;

const createTask = (title, description) => {
  const newTask = {
    id: currentId++,
    title,
    description,
    completed_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  };
  tasks.push(newTask);
  return newTask;
};

const getAllTasks = () => {
  return tasks;
};

const getTaskById = (id) => {
  return tasks.find((task) => task.id === id);
};

const updateTaskById = (id, title, description) => {
  const task = getTaskById(id);
  if (task) {
    task.title = title || task.title;
    task.description = description || task.description;
    task.updated_at = new Date();
  }
  return task;
};

const deleteTaskById = (id) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    return true;
  }
  return false;
};

const markTaskAsComplete = (id) => {
  const task = getTaskById(id);
  if (task && task.completed_at === null) {
    task.completed_at = new Date();
    task.updated_at = new Date();
    return task;
  }
  return null;
};

const importTasksFromCSV = (tasksArray) => {
  tasks = [...tasks, ...tasksArray];
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  markTaskAsComplete,
  importTasksFromCSV,
};
