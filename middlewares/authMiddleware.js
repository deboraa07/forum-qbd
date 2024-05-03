const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

const auth = (req,res,next) => {
const authHeader = req.headers.authorization;

    const parts = authHeader.split(' ');

    if(parts.length !== 2){
        showAlert("Faça login ou cadastre-se")
        return res.status("token mal formatado");
    }

    const [scheme, token] = parts;
    if(scheme !== "Bearer"){
        return res.status(401).send("Token invalido");
    }


    jwt.verify(token, authConfig.secret, (err,decoded) => {
        if(err) {
            return res.status(401).send({error: "Token inválido"});
        }
        req.user = decoded;
        return next();
    })
}

module.exports = auth;

function showAlert(message){
    alert(message);
}