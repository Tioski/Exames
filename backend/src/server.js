const express = require('express');
const examesRoutes = require('./routes/examesRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', examesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`API rodando na porta ${PORT}`));
