const db = require('../config/db');

class Exame {
    constructor(id, paciente, tipo_exame, status) {
        this.id = id;
        this.paciente = paciente;
        this.tipo_exame = tipo_exame;
        this.status = status;
    }
}

module.exports = {
    create: async (paciente, tipo_exame, status = 'Pendente') => {
        const [result] = await db.query(
            'INSERT INTO exames (paciente, tipo_exame, status) VALUES (?, ?, ?)',
            [paciente, tipo_exame, status]
        );
        return new Exame(result.insertId, paciente, tipo_exame, status);
    },
    findAll: async () => {
        const [rows] = await db.query('SELECT * FROM exames');
        return rows.map(row => new Exame(row.id, row.paciente, row.tipo_exame, row.status));
    },
    update: async (id, paciente, tipo_exame, status) => {
        const [result] = await db.query(
            'UPDATE exames SET paciente = ?, tipo_exame = ?, status = ? WHERE id = ?',
            [paciente, tipo_exame, status, id]
        );
        if (result.affectedRows === 0) return null;
        return new Exame(Number(id), paciente, tipo_exame, status);
    },
    delete: async id => {
        const [result] = await db.query('DELETE FROM exames WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
};