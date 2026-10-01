const db = require("../config/db");

const listarExames = (callback) => {
    const sql = "SELECT * FROM exames";

    db.query(sql, callback);
};

module.exports = {
    listarExames
};