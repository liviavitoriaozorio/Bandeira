const express = require('express');  // Importando o Express
const path = require('path');  // Para manipular caminhos de arquivos
const http = require('http');  // Para criar o servidor HTTP
const socketIo = require('socket.io');  // Para usar o Socket.IO para comunicação em tempo real

const app = express();  // Criando o app do Express
const server = http.createServer(app);  // Criando o servidor HTTP com o Express
const io = socketIo(server);  // Criando o servidor Socket.IO

const port = 3000;  // Definindo a porta onde o servidor vai rodar

// Configurando o Express para servir arquivos estáticos (HTML, CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'bandeira-main')));  // Serve todos os arquivos dentro da pasta 'bandeira-main'

// Definir rotas para as páginas específicas (login, jogo e página inicial)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'bandeira-main/index.html'));  // Página inicial
});

app.get('/html/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'bandeira-main/html/login.html'));  // Página de login
});

app.get('/html/jogo.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'bandeira-main/html/jogo.html'));  // Página do jogo
});

// Inicia o servidor e fica ouvindo na porta 3000
server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// Lógica de comunicação em tempo real com Socket.IO
io.on('connection', (socket) => {
    console.log('Novo jogador conectado:', socket.id);

    // Quando um jogador envia seu nome para entrar na partida
    socket.on('joinGame', (data) => {
        const { roomId, nome } = data;
        socket.join(roomId);  // Adiciona o jogador à sala do jogo
        console.log(`${nome} entrou na sala ${roomId}`);

        // Envia uma mensagem de boas-vindas para o jogador
        socket.emit('welcome', `Bem-vindo, ${nome}! Você entrou na sala ${roomId}.`);

        // Notifica os outros jogadores na sala que um novo jogador entrou
        socket.to(roomId).emit('newPlayer', `${nome} entrou na sala!`);
    });

    // Quando o jogador fizer uma adivinhação sobre a bandeira
    socket.on('guessFlag', (data) => {
        const { escolha } = data;

        // Lógica para verificar a resposta (aqui você pode ajustar conforme seu jogo)
        const resultado = (escolha === 'brasil') ? 'correto' : 'errado';

        // Envia a resposta para o jogador que fez a escolha
        socket.emit('flagResult', resultado);

        // Envia para todos os jogadores da sala (exceto quem fez a adivinhação)
        socket.to(socket.room).emit('otherPlayerGuessed', `${socket.id} fez uma escolha!`);
    });

    // Quando o jogador desconectar
    socket.on('disconnect', () => {
        console.log('Jogador desconectado:', socket.id);
    });
});