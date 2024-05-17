const express = require('express');
const comentarioRouter = express.Router();
const comentarioController = require('../controllers/comentarioController');


comentarioRouter.get('/', comentarioController.listarComentarios);
comentarioRouter.get('/post/:postId', comentarioController.listarComentariosPorPost);
comentarioRouter.post('/', comentarioController.salvarComentario);
comentarioRouter.delete('/:id',comentarioController.deletarComentario);
comentarioRouter.put('/:id', comentarioController.atualizarComentario);


module.exports = comentarioRouter;