let pais;
let bandeira;
let pais_br;

let img = document.getElementsByClassName('bandeira');
let frm = document.querySelector('.resposta'); 
let pontuacaoElemento = document.getElementById('pontuacao');
let nome_pais = document.getElementById('nome_pais'); 
let botao = document.querySelector('.bnt'); 

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

            img[0].src = bandeira;
            nome_pais.innerText = pais_br;
        })
        .catch(error => console.error("Erro ao buscar os países:", error));
}

botao.addEventListener("click", () => {
    let resposta_pais = frm.value.trim();
    const etapas = document.querySelectorAll(".etapa");

    if (rodadaAtual < 10) {
        if (resposta_pais.toLowerCase() === pais_br.toLowerCase()) {
            pontuacao += 10;
            etapas[rodadaAtual].classList.add("acertou");
        } else {
            pontuacao -= 5;
            etapas[rodadaAtual].classList.add("errou");
        }

        pontuacaoElemento.innerText = `Pontos: ${pontuacao}`;
        frm.value = "";
        rodadaAtual++;
        sortPais();
    }
});


let rodadaAtual = 0;

function atualizarBarraProgresso() {
    const etapas = document.querySelectorAll(".etapa");

    etapas.forEach((etapa, index) => {
        if (index < rodadaAtual) {
            etapa.classList.add("ativa");
        } else {
            etapa.classList.remove("ativa");
        }
    });
}
