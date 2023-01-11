const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    login: String,
    password: String,
    type: String
});

module.exports = mongoose.model('User', userSchema);