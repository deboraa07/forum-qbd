const Usuario = require('../models/Usuario');

const listarUsuarios = async (req,res) => {
    Usuario.find({},{_id:true, __v:false}).then(result => {
     res.status(200).send(result);
     }).catch(e => res.status(400).send(e));
}
 
 const buscarPorConteudo = async (req,res) =>{
     Usuario.find({$text:{$search:req.params.conteudo}},{_id:true,__v:false}).then(result => {
         res.status(200).send(result); 
     }).catch(e => res.status(400).send(e));
 }   

const salvarUsuario = async (req,res) => {
   Usuario.create(req.body).then(result => res.status(200).send
    (result)).catch(e => res.status(400).send(e));
}

const deletarUsuario = async (req,res) =>{
    Usuario.deleteOne({_id:req.params.id}).then(result => {
         if(result.deletedCount > 0) res.status(200).send('Removido com sucesso');
         else res.status(404).send('Usuario não encontrado');
     }).catch(e => res.status(400).send(e));
 }
 
 const atualizarUsuario = async (req,res) =>{
     await Usuario.findById(req.params.id).then(result =>{
         if(result){
             result.set(req.body);
             result.save();
             res.status(200).send('Atualizado com sucesso');
         }
     }).catch(e => res.status(404).send('Usuario não encontrado'));
 }

module.exports = {listarUsuarios,salvarUsuario,buscarPorConteudo,deletarUsuario,atualizarUsuario};