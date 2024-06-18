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

    if (userId === null || token === null) {
      function reg2() {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Faça login ou cadastre-se para criar posts!",
        });
      }
     reg2()} else {
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
      reg();

      document.getElementById("titulo").value = "";
      document.getElementById("conteudo").value = "";
      function reg() {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Post criado com sucesso!",
          showConfirmButton: false,
          timer: 1000
        });
      console.log(post);
  }
  }
  }
});
