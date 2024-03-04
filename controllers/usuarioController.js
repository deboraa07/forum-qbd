const Usuario = require('../models/Usuario');

const salvarUsuario = async (req,res) => {
   Usuario.create(req.body).then(result => res.status(200).send
    (result)).catch(e => res.status(400).send(e));
}

module.exports = {salvarUsuario};