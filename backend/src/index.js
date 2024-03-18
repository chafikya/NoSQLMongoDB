const express = require('express');
const cors = require('cors');
const http = require('http'); // Ajouté
const { Server } = require("socket.io"); // Ajouté
const app = express();

require('./database');
app.use(express.json());
app.use(cors());

const server = http.createServer(app); // Créez un serveur HTTP pour Express

// Initialisation de Socket.IO pour écouter sur le serveur HTTP
const io = new Server(server, {
    cors: {
        origin: "*", // À configurer selon vos besoins de CORS
        methods: ["GET", "POST"]
    }
});

app.use('/api',require('./routes/index'));

// Écouteur d'événements de connexion Socket.IO
io.on('connection', (socket) => {
    console.log(`Nouveau client connecté: ${socket.id}`);

    // Ici, vous pouvez gérer les événements spécifiques de Socket.IO
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => { // Utilisez `server.listen` au lieu de `app.listen`
    console.log(`Server on port ${PORT}`);
});

require('dotenv').config();
