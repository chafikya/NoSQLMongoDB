const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const { createClient } = require('redis');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const redisClient = createClient(); // Création du client Redis.

app.use(express.json());
app.use(cors());

// Initialisation du client Redis (pour Redis v4.x).
redisClient.connect().catch(console.error);

// Supprimez les options obsolètes pour la connexion MongoDB.
require('./database');

app.use('/api', require('./routes/index'));

// Gestion des connexions Socket.IO
io.on('connection', (socket) => {
    console.log('Nouveau client connecté', socket.id);

    redisClient.sAdd('utilisateursConnectes', socket.id)
        .then(() => console.log(`Utilisateur ${socket.id} ajouté`))
        .catch(console.error);

    socket.on('disconnect', async () => {
        console.log('Client déconnecté', socket.id);

        try {
            await redisClient.sRem('utilisateursConnectes', socket.id);
            console.log(`Utilisateur ${socket.id} retiré`);
        } catch (error) {
            console.error(error);
        }
    });
});

// Lancer le serveur sur le port défini dans .env ou 3000 par défaut.
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server on port ${PORT}`));

// Mise à jour périodique de la liste des utilisateurs connectés.
setInterval(async () => {
    try {
        const membres = await redisClient.sMembers('utilisateursConnectes');
        io.emit('liste utilisateurs connectes', membres);
    } catch (err) {
        console.error(err);
    }
}, 10000);
