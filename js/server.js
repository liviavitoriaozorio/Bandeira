const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Servir os arquivos da pasta "public"
app.use(express.static('public'));

// Quando um jogador se conecta
io.on('connection', (socket) => {
    console.log('Jogador conectado:', socket.id);

    // Quando o jogador entra em uma sala
    socket.on('joinGame', (data) => {
        const { roomId, nome } = data;  // Pega o roomId (nome do jogador) e o nome do jogador

        socket.join(roomId);  // O jogador entra na sala
        console.log(`Jogador ${nome} entrou na sala ${roomId}`);
        
        // Aqui você pode enviar alguma resposta para o jogador, como:
        socket.emit('welcome', `Bem-vindo, ${nome}! Você está na sala ${roomId}.`);
    });

    // Quando o jogador sai
    socket.on('disconnect', () => {
        console.log('Jogador saiu:', socket.id);
    });
});

// Inicia o servidor na porta 3000
server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
