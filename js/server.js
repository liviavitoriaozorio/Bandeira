// 1. Importa os pacotes
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// 2. Cria o app e o servidor
const app = express();
const server = http.createServer(app);
const io = socketIO(server); // Socket.IO ligado ao servidor

// 3. Diz que a pasta "public" tem os arquivos do seu site
app.use(express.static('public'));

// 4. Quando um jogador se conecta
io.on('connection', (socket) => {
    console.log('Jogador conectado:', socket.id);

    // Quando ele entra numa sala (enviado pelo navegador)
    socket.on('joinGame', (roomId) => {
        socket.join(roomId); // entra na sala
        console.log(`Jogador ${socket.id} entrou na sala ${roomId}`);
    });

    // Quando o jogador sai
    socket.on('disconnect', () => {
        console.log('Jogador saiu:', socket.id);
    });
});

// 5. Inicia o servidor na porta 3000
server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
