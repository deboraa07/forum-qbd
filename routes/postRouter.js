const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/postController.js');
const authConfig = require("../config/auth");
const jwt = require ('jsonwebtoken');


const verifyToken = (req,res,next) => {
  const token = req.headers['authorization'];

  if(!token){
    return res.status(403).json({message:'Token nao fornecido'});
  }
  jwt.verify(token, authConfig.secret, (err,decoded) => {
    if(err) {
      return res.status(401).json({message:'Falha na autenticaçao'});
  }req.user = decoded;
  next();
});
};



postRouter.get('/', postController.listarPosts);
postRouter.get('/:conteudo',postController.buscarPorConteudo);
postRouter.post('/', postController.salvarPost);
postRouter.delete('/:id', postController.deletarPost);
postRouter.put('/:id', postController.atualizarPost);


module.exports = postRouter,verifyToken;