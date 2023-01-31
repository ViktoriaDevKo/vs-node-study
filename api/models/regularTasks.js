const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    task: {type: String, required: true},
    typeOfTask: {type: String, required: true},
    description: String,
    dateStarting : {type: Date, required: true, default: Date.now()},
    regularity: {type: String, required: true},
    priority: String,
    _id_User:  {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users'}, 
    tags: Array
});

module.exports = mongoose.model('RegularTasks', taskSchema);