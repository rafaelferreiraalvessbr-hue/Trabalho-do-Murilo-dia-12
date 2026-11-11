const estado = document.getElementById("estado");
const cidade = document.getElementById("cidade");
const resultado = document.getElementById("resultado");

// Buscar todos os estados
fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(response => response.json())
    .then(estados => {

        estados.sort((a, b) => a.nome.localeCompare(b.nome));

        estados.forEach(item => {

            let option = document.createElement("option");

            option.value = item.sigla;
            option.textContent = item.nome;

            estado.appendChild(option);
        });
    });


// Quando escolher um estado
estado.addEventListener("change", function () {

    cidade.innerHTML = '<option value="">Selecione uma cidade</option>';

    resultado.innerHTML = "";

    let uf = estado.value;

    if (uf === "") {
        return;
    }

    // Buscar cidades do estado selecionado
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
        .then(response => response.json())
        .then(cidades => {

            cidades.sort((a, b) => a.nome.localeCompare(b.nome));

            cidades.forEach(item => {

                let option = document.createElement("option");

                option.value = item.nome;
                option.textContent = item.nome;

                cidade.appendChild(option);
            });
        });
});


// Quando escolher uma cidade
cidade.addEventListener("change", function () {

    if (cidade.value === "") {
        resultado.innerHTML = "";
        return;
    }

    let nomeEstado = estado.options[estado.selectedIndex].text;

    resultado.innerHTML =
        `<p>Você selecionou: ${cidade.value} - ${nomeEstado}</p>`;
});