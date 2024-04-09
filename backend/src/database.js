const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27018/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
   .then(db => console.log('Database is connected'))
   .catch(err => console.log(err));
   