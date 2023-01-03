const express = require('express');
const app = express();

const accountsRoutes = require('./api/routes/accounts');
const tasksRoutes = require('./api/routes/tasks');
const regularTasksRoutes = require('./api/routes/regularTasks');

//middleware
app.use('/accounts', accountsRoutes);
app.use('/tasks/all', tasksRoutes);
app.use('/tasks/regular', regularTasksRoutes);


module.exports = app;