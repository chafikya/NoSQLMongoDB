const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27018/login.log'; // Remplacez par votre propre URI

const connectToMongo = () => {
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(err => console.error('Échec de la connexion à MongoDB', err));
};

module.exports = connectToMongo;
