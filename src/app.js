const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.json());

// Rotas
app.use("/api", taskRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
