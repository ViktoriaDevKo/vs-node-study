const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    task: {Type: String, required: true},
    type: {Type: String, required: true},
    description: String,
    datePerf: {Type: Date, required: true},
    regularity: {Type: String, required: true},
    priority: String,
    _id_User:  {Type: mongoose.Schema.Types.ObjectId, required: true}, 
    tags: Array
});

module.exports = mongoose.model('RegularTasks', taskSchema);