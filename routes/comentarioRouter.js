const express = require('express');
const comentarioRouter = express.Router();
const comentarioController = require('../controllers/comentarioController');
const authMiddleware = require("../middlewares/authMiddleware.js");

comentarioRouter.get('/', comentarioController.listarComentarios);
comentarioRouter.get('/post/:postId', comentarioController.listarComentariosPorPost);
comentarioRouter.post('/', authMiddleware, comentarioController.salvarComentario);
comentarioRouter.delete('/:id',comentarioController.deletarComentario);
comentarioRouter.put('/:id', comentarioController.atualizarComentario);


module.exports = comentarioRouter;