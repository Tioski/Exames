const examesModel = require("../models/examesModels");

const listarExames = (req, res) => {
    examesModel.listarExames((error, resultados) => {
        if (error) {
            console.error("Erro ao buscar exames:", error);

            return res.status(500).json({
                mensagem: "Erro ao buscar exames"
            });
        }

        res.status(200).json(resultados);
    });
};

module.exports = {
    listarExames
};