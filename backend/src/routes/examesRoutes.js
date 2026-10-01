const express = require("express");

const router = express.Router();

const examesController = require("../controllers/examesControllers");

router.get("/", examesController.listarExames);

module.exports = router;