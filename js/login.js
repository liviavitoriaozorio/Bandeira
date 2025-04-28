document.addEventListener("DOMContentLoaded", function () {
    var botaoJogar = document.getElementById("jogarBnt");
    if (botaoJogar) {
        botaoJogar.addEventListener("click", function () {
            window.location.href = "../html/jogo.html";
        });
    }
});
// Conecta ao servidor usando Socket.IO
const socket = io();

// Quando o jogador clicar no botão "Iniciar"
document.getElementById('jogarBnt').addEventListener('click', () => {
    // Pega o nome digitado pelo jogador
    const nomeJogador = document.getElementById('nomeJogador').value;

    if (nomeJogador.trim() === "") {
        alert("Por favor, insira um nome!");
        return;
    }

    // Cria uma sala única para esse jogador (por exemplo, usando o nome como ID da sala)
    const roomId = nomeJogador;

    // Envia o nome do jogador e a sala para o servidor
    socket.emit('joinGame', { roomId, nome: nomeJogador });

    // Redireciona para a página de jogo após a conexão
    window.location.href = 'jogo.html'; // Mude para a URL da sua página de jogo
});
