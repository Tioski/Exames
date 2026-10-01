const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((error) => {
    if (error) {
        console.error("Erro ao conectar ao banco:", error);
        return;
    }

    console.log("MySQL conectado com sucesso!");
});

module.exports = db;