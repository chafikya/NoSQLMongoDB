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

const { createClient } = require('redis');

// Remplacez ces valeurs par vos informations de connexion Redis si nécessaire
const redisClient = createClient({
  url: "redis://localhost:6379" // Utilisez `process.env.REDIS_URL` pour une meilleure pratique
});
redisClient.connect();

redisClient.on('connect', () => console.log('Connecté à Redis'));
redisClient.on('error', (err) => console.error('Erreur de connexion Redis:', err));

io.on('connection', (socket) => {
    console.log(`Nouveau client connecté: ${socket.id}`);
    redisClient.sAdd('utilisateursConnectes', socket.id); // Ajouter à Redis

    socket.on('disconnect', () => {
        console.log(`Client déconnecté: ${socket.id}`);
        redisClient.sRem('utilisateursConnectes', socket.id); // Retirer de Redis
    });
});

setInterval(async () => {
    try {
        const membres = await redisClient.sMembers('utilisateursConnectes');
        io.emit('liste utilisateurs connectes', membres);
    } catch (err) {
        console.error(err);
    }
}, 5000); // Exemple: Mise à jour toutes les 5 secondes

