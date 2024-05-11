const Comentario = require('../models/Comentario');

const listarComentarios = async (req,res) => {
    Comentario.find({},{_id:true, __v:false}).then(result => {
     res.status(200).send(result);
     }).catch(e => res.status(400).send(e));
}
 
 const buscarPorConteudo = async (req,res) =>{
    Comentario.find({$text:{$search:req.params.conteudo}},{_id:true,__v:false}).then(result => {
         res.status(200).send(result); 
     }).catch(e => res.status(400).send(e));
 }   

const salvarComentario = async (req,res) => {
  Comentario.create(req.body).then(result => res.status(200).send
    (result)).catch(e => res.status(400).send(e));
}

const deletarComentario = async (req,res) =>{
   Comentario.deleteOne({_id:req.params.id}).then(result => {
         if(result.deletedCount > 0) res.status(200).send('Removido com sucesso');
         else res.status(404).send('Comentario não encontrado');
     }).catch(e => res.status(400).send(e));
 }
 
 const atualizarComentario = async (req,res) =>{
     await Comentario.findById(req.params.id).then(result =>{
         if(result){
             result.set(req.body);
             result.save();
             res.status(200).send('Atualizado com sucesso');
         }
     }).catch(e => res.status(404).send('Comentario não encontrado'));
 }

module.exports = {listarComentarios,salvarComentario,buscarPorConteudo,deletarComentario,atualizarComentario};