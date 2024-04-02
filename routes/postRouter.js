var express = require('express');
var postRouter = express.Router();

const postController = require('../controllers/postController.js');


//USUARIO//
postRouter.get('/', postController.listarPosts);
postRouter.get('/:conteudo',postController.buscarPorConteudo);
postRouter.post('/', postController.salvarPost);
postRouter.delete('/:id',postController.deletarPost);
postRouter.put('/:id', postController.atualizarPost);


module.exports = postRouter;