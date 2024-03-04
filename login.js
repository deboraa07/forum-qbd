let loginButton = document.getElementById('button-entrar');
let loginForm = document.getElementById('login-Form');
let signupButtom = document.getElementById('button-cadastrar');


async function cadastrarUsuario(nome, email, senha) {
  try {
    const response = await fetch('//localhost:3000/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome,
        email,
        senha
      })
    });

    if (response.ok) {
      const usuario = await response.json();
      console.log(usuario);
      window.location.href = 'login.html';
    } else {
      console.error('Erro ao cadastrar usuário');
    }
  } catch (error) {
    console.error(error);
  }
} 
  // login.js
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('form-login');
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio do formulário
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    // Redireciona para a página de eventos
    window.location.href = 'crud.html';
  });
})