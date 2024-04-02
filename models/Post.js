const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({
  autor: String,
  titulo: String,
  conteudo: String,
},{collection: 'posts'});

postSchema.index({autor:'text',titulo:'text',conteudo:'text'},{default_language:'pt', weights:{autor:2,titulo:1, conteudo:1}});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
