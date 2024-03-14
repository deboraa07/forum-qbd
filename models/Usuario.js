const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const usuarioSchema = new Schema({
  nome: String,
  email: String,
  senha: String
},{collection: 'usuarios'});

usuarioSchema.index({nome:'text', email:'text', senha:'text'},{default_language:'pt', weights:{nome:2, email:1, senha:1}});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;