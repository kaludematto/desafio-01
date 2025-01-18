const express = require("express");
const multer = require("multer");
const taskController = require("../controllers/taskController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Criar task
router.post("/tasks", taskController.createTask);

// Listar todas as tasks
router.get("/tasks", taskController.getAllTasks);

// Atualizar task
router.put("/tasks/:id", taskController.updateTask);

// Deletar task
router.delete("/tasks/:id", taskController.deleteTask);

// Marcar task como completa
router.patch("/tasks/:id/complete", taskController.markTaskAsComplete);

// Importar tasks de um arquivo CSV
router.post("/tasks/import", upload.single("file"), taskController.importTasks);

module.exports = router;
