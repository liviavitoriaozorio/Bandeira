document.addEventListener("DOMContentLoaded", function () {
    var botaoJogar = document.getElementById("jogarBtn");
    if (botaoJogar) {
        botaoJogar.addEventListener("click", function () {
            window.location.href = "/html/jogo.html";
        });
    }
});