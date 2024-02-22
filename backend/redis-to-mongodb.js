const mongoose = require('mongoose');
const redis = require('redis'); 

// Connect to Redis
const redisClient = redis.createClient();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27018', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
   .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));


