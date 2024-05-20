window.onload = () => {
  const postsDiv = document.getElementById("posts");
  const btnListar = document.getElementById("btnListar");
  const btnPesquisar = document.getElementById("btnPesquisar");
  const searchInput = document.getElementById("searchInput");
  const confirmaPesquisa = document.getElementById("confirmaPesquisa");
  const cancelaPesquisa = document.getElementById("cancelaPesquisa");
  const userId = localStorage.getItem("userId");
  const usuarioAtual = localStorage.getItem("username");
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

            const comentariosDiv = document.createElement("div");
            comentariosDiv.classList.add("comentarios-container");
            comentariosDiv.style.display = "none";
            postDiv.appendChild(comentariosDiv);

            postsDiv.appendChild(postDiv);

            //listar comentarios//
            verComentarios.addEventListener("click", () => {
              if (comentariosDiv.style.display === "block") {
                comentariosDiv.style.display = "none";
                verComentarios.textContent = "Ver comentários";
              } else {
                fetch(`//localhost:3000/comentarios/post/${post._id}`)
                  .then((response) => response.json())
                  .then((comentarios) => {
                    comentariosDiv.innerHTML = "";

                    const titleCom = document.createElement("p");
                    titleCom.textContent = "Comentários:";
                    titleCom.classList.add("titleCom-txt");
                    comentariosDiv.appendChild(titleCom);

                    if (comentarios.length === 0) {
                      const semCom = document.createElement("p");
                      semCom.textContent = "Este post ainda não possui comentários";
                      semCom.classList.add("noCom-txt");
                      comentariosDiv.appendChild(semCom);
                    }

                    comentarios.forEach((comentario) => {
                      const comentarioDiv = document.createElement("div");
                      comentarioDiv.classList.add("comentario");

                      const logoDiv = document.createElement("div");
                      logoDiv.classList.add("logo-container");
                      comentarioDiv.appendChild(logoDiv);

                      const logo = document.createElement("img");
                      logo.src = `./assets/Logo-login.svg`;
                      logo.classList.add("logo-com");
                      logoDiv.appendChild(logo);

                      const autorCom = document.createElement("p");
                      autorCom.textContent = `${comentario.autor}`;
                      autorCom.classList.add("autorCom");
                      comentarioDiv.appendChild(autorCom);

                      const conteudoCom = document.createElement("p");
                      conteudoCom.textContent = `${comentario.conteudo}`;
                      conteudoCom.classList.add("conteudoCom");
                      comentarioDiv.appendChild(conteudoCom);

                      if(comentario.autorId === userId){
                      const deleteButtonCom = document.createElement("button");
                      deleteButtonCom.classList.add("delete-btnCom");
                      deleteButtonCom.textContent = "Deletar";
                      comentarioDiv.appendChild(deleteButtonCom);

                      const updateComButton = document.createElement("button");
                      updateComButton.classList.add("update-btnCom");
                      updateComButton.textContent = "Atualizar";
                      
                      comentariosDiv.appendChild(comentarioDiv);

                      //deletar comentario//
                        deleteButtonCom.addEventListener("click", () => {
                          fetch(
                            `//localhost:3000/comentarios/${comentario._id}`,
                            {
                              method: "DELETE",
                              headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                              },
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
                        comentarioDiv.appendChild(deleteButtonCom);
                      

             //atualizar comentario//
             updateComButton.addEventListener("click", () => {
              const modalUpdateCom =
              document.getElementById("modalUpdateCom");
              modalUpdateCom.innerHTML = "";

               const modalUpdateTitle = document.createElement("h2");
               modalUpdateTitle.textContent = "Atualizar Comentário";

               const inputUpConteudo = document.createElement("textarea");
               inputUpConteudo.id = "inputUpConteudo";
               inputUpConteudo.value = comentario.conteudo;
               inputUpConteudo.placeholder = "Conteúdo do comentário";

               const salvarUpBtn = document.createElement("button");
               salvarUpBtn.id = "salvarUpBtn";
               salvarUpBtn.textContent = "Salvar";

               const cancelarUpBtn = document.createElement("button");
               cancelarUpBtn.id = "salvarUpBtn";
               cancelarUpBtn.textContent = "Cancelar";

               salvarUpBtn.addEventListener("click", () => {
                 const novoConteudo = inputUpConteudo.value;

                 const dadosAtualizados = {
                   conteudo:
                     novoConteudo !== "" ? novoConteudo : comentario.conteudo,
                 };

                 fetch(`//localhost:3000/comentarios/${comentario._id}`, {
                   method: "PUT",
                   headers: {
                     "Content-Type": "application/json",
                   },
                   body: JSON.stringify(dadosAtualizados),
                 })
                   .then((response) => response.text())
                   .then((message) => {
                     console.log(message);
                     verComentarios.click();
                     modalUpdateCom.style.display = "none";
                   })
                   .catch((error) => {
                     console.error(error);
                   });
               });

               cancelarUpBtn.addEventListener("click", () => {
                 modalUpdateCom.style.display = "none";
               });

               modalUpdateCom.appendChild(modalUpdateTitle);
               modalUpdateCom.appendChild(inputUpConteudo);
               modalUpdateCom.appendChild(salvarUpBtn);
               modalUpdateCom.appendChild(cancelarUpBtn);

               modalUpdateCom.style.display = "block";
             });
             comentarioDiv.appendChild(updateComButton);
            }
            comentariosDiv.appendChild(comentarioDiv);
          });
          comentariosDiv.style.display = "block";
          verComentarios.textContent = "Esconder Comentários";
        })
        .catch((error)=> {
          console.error("Erro ao carregar comentários", error);
        });
      }
    });

     //criar comentarios//
     deixarComentario.addEventListener("click", () => {
      const modalCom = document.getElementById("modalCom");
      modalCom.innerHTML = "";

      const modalComTitle = document.createElement("h2");
      modalComTitle.textContent = "Deixe seu comentário";

      const inputConteudoCom = document.createElement("textarea");
      inputConteudoCom.id = "inputConteudoCom";
      inputConteudoCom.placeholder = "Digite o comentário";

      const salvarBtnCom = document.createElement("button");
      salvarBtnCom.textContent = "Enviar";
      salvarBtnCom.id = "salvarBtnCom";

      salvarBtnCom.addEventListener("click", () => {
        const conteudoCom = inputConteudoCom.value;

        const comentario = {
          postId: post._id,
          autorId: userId,
          autor: usuarioAtual,
          conteudo: conteudoCom,
        };

        fetch("//localhost:3000/comentarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comentario),
        })
          .then((response) => response.text())
          .then((message) => {
            console.log(message);
            console.log(userId);
            btnListar.click();
            modalCom.style.display = "none";
          })
          .catch((error) => {
            console.error(error);
          });
      });

      const cancelarBtnCom = document.createElement("button");
      cancelarBtnCom.textContent = "Cancelar";
      cancelarBtnCom.id = "cancelarBtnCom";

      cancelarBtnCom.addEventListener("click", () => {
        modalCom.style.display = "none";
      });

      modalCom.appendChild(modalComTitle);
      modalCom.appendChild(inputConteudoCom);
      modalCom.appendChild(salvarBtnCom);
      modalCom.appendChild(cancelarBtnCom);

      modalCom.style.display = "block";
    });


            //deletar posts
            if (post.autorId === userId) {
              const deleteButton = document.createElement("button");
              deleteButton.classList.add("delete-button");
              deleteButton.textContent = "Deletar";
              deleteButton.addEventListener("click", () => {
                fetch(`//localhost:3000/posts/${post._id}`, {
                  method: "DELETE",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
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

              //atualizar posts
              const updateButton = document.createElement("button");
              updateButton.classList.add("update-button");
              updateButton.textContent = "Atualizar";

              updateButton.addEventListener("click", () => {
                const modalContainer =
                  document.getElementById("modalContainer");
                modalContainer.innerHTML = "";

                const modalTitle = document.createElement("h2");
                modalTitle.textContent = "Atualizar Post";

                const inputAutor = document.createElement("input");
                inputAutor.id = "inputAutor";
                inputAutor.value = post.autor;
                inputAutor.placeholder = "Autor";

                const inputTitulo = document.createElement("input");
                inputTitulo.id = "inputTitulo";
                inputTitulo.value = post.titulo;
                inputTitulo.placeholder = "Título";

                const inputConteudo = document.createElement("textarea");
                inputConteudo.id = "inputConteudo";
                inputConteudo.value = post.conteudo;
                inputConteudo.placeholder = "Conteúdo";

                const salvarBtn = document.createElement("button");
                salvarBtn.id = "salvarBtn";
                salvarBtn.textContent = "Salvar";

                const cancelarBtn = document.createElement("button");
                cancelarBtn.id = "salvarBtn";
                cancelarBtn.textContent = "Cancelar";

                salvarBtn.addEventListener("click", () => {
                  const novoAutor = inputAutor.value;
                  const novoTitulo = inputTitulo.value;
                  const novoConteudo = inputConteudo.value;

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
                if (post.autorId === userId) {
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
                    document.getElementById("inputConteudo").value =
                      post.conteudo;

                    const salvarBtn = document.getElementById("salvarBtn");
                    salvarBtn.addEventListener("click", () => {
                      const novoAutor =
                        document.getElementById("inputAutor").value;
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
                }
                postsDiv.appendChild(postDiv);
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
  });
   }
