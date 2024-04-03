const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const app = express();

const { expressjwt: jwt } = require('express-jwt');

require('./database');
app.use(express.json());
app.use(cors());

// Clé secrète pour JWT
const JWT_SECRET = 'VotreCleSecreteComplexIci';

// Création du serveur HTTP pour Express
const server = http.createServer(app);

// Middleware d'authentification JWT
const authenticate = jwt({
    secret: JWT_SECRET,
    algorithms: ['HS256'],
});

// Ignorer l'authentification pour certaines routes
app.use(authenticate.unless({
    path: [
        { url: "/api/signup", methods: ["POST"] },
        { url: "/api/signin", methods: ["POST"] },
        { url: "/api/user/id", methods: ["GET"] },
        { url: "/api/users", methods: ["GET"] }
    ],
}));

// Initialisation de Socket.IO sur le serveur HTTP
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Routes API
app.use('/api', require('./routes/index'));

// Route pour récupérer l'ID utilisateur
app.get('/api/user/id',  (req, res) => {
    if (req.user && req.user.id) {
        res.json({ id: req.user.id });
    } else {
        res.status(401).send('Utilisateur non authentifié ou ID indisponible');
    }
});

// Connexion à Redis
const { createClient } = require('redis');
const redisClient = createClient({
  url: "redis://localhost:6379"
});
redisClient.connect();

// Gestion des connexions Socket.IO
io.on('connection', (socket) => {
    // Événement d'authentification de l'utilisateur
    socket.on('authentifier', async (data) => {
        const userEmail = data.email;
        const existingSocketId = await redisClient.hGet('utilisateursParSocket', userEmail);
        if (existingSocketId) {
            await redisClient.hSet('utilisateursParSocket', userEmail, socket.id);
        } else {
            await redisClient.hSet('utilisateursParSocket', userEmail, socket.id);
        }
    });

    // Événement de déconnexion de l'utilisateur
    socket.on('user-disconnect', async () => {
        const allUserData = await redisClient.hGetAll('utilisateursParSocket');
        let userEmail = null;
        for (const [email, socketId] of Object.entries(allUserData)) {
            if (socketId === socket.id) {
                userEmail = email;
                break;
            }
        }
        if (userEmail) {
            await redisClient.hDel('utilisateursParSocket', userEmail);
            await redisClient.sRem('utilisateursConnectes', userEmail);
        }
    });
});

// Serveur écoute sur un port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});

// Mise à jour des utilisateurs connectés toutes les 5 secondes
setInterval(async () => {
    try {
        const userData = await redisClient.hGetAll('utilisateursParSocket');
        const usersWithSockets = Object.entries(userData).map(([email, socketId]) => ({
            email,
            socketId
        }));
        io.emit('liste utilisateurs connectes', usersWithSockets);
    } catch (err) {
        console.error(err);
    }
}, 5000);
