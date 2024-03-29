var express = require('express');
var router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const loginController = require('../controllers/loginController');


//USUARIO//
router.get('/', usuarioController.listarUsuarios);
router.get('/:conteudo',usuarioController.buscarPorConteudo);
router.post('/', usuarioController.salvarUsuario);
router.delete('/:id',usuarioController.deletarUsuario);
router.put('/:id', usuarioController.atualizarUsuario);
router.post('/login', loginController.fazerLogin);


module.exports = router;