const Exame = require('../models/examesModel');

exports.createExame = async(req,res) => {
    try{
        const {paciente, tipo_exame, status} = req.body;
        if (!paciente || !tipo_exame)
            return res.status(400).json({erro: "Paciente e tipo de exame são obrigatórios"});
        const newExame = await Exame.create(paciente, tipo_exame, status);
        res.status(201).json(newExame);
    }
    catch(error)
    {
        res.status(500).json({erro: error.message});
    }
};

exports.getAllExames = async (req, res) => {
    try{
        const exames = await Exame.findAll();
        res.json(exames);
    }  catch (error){
        res.status(500).json({erro: error.message});
    }
};

exports.updateExame = async (req,res) => {
    try{
        const {id} = req.params;
        const {paciente, tipo_exame, status} = req.body;
        if (!paciente || !tipo_exame || !status)
            return res.status(400).json({erro: "Paciente, tipo de exame e status são obrigatórios"});

        const updated = await Exame.update(id, paciente, tipo_exame, status);
        if (!updated)
            return res.status(404).json({erro : "Registro não encontrado"});
        res.json(updated);
    } catch (error){
        res.status(500).json({erro: error.message});
    }
};

exports.deleteExame = async (req,res) => {
    try{
        const {id} = req.params;
        const sucess = await Exame.delete(id);
        if (!sucess) 
            return res.status(404).json({erro : "Registro não encontrado"});
        return res.status(204).send();
    } catch (error){
        res.status(500).json({erro: error.message});
    }
};
