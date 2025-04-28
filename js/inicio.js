document.addEventListener("DOMContentLoaded", function () {
    var botaoJogar = document.getElementById("jogarBnt");
    if (botaoJogar) {
        botaoJogar.addEventListener("click", function () {
            window.location.href = "html/login.html";
        });
    }
});
const socket = io();

// Quando o botão "Jogar" for clicado
document.getElementById('jogarBnt').addEventListener('click', () => {
    // Aqui você pode futuramente pegar o nome do jogador e gerar uma sala dinâmica
    const roomId = 'sala1'; // por enquanto, sala fixa

    // Entra na sala
    socket.emit('joinGame', roomId);

    // Redireciona para a página do jogo (você pode criar uma 'jogo.html')
    window.location.href = 'jogo.html'; // ou qualquer rota do seu jogo principal
});
