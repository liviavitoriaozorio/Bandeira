let pais;
let bandeira;
let pais_br;

let img = document.getElementsByClassName('bandeira');
let frm = document.querySelector('.resposta'); // Correção da seleção do input
let pontuacaoElemento = document.getElementById('pontuacao');
let nome_pais = document.getElementById('nome_pais'); // Seleção correta do elemento nome_pais
let botao = document.querySelector('.bnt'); // Seleção do botão "PRÓXIMO"

let pontuacao = 0;

document.addEventListener("DOMContentLoaded", () => {
    sortPais();
});

function sortPais() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const paisAleatorio = data[Math.floor(Math.random() * data.length)];

            pais = paisAleatorio.name.common;
            bandeira = paisAleatorio.flags.png;
            pais_br = paisAleatorio.translations.por.common;

            img[0].src = bandeira; // Corrigido para acessar o primeiro elemento da coleção
            nome_pais.innerText = pais_br; // Atualiza o nome do país em português
        })
        .catch(error => console.error("Erro ao buscar os países:", error));
}

botao.addEventListener("click", () => {
    let resposta_pais = frm.value.trim(); // Obtém o valor do input corretamente

    if (resposta_pais.toLowerCase() === pais_br.toLowerCase()) {
        pontuacao += 10;
    } else {
        pontuacao -= 5;
    }

    pontuacaoElemento.innerText = `Pontos: ${pontuacao}`;
    frm.value = ""; // Limpa o input após a resposta
    sortPais(); // Gera um novo país
});
