const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comentarioSchema = new Schema({
  autorId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Usuario'
  },
  autor: String,
  conteudo: String,
},{collection: 'comentarios'});

comentarioSchema.index({autorId:'text',autor:'text',conteudo:'text'},{default_language:'pt', weights:{autor:2,autorId:1, conteudo:1}});


const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;
