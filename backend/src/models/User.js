const { Schema, model } = require('mongoose'); 

const userSchema = new Schema({
    name: String,
    surname: String,
    phone: String,
    email: String,
    password: String, 

}, {
    timestamps: true 
});

module.exports = model('User', userSchema); 