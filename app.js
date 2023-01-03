const express = require('express');
const app = express();
const morgan = require('morgan');

const accountsRoutes = require('./api/routes/accounts');
const tasksRoutes = require('./api/routes/tasks');
const regularTasksRoutes = require('./api/routes/regularTasks');


app.use(morgan('dev'));
//middleware
app.use('/accounts', accountsRoutes);
app.use('/tasks', tasksRoutes);
app.use('/tasks/regular', regularTasksRoutes);


module.exports = app;