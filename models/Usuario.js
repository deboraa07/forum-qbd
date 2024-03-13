const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const usuarioSchema = new Schema({
  nome: String,
  email: String,
  password: String
},{collection: 'usuarios'});

usuarioSchema.index({nome:'text', email:'text', password:'text'},{default_language:'pt', weights:{nome:2, email:1, password:1}});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;