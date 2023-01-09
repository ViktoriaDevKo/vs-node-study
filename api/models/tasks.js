const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    task: String,
    type: String,
    description: String
});

module.exports = mongoose.model('Tasks', taskSchema);