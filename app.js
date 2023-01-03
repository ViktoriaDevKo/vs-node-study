const express = require('express');
const app = express();

const accountsRoutes = require('./api/routes/accounts');
const tasksRoutes = require('./api/routes/tasks');

//middleware
app.use('/accounts', accountsRoutes);
app.use('/tasks', tasksRoutes);

module.exports = app;