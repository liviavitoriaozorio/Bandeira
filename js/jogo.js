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


fetch('https://restcountries.com/v2/all')
    .then(response => response.json())
    .then(data => {
    api = data
    sortPais()
})
        


function sortPais() {    
    const paisAleatorio = api[Math.floor(Math.random() * api.length)];

    pais = paisAleatorio.name;
    bandeira = paisAleatorio.flags.png;
    pais_br = paisAleatorio.translations.pt;

    img[0].src = bandeira;
    nome_pais.innerText = pais_br;
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


const btnFechar = document.querySelector('.bnnt');
const modal = document.getElementById('modal');
const cancelar = document.getElementById('cancelar');
const confirmar = document.getElementById('confirmar');
btnFechar.addEventListener('click', () => {
    modal.style.display = 'flex';
});
cancelar.addEventListener('click', () => {
    modal.style.display = 'none';
});
confirmar.addEventListener('click', () => {
    window.location.href = '../index.html'; 
});
