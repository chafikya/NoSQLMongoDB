const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    createdAt: { type: Date, default: Date.now }
});

// Apply the AutoIncrement plugin to generate sequential IDs for messageId
messageSchema.plugin(AutoIncrement, { inc_field: 'messageId' });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
