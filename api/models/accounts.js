const mongoose = require('mongoose');

//TODO how to de-hash password in order to display it in case of need 
const acountSchema = mongoose.Schema({
    _id_User: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users'},
    _id: mongoose.Schema.Types.ObjectId,
    resourceName: {type: String, required: true},
    login: {type: String, required: true},
    salt: {type: String, required: true},
    hash : {type: String, required: true},
    typeOfAccount: String,
    tags: Array
});

module.exports = mongoose.model('Accounts', acountSchema);