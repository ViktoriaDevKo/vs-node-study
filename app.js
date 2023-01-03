const express = require('express');
const app = express();

const accountsRoutes = require('./api/routes/accounts');

//middleware
app.use((req, res, next) => {
    res.status(200).json({
        mess:'It works'
    });
});

module.exports = app;