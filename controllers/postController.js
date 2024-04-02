const Post = require('../models/Post');

const listarPosts = async (req,res) => {
    Post.find({},{_id:true, __v:false}).then(result => {
     res.status(200).send(result);
     }).catch(e => res.status(400).send(e));
}
 
 const buscarPorConteudo = async (req,res) =>{
     Post.find({$text:{$search:req.params.conteudo}},{_id:true,__v:false}).then(result => {
         res.status(200).send(result); 
     }).catch(e => res.status(400).send(e));
 }   

const salvarPost = async (req,res) => {
   Post.create(req.body).then(result => res.status(200).send
    (result)).catch(e => res.status(400).send(e));
}

const deletarPost = async (req,res) =>{
    Post.deleteOne({_id:req.params.id}).then(result => {
         if(result.deletedCount > 0) res.status(200).send('Removido com sucesso');
         else res.status(404).send('Post não encontrado');
     }).catch(e => res.status(400).send(e));
 }
 
 const atualizarPost = async (req,res) =>{
     await Post.findById(req.params.id).then(result =>{
         if(result){
             result.set(req.body);
             result.save();
             res.status(200).send('Atualizado com sucesso');
         }
     }).catch(e => res.status(404).send('Post não encontrado'));
 }

module.exports = {listarPosts,salvarPost,buscarPorConteudo,deletarPost,atualizarPost};