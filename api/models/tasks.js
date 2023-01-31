const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    task: {type: String, required: true},
    typeOfTask: {type: String, required: true},
    description: String,
    datePerforming: {type: Date, required: true, default: Date.now()},
    priority: String,
    _id_User:  {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users'}, 
    tags: Array
});

module.exports = mongoose.model('Tasks', taskSchema);