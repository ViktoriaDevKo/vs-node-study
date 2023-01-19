const mongoose = require('mongoose');

const acountSchema = mongoose.Schema({
    _id_User: mongoose.Types.ObjectId,
    _id: mongoose.Types.ObjectId,
    resourceName: String,
    login: String,
    salt: String,
    hash : String,
    type: String,
    tags: Array
});

module.exports = mongoose.model('Accounts', acountSchema);