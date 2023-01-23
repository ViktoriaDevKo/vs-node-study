const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    login: {type: String, required: true},
    salt: String,
    hash : String,
    type: String
});

module.exports = mongoose.model('Users', userSchema);