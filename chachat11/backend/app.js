const express = require('express');
const connectToMongo = require('./database.js'); // Assurez-vous que le chemin est correct

connectToMongo(); // Établit la connexion à MongoDB

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
