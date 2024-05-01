const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

//gera token para usar no login
function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}
//autentica usuario
const fazerLogin = async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await Usuario.findOne({ email });

  if (!usuario) return res.status(400).send({ error: "Email invalido" });

  if (!(await bcrypt.compare(senha, usuario.senha)))
    return res.status(400).send({ error: "Senha invalida" });

  res.send({ usuario:usuario.nome, token: generateToken({ id: usuario.id }) });
};

async function logar() {
  const obj = {
    nome: localStorage.getItem("username"),
    email: document.getElementById("email").value,
    senha: document.getElementById("password").value,
  };

  console.log(obj);

  const response = await fetch("//localhost:3000/usuarios/login", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  const data = await response.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.usuario);
  
  console.log(data.token);
  console.log(data.usuario);
  if (response.ok) {
  window.location.assign("postCrud.html");
  }
  window.alert("Erro ao fazer login");
}

module.exports = { fazerLogin };
