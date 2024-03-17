const redis = require('redis');
const mongoose = require('mongoose');

// Connect to Redis
const redisClient = redis.createClient();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
   .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));
