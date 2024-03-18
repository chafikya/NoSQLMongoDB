const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: String,
    surname: String,
    phone: String,
    email: String,
    password: String
}, {
    timestamps: true
});

const User = model('User', userSchema);

module.exports = { User };
