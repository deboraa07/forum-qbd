const express = require ('express');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const Usuario = require('../models/Usuario');
//user registration
  const cadastrar = document.getElementById('button-cadastrar');
  cadastrar.addEventListener('click', async (event) => {
    event.preventDefault();
    await salvar();
  });
  
  async function salvar() {
    const obj = {
      nome: document.getElementById('name').value,
      email: document.getElementById('email').value,
      senha: document.getElementById('password').value
  };
  console.log(obj);
    
    await fetch("//localhost:3000/usuarios", {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
  }
