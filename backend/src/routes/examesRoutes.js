const express = require('express');
const router = express.Router();
const examesController = require('../controllers/examesController');

router.post('/exames', examesController.createExame)
router.get('/exames', examesController.getAllExames)
router.put('/exames/:id', examesController.updateExame)
router.delete('/exames/:id', examesController.deleteExame)

module.exports = router;
