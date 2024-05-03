const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/postController.js');
const authConfig = require("../config/auth");
const jwt = require ('jsonwebtoken');
const authMiddleware = require("../middlewares/authMiddleware.js");


postRouter.get('/', postController.listarPosts);
postRouter.get('/:conteudo',postController.buscarPorConteudo);
postRouter.post('/', authMiddleware, postController.salvarPost);
postRouter.delete('/:id', postController.deletarPost);
postRouter.put('/:id', postController.atualizarPost);


module.exports = postRouter;