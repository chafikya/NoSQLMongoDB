const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    messageId: { type: String, unique: true }, 
    sender: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the sender user
    recipient: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the recipient user
    content: String,
    createdAt: { type: Date, default: Date.now }
});

const userSchema = new Schema({
    name: String,
    surname: String,
    phone: String,
    email: String,
    password: String,
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }] // List of messages sent or received by the user
}, {
    timestamps: true
});

const User = model('User', userSchema);
const Message = model('Message', messageSchema);

module.exports = { User, Message };
