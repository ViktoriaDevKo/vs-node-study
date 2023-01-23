const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    login: {type: String, required: true},
    salt: {type: String, required: true},
    hash : {type: String, required: true},
    type: String
});

module.exports = mongoose.model('Users', userSchema);