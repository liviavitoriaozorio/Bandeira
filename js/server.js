const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Cria a aplicação Express
const app = express();

// Cria o servidor HTTP
const server = http.createServer(app);

// Cria a instância do Socket.IO
const io = socketIO(server);

// Serve os arquivos estáticos da pasta atual (raiz do projeto)
app.use(express.static(__dirname)); // Serve os arquivos HTML, CSS, JS

// Quando um jogador se conecta
io.on('connection', (socket) => {
    console.log('Novo jogador conectado:', socket.id);

    // Quando o jogador entra numa sala
    socket.on('joinGame', (data) => {
        const { roomId, nome } = data;
        socket.join(roomId);
        console.log(`${nome} entrou na sala ${roomId}`);
        
        // Envia uma mensagem de boas-vindas para o jogador
        socket.emit('welcome', `Bem-vindo, ${nome}! Você está na sala ${roomId}.`);
    });

    // Quando o jogador desconectar
    socket.on('disconnect', () => {
        console.log('Jogador desconectado:', socket.id);
    });
});

// Inicia o servidor na porta 3000
server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
