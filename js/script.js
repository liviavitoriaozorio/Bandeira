// Variáveis globais
let pais, bandeira, pais_br;
let pontuacao = 0;

// Selecionar elementos do HTML
const img = document.querySelector('.bandeira'); // Corrigido nome da classe
const botao = document.querySelector('.bnt');
const inputResposta = document.querySelector('.resposta');

// Função para buscar e sortear um país da API
function sortPais() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const paisAleatorio = data[Math.floor(Math.random() * data.length)];

            pais = paisAleatorio.name.common;
            bandeira = paisAleatorio.flags.png;
            pais_br = paisAleatorio.translations?.por?.common || pais; 

            console.log(`País sorteado: ${pais} | Nome em português: ${pais_br}`);

            img.src = bandeira;
            img.alt = `Bandeira de ${pais_br}`;
        })
        .catch(error => console.error("Erro ao carregar API:", error));
}


// Aguarda carregamento da página antes de sortear um país
document.addEventListener("DOMContentLoaded", sortPais);
