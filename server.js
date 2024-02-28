
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { generarGuia } = require('./api');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let contador = 0;

async function handleGenerarGuia(data) {

    try {
        const guiaGenerada = await generarGuia(data);
        // console.log(guiaGenerada)
        if (guiaGenerada && guiaGenerada.data && Array.isArray(guiaGenerada.data)) {
            const numGuiasGeneradas = guiaGenerada.data.length;
            contador += numGuiasGeneradas;
            io.emit('contador_actualizado', contador);
        } else {
            console.error('Error al generar la guía');
        }
    } catch (error) {
        console.error('Error generando guía:', error);
    }
}

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('generar_guia', async (data) => {
        await handleGenerarGuia(data);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
