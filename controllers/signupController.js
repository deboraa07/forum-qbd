document.addEventListener("DOMContentLoaded", function () {
  const cadastrar = document.getElementById("button-cadastrar");
  cadastrar.addEventListener("click", async (event) => {
    event.preventDefault();
    await salvar();
  });
});

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
  window.alert("Usuario cadastrado com sucesso");

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}
