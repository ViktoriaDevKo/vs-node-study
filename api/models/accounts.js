const mongoose = require('mongoose');

//TODO how to de-hash password in order to display it in case of need 
const acountSchema = mongoose.Schema({
    _id_User: {Type: mongoose.Schema.Types.ObjectId, required: true},
    _id: mongoose.Schema.Types.ObjectId,
    resourceName: {Type: String, required: true},
    login: {Type: String, required: true},
    salt: {Type: String, required: true},
    hash : {Type: String, required: true},
    type: String,
    tags: Array
});

module.exports = mongoose.model('Accounts', acountSchema);