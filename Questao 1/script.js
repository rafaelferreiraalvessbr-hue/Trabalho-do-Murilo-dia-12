function buscarCEP() {

    let cep = document.getElementById("cep").value;

    // Remove espaços e caracteres que não sejam números
    cep = cep.replace(/\D/g, "");

    if (cep.length !== 8) {
        document.getElementById("resultado").innerHTML =
            "<p>CEP inválido!</p>";
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(dados => {

            if (dados.erro) {
                document.getElementById("resultado").innerHTML =
                    "<p>CEP não encontrado!</p>";
                return;
            }

            document.getElementById("resultado").innerHTML = `
                <h3>Endereço encontrado:</h3>
                <p><strong>Rua:</strong> ${dados.logradouro}</p>
                <p><strong>Bairro:</strong> ${dados.bairro}</p>
                <p><strong>Cidade:</strong> ${dados.localidade}</p>
                <p><strong>Estado:</strong> ${dados.uf}</p>
            `;
        })
        .catch(erro => {
            document.getElementById("resultado").innerHTML =
                "<p>Erro ao buscar o CEP.</p>";
        });
}