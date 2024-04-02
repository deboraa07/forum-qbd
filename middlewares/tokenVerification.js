function verificarToken(req, res, next) {
    const token = req.headers.authorization;
  
    if (!token)
      return res.status(401).send({ error: 'Token não fornecido' });
  
    jwt.verify(token, authConfig.secret, async (err, decoded) => {
      if (err)
        return res.status(401).send({ error: 'Token inválido' });
  
      try {
        const usuario = await Usuario.findById(decoded.id);
  
        if (!usuario)
          return res.status(401).send({ error: 'Usuário não encontrado' });
  
        req.userId = decoded.id;
        next();
      } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Erro interno do servidor' });
      }
    });
  }
module.exports = {verificarToken};  