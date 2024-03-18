const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const usuarioSchema = new Schema({
  nome: String,
  email: String,
  senha: String
},{collection: 'usuarios'});

usuarioSchema.index({nome:'text', email:'text', senha:'text'},{default_language:'pt', weights:{nome:2, email:1, senha:1}});


usuarioSchema.pre('save', async function(next) {
  const usuario = this;
  if (!usuario.isModified('senha')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(usuario.senha, salt);
    usuario.senha = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
