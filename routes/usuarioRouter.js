var express = require('express');
var router = express.Router();

const usuarioController = require('../controllers/usuarioController');

router.post('/', usuarioController.salvarUsuario);

module.exports = router;