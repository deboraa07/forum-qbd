window.onload = () => {
  const postsDiv = document.getElementById("posts");
  const btnListar = document.getElementById("btnListar");
  const btnPesquisar = document.getElementById("btnPesquisar");
  const searchInput = document.getElementById("searchInput");
  const confirmaPesquisa = document.getElementById("confirmaPesquisa");
  const cancelaPesquisa = document.getElementById("cancelaPesquisa");
  const userId = localStorage.getItem("userId");
  let listaVisivel = false;

  btnListar.addEventListener("click", () => {
    if (listaVisivel) {
      postsDiv.innerHTML = "";
      listaVisivel = false;
    } else {
      //lista os posts
      fetch("//localhost:3000/posts")
        .then((response) => response.json())
        .then((posts) => {
          postsDiv.innerHTML = "";

          posts.forEach((post) => {
            const postDiv = document.createElement("div");
            postDiv.classList.add("post-container");

            const logoDiv = document.createElement("div");
            logoDiv.classList.add("logo-container");
            postDiv.appendChild(logoDiv);

            const logo = document.createElement("img");
            logo.src = `./assets/Logo-login.svg`;
            logo.classList.add("logo");
            logoDiv.appendChild(logo);

            const deixarComentario = document.createElement("button");
            deixarComentario.classList.add("deixar-comentario");
            deixarComentario.textContent = "Deixar comentário";
            postDiv.appendChild(deixarComentario);

            const verComentarios = document.createElement("button");
            verComentarios.classList.add("ver-comentarios");
            verComentarios.textContent = "Ver comentários";
            postDiv.appendChild(verComentarios);

            const autorP = document.createElement("p");
            autorP.textContent = `${post.autor}`;
            autorP.classList.add("autorP");
            postDiv.appendChild(autorP);

            const tituloP = document.createElement("p");
            tituloP.textContent = `${post.titulo}`;
            tituloP.classList.add("tituloP");
            postDiv.appendChild(tituloP);

            const conteudoP = document.createElement("p");
            conteudoP.textContent = `${post.conteudo}`;
            conteudoP.classList.add("conteudoP");
            postDiv.appendChild(conteudoP);


            //deletar posts
            if(post.autorId === userId){
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-button");
            deleteButton.textContent = "Deletar";
            deleteButton.addEventListener("click", () => {
              fetch(`//localhost:3000/posts/${post._id}`, { method: "DELETE" })
                .then((response) => response.text())
                .then((message) => {
                  console.log(message);
                  btnListar.click();
                })
                .catch((error) => {
                  console.error(error);
                });
            });
            postDiv.appendChild(deleteButton);
          
            //atualiza post
            const updateButton = document.createElement("button");
            updateButton.classList.add("update-button");
            updateButton.textContent = "Atualizar";
            
            updateButton.addEventListener("click", () => {
              const modalContainer = document.getElementById("modalContainer");
              modalContainer.innerHTML = "";

              const modalTitle = document.createElement("h2");
              modalTitle.textContent = "Atualizar Post";
              
              const inputAutor =  document.createElement("input");
              inputAutor.id = "inputAutor";
              inputAutor.value = post.autor;
              inputAutor.placeholder = "Autor";
              
              const inputTitulo =  document.createElement("input");
              inputTitulo.id = "inputTitulo";
              inputTitulo.value = post.titulo;
              inputTitulo.placeholder = "Título";

              const inputConteudo =  document.createElement("textarea");
              inputConteudo.id = "inputConteudo";
              inputConteudo.value = post.conteudo;
              inputConteudo.placeholder = "Conteúdo";

              const salvarBtn =  document.createElement("button");
              salvarBtn.id = "salvarBtn";
              salvarBtn.textContent = "Salvar";
              
              const cancelarBtn =  document.createElement("button");
              cancelarBtn.id = "salvarBtn";
              cancelarBtn.textContent = "Cancelar";   

              salvarBtn.addEventListener("click",  () => {
                const novoAutor = inputAutor.value;
                const novoTitulo = inputTitulo.value;
                const novoConteudo = inputConteudo.value;

              
                const dadosAtualizados = {
                autor: novoAutor !== "" ? novoAutor : post.autor,
                titulo: novoTitulo !== "" ? novoTitulo : post.titulo,
                conteudo: novoConteudo !== "" ? novoConteudo : post.conteudo,
                };

                fetch(`//localhost:3000/posts/${post._id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(dadosAtualizados),
                })
                  .then((response) => response.text())
                  .then((message) => {
                    console.log(message); 
                    btnListar.click();    
                    modalContainer.style.display = "none";
                })               
                  .catch((error) => {
                    console.error(error);
                  });
              });

              cancelarBtn.addEventListener("click", () => {
                modalContainer.style.display = "none";
              });
            
             modalContainer.appendChild(modalTitle);
             modalContainer.appendChild(inputAutor);
             modalContainer.appendChild(inputTitulo);
             modalContainer.appendChild(inputConteudo);
             modalContainer.appendChild(salvarBtn);
             modalContainer.appendChild(cancelarBtn);

             modalContainer.style.display = "block";
            });
            postDiv.appendChild(updateButton);
          }
            postsDiv.appendChild(postDiv);
          });
          listaVisivel = true;
        })
        .catch((error) => {
          postsDiv.textContent = "Erro ao carregar posts";
          console.error(error);
        });
    }
  });



  //pesquisa de posts
  confirmaPesquisa.style.display = "none";
  searchInput.style.display = "none";
  cancelaPesquisa.style.display = "none";

  btnPesquisar.addEventListener("click", () => {
    searchInput.style.display = "block";
      confirmaPesquisa.style.display = "block";
      cancelaPesquisa.style.display = "block"; 
      
      confirmaPesquisa.addEventListener("click", () => {   
        const textSearch = searchInput.value;
        if (textSearch) {
      fetch(`//localhost:3000/posts/${textSearch}`)
      .then((response) => response.json())
      .then((posts) => {
        postsDiv.innerHTML = "";
        
        if (posts.length === 0) {
          const mensagemP = document.createElement("p");
          mensagemP.textContent = "Nenhum post encontrado.";
          postsDiv.appendChild(mensagemP);
        } else {
          posts.forEach((post) => {
            const postDiv = document.createElement("div");
            postDiv.classList.add("post-container");
            
            const logo = document.createElement("img");
            logo.src = `./assets/Logo-login.svg`;
            logo.classList.add("logo");
            postDiv.appendChild(logo);
            
            const deixarComentario = document.createElement("button");
            deixarComentario.classList.add("deixar-comentario");
            deixarComentario.textContent = "Deixar comentário";
            postDiv.appendChild(deixarComentario);
            
            const verComentarios = document.createElement("button");
            verComentarios.classList.add("ver-comentarios");
            verComentarios.textContent = "Ver comentários";
            postDiv.appendChild(verComentarios);
            
            const autorP = document.createElement("p");
            autorP.textContent = `${post.autor}`;
            autorP.classList.add("autorP");
            postDiv.appendChild(autorP);
            
            const tituloP = document.createElement("p");
            tituloP.textContent = `${post.titulo}`;
            tituloP.classList.add("tituloP");
            postDiv.appendChild(tituloP);
            
            const conteudoP = document.createElement("p");
            conteudoP.textContent = `${post.conteudo}`;
            conteudoP.classList.add("conteudoP");
            postDiv.appendChild(conteudoP);
            
            postsDiv.appendChild(postDiv);
            
            searchInput.style.display = "none";
            cancelaPesquisa.style.display = "none";
            confirmaPesquisa.style.display = "none";

            
            //remoção de posts pra pesquisa
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-button");
            deleteButton.textContent = "Deletar";
            deleteButton.addEventListener("click", () => {
              fetch(`//localhost:3000/posts/${post._id}`, {
                method: "DELETE",
              })
              .then((response) => response.text())
              .then((message) => {
                console.log(message);
                btnListar.click();
              })
              .catch((error) => {
                    console.error(error);
                  });
                });
                
                postDiv.appendChild(deleteButton);
                
              //atualização de posts para pesquisa
                const updateButton = document.createElement("button");
                updateButton.classList.add("update-button");
                updateButton.textContent = "Atualizar";
                updateButton.addEventListener("click", () => {
                  const modalContainer =
                  document.getElementById("modalContainer");
                  modalContainer.style.display = "block";
                  
                  document.getElementById("inputAutor").value = post.autor;
                  document.getElementById("inputTitulo").value = post.titulo;
                  document.getElementById("inputConteudo").value = post.conteudo;
                  
                  const salvarBtn = document.getElementById("salvarBtn");
                  salvarBtn.addEventListener("click", () => {
                  const novoAutor = document.getElementById("inputAutor").value;
                  const novoTitulo =
                  document.getElementById("inputTitulo").value;
                  const novoConteudo =
                  document.getElementById("inputConteudo").value;
                  
                  const dadosAtualizados = {
                    autor: novoAutor !== "" ? novoAutor : post.autor,
                    titulo: novoTitulo !== "" ? novoTitulo : post.titulo,
                    conteudo:
                    novoConteudo !== "" ? novoConteudo : post.conteudo,
                  };
                  
                  fetch(`//localhost:3000/posts/${post._id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dadosAtualizados),
                  })
                  .then((response) => response.text())
                  .then((message) => {
                    console.log(message); 
                    btnListar.click(); 
                  })
                  .catch((error) => {
                    console.error(error);
                  });
                  
                  modalContainer.style.display = "none";
                });
                
                const cancelarBtn = document.getElementById("cancelarBtn");
                cancelarBtn.addEventListener("click", () => {
                  modalContainer.style.display = "none";
                });
              });
              postDiv.appendChild(updateButton);
            });
            
            listaVisivel = true;
          }
        })
        .catch((error) => {
          postDiv.textContent = "Erro ao carregar posts";
          console.error(error);
        });
      }
    });
  });
  cancelaPesquisa.addEventListener("click", () => {
    confirmaPesquisa.style.display = "none";
    searchInput.style.display = "none"; 
    cancelaPesquisa.style.display = "none"; 
})};
