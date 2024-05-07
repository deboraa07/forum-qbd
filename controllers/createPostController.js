document.addEventListener("DOMContentLoaded", function () {
  const criar = document.getElementById("button-criar");
  criar.addEventListener("click", async (event) => {
    event.preventDefault();
    await criarPost();
  });

  async function criarPost() {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const post = {
      autorId: userId,
      autor: localStorage.getItem("username"),
      titulo: document.getElementById("titulo").value,
      conteudo: document.getElementById("conteudo").value,
    };
    console.log(post);

    if (userId === null || token === null) {
      window.alert("Faça login ou cadastre-se para criar posts!");
    }

    await fetch("//localhost:3000/posts", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });

    document.getElementById("titulo").value = "";
    document.getElementById("conteudo").value = "";
    window.alert("Post criado com sucesso!");
  }
});
