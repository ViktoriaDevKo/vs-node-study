const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    login: String,
    password: String,
    type: String
});

module.exports = mongoose.model('User', userSchema);