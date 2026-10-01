const express = require("express");
const cors = require("cors");
require("dotenv").config();

const examesRoutes = require("./routes/examesRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/exames", examesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});