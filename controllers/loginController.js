const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth');

//gera token para usar no cadastro e login
function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}
//autentica usuario e utiliza o token criado antes para logar
const fazerLogin = async (req,res) => {
    const {email, senha} = req.body;

    const usuario = await Usuario.findOne({email});

    if(!usuario)
      return res.status(400).send({error: 'Email invalido'});

    if(!await bcrypt.compare(senha, usuario.senha))
      return res.status(400).send({error: 'Senha invalida'});

  const token = jwt.sign({id: usuario.id}, authConfig.secret, {
    expiresIn: 86400,
  });

      res.send({usuario,
         token: generateToken ({id: usuario.id}),
        });
}

module.exports = {fazerLogin, generateToken};