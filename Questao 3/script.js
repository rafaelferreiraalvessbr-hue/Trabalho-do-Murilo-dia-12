const usuario = document.getElementById("usuario");
const postagens = document.getElementById("postagens");
const detalhes = document.getElementById("detalhes");


// 1. Buscar todos os usuários
fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(usuarios => {

        usuarios.forEach(item => {

            let option = document.createElement("option");

            option.value = item.id;
            option.textContent = item.name;

            usuario.appendChild(option);
        });
    });


// 2. Quando escolher um usuário
usuario.addEventListener("change", function () {

    postagens.innerHTML = "";
    detalhes.innerHTML = "";

    let idUsuario = usuario.value;

    if (idUsuario === "") {
        return;
    }

    // Buscar postagens do usuário
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${idUsuario}`)
        .then(response => response.json())
        .then(posts => {

            posts.forEach(post => {

                let titulo = document.createElement("h3");

                titulo.textContent = post.title;

                // 3. Quando clicar no título
                titulo.addEventListener("click", function () {

                    detalhes.innerHTML = "";

                    // Buscar a postagem completa
                    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
                        .then(response => response.json())
                        .then(postagem => {

                            let conteudo = document.createElement("div");

                            conteudo.innerHTML = `
                                <h2>${postagem.title}</h2>
                                <p>${postagem.body}</p>
                            `;

                            detalhes.appendChild(conteudo);


                            // Buscar comentários
                            fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
                                .then(response => response.json())
                                .then(comentarios => {

                                    let tituloComentarios =
                                        document.createElement("h3");

                                    tituloComentarios.textContent =
                                        "Comentários:";

                                    detalhes.appendChild(tituloComentarios);


                                    comentarios.forEach(comentario => {

                                        let divComentario =
                                            document.createElement("div");

                                        divComentario.innerHTML = `
                                            <p>
                                                <strong>${comentario.name}</strong>
                                            </p>

                                            <p>
                                                ${comentario.body}
                                            </p>

                                            <hr>
                                        `;

                                        detalhes.appendChild(divComentario);
                                    });
                                });
                        });
                });

                postagens.appendChild(titulo);
            });
        });
});