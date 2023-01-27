const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    task: {Type: String, required: true},
    type: {Type: String, required: true},
    description: String,
    datePerforming: {Type: Date, required: true, default: Date.now()},
    priority: String,
    _id_User:  {Type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users'}, 
    tags: Array
});

module.exports = mongoose.model('Tasks', taskSchema);