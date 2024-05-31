document.addEventListener("DOMContentLoaded", function () {
  const cadastrar = document.getElementById("button-cadastrar");
  cadastrar.addEventListener("click", async (event) => {
    event.preventDefault();
    if (formValidate()) {
     await salvar();
     await reg();
    }
  });
});

  function formValidate() {
  let nome = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let senha = document.getElementById("password").value;

  let erroNome = document.getElementById("erroNome");
  let erroEmail = document.getElementById("erroEmail");
  let erroSenha = document.getElementById("erroSenha");

  erroNome.textContent = "";
  erroEmail.textContent = "";
  erroSenha.textContent = "";

  let formIsOk = true;


  if (nome.length < 3) {
    erroNome.textContent = "O nome deve ter pelo menos 3 caracteres!";
    formIsOk = false;
  }

  let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    erroEmail.textContent = "Por favor insira um email válido!";
    formIsOk = false;
  }

  if (senha.length < 8) {
    erroSenha.textContent = "A senha deve ter pelo menos 8 caracteres!";
    formIsOk = false;
  }
  return formIsOk;
}


async function salvar() {
  const obj = {
    nome: document.getElementById("name").value,
    email: document.getElementById("email").value,
    senha: document.getElementById("password").value,
  };
  console.log(obj);
  await fetch("//localhost:3000/usuarios", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}
function reg(){
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Usuário cadastrado com sucesso",
    showConfirmButton: false,
    timer: 2000
  });
}


  
