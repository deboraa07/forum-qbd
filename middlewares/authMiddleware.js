import jwt from 'jsonwebtoken'
import authConfig from "../config/auth.json" assert {type:"json"};

export function auth(req,res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).send({error: 'Token nao fornecido'});
    }

    const parts = authHeader.split('');

    if(parts.length !== 2) {
        return res.status(401).send({error:'Token mal formatado'});
    }

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error:'Token mal formatado'});
    }

    jwt.verify(token, authConfig.secret, (err,decoded) => {
        if(err) {
            return res.status(401).send({error: 'Token inválido'});
        }
        console.log("Token dec:", decoded);

        if(decoded.id || !decoded.username){
            console.log("Payload do token invalido");
            return res.status(401).send({error: 'Token invalido'});
        }
        req.user = decoded;
        return next();
    })
};

export default auth;