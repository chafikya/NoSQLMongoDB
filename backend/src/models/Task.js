// models/Task.js
const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    name: String,
    description: String,
    date: Date,
    image: String, 
    user: { type: Schema.Types.ObjectId, ref: 'User' } 
}, {
    timestamps: true
});

const Task = model('Task', taskSchema);

module.exports = Task;
