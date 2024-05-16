const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comentarioSchema = new Schema({
  postId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Post'
  },
  autorId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Usuario'
  },
  autor: String,
  conteudo: String,
});

const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;
