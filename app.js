const express = require('express');
const app = express();

const accountsRoutes = require('./api/routes/accounts');

//middleware
app.use('/accounts', accountsRoutes);

module.exports = app;