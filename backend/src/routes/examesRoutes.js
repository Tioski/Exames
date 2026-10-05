const express = require('express');
const router = express.Router();
const examesControllers = require('../controllers/examesControllers');

router.post('/exames', examesControllers.createExame);
router.get('/exames', examesControllers.getAllExames);
router.put('/exames/:id', examesControllers.updateExame);
router.delete('/exames/:id', examesControllers.deleteExame);

module.exports = router;
